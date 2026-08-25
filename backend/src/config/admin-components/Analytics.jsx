import React, { useEffect, useState } from 'react';

const Analytics = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    
    fetch('/admin/api/analytics', {
      headers: {
        'Accept': 'application/json',
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((response) => {
        if (mounted) setData(response);
      })
      .catch((err) => {
        if (mounted) setError(err.message || 'Failed to load analytics');
      });
      
    return () => { mounted = false; };
  }, []);

  if (error) return <div style={styles.stateContainer}><span style={{color: '#ef4444'}}>Error: {error}</span></div>;
  if (!data) return <div style={styles.stateContainer}>Loading analytics...</div>;

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h2 style={styles.title}>Dashboard Analytics</h2>
        <p style={styles.subtitle}>Overview of store performance, inventory, and staff activity.</p>
      </header>

      {/* KPI Section */}
      <div style={styles.kpiGrid}>
        <div style={styles.card}>
          <span style={styles.cardLabel}>Total Revenue</span>
          <div style={styles.kpiValue}>${Number(data.totalRevenue).toLocaleString()}</div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div style={styles.mainGrid}>
        {/* Top Products */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Top Products <span style={styles.badge}>By Sold Qty</span></h3>
          <div style={styles.tableWrapper}>
            <table style={styles.table}>
              <thead>
                <tr style={styles.tableHeaderRow}>
                  <th style={styles.thLeft}>Product</th>
                  <th style={styles.thRight}>Qty Sold</th>
                  <th style={styles.thRight}>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.topProducts.map((p, idx) => (
                  <tr key={p.id_bien_the} style={idx % 2 === 0 ? styles.trEven : {}}>
                    <td style={styles.tdLeft}>{p.ten_san_pham || `Variant ${p.id_bien_the}`}</td>
                    <td style={styles.tdRight}>{p.total_sold}</td>
                    <td style={styles.tdRight}>${Number(p.total_revenue).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Low Stock Variants */}
        <section style={styles.card}>
          <h3 style={styles.cardTitle}>Low Stock Alerts <span style={{...styles.badge, backgroundColor: '#fee2e2', color: '#991b1b'}}>Action Needed</span></h3>
          <div style={styles.listWrapper}>
            {data.lowStock.map((s) => (
              <div key={s.id_bien_the} style={styles.listItem}>
                <span style={styles.listText}>{s.ten_san_pham || `Variant ${s.id_bien_the}`}</span>
                <span style={styles.stockBadge}>{s.so_luong_ton} left</span>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Staff Performance Section */}
      <section style={{ ...styles.card, marginTop: 24 }}>
        <h3 style={styles.cardTitle}>Staff Performance</h3>
        <div style={styles.tableWrapper}>
          <table style={styles.table}>
            <thead>
              <tr style={styles.tableHeaderRow}>
                <th style={styles.thLeft}>Staff</th>
                <th style={styles.thRight}>DonNhap</th>
                <th style={styles.thRight}>StockOps</th>
                <th style={styles.thRight}>Score</th>
              </tr>
            </thead>
            <tbody>
              {data.staffPerformance.map((s, idx) => (
                <tr key={s.id_nguoi_dung} style={idx % 2 === 0 ? styles.trEven : {}}>
                  <td style={styles.tdLeft}>{s.email || s.id_nguoi_dung}</td>
                  <td style={styles.tdRight}>{s.don_nhap_count}</td>
                  <td style={styles.tdRight}>{s.lich_su_count}</td>
                  <td style={styles.tdRight}><strong style={{color: '#4f46e5'}}>{s.activity_score}</strong></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

// Modern Dashboard Design Stylesheet Object
const styles = {
  container: {
    padding: '32px',
    backgroundColor: '#f8fafc',
    minHeight: '100vh',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    color: '#1e293b',
  },
  header: {
    marginBottom: '24px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '700',
    color: '#0f172a',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#64748b',
    marginTop: '4px',
  },
  stateContainer: {
    padding: '48px',
    textAlign: 'center',
    fontFamily: 'sans-serif',
    color: '#64748b',
  },
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '20px',
    marginBottom: '24px',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '24px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e2e8f0',
  },
  cardLabel: {
    fontSize: '13px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    color: '#64748b',
  },
  kpiValue: {
    fontSize: '32px',
    fontWeight: '700',
    color: '#0f172a',
    marginTop: '8px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#0f172a',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    fontSize: '11px',
    fontWeight: '500',
    padding: '2px 8px',
    borderRadius: '12px',
    backgroundColor: '#e0e7ff',
    color: '#3730a3',
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '14px',
  },
  tableHeaderRow: {
    borderBottom: '2px solid #e2e8f0',
    color: '#475569',
  },
  thLeft: {
    padding: '10px 12px',
    fontWeight: '600',
  },
  thRight: {
    padding: '10px 12px',
    fontWeight: '600',
    textAlign: 'right',
  },
  tdLeft: {
    padding: '12px',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9',
  },
  tdRight: {
    padding: '12px',
    textAlign: 'right',
    color: '#334155',
    borderBottom: '1px solid #f1f5f9',
  },
  trEven: {
    backgroundColor: '#f8fafc',
  },
  listWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 12px',
    backgroundColor: '#f8fafc',
    borderRadius: '8px',
    border: '1px solid #f1f5f9',
    fontSize: '14px',
  },
  listText: {
    color: '#334155',
    fontWeight: '500',
  },
  stockBadge: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#b91c1c',
    backgroundColor: '#fee2e2',
    padding: '2px 8px',
    borderRadius: '6px',
  },
};

export default Analytics;