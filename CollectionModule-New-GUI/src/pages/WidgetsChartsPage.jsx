import { Link } from 'react-router-dom';
function WidgetsChartsPage() {
  return (
    <div>
      <div className="main-content page-widgets-charts">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Chart Widgets</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Widgets</a>
            <span className="breadcrumb-item active">Charts</span>
          </nav>
        </div>
        {/* Mini Stat Cards with Sparklines */}
        <section className="section">
          <h5 className="section-title mb-3">Mini Stat Cards with Sparklines</h5>
          <div className="row g-4">
            {/* Active Users Stat */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-chart-stat">
                <div className="card-body">
                  <div className="widget-chart-stat-header">
                    <div>
                      <div className="widget-chart-stat-value">3,847</div>
                      <div className="widget-chart-stat-label">Active Users</div>
                    </div>
                    <span className="widget-chart-stat-change positive">+2.8%</span>
                  </div>
                  <div className="widget-chart-sparkline primary">
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M0,25 Q10,20 20,22 T40,15 T60,20 T80,10 T100,15" fill="none" stroke="currentColor" strokeWidth={2} />
                      <path d="M0,25 Q10,20 20,22 T40,15 T60,20 T80,10 T100,15 V30 H0 Z" fill="currentColor" opacity="0.1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Page Sessions Stat */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-chart-stat">
                <div className="card-body">
                  <div className="widget-chart-stat-header">
                    <div>
                      <div className="widget-chart-stat-value">24,892</div>
                      <div className="widget-chart-stat-label">Sessions</div>
                    </div>
                    <span className="widget-chart-stat-change negative">-1.5%</span>
                  </div>
                  <div className="widget-chart-sparkline-bars info">
                    <span style={{height: '55%'}} />
                    <span style={{height: '75%'}} />
                    <span style={{height: '35%'}} />
                    <span style={{height: '85%'}} />
                    <span style={{height: '65%'}} />
                    <span style={{height: '45%'}} />
                    <span style={{height: '80%'}} />
                    <span style={{height: '60%'}} />
                    <span style={{height: '70%'}} />
                  </div>
                </div>
              </div>
            </div>
            {/* Bounce Rate Stat */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-chart-stat">
                <div className="card-body">
                  <div className="widget-chart-stat-header">
                    <div>
                      <div className="widget-chart-stat-value">42.5%</div>
                      <div className="widget-chart-stat-label">Bounce Rate</div>
                    </div>
                    <span className="widget-chart-stat-change positive">+0.8%</span>
                  </div>
                  <div className="widget-chart-sparkline warning">
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none">
                      <path d="M0,20 Q15,25 25,18 T50,22 T75,12 T100,18" fill="none" stroke="currentColor" strokeWidth={2} />
                      <path d="M0,20 Q15,25 25,18 T50,22 T75,12 T100,18 V30 H0 Z" fill="currentColor" opacity="0.1" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Revenue Stat */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-chart-stat">
                <div className="card-body">
                  <div className="widget-chart-stat-header">
                    <div>
                      <div className="widget-chart-stat-label">Monthly Revenue</div>
                      <div className="widget-chart-stat-value">$54,720</div>
                    </div>
                  </div>
                  <div className="widget-chart-sparkline-bars dark">
                    <span style={{height: '45%'}} />
                    <span style={{height: '65%'}} />
                    <span style={{height: '35%'}} />
                    <span style={{height: '75%'}} />
                    <span style={{height: '55%'}} />
                    <span style={{height: '85%'}} />
                    <span style={{height: '40%'}} />
                    <span style={{height: '70%'}} />
                    <span style={{height: '50%'}} />
                    <span style={{height: '80%'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Overall Balance & ROI Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Balance &amp; ROI Cards</h5>
          <div className="row g-4">
            {/* Account Overview */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="widget-balance-header">
                    <div>
                      <div className="widget-balance-label">Account Overview</div>
                      <div className="widget-balance-value">$1,847,320</div>
                      <div className="widget-balance-change">
                        <i className="bi bi-caret-up-fill" />
                        <span className="positive">12.7%</span>
                        <span className="text-muted">vs last quarter</span>
                      </div>
                    </div>
                    <div className="widget-balance-tabs">
                      <button className="active">Revenue</button>
                      <button>Costs</button>
                    </div>
                  </div>
                  <div className="widget-balance-content">
                    <div className="widget-balance-chart">
                      <svg viewBox="0 0 400 120" preserveAspectRatio="none">
                        <path d="M0,80 Q50,90 100,70 T200,60 T300,75 T400,50" fill="none" stroke="var(--accent-color)" strokeWidth={2} />
                        <path d="M0,80 Q50,90 100,70 T200,60 T300,75 T400,50 V120 H0 Z" fill="var(--accent-color)" opacity="0.1" />
                      </svg>
                      <div className="widget-balance-chart-labels">
                        <span>Oct</span>
                        <span>Nov</span>
                        <span>Dec</span>
                        <span>Jan</span>
                        <span>Feb</span>
                        <span>Mar</span>
                        <span>Apr</span>
                      </div>
                    </div>
                    <div className="widget-balance-stats">
                      <div className="widget-balance-stat-item">
                        <div className="widget-balance-stat-icon primary">
                          <i className="bi bi-graph-up-arrow" />
                        </div>
                        <div>
                          <div className="widget-balance-stat-label">Gross Revenue</div>
                          <div className="widget-balance-stat-value">$28,450</div>
                        </div>
                      </div>
                      <div className="widget-balance-stat-item">
                        <div className="widget-balance-stat-icon success">
                          <i className="bi bi-currency-dollar" />
                        </div>
                        <div>
                          <div className="widget-balance-stat-label">Net Profit</div>
                          <div className="widget-balance-stat-value">$12,680</div>
                        </div>
                      </div>
                      <div className="widget-balance-stat-item">
                        <div className="widget-balance-stat-icon info">
                          <i className="bi bi-people" />
                        </div>
                        <div>
                          <div className="widget-balance-stat-label">New Clients</div>
                          <div className="widget-balance-stat-value">1,284</div>
                        </div>
                      </div>
                      <div className="widget-balance-stat-item">
                        <div className="widget-balance-stat-icon warning">
                          <i className="bi bi-wallet2" />
                        </div>
                        <div>
                          <div className="widget-balance-stat-label">Operating Cost</div>
                          <div className="widget-balance-stat-value">$8,920</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Growth Rate */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Growth Rate</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-roi-header">
                    <div className="widget-roi-icon">
                      <i className="bi bi-graph-up" />
                    </div>
                    <div className="widget-roi-values">
                      <div className="widget-roi-percent">156%</div>
                      <div className="widget-roi-label">YTD Growth</div>
                    </div>
                    <div className="widget-roi-change">
                      <span className="positive">+18%</span>
                      <span className="text-muted">This Quarter</span>
                    </div>
                  </div>
                  <div className="widget-roi-chart">
                    <div className="widget-roi-bars">
                      <div className="widget-roi-bar-group">
                        <div className="widget-roi-bar" style={{height: '35%'}} />
                        <span>Q1</span>
                      </div>
                      <div className="widget-roi-bar-group">
                        <div className="widget-roi-bar" style={{height: '55%'}} />
                        <span>Q2</span>
                      </div>
                      <div className="widget-roi-bar-group">
                        <div className="widget-roi-bar highlight" style={{height: '75%'}} />
                        <span>Q3</span>
                      </div>
                      <div className="widget-roi-bar-group">
                        <div className="widget-roi-bar" style={{height: '65%'}} />
                        <span>Q4</span>
                      </div>
                      <div className="widget-roi-bar-group">
                        <div className="widget-roi-bar" style={{height: '85%'}} />
                        <span>Q1</span>
                      </div>
                      <div className="widget-roi-bar-group">
                        <div className="widget-roi-bar" style={{height: '50%'}} />
                        <span>Q2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Stat Cards with Charts */}
        <section className="section">
          <h5 className="section-title mb-3">Stat Cards with Mini Charts</h5>
          <div className="row g-4">
            {/* Subscribers */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-stat-chart">
                <div className="card-body">
                  <div className="widget-stat-chart-header">
                    <div className="widget-stat-chart-icon primary">
                      <i className="bi bi-envelope" />
                    </div>
                    <span className="widget-stat-chart-title">Email Subscribers</span>
                    <button className="btn btn-sm btn-light ms-auto"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                  <div className="widget-stat-chart-content">
                    <div className="widget-stat-chart-value">8,294</div>
                    <div className="widget-stat-chart-bars primary">
                      <span style={{height: '35%'}} />
                      <span style={{height: '55%'}} />
                      <span style={{height: '25%'}} />
                      <span style={{height: '75%'}} />
                      <span style={{height: '45%'}} />
                      <span style={{height: '65%'}} />
                      <span style={{height: '40%'}} />
                      <span style={{height: '85%'}} />
                    </div>
                  </div>
                  <div className="widget-stat-chart-footer positive">
                    +15% this week
                  </div>
                </div>
              </div>
            </div>
            {/* Gross Margin */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-stat-chart">
                <div className="card-body">
                  <div className="widget-stat-chart-header">
                    <div className="widget-stat-chart-icon success">
                      <i className="bi bi-percent" />
                    </div>
                    <span className="widget-stat-chart-title">Gross Margin</span>
                    <button className="btn btn-sm btn-light ms-auto"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                  <div className="widget-stat-chart-content">
                    <div className="widget-stat-chart-value">68.4%</div>
                    <div className="widget-stat-chart-line success">
                      <svg viewBox="0 0 100 40" preserveAspectRatio="none">
                        <path d="M0,35 Q10,30 20,32 T40,25 T60,28 T80,15 T100,20" fill="none" stroke="currentColor" strokeWidth={2} />
                      </svg>
                    </div>
                  </div>
                  <div className="widget-stat-chart-footer positive">
                    +5.2% vs target
                  </div>
                </div>
              </div>
            </div>
            {/* Budget Remaining */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-stat-chart">
                <div className="card-body">
                  <div className="widget-stat-chart-header">
                    <div className="widget-stat-chart-icon info">
                      <i className="bi bi-piggy-bank" />
                    </div>
                    <span className="widget-stat-chart-title">Budget Remaining</span>
                    <button className="btn btn-sm btn-light ms-auto"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                  <div className="widget-stat-chart-content">
                    <div className="widget-stat-chart-value">$18,450</div>
                    <div className="widget-stat-chart-donut info">
                      <svg viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-color)" strokeWidth={3} />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth={3} strokeDasharray="68, 100" />
                      </svg>
                    </div>
                  </div>
                  <div className="widget-stat-chart-footer positive">
                    32% of budget used
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Current Value Card */}
        <section className="section">
          <h5 className="section-title mb-3">Multi-Metric Cards</h5>
          <div className="row g-4">
            {/* Financial Summary */}
            <div className="col-12">
              <div className="card">
                <div className="card-body">
                  <div className="widget-value-header">
                    <h5 className="card-title mb-0">Financial Summary</h5>
                    <div className="widget-value-tabs">
                      <button className="active">Inflow</button>
                      <button>Outflow</button>
                    </div>
                  </div>
                  <div className="row g-4 mt-2">
                    {/* Invoiced */}
                    <div className="col-lg-4">
                      <div className="widget-value-item">
                        <div className="widget-value-chart-bars primary">
                          <span style={{height: '45%'}} />
                          <span style={{height: '65%'}} />
                          <span style={{height: '35%'}} />
                          <span style={{height: '80%'}} />
                          <span style={{height: '55%'}} />
                          <span style={{height: '70%'}} />
                        </div>
                        <div className="widget-value-info">
                          <span className="widget-value-label">Invoiced</span>
                          <div className="widget-value-amount">
                            <span className="value">$42,180</span>
                            <span className="change positive">+3.4%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Collected */}
                    <div className="col-lg-4">
                      <div className="widget-value-item">
                        <div className="widget-value-chart-bars info">
                          <span style={{height: '55%'}} />
                          <span style={{height: '40%'}} />
                          <span style={{height: '75%'}} />
                          <span style={{height: '50%'}} />
                          <span style={{height: '65%'}} />
                          <span style={{height: '45%'}} />
                        </div>
                        <div className="widget-value-info">
                          <span className="widget-value-label">Collected</span>
                          <div className="widget-value-amount">
                            <span className="value">$38,940</span>
                            <span className="change positive">+2.1%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Outstanding */}
                    <div className="col-lg-4">
                      <div className="widget-value-item highlight">
                        <div className="widget-value-chart-area">
                          <div className="widget-value-chart-tooltip">$156,890</div>
                          <svg viewBox="0 0 100 50" preserveAspectRatio="none">
                            <path d="M0,45 Q20,40 40,35 T80,25 T100,30" fill="none" stroke="var(--accent-color)" strokeWidth={2} />
                            <path d="M0,45 Q20,40 40,35 T80,25 T100,30 V50 H0 Z" fill="var(--accent-color)" opacity="0.1" />
                          </svg>
                        </div>
                        <div className="widget-value-info">
                          <span className="widget-value-label">Year to Date</span>
                          <div className="widget-value-amount">
                            <span className="value">$156,890</span>
                            <span className="change positive">+8.7%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Yearly Stats Row */}
        <section className="section">
          <h5 className="section-title mb-3">Yearly Stats Cards</h5>
          <div className="row g-4">
            {/* Annual Summary */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="widget-yearly-title">Annual Summary</h6>
                  <div className="widget-yearly-value">$284,760</div>
                  <div className="widget-yearly-change">
                    <span className="badge badge-soft-primary"><i className="bi bi-arrow-up" /></span>
                    <span className="positive">+14%</span>
                    <span className="text-muted">vs previous year</span>
                  </div>
                  <div className="widget-yearly-legend">
                    <span><i className="bi bi-circle-fill text-primary" /> 2024</span>
                    <span><i className="bi bi-circle-fill text-info" /> 2025</span>
                  </div>
                  <div className="widget-yearly-donut">
                    <svg viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--info-color)" strokeWidth={4} />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-color)" strokeWidth={4} strokeDasharray="65, 100" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Quarterly Performance */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="widget-sales-header">
                    <div>
                      <h6 className="widget-sales-title">Quarterly Performance</h6>
                      <span className="text-muted">By department</span>
                    </div>
                  </div>
                  <div className="widget-sales-chart">
                    <div className="widget-sales-bars">
                      <div className="widget-sales-bar-item">
                        <div className="bar" style={{height: '40%'}} />
                        <span>Sales</span>
                      </div>
                      <div className="widget-sales-bar-item">
                        <div className="bar" style={{height: '60%'}} />
                        <span>Mktg</span>
                      </div>
                      <div className="widget-sales-bar-item highlight">
                        <div className="bar" style={{height: '90%'}} />
                        <span>Dev</span>
                      </div>
                      <div className="widget-sales-bar-item">
                        <div className="bar" style={{height: '75%'}} />
                        <span>Ops</span>
                      </div>
                      <div className="widget-sales-bar-item">
                        <div className="bar" style={{height: '55%'}} />
                        <span>HR</span>
                      </div>
                      <div className="widget-sales-bar-item">
                        <div className="bar" style={{height: '65%'}} />
                        <span>Fin</span>
                      </div>
                      <div className="widget-sales-bar-item">
                        <div className="bar" style={{height: '45%'}} />
                        <span>Legal</span>
                      </div>
                    </div>
                  </div>
                  <div className="widget-sales-footer">
                    <div className="widget-sales-stat">
                      <i className="bi bi-grid-3x3" />
                      <span className="label">Budget</span>
                      <span className="value">$124,500</span>
                    </div>
                    <div className="widget-sales-stat">
                      <i className="bi bi-grid-3x3" />
                      <span className="label">Spent</span>
                      <span className="value">$98,240</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Regional Comparison */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="widget-revenue-header">
                    <div>
                      <h6 className="widget-revenue-title">Regional Comparison</h6>
                      <span className="text-muted">Revenue by region</span>
                    </div>
                  </div>
                  <div className="widget-revenue-legend">
                    <span><i className="bi bi-circle-fill text-primary" /> Americas</span>
                    <span><i className="bi bi-circle-fill text-info" /> Europe</span>
                  </div>
                  <div className="widget-revenue-chart">
                    <div className="widget-revenue-bars">
                      <div className="bar-group">
                        <div className="bar positive" style={{height: '55%'}} />
                        <div className="bar negative" style={{height: '35%'}} />
                        <span>Q1</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar positive" style={{height: '45%'}} />
                        <div className="bar negative" style={{height: '25%'}} />
                        <span>Q2</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar positive" style={{height: '65%'}} />
                        <div className="bar negative" style={{height: '40%'}} />
                        <span>Q3</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar positive" style={{height: '50%'}} />
                        <div className="bar negative" style={{height: '30%'}} />
                        <span>Q4</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar positive" style={{height: '60%'}} />
                        <div className="bar negative" style={{height: '45%'}} />
                        <span>Q1</span>
                      </div>
                      <div className="bar-group">
                        <div className="bar positive" style={{height: '40%'}} />
                        <div className="bar negative" style={{height: '20%'}} />
                        <span>Q2</span>
                      </div>
                    </div>
                    <div className="widget-revenue-axis">
                      <span>100k</span>
                      <span>50k</span>
                      <span>0</span>
                      <span>-50k</span>
                      <span>-100k</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Monthly Earnings & Analytics */}
        <section className="section">
          <h5 className="section-title mb-3">Earnings &amp; Analytics Cards</h5>
          <div className="row g-4">
            {/* Weekly Revenue */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-earnings">
                <div className="card-body">
                  <div className="widget-earnings-header">
                    <h6 className="widget-earnings-title">Weekly Revenue</h6>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" defaultChecked />
                    </div>
                  </div>
                  <div className="widget-earnings-value">
                    $12,480
                    <span className="badge badge-soft-primary ms-2"><i className="bi bi-arrow-up" /> +6%</span>
                  </div>
                  <div className="widget-earnings-chart">
                    <svg viewBox="0 0 150 50" preserveAspectRatio="none">
                      <path d="M0,40 Q30,35 50,38 T100,30 T150,35" fill="none" stroke="var(--accent-color)" strokeWidth={2} />
                      <path d="M0,40 Q30,35 50,38 T100,30 T150,35 V50 H0 Z" fill="var(--accent-color)" opacity="0.15" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* Traffic Sources */}
            <div className="col-lg-5 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <div className="widget-visited-header">
                    <h6 className="widget-visited-title">Traffic Sources</h6>
                    <select className="form-select form-select-sm" style={{width: 'auto'}}>
                      <option>This Month</option>
                      <option>Last Month</option>
                      <option>This Quarter</option>
                    </select>
                  </div>
                  <div className="widget-visited-chart">
                    <div className="widget-visited-bars">
                      <div className="bar-item highlight">
                        <div className="bar" style={{height: '85%'}} />
                        <span>Direct</span>
                      </div>
                      <div className="bar-item">
                        <div className="bar" style={{height: '65%'}} />
                        <span>Social</span>
                      </div>
                      <div className="bar-item">
                        <div className="bar" style={{height: '75%'}} />
                        <span>Search</span>
                      </div>
                      <div className="bar-item">
                        <div className="bar" style={{height: '55%'}} />
                        <span>Email</span>
                      </div>
                      <div className="bar-item">
                        <div className="bar" style={{height: '45%'}} />
                        <span>Ads</span>
                      </div>
                      <div className="bar-item">
                        <div className="bar" style={{height: '35%'}} />
                        <span>Other</span>
                      </div>
                    </div>
                    <div className="widget-visited-axis">
                      <span>10k</span>
                      <span>7.5k</span>
                      <span>5k</span>
                      <span>2.5k</span>
                    </div>
                  </div>
                  <div className="widget-visited-legend">
                    <span><i className="bi bi-circle-fill text-primary" /> Organic</span>
                    <span><i className="bi bi-circle-fill text-muted" /> Paid</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Conversion Funnel */}
            <div className="col-lg-4 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="widget-impressions-title">Conversion Funnel</h6>
                  <div className="widget-impressions-value">$892,450</div>
                  <div className="widget-impressions-meta">
                    <span className="text-muted">(vs last period)</span>
                    <span className="badge badge-soft-success"><i className="bi bi-arrow-up" /> +12%</span>
                  </div>
                  <div className="widget-impressions-chart">
                    <svg viewBox="0 0 100 60" preserveAspectRatio="none">
                      <path d="M0,50 Q15,45 25,48 T50,40 T75,45 T100,35" fill="none" stroke="var(--accent-color)" strokeWidth={2} />
                      <path d="M0,50 Q15,45 25,48 T50,40 T75,45 T100,35 V60 H0 Z" fill="var(--accent-color)" opacity="0.1" />
                    </svg>
                  </div>
                  <div className="widget-impressions-stats">
                    <div className="widget-impressions-stat">
                      <span className="label">Visitors</span>
                      <span className="value">48,290</span>
                      <span className="badge badge-soft-success"><i className="bi bi-arrow-up" /> +8%</span>
                    </div>
                    <div className="widget-impressions-stat">
                      <span className="label">Leads</span>
                      <span className="value">6,842</span>
                      <span className="badge badge-soft-primary"><i className="bi bi-arrow-up" /> +5%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Delivery Analytics & Marketing */}
        <section className="section">
          <h5 className="section-title mb-3">Analytics Cards with Radar &amp; Donut</h5>
          <div className="row g-4">
            {/* Campaign Performance */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-body">
                  <div className="widget-delivery-header">
                    <h5 className="card-title">Campaign Performance</h5>
                    <div className="widget-delivery-tabs">
                      <button className="active">Active</button>
                      <button>Completed</button>
                    </div>
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                  <div className="widget-delivery-content">
                    <div className="widget-delivery-chart">
                      <svg viewBox="0 0 200 200" className="widget-radar-chart">
                        <polygon points="100,20 180,80 150,180 50,180 20,80" fill="none" stroke="var(--border-color)" strokeWidth={1} />
                        <polygon points="100,50 150,90 130,150 70,150 50,90" fill="none" stroke="var(--border-color)" strokeWidth={1} />
                        <polygon points="100,80 120,100 110,130 90,130 80,100" fill="none" stroke="var(--border-color)" strokeWidth={1} />
                        <polygon points="100,40 160,85 140,165 60,165 40,85" fill="var(--accent-color)" fillOpacity="0.2" stroke="var(--accent-color)" strokeWidth={2} />
                        <text x={100} y={15} textAnchor="middle" fontSize={10} fill="var(--muted-color)">Reach</text>
                        <text x={190} y={80} textAnchor="start" fontSize={10} fill="var(--muted-color)">Engage</text>
                        <text x={155} y={190} textAnchor="middle" fontSize={10} fill="var(--muted-color)">Convert</text>
                        <text x={45} y={190} textAnchor="middle" fontSize={10} fill="var(--muted-color)">Retain</text>
                        <text x={10} y={80} textAnchor="end" fontSize={10} fill="var(--muted-color)">Refer</text>
                      </svg>
                    </div>
                    <div className="widget-delivery-info">
                      <div className="widget-delivery-message">
                        <i className="bi bi-megaphone" />
                        <div>
                          <strong>Summer Campaign</strong>
                          <span>Exceeding targets!</span>
                        </div>
                      </div>
                      <div className="widget-delivery-stats">
                        <div className="widget-delivery-stat">
                          <span className="dot primary" />
                          <span className="value">34.8%</span>
                          <span className="label">Engagement Rate</span>
                        </div>
                        <div className="widget-delivery-stat">
                          <span className="dot info" />
                          <span className="value">18.5%</span>
                          <span className="label">Click Rate</span>
                        </div>
                        <div className="widget-delivery-stat">
                          <span className="dot danger" />
                          <span className="value">8.2%</span>
                          <span className="label">Conversion Rate</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Performance Metrics */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Performance Metrics</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-marketing-content">
                    <div className="widget-marketing-stats">
                      <div className="widget-marketing-stat">
                        <div className="widget-marketing-icon primary">
                          <i className="bi bi-eye" />
                        </div>
                        <div>
                          <span className="label">Page Views</span>
                          <span className="value">+4.2k</span>
                        </div>
                      </div>
                      <div className="widget-marketing-stat">
                        <div className="widget-marketing-icon warning">
                          <i className="bi bi-clock-history" />
                        </div>
                        <div>
                          <span className="label">Avg. Session</span>
                          <span className="value">3:42</span>
                        </div>
                      </div>
                      <div className="widget-marketing-stat">
                        <div className="widget-marketing-icon info">
                          <i className="bi bi-hand-index" />
                        </div>
                        <div>
                          <span className="label">Interactions</span>
                          <span className="value">1.8k</span>
                        </div>
                      </div>
                      <div className="widget-marketing-stat">
                        <div className="widget-marketing-icon success">
                          <i className="bi bi-trophy" />
                        </div>
                        <div>
                          <span className="label">Goals Met</span>
                          <span className="value">89%</span>
                        </div>
                      </div>
                    </div>
                    <div className="widget-marketing-chart">
                      <div className="widget-gauge">
                        <svg viewBox="0 0 100 60">
                          <path d="M10,55 A40,40 0 0,1 90,55" fill="none" stroke="var(--border-color)" strokeWidth={8} strokeLinecap="round" />
                          <path d="M10,55 A40,40 0 0,1 50,15" fill="none" stroke="var(--accent-color)" strokeWidth={8} strokeLinecap="round" />
                          <path d="M50,15 A40,40 0 0,1 70,20" fill="none" stroke="var(--warning-color)" strokeWidth={8} strokeLinecap="round" />
                          <path d="M70,20 A40,40 0 0,1 80,30" fill="none" stroke="var(--success-color)" strokeWidth={8} strokeLinecap="round" />
                        </svg>
                        <div className="widget-gauge-value">342</div>
                        <div className="widget-gauge-label">Overall health score for your digital presence.</div>
                      </div>
                    </div>
                  </div>
                  <div className="widget-marketing-footer">
                    <div className="widget-marketing-tip">
                      <i className="bi bi-lightbulb" />
                      <span>View detailed analytics to optimize performance.</span>
                    </div>
                    <button className="btn btn-primary btn-sm rounded-circle">
                      <i className="bi bi-arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom Stats Row */}
        <section className="section">
          <h5 className="section-title mb-3">Bottom Stats Cards</h5>
          <div className="row g-4">
            {/* New Orders */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="widget-bottom-header">
                    <div>
                      <h6 className="widget-bottom-title">New Orders</h6>
                      <span className="text-muted">Past 14 days</span>
                    </div>
                    <div className="widget-bottom-values">
                      <span className="value">1,847</span>
                      <span className="change positive">+18.4%</span>
                    </div>
                  </div>
                  <div className="widget-bottom-chart primary">
                    <svg viewBox="0 0 150 50" preserveAspectRatio="none">
                      <path d="M0,40 Q25,35 50,38 T100,30 T150,25" fill="none" stroke="currentColor" strokeWidth={2} />
                      <path d="M0,40 Q25,35 50,38 T100,30 T150,25 V50 H0 Z" fill="currentColor" opacity="0.1" />
                    </svg>
                  </div>
                  <div className="widget-bottom-legend">
                    <div className="widget-bottom-legend-item">
                      <span className="dot primary" />
                      <span>This Period</span>
                      <span className="value">1,847</span>
                    </div>
                    <div className="widget-bottom-legend-item">
                      <span className="dot muted" />
                      <span>Previous</span>
                      <span className="value">1,562</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Transactions */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="widget-bottom-header">
                    <div>
                      <h6 className="widget-bottom-title">Transactions</h6>
                      <span className="text-muted">Daily breakdown</span>
                    </div>
                    <div className="widget-bottom-values">
                      <span className="value">$28,450</span>
                      <span className="change negative">-2.1%</span>
                    </div>
                  </div>
                  <div className="widget-bottom-bars">
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '65%'}} />
                      <span>M</span>
                    </div>
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '45%'}} />
                      <span>T</span>
                    </div>
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '80%'}} />
                      <span>W</span>
                    </div>
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '55%'}} />
                      <span>T</span>
                    </div>
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '85%'}} />
                      <span>F</span>
                    </div>
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '70%'}} />
                      <span>S</span>
                    </div>
                    <div className="bar-day">
                      <div className="bar-fill" style={{height: '40%'}} />
                      <span>S</span>
                    </div>
                  </div>
                  <div className="widget-bottom-legend">
                    <div className="widget-bottom-legend-item">
                      <span className="dot primary" />
                      <span>Online</span>
                      <span className="value">64%</span>
                    </div>
                    <div className="widget-bottom-legend-item">
                      <span className="dot muted" />
                      <span>In-Store</span>
                      <span className="value">36%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Inventory */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="widget-bottom-header">
                    <div>
                      <h6 className="widget-bottom-title">Inventory</h6>
                      <span className="text-muted">Stock levels</span>
                    </div>
                    <div className="widget-bottom-values">
                      <span className="value">4,582</span>
                      <span className="change positive">+9.2%</span>
                    </div>
                  </div>
                  <div className="widget-bottom-donut">
                    <svg viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--border-color)" strokeWidth={3} />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--info-color)" strokeWidth={3} strokeDasharray="78, 100" />
                    </svg>
                  </div>
                  <div className="widget-bottom-footer">
                    <span className="text-muted">78% capacity utilized</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sales Profit & Product Sales */}
        <section className="section">
          <h5 className="section-title mb-3">Sales &amp; Product Charts</h5>
          <div className="row g-4">
            {/* Revenue Trend */}
            <div className="col-lg-8">
              <div className="card">
                <div className="card-body">
                  <div className="widget-profit-header">
                    <h5 className="card-title">Revenue Trend</h5>
                    <div className="widget-profit-tabs">
                      <button className="active">Revenue</button>
                      <button>Expenses</button>
                    </div>
                  </div>
                  <div className="widget-profit-chart">
                    <svg viewBox="0 0 400 150" preserveAspectRatio="none">
                      <path d="M0,120 Q50,100 100,110 T200,80 T300,90 T400,60" fill="none" stroke="var(--accent-color)" strokeWidth={2} />
                      <path d="M0,120 Q50,100 100,110 T200,80 T300,90 T400,60 V150 H0 Z" fill="var(--accent-color)" opacity="0.1" />
                    </svg>
                    <div className="widget-profit-labels">
                      <span>May</span>
                      <span>Jun</span>
                      <span>Jul</span>
                      <span>Aug</span>
                      <span>Sep</span>
                      <span>Oct</span>
                      <span>Nov</span>
                      <span>Dec</span>
                      <span>Jan</span>
                    </div>
                    <div className="widget-profit-axis">
                      <span>$100k</span>
                      <span>$75k</span>
                      <span>$50k</span>
                      <span>$25k</span>
                    </div>
                  </div>
                  <div className="widget-profit-footer">
                    <div className="widget-profit-stat">
                      <div className="widget-profit-stat-icon primary">
                        <i className="bi bi-graph-up" />
                      </div>
                      <div>
                        <span className="value">$248,920</span>
                        <span className="badge badge-soft-primary">+12%</span>
                      </div>
                      <span className="label">Total Revenue</span>
                    </div>
                    <div className="widget-profit-stat">
                      <div className="widget-profit-stat-icon warning">
                        <i className="bi bi-cash-stack" />
                      </div>
                      <div>
                        <span className="value">$72,480</span>
                      </div>
                      <span className="label">Net Income</span>
                    </div>
                    <button className="btn btn-primary">View Report</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Category Distribution */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Category Distribution</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-product-donut">
                    <svg viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--danger-color)" strokeWidth={4} />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--warning-color)" strokeWidth={4} strokeDasharray="72, 100" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--success-color)" strokeWidth={4} strokeDasharray="50, 100" />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-color)" strokeWidth={4} strokeDasharray="32, 100" />
                    </svg>
                    <div className="widget-product-donut-center">
                      <span className="value">12,847</span>
                      <span className="badge badge-soft-success"><i className="bi bi-graph-up" /> Top Seller</span>
                    </div>
                  </div>
                  <div className="widget-product-legend">
                    <div className="widget-product-legend-row">
                      <span><i className="bi bi-circle-fill text-primary" /> 32% Electronics</span>
                      <span><i className="bi bi-circle-fill text-success" /> 18% Apparel</span>
                    </div>
                    <div className="widget-product-legend-row">
                      <span><i className="bi bi-circle-fill text-warning" /> 22% Home</span>
                      <span><i className="bi bi-circle-fill text-danger" /> 28% Other</span>
                    </div>
                  </div>
                  <p className="widget-product-note text-muted text-center">
                    Distribution of sales across main product categories this quarter
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sales Overview & Annual Profit */}
        <section className="section">
          <h5 className="section-title mb-3">Overview &amp; Conversion Cards</h5>
          <div className="row g-4">
            {/* Monthly Breakdown */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-body">
                  <div className="widget-overview-header">
                    <h6 className="widget-overview-title">Monthly Breakdown</h6>
                    <span className="text-muted">Revenue split</span>
                  </div>
                  <div className="widget-overview-donut">
                    <svg viewBox="0 0 36 36">
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--info-color)" strokeWidth={4} />
                      <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-color)" strokeWidth={4} strokeDasharray="58, 100" />
                    </svg>
                    <div className="widget-overview-donut-value">$384,720</div>
                  </div>
                  <div className="widget-overview-stats">
                    <div className="widget-overview-stat">
                      <i className="bi bi-arrow-up-circle" />
                      <span className="value">$224,180</span>
                      <span className="label">Gross</span>
                    </div>
                    <div className="widget-overview-stat">
                      <i className="bi bi-arrow-down-circle" />
                      <span className="value">$160,540</span>
                      <span className="label">Net</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Channel Performance */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Channel Performance</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-marketing-mini">
                    <div className="widget-marketing-mini-stats">
                      <div className="widget-marketing-mini-stat">
                        <div className="icon primary"><i className="bi bi-shop" /></div>
                        <div>
                          <span className="label">Website</span>
                          <span className="value">+5.8k</span>
                        </div>
                      </div>
                      <div className="widget-marketing-mini-stat">
                        <div className="icon warning"><i className="bi bi-phone" /></div>
                        <div>
                          <span className="label">Mobile App</span>
                          <span className="value">2.4k</span>
                        </div>
                      </div>
                      <div className="widget-marketing-mini-stat">
                        <div className="icon success"><i className="bi bi-building" /></div>
                        <div>
                          <span className="label">Retail</span>
                          <span className="value">1.9k</span>
                        </div>
                      </div>
                    </div>
                    <div className="widget-marketing-mini-chart">
                      <svg viewBox="0 0 36 36">
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--success-color)" strokeWidth={4} />
                        <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="var(--accent-color)" strokeWidth={4} strokeDasharray="68, 100" />
                      </svg>
                      <span className="value">10.1k</span>
                    </div>
                  </div>
                  <div className="widget-marketing-mini-footer">
                    <span>See channel breakdown details</span>
                    <button className="btn btn-primary btn-sm rounded-circle">
                      <i className="bi bi-arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Conversion Analysis */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Conversion Analysis</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-annual-chart">
                    <div className="widget-annual-rate">
                      <span className="label">Success Rate</span>
                      <span className="value">24.6%</span>
                    </div>
                    <svg viewBox="0 0 150 50" preserveAspectRatio="none">
                      <path d="M0,40 Q30,35 50,38 T100,30 T150,25" fill="none" stroke="var(--accent-color)" strokeWidth={2} />
                      <path d="M0,40 Q30,35 50,38 T100,30 T150,25 V50 H0 Z" fill="var(--accent-color)" opacity="0.1" />
                    </svg>
                  </div>
                  <div className="widget-annual-stats">
                    <div className="widget-annual-stat">
                      <span className="label">Cart Additions</span>
                      <span className="sublabel">8 interactions</span>
                      <div className="widget-annual-stat-value">
                        <span className="value">$34,890</span>
                        <span className="change positive">+9.8%</span>
                      </div>
                    </div>
                    <div className="widget-annual-stat">
                      <span className="label">Completed Orders</span>
                      <span className="sublabel">15 interactions</span>
                      <div className="widget-annual-stat-value">
                        <span className="value">$28,420</span>
                        <span className="change negative">-4.2%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <a href="#" onClick={(event) => event.preventDefault()}>Docs</a>
            <a href="#" onClick={(event) => event.preventDefault()}>Privacy</a>
            <a href="#" onClick={(event) => event.preventDefault()}>Security</a>
            <a href="#" onClick={(event) => event.preventDefault()}>Support</a>
          </div>
          <div className="footer-credits">
            <div className="footer-copyright">
              © 2026 <a href="#" onClick={(event) => event.preventDefault()}>FlexAdmin</a>
            </div>
            <div className="footer-copyright">
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default WidgetsChartsPage
