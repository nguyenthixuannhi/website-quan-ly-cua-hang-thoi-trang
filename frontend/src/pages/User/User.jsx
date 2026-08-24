import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './User.css';

import Header from "../../components/Header/Header";

const API_URL = 'http://localhost:81';

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false); // Mode toggle: view vs edit
  
  const [editEmail, setEditEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newAddress, setNewAddress] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  async function fetchProfile() {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }
    try {
      const resp = await fetch(`${API_URL}/api/users/me`, { headers: { Authorization: `Bearer ${token}` } });
      if (!resp.ok) {
        if (resp.status === 401) { localStorage.removeItem('token'); navigate('/login'); }
        return;
      }
      const data = await resp.json();
      setUser(data.user);
      setEditEmail(data.user.email || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleUpdateProfile(e) {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      const resp = await fetch(`${API_URL}/api/users/me`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ email: editEmail, mat_khau: newPassword || undefined }),
      });
      if (resp.ok) {
        await fetchProfile();
        setNewPassword('');
        setEditMode(false); // Switch back to view mode on success
        alert('Cập nhật thông tin thành công');
      } else {
        const err = await resp.json();
        alert(err.message || 'Update failed');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleAddAddress() {
    const token = localStorage.getItem('token');
    if (!newAddress.trim()) return;
    try {
      const resp = await fetch(`${API_URL}/api/diachi`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id_nguoi_dung: user.id_nguoi_dung, dia_chi_chi_tiet: newAddress }),
      });
      if (resp.ok) {
        setNewAddress('');
        await fetchProfile();
      } else {
        const err = await resp.json();
        alert(err.message || 'Failed to add address');
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function handleDeleteAddress(id) {
    const token = localStorage.getItem('token');
    if (!confirm('Xóa địa chỉ này?')) return;
    try {
      const resp = await fetch(`${API_URL}/api/diachi/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (resp.ok) await fetchProfile();
      else { const e = await resp.json(); alert(e.message || 'Delete failed'); }
    } catch (err) { console.error(err); }
  }

  async function handleAvatarUpload(e) {
    e.preventDefault();
    if (!avatarFile) return alert('Chọn ảnh trước');
    const token = localStorage.getItem('token');
    const fd = new FormData();
    fd.append('avatar', avatarFile);
    try {
      const resp = await fetch(`${API_URL}/api/users/me/avatar`, { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      if (resp.ok) {
        await fetchProfile();
        setAvatarFile(null);
      } else { const e = await resp.json(); alert(e.message || 'Upload failed'); }
    } catch (err) { console.error(err); }
  }

  if (loading) return <div className="user-loading">Đang tải...</div>;
  if (!user) return <div className="user-loading">Không có người dùng</div>;

  return (
    <>
      <Header />
    <div className="user-page-container">
      <div className="user-header-banner">
        <h2>Trang Người Dùng</h2>
        <button className="mode-toggle-btn" onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Chế độ Xem' : 'Chỉnh sửa Thông tin'}
        </button>
      </div>

      <div className="user-content-layout">
        {/* Left Side: Profile & Avatar */}
        <div className="user-card profile-card">
          <h3>Thông tin cá nhân</h3>
          {user.avatar && <img src={user.avatar} alt="avatar" className="user-avatar-img" />}

          {!editMode ? (
            <div className="profile-view-mode">
              <div className="info-group">
                <span className="info-label">Email:</span>
                <span className="info-value">{user.email || 'Chưa cập nhật'}</span>
              </div>
              <div className="info-group">
                <span className="info-label">Mật khẩu:</span>
                <span className="info-value">••••••••</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="profile-form">
              <label>Email</label>
              <input className="user-input" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
              
              <label>Mật khẩu mới (để trống nếu không đổi)</label>
              <input className="user-input" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
              
              <div className="form-actions">
                <button type="submit" className="primary-btn">Lưu thay đổi</button>
                <button type="button" className="secondary-btn" onClick={() => setEditMode(false)}>Hủy</button>
              </div>
            </form>
          )}

          <h4>Ảnh đại diện</h4>
          <form onSubmit={handleAvatarUpload} className="avatar-form">
            <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} className="file-input" />
            <button type="submit" className="action-btn">Tải lên</button>
          </form>
        </div>

        {/* Right Side: Addresses & Orders */}
        <div className="user-right-column">
          <div className="user-card">
            <h3>Địa chỉ nhận hàng</h3>
            <div className="address-list">
              {(user.dia_chi || []).map((d) => (
                <div key={d.id_dia_chi} className="address-item">
                  <div className="address-text">{d.dia_chi_chi_tiet}</div>
                  <div className="address-actions">
                    <button className="action-btn sm" onClick={() => { 
                      const val = prompt('Sửa địa chỉ', d.dia_chi_chi_tiet); 
                      if (val != null) fetch(`${API_URL}/api/diachi/${d.id_dia_chi}`, { 
                        method: 'PUT', 
                        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }, 
                        body: JSON.stringify({ dia_chi_chi_tiet: val }) 
                      }).then(() => fetchProfile()); 
                    }}>Sửa</button>
                    <button className="action-btn sm danger" onClick={() => handleDeleteAddress(d.id_dia_chi)}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>
            <div className="add-address-box">
              <input className="user-input" placeholder="Nhập địa chỉ mới..." value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
              <button className="primary-btn" onClick={handleAddAddress}>Thêm</button>
            </div>
          </div>

          <div className="user-card" style={{ marginTop: '20px' }}>
            <h3>Lịch sử đơn hàng</h3>
            <div className="orders-list">
              {(user.don_hang || []).map((o) => (
                <div key={o.id_don_hang} className="order-card-item">
                  <div className="order-header">
                    <strong>Đơn #{o.id_don_hang}</strong> 
                    <span className={`badge ${o.trang_thai}`}>{o.trang_thai}</span>
                  </div>
                  <div className="order-subinfo">Loại: {o.loai_don} | Ngày: {o.ngay_tao}</div>
                  
                  <div className="order-details-box">
                    <strong>Chi tiết:</strong>
                    <ul>
                      {(o.chi_tiet_don_hang || []).map((it) => (
                        <li key={it.id_ct_don}>{it.so_luong} x {it.don_gia_thuc}đ (Biến thể: {it.id_bien_the})</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="shipping-info">
                    <strong>Giao hàng:</strong> {o.phieu_giao ? (
                      <span>Đơn vị: {o.phieu_giao.don_vi_van_chuyen} - Trạng thái: <b>{o.phieu_giao.trang_thai}</b></span>
                    ) : <span className="text-muted">Chưa có thông tin giao hàng</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}