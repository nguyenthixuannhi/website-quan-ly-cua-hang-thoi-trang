import React, { useEffect, useState } from 'react';
import './PurchaseModal.css';

const API_URL = 'http://localhost:81';

function PurchaseModal({ items, onClose, onSuccess, clearCartAfter = false }) {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddr, setSelectedAddr] = useState(null);
  const [newAddress, setNewAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const user = (() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch(e) { return null; }
  })();

  useEffect(() => {
    const fetchAddrs = async () => {
      try {
        const res = await fetch(`${API_URL}/api/diachi`);
        if (!res.ok) return setAddresses([]);
        const data = await res.json();
        // filter by user if possible
        const list = Array.isArray(data) ? data.filter(a => !user || a.id_nguoi_dung === user.id_nguoi_dung) : [];
        setAddresses(list);
        if (list.length) setSelectedAddr(list[0].id_dia_chi);
      } catch (e) {
        setAddresses([]);
      }
    };
    fetchAddrs();
  }, []);

  const handleConfirm = async () => {
    setError('');
    if (!user) {
      window.location.href = '/login';
      return;
    }
    if (!selectedAddr && !newAddress.trim()) {
      setError('Vui lòng chọn hoặc nhập địa chỉ giao hàng');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');

      // create new address if provided
      let createdAddr = null;
      if (newAddress.trim()) {
        const addrResp = await fetch(`${API_URL}/api/diachi`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id_nguoi_dung: user?.id_nguoi_dung, dia_chi_chi_tiet: newAddress.trim() }),
        });
        createdAddr = await addrResp.json().catch(() => null);
        if (!addrResp.ok) throw new Error(createdAddr?.message || 'Không thể tạo địa chỉ');
      }

      // create order
      const orderResp = await fetch(`${API_URL}/api/donhang`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: token ? `Bearer ${token}` : undefined },
        body: JSON.stringify({ id_nguoi_dung: user.id_nguoi_dung, loai_don: 'online', trang_thai: 'pending' }),
      });
      const orderData = await orderResp.json().catch(() => ({}));
      if (!orderResp.ok) throw new Error(orderData.message || 'Không thể tạo đơn hàng');

      const orderId = orderData.id_don_hang || orderData.id;
      if (!orderId) throw new Error('Không nhận được id đơn hàng');

      // create order items
      for (const it of items) {
        const body = { id_don_hang: orderId, id_bien_the: Number(it.variantId || it.id_bien_the), so_luong: Number(it.quantity || 1), don_gia_thuc: Number(it.price || it.don_gia_thuc || 0) };
        const resp = await fetch(`${API_URL}/api/chitietdonhang`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });
        const d = await resp.json().catch(() => ({}));
        if (!resp.ok) throw new Error(d.message || 'Không thể lưu chi tiết đơn hàng');
      }

      // create delivery note
      const phResp = await fetch(`${API_URL}/api/phieugiaohang`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_don_hang: orderId, trang_thai: 'created' }),
      });
      if (!phResp.ok) {
        const t = await phResp.json().catch(()=> ({}));
        console.warn('phieu giao creation failed', t);
      }

      // if requested clear cart
      if (clearCartAfter) {
        try {
          await fetch(`${API_URL}/api/giohang`, { method: 'DELETE', headers: { Authorization: token ? `Bearer ${token}` : undefined, 'Content-Type': 'application/json' } });
          window.dispatchEvent(new CustomEvent('cart-updated'));
        } catch (e) { /* ignore */ }
      }

      setLoading(false);
      onSuccess && onSuccess({ orderId });
      onClose && onClose();
    } catch (err) {
      setError(err.message || 'Lỗi khi đặt hàng');
      setLoading(false);
    }
  };

  return (
    <div className="purchase-modal-backdrop" onClick={onClose}>
      <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Chọn địa chỉ giao hàng</h2>

        <div className="pm-address-list">
          {addresses.length === 0 && <div style={{padding:8}}>Bạn chưa có địa chỉ lưu.</div>}
          {addresses.map((a) => (
            <div key={a.id_dia_chi} className={`pm-address-item ${selectedAddr === a.id_dia_chi ? 'selected' : ''}`} onClick={() => setSelectedAddr(a.id_dia_chi)}>
              {a.dia_chi_chi_tiet}
            </div>
          ))}
        </div>

        <div className="pm-new-address">
          <label>Hoặc nhập địa chỉ mới</label>
          <input type="text" value={newAddress} onChange={(e) => setNewAddress(e.target.value)} placeholder="Số nhà, đường, quận, tỉnh" style={{width:'100%',padding:8,marginTop:6}} />
        </div>

        <div className="pm-items">
          {items.map((it, idx) => (
            <div className="pm-item" key={idx}><div>{it.name || it.ten_san_pham || 'Sản phẩm' } x {it.quantity}</div><div>{(Number(it.price)||0).toLocaleString('vi-VN')}đ</div></div>
          ))}
        </div>

        {error && <div style={{color:'red',marginTop:8}}>{error}</div>}

        <div className="pm-actions">
          <button type="button" onClick={onClose} disabled={loading}>Hủy</button>
          <button type="button" onClick={handleConfirm} disabled={loading}>{loading ? 'Đang xử lý...' : 'Xác nhận và đặt hàng'}</button>
        </div>
      </div>
    </div>
  );
}

export default PurchaseModal;
