import React, { useState, useMemo } from 'react';
import Chart from 'react-apexcharts';

const DashboardPage = () => {
  const [salesPeriod, setSalesPeriod] = useState(30);

  // Get theme colors from CSS variables
  const getThemeColor = (varName) => {
    if (typeof window !== 'undefined') {
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || '#3b82f6';
    }
    return '#3b82f6';
  };

  const accentColor = useMemo(() => getThemeColor('--accent-color'), []);
  const successColor = useMemo(() => getThemeColor('--success-color'), []);
  const warningColor = useMemo(() => getThemeColor('--warning-color'), []);
  const infoColor = useMemo(() => getThemeColor('--info-color'), []);
  const borderColor = useMemo(() => getThemeColor('--border-color'), []);

  // Sales Overview Chart
  const salesChartOptions = useMemo(() => ({
    series: [{
      name: 'Revenue',
      type: 'column',
      data: [4400, 5050, 4200, 5800, 4800, 6200, 5400, 6800, 5200, 7200, 6100, 8400, 7200, 9100, 8200, 10500, 9400, 11200, 10100, 12800, 11500, 14200, 12800, 15600, 14100, 17200, 15800, 19100, 17500, 21200]
    }, {
      name: 'Orders',
      type: 'line',
      data: [44, 55, 41, 67, 45, 72, 58, 78, 52, 84, 62, 95, 72, 102, 85, 112, 98, 125, 108, 138, 118, 152, 132, 165, 148, 180, 162, 198, 178, 220]
    }],
    chart: {
      height: 300,
      fontFamily: 'inherit',
      toolbar: { show: false },
      zoom: { enabled: false }
    },
    colors: [accentColor, successColor],
    stroke: { width: [0, 3], curve: 'smooth' },
    plotOptions: { bar: { columnWidth: '60%', borderRadius: 4 } },
    fill: { opacity: [1, 1] },
    dataLabels: { enabled: false },
    xaxis: {
      categories: Array.from({ length: 30 }, (_, i) => (i + 1).toString()),
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: '12px' } }
    },
    yaxis: [
      { axisTicks: { show: false }, axisBorder: { show: false }, labels: { style: { fontSize: '12px' } } },
      { opposite: true, axisTicks: { show: false }, axisBorder: { show: false }, labels: { style: { fontSize: '12px' } } }
    ],
    grid: { borderColor: borderColor },
    legend: { position: 'top' }
  }), [accentColor, successColor, borderColor]);

  // Category Revenue Chart
  const categoryChartOptions = useMemo(() => ({
    series: [569220, 127488, 74214, 29302],
    labels: ['Electronics', 'Audio', 'Wearables', 'Accessories'],
    colors: [accentColor, successColor, warningColor, infoColor],
    chart: { fontFamily: 'inherit', toolbar: { show: false } },
    legend: { show: false },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '65%' } } }
  }), [accentColor, successColor, warningColor, infoColor]);

  return (
    <div>
      <div className="main-content page-dashboard-sales">
        <div className="page-header">
          <h1 className="page-title">Dashboard</h1>
          <nav className="breadcrumb">
            <span className="breadcrumb-item active">Dashboard</span>
          </nav>
        </div>

        <div className="dashboard-grid dashboard-grid-4">
          <div className="card widget-stat">
            <div className="widget-stat-header">
              <div>
                <div className="widget-stat-value">$124,563</div>
                <div className="widget-stat-label">Total Revenue</div>
              </div>
              <div className="widget-stat-icon primary">
                <i className="bi bi-currency-dollar" />
              </div>
            </div>
            <div className="widget-stat-change positive">
              <i className="bi bi-arrow-up" /> 18.2% vs last month
            </div>
          </div>

          <div className="card widget-stat">
            <div className="widget-stat-header">
              <div>
                <div className="widget-stat-value">3,842</div>
                <div className="widget-stat-label">Total Orders</div>
              </div>
              <div className="widget-stat-icon success">
                <i className="bi bi-bag-check" />
              </div>
            </div>
            <div className="widget-stat-change positive">
              <i className="bi bi-arrow-up" /> 12.5% vs last month
            </div>
          </div>

          <div className="card widget-stat">
            <div className="widget-stat-header">
              <div>
                <div className="widget-stat-value">4.28%</div>
                <div className="widget-stat-label">Conversion Rate</div>
              </div>
              <div className="widget-stat-icon warning">
                <i className="bi bi-graph-up-arrow" />
              </div>
            </div>
            <div className="widget-stat-change negative">
              <i className="bi bi-arrow-down" /> 2.1% vs last month
            </div>
          </div>

          <div className="card widget-stat">
            <div className="widget-stat-header">
              <div>
                <div className="widget-stat-value">$32.42</div>
                <div className="widget-stat-label">Avg Order Value</div>
              </div>
              <div className="widget-stat-icon info">
                <i className="bi bi-receipt" />
              </div>
            </div>
            <div className="widget-stat-change positive">
              <i className="bi bi-arrow-up" /> 5.3% vs last month
            </div>
          </div>
        </div>

        <div className="two-column-layout">
          <div>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Sales Overview</h5>
                <div className="card-actions">
                  <select value={salesPeriod} onChange={(e) => setSalesPeriod(parseInt(e.target.value))} className="form-select form-select-sm" style={{ width: 'auto' }}>
                    <option value={7}>Last 7 days</option>
                    <option value={30}>Last 30 days</option>
                    <option value={90}>Last 90 days</option>
                  </select>
                </div>
              </div>
              <div className="card-body">
                <Chart
                  options={salesChartOptions}
                  series={salesChartOptions.series}
                  type="line"
                  height={300}
                />
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Top Selling Products</h5>
                <div className="card-actions">
                  <a href="#" className="btn btn-sm btn-outline-primary">View All</a>
                </div>
              </div>
              <div className="card-body p-0">
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr><th>Product</th><th>Price</th><th>Sold</th><th>Revenue</th><th>Trend</th></tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <div className="product-img bg-primary-light rounded" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <i className="bi bi-laptop text-primary" />
                              </div>
                              <div>
                                <div className="fw-medium">MacBook Pro 14"</div>
                                <small className="text-muted">Electronics</small>
                                </div>
                                </div>
                                </td><td>$1,999</td><td>142</td><td>$283,858</td><td><span className="badge badge-soft-success"><i className="bi bi-arrow-up" /> 12%</span></td></tr>
                      <tr><td><div className="d-flex align-items-center gap-3"><div className="product-img bg-success-light rounded" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-phone text-success" /></div><div><div className="fw-medium">iPhone 15 Pro</div><small className="text-muted">Electronics</small></div></div></td><td>$1,199</td><td>238</td><td>$285,362</td><td><span className="badge badge-soft-success"><i className="bi bi-arrow-up" /> 8%</span></td></tr>
                      <tr><td><div className="d-flex align-items-center gap-3"><div className="product-img bg-warning-light rounded" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-headphones text-warning" /></div><div><div className="fw-medium">AirPods Pro</div><small className="text-muted">Audio</small></div></div></td><td>$249</td><td>512</td><td>$127,488</td><td><span className="badge badge-soft-danger"><i className="bi bi-arrow-down" /> 3%</span></td></tr>
                      <tr><td><div className="d-flex align-items-center gap-3"><div className="product-img bg-info-light rounded" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-watch text-info" /></div><div><div className="fw-medium">Apple Watch Series 9</div><small className="text-muted">Wearables</small></div></div></td><td>$399</td><td>186</td><td>$74,214</td><td><span className="badge badge-soft-success"><i className="bi bi-arrow-up" /> 15%</span></td></tr>
                      <tr><td><div className="d-flex align-items-center gap-3"><div className="product-img bg-danger-light rounded" style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-keyboard text-danger" /></div><div><div className="fw-medium">Magic Keyboard</div><small className="text-muted">Accessories</small></div></div></td><td>$299</td><td>98</td><td>$29,302</td><td><span className="badge badge-soft-warning"><i className="bi bi-dash" /> 0%</span></td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Revenue by Category</h5>
              </div>
              <div className="card-body">
                <Chart
                  options={categoryChartOptions}
                  series={categoryChartOptions.series}
                  type="donut"
                  height={200}
                />
                <div className="mt-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge-dot" style={{ backgroundColor: 'var(--accent-color)' }} />
                      <span>Electronics</span>
                    </div>
                    <span className="fw-medium">$569,220</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge-dot" style={{ backgroundColor: 'var(--success-color)' }} />
                      <span>Audio</span>
                    </div>
                    <span className="fw-medium">$127,488</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge-dot" style={{ backgroundColor: 'var(--warning-color)' }} />
                      <span>Wearables</span>
                    </div>
                    <span className="fw-medium">$74,214</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center gap-2">
                      <span className="badge-dot" style={{ backgroundColor: 'var(--info-color)' }} />
                      <span>Accessories</span>
                    </div>
                    <span className="fw-medium">$29,302</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Recent Transactions</h5>
                <div className="card-actions">
                  <a href="#" className="text-muted">View All</a>
                </div>
              </div>
              <div className="card-body">
                <div className="transaction-list">
                  <div className="transaction-item"><div className="transaction-icon success"><i className="bi bi-arrow-down-left" /></div><div className="transaction-details"><div className="transaction-title">Payment from #ORD-7352</div><div className="transaction-meta">Credit Card • 2 min ago</div></div><div className="transaction-amount positive">+$1,999.00</div></div>
                  <div className="transaction-item"><div className="transaction-icon danger"><i className="bi bi-arrow-up-right" /></div><div className="transaction-details"><div className="transaction-title">Refund to #ORD-7284</div><div className="transaction-meta">PayPal • 15 min ago</div></div><div className="transaction-amount negative">-$249.00</div></div>
                  <div className="transaction-item"><div className="transaction-icon success"><i className="bi bi-arrow-down-left" /></div><div className="transaction-details"><div className="transaction-title">Payment from #ORD-7351</div><div className="transaction-meta">Credit Card • 32 min ago</div></div><div className="transaction-amount positive">+$399.00</div></div>
                  <div className="transaction-item"><div className="transaction-icon success"><i className="bi bi-arrow-down-left" /></div><div className="transaction-details"><div className="transaction-title">Payment from #ORD-7350</div><div className="transaction-meta">Apple Pay • 1 hr ago</div></div><div className="transaction-amount positive">+$2,398.00</div></div>
                  <div className="transaction-item"><div className="transaction-icon success"><i className="bi bi-arrow-down-left" /></div><div className="transaction-details"><div className="transaction-title">Payment from #ORD-7349</div><div className="transaction-meta">Credit Card • 2 hrs ago</div></div><div className="transaction-amount positive">+$598.00</div></div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <h5 className="card-title">Sales by Region</h5>
              </div>
              <div className="card-body">
                <div className="region-list">
                  <div className="region-item"><div className="region-info"><span className="region-flag">🇺🇸</span><span className="region-name">United States</span></div><div className="region-stats"><span className="region-value">$52,420</span><div className="progress region-progress"><div className="progress-bar" style={{ width: '65%' }} /></div></div></div>
                  <div className="region-item"><div className="region-info"><span className="region-flag">🇬🇧</span><span className="region-name">United Kingdom</span></div><div className="region-stats"><span className="region-value">$28,350</span><div className="progress region-progress"><div className="progress-bar bg-success" style={{ width: '45%' }} /></div></div></div>
                  <div className="region-item"><div className="region-info"><span className="region-flag">🇩🇪</span><span className="region-name">Germany</span></div><div className="region-stats"><span className="region-value">$18,920</span><div className="progress region-progress"><div className="progress-bar bg-warning" style={{ width: '32%' }} /></div></div></div>
                  <div className="region-item"><div className="region-info"><span className="region-flag">🇫🇷</span><span className="region-name">France</span></div><div className="region-stats"><span className="region-value">$14,680</span><div className="progress region-progress"><div className="progress-bar bg-info" style={{ width: '25%' }} /></div></div></div>
                  <div className="region-item"><div className="region-info"><span className="region-flag">🇨🇦</span><span className="region-name">Canada</span></div><div className="region-stats"><span className="region-value">$10,193</span><div className="progress region-progress"><div className="progress-bar bg-danger" style={{ width: '18%' }} /></div></div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
