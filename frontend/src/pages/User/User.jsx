import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const API_URL = 'http://localhost:81';

export default function User() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  if (loading) return <div>Đang tải...</div>;
  if (!user) return <div>Không có người dùng</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>Trang Người Dùng</h2>
      <div style={{ display: 'flex', gap: 20 }}>
        <div style={{ flex: 1 }}>
          <h3>Thông tin</h3>
          {user.avatar && <img src={user.avatar} alt="avatar" style={{ width: 120, height: 120, objectFit: 'cover', borderRadius: 8 }} />}
          <form onSubmit={handleUpdateProfile} style={{ display: 'flex', flexDirection: 'column', gap: 8, maxWidth: 420 }}>
            <label>Email</label>
            <input value={editEmail} onChange={(e) => setEditEmail(e.target.value)} />
            <label>Mật khẩu mới (để trống nếu không đổi)</label>
            <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" />
            <button type="submit">Cập nhật</button>
          </form>

          <h4>Ảnh đại diện</h4>
          <form onSubmit={handleAvatarUpload}>
            <input type="file" accept="image/*" onChange={(e) => setAvatarFile(e.target.files[0])} />
            <button type="submit">Tải lên</button>
          </form>
        </div>

        <div style={{ flex: 2 }}>
          <h3>Địa chỉ</h3>
          <div>
            {(user.dia_chi || []).map((d) => (
              <div key={d.id_dia_chi} style={{ marginBottom: 8, borderBottom: '1px solid #eee', paddingBottom: 6 }}>
                <div>{d.dia_chi_chi_tiet}</div>
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => { const val = prompt('Sửa địa chỉ', d.dia_chi_chi_tiet); if (val != null) fetch(`${API_URL}/api/diachi/${d.id_dia_chi}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('token')}` }, body: JSON.stringify({ dia_chi_chi_tiet: val }) }).then(()=>fetchProfile()); }}>Sửa</button>
                  <button onClick={() => handleDeleteAddress(d.id_dia_chi)} style={{ marginLeft: 8 }}>Xóa</button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 8 }}>
            <input placeholder="Địa chỉ mới" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} />
            <button onClick={handleAddAddress} style={{ marginLeft: 8 }}>Thêm</button>
          </div>

          <h3 style={{ marginTop: 20 }}>Đơn hàng</h3>
          <div>
            {(user.don_hang || []).map((o) => (
              <div key={o.id_don_hang} style={{ border: '1px solid #ddd', padding: 10, marginBottom: 10 }}>
                <div><strong>Đơn #{o.id_don_hang}</strong> - {o.loai_don} - {o.trang_thai}</div>
                <div>Ngày: {o.ngay_tao}</div>
                <div style={{ marginTop: 8 }}>
                  <strong>Chi tiết:</strong>
                  <ul>
                    {(o.chi_tiet_don_hang || []).map((it) => (
                      <li key={it.id_ct_don}>{it.so_luong} x {it.don_gia_thuc} (biên thể {it.id_bien_the})</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <strong>Giao hàng:</strong>
                  {o.phieu_giao ? (
                    <div>Đơn vị: {o.phieu_giao.don_vi_van_chuyen} - Trạng thái: {o.phieu_giao.trang_thai}</div>
                  ) : <div>Chưa có thông tin giao hàng</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
