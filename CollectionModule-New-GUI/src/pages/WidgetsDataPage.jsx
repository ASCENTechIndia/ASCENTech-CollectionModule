function WidgetsDataPage() {
  return (
    <div>
      <div className="main-content page-widgets-data">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Data Widgets</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Widgets</a>
            <span className="breadcrumb-item active">Data</span>
          </nav>
        </div>
        {/* Stat Cards with Progress */}
        <section className="section">
          <h5 className="section-title mb-3">Stat Cards with Progress</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-stat-progress">
                <div className="card-body">
                  <div className="widget-stat-icon warning">
                    <i className="bi bi-graph-up-arrow" />
                  </div>
                  <div className="widget-stat-content">
                    <span className="widget-stat-value">+384</span>
                    <span className="widget-stat-label">Revenue Growth</span>
                  </div>
                  <div className="widget-stat-bar warning" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-stat-progress">
                <div className="card-body">
                  <div className="widget-stat-icon primary">
                    <i className="bi bi-wallet2" />
                  </div>
                  <div className="widget-stat-content">
                    <span className="widget-stat-value">$925</span>
                    <span className="widget-stat-label">Weekly Earnings</span>
                  </div>
                  <div className="widget-stat-bar primary" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-stat-progress">
                <div className="card-body">
                  <div className="widget-stat-icon danger">
                    <i className="bi bi-people" />
                  </div>
                  <div className="widget-stat-content">
                    <span className="widget-stat-value">+8.2K</span>
                    <span className="widget-stat-label">New Subscribers</span>
                  </div>
                  <div className="widget-stat-bar danger" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-stat-progress">
                <div className="card-body">
                  <div className="widget-stat-icon info">
                    <i className="bi bi-bell" />
                  </div>
                  <div className="widget-stat-content">
                    <span className="widget-stat-value">214</span>
                    <span className="widget-stat-label">Active Alerts</span>
                  </div>
                  <div className="widget-stat-bar info" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-stat-progress">
                <div className="card-body">
                  <div className="widget-stat-icon success">
                    <i className="bi bi-chat-dots" />
                  </div>
                  <div className="widget-stat-content">
                    <span className="widget-stat-value">23+</span>
                    <span className="widget-stat-label">Unread Messages</span>
                  </div>
                  <div className="widget-stat-bar success" />
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-stat-progress">
                <div className="card-body">
                  <div className="widget-stat-icon secondary">
                    <i className="bi bi-download" />
                  </div>
                  <div className="widget-stat-content">
                    <span className="widget-stat-value">2,340</span>
                    <span className="widget-stat-label">Pending Downloads</span>
                  </div>
                  <div className="widget-stat-bar secondary" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Icon Stat Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Icon Stat Cards</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-stat">
                <div className="card-body">
                  <div className="widget-icon-stat-icon success">
                    <i className="bi bi-file-text" />
                  </div>
                  <div className="widget-icon-stat-content">
                    <span className="widget-icon-stat-value">156</span>
                    <span className="widget-icon-stat-label">Reports</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-stat">
                <div className="card-body">
                  <div className="widget-icon-stat-icon primary">
                    <i className="bi bi-receipt" />
                  </div>
                  <div className="widget-icon-stat-content">
                    <span className="widget-icon-stat-value">189</span>
                    <span className="widget-icon-stat-label">Invoices</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-stat">
                <div className="card-body">
                  <div className="widget-icon-stat-icon warning">
                    <i className="bi bi-currency-dollar" />
                  </div>
                  <div className="widget-icon-stat-content">
                    <span className="widget-icon-stat-value">$580</span>
                    <span className="widget-icon-stat-label">Revenue</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-stat">
                <div className="card-body">
                  <div className="widget-icon-stat-icon danger">
                    <i className="bi bi-bag-check" />
                  </div>
                  <div className="widget-icon-stat-content">
                    <span className="widget-icon-stat-value">142</span>
                    <span className="widget-icon-stat-label">Orders</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Icon Left Stat Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Icon Left Stat Cards</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon primary">
                    <i className="bi bi-person-lines-fill" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">348</span>
                    <span className="widget-icon-left-label">Customers</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon info">
                    <i className="bi bi-envelope" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">156</span>
                    <span className="widget-icon-left-label">Messages</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon warning">
                    <i className="bi bi-bell" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">742</span>
                    <span className="widget-icon-left-label">Notifications</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon success">
                    <i className="bi bi-folder" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">315</span>
                    <span className="widget-icon-left-label">Projects</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon danger">
                    <i className="bi bi-geo-alt" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">156</span>
                    <span className="widget-icon-left-label">Locations</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon secondary">
                    <i className="bi bi-bar-chart" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">267</span>
                    <span className="widget-icon-left-label">Activity Pages</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon info">
                    <i className="bi bi-graph-up" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">178</span>
                    <span className="widget-icon-left-label">Sales</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon warning">
                    <i className="bi bi-rss" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">198</span>
                    <span className="widget-icon-left-label">Feeds</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon primary">
                    <i className="bi bi-router" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">420</span>
                    <span className="widget-icon-left-label">Devices</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon success">
                    <i className="bi bi-cash-stack" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">156</span>
                    <span className="widget-icon-left-label">Net Income</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon info">
                    <i className="bi bi-speedometer2" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">528</span>
                    <span className="widget-icon-left-label">Performance</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-icon-left-stat">
                <div className="card-body">
                  <div className="widget-icon-left-icon danger">
                    <i className="bi bi-clipboard-data" />
                  </div>
                  <div className="widget-icon-left-content">
                    <span className="widget-icon-left-value">189</span>
                    <span className="widget-icon-left-label">Monthly Sales</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Weather Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Weather Cards</h5>
          <div className="row g-4">
            {/* Weather Card with Image */}
            <div className="col-lg-4">
              <div className="card widget-weather-image-card">
                <div className="widget-weather-image-bg" style={{background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
                  <div className="widget-weather-image-content">
                    <div className="widget-weather-location">Portland, Oregon</div>
                    <div className="widget-weather-temp-large">
                      <i className="bi bi-cloud-sun" />
                      <span>18°<small>C / 9°C</small></span>
                    </div>
                    <div className="widget-weather-day">Saturday</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Weather Card Simple */}
            <div className="col-lg-4">
              <div className="card widget-weather-simple">
                <div className="card-body">
                  <div className="widget-weather-simple-header">
                    <div>
                      <h3 className="widget-weather-simple-temp">24° C</h3>
                      <p className="widget-weather-simple-location">Seattle, Washington</p>
                    </div>
                    <div className="widget-weather-simple-icon">
                      <i className="bi bi-cloud-drizzle" />
                    </div>
                  </div>
                  <div className="widget-weather-simple-date">18.01.2026</div>
                </div>
              </div>
            </div>
            {/* Weather Card Compact */}
            <div className="col-lg-4">
              <div className="row g-4">
                <div className="col-6">
                  <div className="card widget-weather-compact">
                    <div className="card-body">
                      <div className="widget-weather-compact-icon">
                        <i className="bi bi-cloud-haze" />
                      </div>
                      <div className="widget-weather-compact-temp">16°<small>C / 8°C</small></div>
                      <div className="widget-weather-compact-date">18 Jan 2026</div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="card widget-weather-compact">
                    <div className="card-body">
                      <div className="widget-weather-compact-info">
                        <span><i className="bi bi-wind" /> 18kmph</span>
                        <span>48%</span>
                      </div>
                      <div className="widget-weather-compact-temp">5°<small>C / 2°C</small> <i className="bi bi-cloud" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Weather Week Forecast */}
          <div className="row g-4 mt-2">
            <div className="col-12">
              <div className="card">
                <div className="card-body p-0">
                  <div className="widget-weather-week">
                    <div className="widget-weather-week-item">
                      <span className="day">MON</span>
                      <i className="bi bi-cloud" />
                      <span className="temp">22° C</span>
                    </div>
                    <div className="widget-weather-week-item">
                      <span className="day">TUE</span>
                      <i className="bi bi-cloud-sun" />
                      <span className="temp">19° C</span>
                    </div>
                    <div className="widget-weather-week-item active">
                      <span className="day">WED</span>
                      <i className="bi bi-sun" />
                      <span className="temp">24° C</span>
                    </div>
                    <div className="widget-weather-week-item">
                      <span className="day">THU</span>
                      <i className="bi bi-cloud" />
                      <span className="temp">18° C</span>
                    </div>
                    <div className="widget-weather-week-item">
                      <span className="day">FRI</span>
                      <i className="bi bi-cloud-rain" />
                      <span className="temp">16° C</span>
                    </div>
                    <div className="widget-weather-week-item">
                      <span className="day">SAT</span>
                      <i className="bi bi-cloud-drizzle" />
                      <span className="temp">14° C</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Crypto Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Crypto Cards</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-crypto-card ethereum">
                <div className="card-body">
                  <div className="widget-crypto-icon">
                    <i className="bi bi-currency-exchange" />
                  </div>
                  <div className="widget-crypto-info">
                    <span className="widget-crypto-name">Ethereum</span>
                    <span className="widget-crypto-value">$4,280.50k</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-crypto-card dash">
                <div className="card-body">
                  <div className="widget-crypto-icon">
                    <i className="bi bi-diamond" />
                  </div>
                  <div className="widget-crypto-info">
                    <span className="widget-crypto-name">Dash</span>
                    <span className="widget-crypto-value">$1,120.00k</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-crypto-card bitcoin">
                <div className="card-body">
                  <div className="widget-crypto-icon">
                    <i className="bi bi-currency-bitcoin" />
                  </div>
                  <div className="widget-crypto-info">
                    <span className="widget-crypto-name">Bitcoin</span>
                    <span className="widget-crypto-value">$312.75k</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-crypto-card ripple">
                <div className="card-body">
                  <div className="widget-crypto-icon">
                    <i className="bi bi-droplet" />
                  </div>
                  <div className="widget-crypto-info">
                    <span className="widget-crypto-name">Ripple</span>
                    <span className="widget-crypto-value">$780.40k</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Crypto Stats Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Crypto Stats Cards</h5>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card widget-crypto-stats primary">
                <div className="card-body">
                  <div className="widget-crypto-stats-header">
                    <div className="widget-crypto-stats-icon">
                      <i className="bi bi-currency-bitcoin" />
                    </div>
                    <div className="widget-crypto-stats-info">
                      <span className="widget-crypto-stats-name">Bitcoin</span>
                      <span className="widget-crypto-stats-category">Real Estate</span>
                    </div>
                  </div>
                  <div className="widget-crypto-stats-grid">
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 1h</span>
                      <span className="value up">↑ 0.12</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 24h</span>
                      <span className="value down">↓ 1.28</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 7d</span>
                      <span className="value up">↑ 18.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-crypto-stats success">
                <div className="card-body">
                  <div className="widget-crypto-stats-header">
                    <div className="widget-crypto-stats-icon">
                      <i className="bi bi-currency-euro" />
                    </div>
                    <div className="widget-crypto-stats-info">
                      <span className="widget-crypto-stats-name">EOS</span>
                      <span className="widget-crypto-stats-category">Banking</span>
                    </div>
                  </div>
                  <div className="widget-crypto-stats-grid">
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 1h</span>
                      <span className="value up">↑ 0.22</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 24h</span>
                      <span className="value down">↓ 4.85</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 7d</span>
                      <span className="value up">↑ 0.15</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-crypto-stats danger">
                <div className="card-body">
                  <div className="widget-crypto-stats-header">
                    <div className="widget-crypto-stats-icon">
                      <i className="bi bi-currency-exchange" />
                    </div>
                    <div className="widget-crypto-stats-info">
                      <span className="widget-crypto-stats-name">Ethereum</span>
                      <span className="widget-crypto-stats-category">Exchange</span>
                    </div>
                  </div>
                  <div className="widget-crypto-stats-grid">
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 1h</span>
                      <span className="value up">↑ 1.24</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 24h</span>
                      <span className="value down">↓ 4.92</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 7d</span>
                      <span className="value up">↑ 18.75</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-crypto-stats info">
                <div className="card-body">
                  <div className="widget-crypto-stats-header">
                    <div className="widget-crypto-stats-icon">
                      <i className="bi bi-bank" />
                    </div>
                    <div className="widget-crypto-stats-info">
                      <span className="widget-crypto-stats-name">Bitmark</span>
                      <span className="widget-crypto-stats-category">Advertising</span>
                    </div>
                  </div>
                  <div className="widget-crypto-stats-grid">
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 1h</span>
                      <span className="value up">↑ 0.24</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 24h</span>
                      <span className="value down">↓ 2.18</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 7d</span>
                      <span className="value up">↑ 1.25</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-crypto-stats warning">
                <div className="card-body">
                  <div className="widget-crypto-stats-header">
                    <div className="widget-crypto-stats-icon">
                      <i className="bi bi-diamond" />
                    </div>
                    <div className="widget-crypto-stats-info">
                      <span className="widget-crypto-stats-name">Dash</span>
                      <span className="widget-crypto-stats-category">Trading</span>
                    </div>
                  </div>
                  <div className="widget-crypto-stats-grid">
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 1h</span>
                      <span className="value up">↑ 1.24</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 24h</span>
                      <span className="value down">↓ 1.18</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 7d</span>
                      <span className="value up">↑ 0.28</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-crypto-stats secondary">
                <div className="card-body">
                  <div className="widget-crypto-stats-header">
                    <div className="widget-crypto-stats-icon">
                      <i className="bi bi-gem" />
                    </div>
                    <div className="widget-crypto-stats-info">
                      <span className="widget-crypto-stats-name">GetGems</span>
                      <span className="widget-crypto-stats-category">Exchange</span>
                    </div>
                  </div>
                  <div className="widget-crypto-stats-grid">
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 1h</span>
                      <span className="value up">↑ 1.24</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 24h</span>
                      <span className="value down">↓ 1.18</span>
                    </div>
                    <div className="widget-crypto-stat-item">
                      <span className="label">% 7d</span>
                      <span className="value up">↑ 1.18</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Simple Stat Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Simple Stat Cards</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-simple-stat">
                <div className="card-body">
                  <div className="widget-simple-stat-icon success">
                    <i className="bi bi-cash-coin" />
                  </div>
                  <div className="widget-simple-stat-content">
                    <span className="widget-simple-stat-label">Total Income</span>
                    <span className="widget-simple-stat-sublabel">Income</span>
                  </div>
                  <span className="widget-simple-stat-value">$3,480</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-simple-stat">
                <div className="card-body">
                  <div className="widget-simple-stat-icon primary">
                    <i className="bi bi-box-seam" />
                  </div>
                  <div className="widget-simple-stat-content">
                    <span className="widget-simple-stat-label">Total Products</span>
                    <span className="widget-simple-stat-sublabel">Users</span>
                  </div>
                  <span className="widget-simple-stat-value">$3,120</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-simple-stat">
                <div className="card-body">
                  <div className="widget-simple-stat-icon danger">
                    <i className="bi bi-people" />
                  </div>
                  <div className="widget-simple-stat-content">
                    <span className="widget-simple-stat-label">Total Members</span>
                    <span className="widget-simple-stat-sublabel">My birthday</span>
                  </div>
                  <span className="widget-simple-stat-value">18 March</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-simple-stat">
                <div className="card-body">
                  <div className="widget-simple-stat-icon warning">
                    <i className="bi bi-list-task" />
                  </div>
                  <div className="widget-simple-stat-content">
                    <span className="widget-simple-stat-label">Total Tasks</span>
                    <span className="widget-simple-stat-sublabel">pending</span>
                  </div>
                  <span className="widget-simple-stat-value">7,840</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Colored Stat Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Colored Stat Cards</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-colored-stat success">
                <div className="card-body">
                  <div className="widget-colored-stat-icon">
                    <i className="bi bi-cash-coin" />
                  </div>
                  <div className="widget-colored-stat-content">
                    <span className="widget-colored-stat-label">Total Income</span>
                    <span className="widget-colored-stat-sublabel">Income</span>
                  </div>
                  <span className="widget-colored-stat-value">$3,480</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-colored-stat primary">
                <div className="card-body">
                  <div className="widget-colored-stat-icon">
                    <i className="bi bi-box-seam" />
                  </div>
                  <div className="widget-colored-stat-content">
                    <span className="widget-colored-stat-label">Total Products</span>
                    <span className="widget-colored-stat-sublabel">Users</span>
                  </div>
                  <span className="widget-colored-stat-value">$3,120</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-colored-stat info">
                <div className="card-body">
                  <div className="widget-colored-stat-icon">
                    <i className="bi bi-people" />
                  </div>
                  <div className="widget-colored-stat-content">
                    <span className="widget-colored-stat-label">Total Members</span>
                    <span className="widget-colored-stat-sublabel">My birthday</span>
                  </div>
                  <span className="widget-colored-stat-value">18 March</span>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-colored-stat danger">
                <div className="card-body">
                  <div className="widget-colored-stat-icon">
                    <i className="bi bi-list-task" />
                  </div>
                  <div className="widget-colored-stat-content">
                    <span className="widget-colored-stat-label">Total Tasks</span>
                    <span className="widget-colored-stat-sublabel">pending</span>
                  </div>
                  <span className="widget-colored-stat-value">7,840</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Product Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Product Cards</h5>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card widget-product-item">
                <div className="card-body">
                  <div className="widget-product-item-image">
                    <img src="/assets/img/products/product-5.webp" alt="Product" />
                  </div>
                  <div className="widget-product-item-content">
                    <h6 className="widget-product-item-title">35% off on Premium Watch</h6>
                    <p className="widget-product-item-author">By Marcus Chen</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-product-item">
                <div className="card-body">
                  <div className="widget-product-item-image">
                    <img src="/assets/img/products/product-6.webp" alt="Product" />
                  </div>
                  <div className="widget-product-item-content">
                    <h6 className="widget-product-item-title">Travel Backpack Set</h6>
                    <p className="widget-product-item-author">By Elena Rodriguez</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-product-item">
                <div className="card-body">
                  <div className="widget-product-item-image">
                    <img src="/assets/img/products/product-7.webp" alt="Product" />
                  </div>
                  <div className="widget-product-item-content">
                    <h6 className="widget-product-item-title">Running Shoes Limited</h6>
                    <p className="widget-product-item-author">By Kevin Park</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-product-item">
                <div className="card-body">
                  <div className="widget-product-item-image">
                    <img src="/assets/img/products/product-1.webp" alt="Product" />
                  </div>
                  <div className="widget-product-item-content">
                    <h6 className="widget-product-item-title">Wireless Headphones Pro</h6>
                    <p className="widget-product-item-author">Yellow, Over Ear</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-product-item">
                <div className="card-body">
                  <div className="widget-product-item-image">
                    <img src="/assets/img/products/product-8.webp" alt="Product" />
                  </div>
                  <div className="widget-product-item-content">
                    <h6 className="widget-product-item-title">Skincare Essential Kit</h6>
                    <p className="widget-product-item-author">By Sarah Mitchell</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-product-item">
                <div className="card-body">
                  <div className="widget-product-item-image">
                    <img src="/assets/img/products/product-9.webp" alt="Product" />
                  </div>
                  <div className="widget-product-item-content">
                    <h6 className="widget-product-item-title">Sport Sneakers Classic</h6>
                    <p className="widget-product-item-author">Ultimate Comfort</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Icon Stats with Info */}
        <section className="section">
          <h5 className="section-title mb-3">Icon Stats with Info</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-info-stat">
                <div className="card-body">
                  <div className="widget-info-stat-icon success">
                    <i className="bi bi-cash-stack" />
                  </div>
                  <div className="widget-info-stat-content">
                    <span className="widget-info-stat-value">$21,450</span>
                    <span className="widget-info-stat-label">Income</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-info-stat">
                <div className="card-body">
                  <div className="widget-info-stat-icon primary">
                    <i className="bi bi-people" />
                  </div>
                  <div className="widget-info-stat-content">
                    <span className="widget-info-stat-value">3,180</span>
                    <span className="widget-info-stat-label">Users</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-info-stat">
                <div className="card-body">
                  <div className="widget-info-stat-icon danger">
                    <i className="bi bi-calendar-event" />
                  </div>
                  <div className="widget-info-stat-content">
                    <span className="widget-info-stat-value">18 march</span>
                    <span className="widget-info-stat-label">My birthday</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-info-stat">
                <div className="card-body">
                  <div className="widget-info-stat-icon warning">
                    <i className="bi bi-gear" />
                  </div>
                  <div className="widget-info-stat-content">
                    <span className="widget-info-stat-value">7,920</span>
                    <span className="widget-info-stat-label">Manage notifications</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Progress Stat Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Progress Stat Cards</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-progress-stat">
                <div className="card-body">
                  <div className="widget-progress-stat-header">
                    <span className="widget-progress-stat-value">78%</span>
                    <div className="widget-progress-stat-icon success">
                      <i className="bi bi-box-seam" />
                    </div>
                  </div>
                  <span className="widget-progress-stat-label">Total Product</span>
                  <div className="progress widget-progress-bar" style={{height: 4}}>
                    <div className="progress-bar bg-success" style={{width: '78%'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-progress-stat">
                <div className="card-body">
                  <div className="widget-progress-stat-header">
                    <span className="widget-progress-stat-value">45%</span>
                    <div className="widget-progress-stat-icon primary">
                      <i className="bi bi-hourglass-split" />
                    </div>
                  </div>
                  <span className="widget-progress-stat-label">Pending Product</span>
                  <div className="progress widget-progress-bar" style={{height: 4}}>
                    <div className="progress-bar bg-primary" style={{width: '45%'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-progress-stat">
                <div className="card-body">
                  <div className="widget-progress-stat-header">
                    <span className="widget-progress-stat-value">62%</span>
                    <div className="widget-progress-stat-icon info">
                      <i className="bi bi-cart-check" />
                    </div>
                  </div>
                  <span className="widget-progress-stat-label">Selling</span>
                  <div className="progress widget-progress-bar" style={{height: 4}}>
                    <div className="progress-bar bg-info" style={{width: '62%'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-progress-stat">
                <div className="card-body">
                  <div className="widget-progress-stat-header">
                    <span className="widget-progress-stat-value">31%</span>
                    <div className="widget-progress-stat-icon danger">
                      <i className="bi bi-bag" />
                    </div>
                  </div>
                  <span className="widget-progress-stat-label">Buying</span>
                  <div className="progress widget-progress-bar" style={{height: 4}}>
                    <div className="progress-bar bg-danger" style={{width: '31%'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Featured Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Featured Cards</h5>
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="card widget-featured-card">
                <div className="widget-featured-image">
                  <img src="/assets/img/blog/blog-1.webp" alt="Featured" />
                </div>
                <div className="card-body">
                  <div className="widget-featured-meta">
                    <span><i className="bi bi-calendar" /> 18 Jan 2026</span>
                    <span><i className="bi bi-chat" /> 8 Comments</span>
                  </div>
                  <h6 className="widget-featured-title">Modern Dashboard Design Trends for SaaS Applications</h6>
                  <p className="widget-featured-desc">Explore the latest design patterns and user experience improvements in enterprise software.</p>
                  <button className="btn btn-primary btn-sm">Read More</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-featured-card">
                <div className="widget-featured-image">
                  <img src="/assets/img/blog/blog-2.webp" alt="Featured" />
                </div>
                <div className="card-body">
                  <div className="widget-featured-meta">
                    <span><i className="bi bi-calendar" /> 15 Jan 2026</span>
                    <span><i className="bi bi-chat" /> 24 Comments</span>
                  </div>
                  <h6 className="widget-featured-title">Building Scalable APIs with Modern Architecture</h6>
                  <p className="widget-featured-desc">Learn best practices for creating robust and maintainable backend services.</p>
                  <button className="btn btn-primary btn-sm">Read More</button>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6">
              <div className="card widget-featured-card">
                <div className="widget-featured-image">
                  <img src="/assets/img/blog/blog-3.webp" alt="Featured" />
                </div>
                <div className="card-body">
                  <div className="widget-featured-meta">
                    <span><i className="bi bi-calendar" /> 12 Jan 2026</span>
                    <span><i className="bi bi-chat" /> 19 Comments</span>
                  </div>
                  <h6 className="widget-featured-title">Optimizing Performance in React Applications</h6>
                  <p className="widget-featured-desc">Discover techniques to improve rendering speed and reduce bundle sizes.</p>
                  <button className="btn btn-primary btn-sm">Read More</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Bottom Progress Stats */}
        <section className="section">
          <h5 className="section-title mb-3">Bottom Progress Stats</h5>
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="card widget-bottom-progress">
                <div className="card-body">
                  <span className="widget-bottom-progress-value">32%</span>
                  <span className="widget-bottom-progress-label">Total Product</span>
                  <div className="progress" style={{height: 4}}>
                    <div className="progress-bar bg-success" style={{width: '32%'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-bottom-progress">
                <div className="card-body">
                  <span className="widget-bottom-progress-value">68%</span>
                  <span className="widget-bottom-progress-label">Pending Product</span>
                  <div className="progress" style={{height: 4}}>
                    <div className="progress-bar bg-primary" style={{width: '68%'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-bottom-progress">
                <div className="card-body">
                  <span className="widget-bottom-progress-value">71%</span>
                  <span className="widget-bottom-progress-label">Selling Products</span>
                  <div className="progress" style={{height: 4}}>
                    <div className="progress-bar bg-danger" style={{width: '71%'}} />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="card widget-bottom-progress">
                <div className="card-body">
                  <span className="widget-bottom-progress-value">35%</span>
                  <span className="widget-bottom-progress-label">Buying Products</span>
                  <div className="progress" style={{height: 4}}>
                    <div className="progress-bar bg-secondary" style={{width: '35%'}} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Stat Widgets with Change Indicator */}
        <section className="section">
          <h5 className="section-title mb-3">Stat Widgets with Change</h5>
          <div className="dashboard-grid dashboard-grid-4">
            {/* Stat Widget - Primary */}
            <div className="card widget-stat">
              <div className="widget-stat-header">
                <div>
                  <div className="widget-stat-value">$48,562</div>
                  <div className="widget-stat-label">Total Revenue</div>
                </div>
                <div className="widget-stat-icon primary">
                  <i className="bi bi-currency-dollar" />
                </div>
              </div>
              <div className="widget-stat-change positive">
                <i className="bi bi-arrow-up" /> 12.5% vs last month
              </div>
            </div>
            {/* Stat Widget - Success */}
            <div className="card widget-stat">
              <div className="widget-stat-header">
                <div>
                  <div className="widget-stat-value">2,845</div>
                  <div className="widget-stat-label">New Orders</div>
                </div>
                <div className="widget-stat-icon success">
                  <i className="bi bi-bag-check" />
                </div>
              </div>
              <div className="widget-stat-change positive">
                <i className="bi bi-arrow-up" /> 8.2% vs last month
              </div>
            </div>
            {/* Stat Widget - Warning */}
            <div className="card widget-stat">
              <div className="widget-stat-header">
                <div>
                  <div className="widget-stat-value">1,423</div>
                  <div className="widget-stat-label">New Customers</div>
                </div>
                <div className="widget-stat-icon warning">
                  <i className="bi bi-people" />
                </div>
              </div>
              <div className="widget-stat-change negative">
                <i className="bi bi-arrow-down" /> 3.1% vs last month
              </div>
            </div>
            {/* Stat Widget - Danger */}
            <div className="card widget-stat">
              <div className="widget-stat-header">
                <div>
                  <div className="widget-stat-value">32.4%</div>
                  <div className="widget-stat-label">Bounce Rate</div>
                </div>
                <div className="widget-stat-icon danger">
                  <i className="bi bi-arrow-return-left" />
                </div>
              </div>
              <div className="widget-stat-change positive">
                <i className="bi bi-arrow-down" /> 5.2% improvement
              </div>
            </div>
          </div>
        </section>
        {/* Traffic & Device Widgets */}
        <section className="section">
          <h5 className="section-title mb-3">Traffic &amp; Device Stats</h5>
          <div className="row g-4">
            {/* Traffic Sources Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Traffic Sources</h5>
                  <div className="card-actions">
                    <span className="text-muted small">Last 30 days</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="traffic-source-item">
                    <div className="traffic-source-icon" style={{background: 'rgba(66, 133, 244, 0.1)', color: '#4285f4'}}>
                      <i className="bi bi-google" />
                    </div>
                    <div className="traffic-source-info">
                      <div className="traffic-source-name">Google</div>
                      <div className="traffic-source-value">45,820 visitors</div>
                    </div>
                    <div className="traffic-source-percent text-success">42.5%</div>
                  </div>
                  <div className="traffic-source-item">
                    <div className="traffic-source-icon" style={{background: 'rgba(24, 119, 242, 0.1)', color: '#1877f2'}}>
                      <i className="bi bi-facebook" />
                    </div>
                    <div className="traffic-source-info">
                      <div className="traffic-source-name">Facebook</div>
                      <div className="traffic-source-value">24,150 visitors</div>
                    </div>
                    <div className="traffic-source-percent text-primary">22.4%</div>
                  </div>
                  <div className="traffic-source-item">
                    <div className="traffic-source-icon" style={{background: 'rgba(0, 0, 0, 0.1)', color: '#000'}}>
                      <i className="bi bi-twitter-x" />
                    </div>
                    <div className="traffic-source-info">
                      <div className="traffic-source-name">X (Twitter)</div>
                      <div className="traffic-source-value">18,420 visitors</div>
                    </div>
                    <div className="traffic-source-percent text-info">17.1%</div>
                  </div>
                  <div className="traffic-source-item">
                    <div className="traffic-source-icon" style={{background: 'rgba(255, 0, 0, 0.1)', color: '#ff0000'}}>
                      <i className="bi bi-youtube" />
                    </div>
                    <div className="traffic-source-info">
                      <div className="traffic-source-name">YouTube</div>
                      <div className="traffic-source-value">12,350 visitors</div>
                    </div>
                    <div className="traffic-source-percent text-danger">11.5%</div>
                  </div>
                  <div className="traffic-source-item">
                    <div className="traffic-source-icon" style={{background: 'rgba(100, 100, 100, 0.1)', color: 'var(--muted-color)'}}>
                      <i className="bi bi-link-45deg" />
                    </div>
                    <div className="traffic-source-info">
                      <div className="traffic-source-name">Direct</div>
                      <div className="traffic-source-value">7,020 visitors</div>
                    </div>
                    <div className="traffic-source-percent text-muted">6.5%</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Device Stats Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Device Breakdown</h5>
                </div>
                <div className="card-body">
                  <div className="device-list">
                    <div className="device-item">
                      <div className="device-icon">
                        <i className="bi bi-laptop" />
                      </div>
                      <div className="device-info">
                        <div className="device-name">Desktop</div>
                        <div className="progress device-progress">
                          <div className="progress-bar" role="progressbar" style={{width: '58%'}} />
                        </div>
                      </div>
                      <div className="device-stats">
                        <div className="device-percent">58%</div>
                        <div className="device-count">142,845</div>
                      </div>
                    </div>
                    <div className="device-item">
                      <div className="device-icon">
                        <i className="bi bi-phone" />
                      </div>
                      <div className="device-info">
                        <div className="device-name">Mobile</div>
                        <div className="progress device-progress">
                          <div className="progress-bar bg-success" role="progressbar" style={{width: '32%'}} />
                        </div>
                      </div>
                      <div className="device-stats">
                        <div className="device-percent">32%</div>
                        <div className="device-count">78,920</div>
                      </div>
                    </div>
                    <div className="device-item">
                      <div className="device-icon">
                        <i className="bi bi-tablet" />
                      </div>
                      <div className="device-info">
                        <div className="device-name">Tablet</div>
                        <div className="progress device-progress">
                          <div className="progress-bar bg-warning" role="progressbar" style={{width: '10%'}} />
                        </div>
                      </div>
                      <div className="device-stats">
                        <div className="device-percent">10%</div>
                        <div className="device-count">24,680</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Social & Realtime Widgets */}
        <section className="section">
          <h5 className="section-title mb-3">Social &amp; Realtime Stats</h5>
          <div className="row g-4">
            {/* Social Stats Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Social Media Stats</h5>
                </div>
                <div className="card-body p-0">
                  <div className="social-stats-list">
                    <div className="social-stats-item">
                      <div className="social-icon facebook">
                        <i className="bi bi-facebook" />
                      </div>
                      <div className="social-info">
                        <div className="social-name">Facebook</div>
                        <div className="social-followers">24.5K followers</div>
                      </div>
                      <div className="social-engagement">
                        <div className="engagement-value">+12.4%</div>
                        <div className="engagement-label">Engagement</div>
                      </div>
                    </div>
                    <div className="social-stats-item">
                      <div className="social-icon twitter">
                        <i className="bi bi-twitter-x" />
                      </div>
                      <div className="social-info">
                        <div className="social-name">X (Twitter)</div>
                        <div className="social-followers">18.2K followers</div>
                      </div>
                      <div className="social-engagement">
                        <div className="engagement-value">+8.7%</div>
                        <div className="engagement-label">Engagement</div>
                      </div>
                    </div>
                    <div className="social-stats-item">
                      <div className="social-icon instagram">
                        <i className="bi bi-instagram" />
                      </div>
                      <div className="social-info">
                        <div className="social-name">Instagram</div>
                        <div className="social-followers">32.1K followers</div>
                      </div>
                      <div className="social-engagement">
                        <div className="engagement-value">+15.2%</div>
                        <div className="engagement-label">Engagement</div>
                      </div>
                    </div>
                    <div className="social-stats-item">
                      <div className="social-icon linkedin">
                        <i className="bi bi-linkedin" />
                      </div>
                      <div className="social-info">
                        <div className="social-name">LinkedIn</div>
                        <div className="social-followers">12.8K followers</div>
                      </div>
                      <div className="social-engagement">
                        <div className="engagement-value">+6.3%</div>
                        <div className="engagement-label">Engagement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Real-time Stats Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title"><span className="realtime-dot" />Real-time Stats</h5>
                </div>
                <div className="card-body">
                  <div className="realtime-stats">
                    <div className="realtime-stat">
                      <div className="realtime-value">847</div>
                      <div className="realtime-label">Active Users</div>
                    </div>
                    <div className="realtime-stat">
                      <div className="realtime-value">1.2K</div>
                      <div className="realtime-label">Page Views</div>
                    </div>
                    <div className="realtime-stat">
                      <div className="realtime-value">32</div>
                      <div className="realtime-label">Orders</div>
                    </div>
                    <div className="realtime-stat">
                      <div className="realtime-value">$4.8K</div>
                      <div className="realtime-label">Revenue</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Region & Pipeline Widgets */}
        <section className="section">
          <h5 className="section-title mb-3">Region &amp; Pipeline Stats</h5>
          <div className="row g-4">
            {/* Region Stats Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Sales by Region</h5>
                </div>
                <div className="card-body">
                  <div className="region-list">
                    <div className="region-item">
                      <div className="region-info">
                        <span className="region-flag">🇺🇸</span>
                        <span className="region-name">United States</span>
                      </div>
                      <div className="region-stats">
                        <span className="region-value">$45,820</span>
                        <div className="progress region-progress flex-grow-1">
                          <div className="progress-bar" style={{width: '65%'}} />
                        </div>
                      </div>
                    </div>
                    <div className="region-item">
                      <div className="region-info">
                        <span className="region-flag">🇬🇧</span>
                        <span className="region-name">United Kingdom</span>
                      </div>
                      <div className="region-stats">
                        <span className="region-value">$28,450</span>
                        <div className="progress region-progress flex-grow-1">
                          <div className="progress-bar bg-success" style={{width: '45%'}} />
                        </div>
                      </div>
                    </div>
                    <div className="region-item">
                      <div className="region-info">
                        <span className="region-flag">🇩🇪</span>
                        <span className="region-name">Germany</span>
                      </div>
                      <div className="region-stats">
                        <span className="region-value">$21,380</span>
                        <div className="progress region-progress flex-grow-1">
                          <div className="progress-bar bg-warning" style={{width: '35%'}} />
                        </div>
                      </div>
                    </div>
                    <div className="region-item">
                      <div className="region-info">
                        <span className="region-flag">🇫🇷</span>
                        <span className="region-name">France</span>
                      </div>
                      <div className="region-stats">
                        <span className="region-value">$18,240</span>
                        <div className="progress region-progress flex-grow-1">
                          <div className="progress-bar bg-info" style={{width: '28%'}} />
                        </div>
                      </div>
                    </div>
                    <div className="region-item">
                      <div className="region-info">
                        <span className="region-flag">🇯🇵</span>
                        <span className="region-name">Japan</span>
                      </div>
                      <div className="region-stats">
                        <span className="region-value">$12,650</span>
                        <div className="progress region-progress flex-grow-1">
                          <div className="progress-bar bg-danger" style={{width: '20%'}} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pipeline Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Sales Pipeline</h5>
                </div>
                <div className="card-body">
                  <div className="pipeline-stages">
                    <div className="pipeline-stage">
                      <div className="pipeline-stage-header">
                        <span className="pipeline-stage-name">Lead</span>
                        <span className="pipeline-stage-count">24 deals</span>
                      </div>
                      <div className="pipeline-stage-bar" style={{'--stageWidth': '100%', '--stageColor': 'var(--accent-color)'}} />
                      <span className="pipeline-stage-value">$124,500</span>
                    </div>
                    <div className="pipeline-stage">
                      <div className="pipeline-stage-header">
                        <span className="pipeline-stage-name">Qualified</span>
                        <span className="pipeline-stage-count">18 deals</span>
                      </div>
                      <div className="pipeline-stage-bar" style={{'--stageWidth': '75%', '--stageColor': 'var(--info-color)'}} />
                      <span className="pipeline-stage-value">$98,200</span>
                    </div>
                    <div className="pipeline-stage">
                      <div className="pipeline-stage-header">
                        <span className="pipeline-stage-name">Proposal</span>
                        <span className="pipeline-stage-count">12 deals</span>
                      </div>
                      <div className="pipeline-stage-bar" style={{'--stageWidth': '55%', '--stageColor': 'var(--warning-color)'}} />
                      <span className="pipeline-stage-value">$72,800</span>
                    </div>
                    <div className="pipeline-stage">
                      <div className="pipeline-stage-header">
                        <span className="pipeline-stage-name">Negotiation</span>
                        <span className="pipeline-stage-count">8 deals</span>
                      </div>
                      <div className="pipeline-stage-bar" style={{'--stageWidth': '35%', '--stageColor': 'var(--success-color)'}} />
                      <span className="pipeline-stage-value">$48,500</span>
                    </div>
                    <div className="pipeline-stage">
                      <div className="pipeline-stage-header">
                        <span className="pipeline-stage-name">Closed Won</span>
                        <span className="pipeline-stage-count">5 deals</span>
                      </div>
                      <div className="pipeline-stage-bar" style={{'--stageWidth': '20%', '--stageColor': 'var(--success-color)'}} />
                      <span className="pipeline-stage-value">$32,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Top Products Widget */}
        <section className="section">
          <h5 className="section-title mb-3">Top Products</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Best Sellers</h5>
                  <div className="card-actions">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-outline-primary">View All</a>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="widget-sales-item px-3">
                    <div className="widget-sales-product">
                      <div className="widget-sales-image d-flex align-items-center justify-content-center bg-light rounded">
                        <i className="bi bi-laptop text-muted" />
                      </div>
                      <div>
                        <div className="widget-sales-name">MacBook Pro 14"</div>
                        <div className="widget-sales-category">Electronics</div>
                      </div>
                    </div>
                    <div className="widget-sales-amount">$2,499.00</div>
                  </div>
                  <div className="widget-sales-item px-3">
                    <div className="widget-sales-product">
                      <div className="widget-sales-image d-flex align-items-center justify-content-center bg-light rounded">
                        <i className="bi bi-headphones text-muted" />
                      </div>
                      <div>
                        <div className="widget-sales-name">AirPods Max</div>
                        <div className="widget-sales-category">Audio</div>
                      </div>
                    </div>
                    <div className="widget-sales-amount">$549.00</div>
                  </div>
                  <div className="widget-sales-item px-3">
                    <div className="widget-sales-product">
                      <div className="widget-sales-image d-flex align-items-center justify-content-center bg-light rounded">
                        <i className="bi bi-watch text-muted" />
                      </div>
                      <div>
                        <div className="widget-sales-name">Apple Watch Ultra</div>
                        <div className="widget-sales-category">Wearables</div>
                      </div>
                    </div>
                    <div className="widget-sales-amount">$799.00</div>
                  </div>
                  <div className="widget-sales-item px-3">
                    <div className="widget-sales-product">
                      <div className="widget-sales-image d-flex align-items-center justify-content-center bg-light rounded">
                        <i className="bi bi-phone text-muted" />
                      </div>
                      <div>
                        <div className="widget-sales-name">iPhone 15 Pro</div>
                        <div className="widget-sales-category">Smartphones</div>
                      </div>
                    </div>
                    <div className="widget-sales-amount">$1,199.00</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Browser Stats Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Browser Usage</h5>
                </div>
                <div className="card-body">
                  <div className="browser-list">
                    <div className="browser-item">
                      <div className="browser-info">
                        <i className="bi bi-browser-chrome" style={{color: '#4285f4'}} />
                        <span className="browser-name">Chrome</span>
                      </div>
                      <div className="browser-stats">
                        <span className="browser-percent">64.2%</span>
                      </div>
                    </div>
                    <div className="browser-item">
                      <div className="browser-info">
                        <i className="bi bi-browser-safari" style={{color: '#5ac8fa'}} />
                        <span className="browser-name">Safari</span>
                      </div>
                      <div className="browser-stats">
                        <span className="browser-percent">18.5%</span>
                      </div>
                    </div>
                    <div className="browser-item">
                      <div className="browser-info">
                        <i className="bi bi-browser-firefox" style={{color: '#ff7139'}} />
                        <span className="browser-name">Firefox</span>
                      </div>
                      <div className="browser-stats">
                        <span className="browser-percent">10.8%</span>
                      </div>
                    </div>
                    <div className="browser-item">
                      <div className="browser-info">
                        <i className="bi bi-browser-edge" style={{color: '#0078d7'}} />
                        <span className="browser-name">Edge</span>
                      </div>
                      <div className="browser-stats">
                        <span className="browser-percent">5.2%</span>
                      </div>
                    </div>
                    <div className="browser-item">
                      <div className="browser-info">
                        <i className="bi bi-globe" style={{color: 'var(--muted-color)'}} />
                        <span className="browser-name">Other</span>
                      </div>
                      <div className="browser-stats">
                        <span className="browser-percent">1.3%</span>
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

export default WidgetsDataPage
