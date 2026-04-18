function WidgetsCardsPage() {
  return (
    <div>
      <div className="main-content page-widgets-cards">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Card Widgets</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Widgets</a>
            <span className="breadcrumb-item active">Cards</span>
          </nav>
        </div>
        {/* Blog/Article Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Blog / Article Cards</h5>
          <div className="row g-4">
            {/* Blog Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-blog-card">
                <div className="widget-blog-image">
                  <img src="/assets/img/blog/blog-1.webp" alt="Article" />
                  <span className="widget-blog-read-time">4 min Read</span>
                </div>
                <div className="card-body">
                  <span className="badge badge-soft-primary mb-2">Design</span>
                  <h6 className="widget-blog-title">How minimalist design principles are reshaping modern interfaces</h6>
                  <div className="widget-blog-meta">
                    <span><i className="bi bi-eye" /> 7,842</span>
                    <span><i className="bi bi-chat" /> 18</span>
                    <span className="ms-auto"><i className="bi bi-calendar" /> Jan 15</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Blog Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-blog-card">
                <div className="widget-blog-image">
                  <img src="/assets/img/blog/blog-2.webp" alt="Article" />
                  <span className="widget-blog-read-time">6 min Read</span>
                </div>
                <div className="card-body">
                  <span className="badge badge-soft-info mb-2">Technology</span>
                  <h6 className="widget-blog-title">Machine learning models now predict customer behavior with 94% accuracy</h6>
                  <div className="widget-blog-meta">
                    <span><i className="bi bi-eye" /> 5,390</span>
                    <span><i className="bi bi-chat" /> 27</span>
                    <span className="ms-auto"><i className="bi bi-calendar" /> Jan 12</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Blog Card 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-blog-card">
                <div className="widget-blog-image">
                  <img src="/assets/img/blog/blog-3.webp" alt="Article" />
                  <span className="widget-blog-read-time">3 min Read</span>
                </div>
                <div className="card-body">
                  <span className="badge badge-soft-danger mb-2">Productivity</span>
                  <h6 className="widget-blog-title">Remote teams report 40% higher satisfaction with async communication tools</h6>
                  <div className="widget-blog-meta">
                    <span><i className="bi bi-eye" /> 11,204</span>
                    <span><i className="bi bi-chat" /> 45</span>
                    <span className="ms-auto"><i className="bi bi-calendar" /> Jan 10</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Product Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Product Cards</h5>
          <div className="row g-4">
            {/* Product Card 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-product-card">
                <div className="widget-product-image">
                  <img src="/assets/img/products/product-1.webp" alt="Product" />
                  <button className="widget-product-wishlist"><i className="bi bi-heart" /></button>
                </div>
                <div className="card-body">
                  <h6 className="widget-product-title">Nova Wireless Pro</h6>
                  <div className="widget-product-price">
                    <span className="current-price">$179</span>
                    <span className="original-price">$249</span>
                  </div>
                  <div className="widget-product-rating">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-half" />
                  </div>
                </div>
              </div>
            </div>
            {/* Product Card 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-product-card">
                <div className="widget-product-image">
                  <img src="/assets/img/products/product-2.webp" alt="Product" />
                  <button className="widget-product-wishlist active"><i className="bi bi-heart-fill" /></button>
                </div>
                <div className="card-body">
                  <h6 className="widget-product-title">UltraBook X15</h6>
                  <div className="widget-product-price">
                    <span className="current-price">$1,299</span>
                    <span className="original-price">$1,499</span>
                  </div>
                  <div className="widget-product-rating">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                  </div>
                </div>
              </div>
            </div>
            {/* Product Card 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-product-card">
                <div className="widget-product-image">
                  <img src="/assets/img/products/product-3.webp" alt="Product" />
                  <button className="widget-product-wishlist"><i className="bi bi-heart" /></button>
                </div>
                <div className="card-body">
                  <h6 className="widget-product-title">Silk Blend Jacket</h6>
                  <div className="widget-product-price">
                    <span className="current-price">$89</span>
                    <span className="original-price">$129</span>
                  </div>
                  <div className="widget-product-rating">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star" />
                    <i className="bi bi-star" />
                  </div>
                </div>
              </div>
            </div>
            {/* Product Card 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-product-card">
                <div className="widget-product-image">
                  <img src="/assets/img/products/product-4.webp" alt="Product" />
                  <button className="widget-product-wishlist"><i className="bi bi-heart" /></button>
                </div>
                <div className="card-body">
                  <h6 className="widget-product-title">Gaming Bundle Pro</h6>
                  <div className="widget-product-price">
                    <span className="current-price">$459</span>
                    <span className="original-price">$599</span>
                  </div>
                  <div className="widget-product-rating">
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Music Player Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Music Player Cards</h5>
          <div className="row g-4">
            {/* Music Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-music-card">
                <div className="widget-music-content">
                  <div className="widget-music-info">
                    <h6 className="widget-music-title">Midnight Drive</h6>
                    <p className="widget-music-artist">The Neon Collective</p>
                    <div className="widget-music-controls">
                      <button className="widget-music-btn"><i className="bi bi-skip-start-fill" /></button>
                      <button className="widget-music-btn play"><i className="bi bi-play-fill" /></button>
                      <button className="widget-music-btn"><i className="bi bi-skip-end-fill" /></button>
                    </div>
                  </div>
                  <div className="widget-music-image">
                    <img src="/assets/img/albums/album-1.webp" alt="Album" />
                  </div>
                </div>
              </div>
            </div>
            {/* Music Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-music-card">
                <div className="widget-music-content">
                  <div className="widget-music-info">
                    <h6 className="widget-music-title">Ocean Waves</h6>
                    <p className="widget-music-artist">Aurora Dreams</p>
                    <div className="widget-music-controls">
                      <button className="widget-music-btn"><i className="bi bi-skip-start-fill" /></button>
                      <button className="widget-music-btn play"><i className="bi bi-play-fill" /></button>
                      <button className="widget-music-btn"><i className="bi bi-skip-end-fill" /></button>
                    </div>
                  </div>
                  <div className="widget-music-image">
                    <img src="/assets/img/albums/album-2.webp" alt="Album" />
                  </div>
                </div>
              </div>
            </div>
            {/* Music Card 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-music-card">
                <div className="widget-music-content">
                  <div className="widget-music-info">
                    <h6 className="widget-music-title">City Lights</h6>
                    <p className="widget-music-artist">Skyline Echo</p>
                    <div className="widget-music-controls">
                      <button className="widget-music-btn"><i className="bi bi-skip-start-fill" /></button>
                      <button className="widget-music-btn play"><i className="bi bi-play-fill" /></button>
                      <button className="widget-music-btn"><i className="bi bi-skip-end-fill" /></button>
                    </div>
                  </div>
                  <div className="widget-music-image">
                    <img src="/assets/img/albums/album-3.webp" alt="Album" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* User Profile Cards */}
        <section className="section">
          <h5 className="section-title mb-3">User Profile Cards (Horizontal)</h5>
          <div className="row g-4">
            {/* User Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-user-card-horizontal">
                <div className="card-body">
                  <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-user-avatar" />
                  <div className="widget-user-info">
                    <h6 className="widget-user-name">Elena Rodriguez</h6>
                    <p className="widget-user-location"><i className="bi bi-geo-alt" /> Barcelona, Spain</p>
                  </div>
                  <button className="btn btn-primary btn-sm">Follow</button>
                </div>
              </div>
            </div>
            {/* User Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-user-card-horizontal">
                <div className="card-body">
                  <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-user-avatar" />
                  <div className="widget-user-info">
                    <h6 className="widget-user-name">Marcus Chen</h6>
                    <p className="widget-user-location"><i className="bi bi-geo-alt" /> Vancouver, Canada</p>
                  </div>
                  <button className="btn btn-primary btn-sm">Follow</button>
                </div>
              </div>
            </div>
            {/* User Card 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-user-card-horizontal">
                <div className="card-body">
                  <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-user-avatar" />
                  <div className="widget-user-info">
                    <h6 className="widget-user-name">Priya Sharma</h6>
                    <p className="widget-user-location"><i className="bi bi-geo-alt" /> Mumbai, India</p>
                  </div>
                  <button className="btn btn-primary btn-sm">Follow</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Friend Suggestion Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Friend Suggestion Cards</h5>
          <div className="row g-4">
            {/* Friend Card 1 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-friend-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-4.webp" alt="User" className="widget-friend-avatar" />
                  <h6 className="widget-friend-name">James Wilson</h6>
                  <div className="widget-friend-mutual">
                    <div className="widget-friend-mutual-avatars">
                      <img src="/assets/img/avatars/avatar-5.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-6.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-7.webp" alt="Mutual" />
                    </div>
                    <span>5 mutual connections</span>
                  </div>
                  <div className="widget-friend-actions">
                    <button className="btn btn-primary btn-sm w-100">Connect</button>
                    <button className="btn btn-outline-danger btn-sm w-100">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Friend Card 2 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-friend-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-5.webp" alt="User" className="widget-friend-avatar" />
                  <h6 className="widget-friend-name">Sophie Laurent</h6>
                  <div className="widget-friend-mutual">
                    <div className="widget-friend-mutual-avatars">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-2.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-3.webp" alt="Mutual" />
                    </div>
                    <span>8 mutual connections</span>
                  </div>
                  <div className="widget-friend-actions">
                    <button className="btn btn-primary btn-sm w-100">Connect</button>
                    <button className="btn btn-outline-danger btn-sm w-100">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Friend Card 3 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-friend-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-6.webp" alt="User" className="widget-friend-avatar" />
                  <h6 className="widget-friend-name">Kenji Tanaka</h6>
                  <div className="widget-friend-mutual">
                    <div className="widget-friend-mutual-avatars">
                      <img src="/assets/img/avatars/avatar-7.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-8.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-9.webp" alt="Mutual" />
                    </div>
                    <span>2 mutual connections</span>
                  </div>
                  <div className="widget-friend-actions">
                    <button className="btn btn-primary btn-sm w-100">Connect</button>
                    <button className="btn btn-outline-danger btn-sm w-100">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Friend Card 4 */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-friend-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-7.webp" alt="User" className="widget-friend-avatar" />
                  <h6 className="widget-friend-name">Nina Petrova</h6>
                  <div className="widget-friend-mutual">
                    <div className="widget-friend-mutual-avatars">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-4.webp" alt="Mutual" />
                      <img src="/assets/img/avatars/avatar-5.webp" alt="Mutual" />
                    </div>
                    <span>12 mutual connections</span>
                  </div>
                  <div className="widget-friend-actions">
                    <button className="btn btn-primary btn-sm w-100">Connect</button>
                    <button className="btn btn-outline-danger btn-sm w-100">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Profile Info Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Profile Info Cards</h5>
          <div className="row g-4">
            {/* Profile Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-profile-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-profile-avatar" />
                  <h6 className="widget-profile-name">Elena Rodriguez</h6>
                  <p className="widget-profile-role">UX Design Lead</p>
                  <div className="widget-profile-social">
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link facebook"><i className="bi bi-facebook" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link instagram"><i className="bi bi-instagram" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link github"><i className="bi bi-github" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link twitter"><i className="bi bi-twitter-x" /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-profile-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-profile-avatar" />
                  <h6 className="widget-profile-name">Marcus Chen</h6>
                  <p className="widget-profile-role">Data Architect</p>
                  <div className="widget-profile-social">
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link facebook"><i className="bi bi-facebook" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link instagram"><i className="bi bi-instagram" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link github"><i className="bi bi-github" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link twitter"><i className="bi bi-twitter-x" /></a>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Card 3 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-profile-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-profile-avatar" />
                  <h6 className="widget-profile-name">Priya Sharma</h6>
                  <p className="widget-profile-role">Product Manager</p>
                  <div className="widget-profile-social">
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link facebook"><i className="bi bi-facebook" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link instagram"><i className="bi bi-instagram" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link github"><i className="bi bi-github" /></a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="widget-social-link twitter"><i className="bi bi-twitter-x" /></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Settings & Gift Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Settings &amp; Gift Cards</h5>
          <div className="row g-4">
            {/* Settings Card */}
            <div className="col-lg-4 col-md-6">
              <div className="card">
                <div className="card-body">
                  <h6 className="card-title mb-3">Settings</h6>
                  <div className="widget-settings-item">
                    <div className="widget-settings-icon primary">
                      <i className="bi bi-volume-up" />
                    </div>
                    <div className="widget-settings-info">
                      <span className="widget-settings-label">Sound</span>
                      <input type="range" className="form-range widget-settings-slider" min={0} max={100} defaultValue={72} />
                    </div>
                    <span className="widget-settings-value">72%</span>
                  </div>
                  <div className="widget-settings-item">
                    <div className="widget-settings-icon info">
                      <i className="bi bi-chat" />
                    </div>
                    <div className="widget-settings-info">
                      <span className="widget-settings-label">Notifications</span>
                      <span className="widget-settings-desc">Enable desktop alerts</span>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="chatSwitch" />
                    </div>
                  </div>
                  <div className="widget-settings-actions">
                    <button className="btn btn-outline-danger btn-sm">Reset</button>
                    <button className="btn btn-primary btn-sm">Apply</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Gift Card 1 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-gift-card">
                <div className="card-body">
                  <div className="widget-gift-header">
                    <h6 className="widget-gift-name">James Wilson</h6>
                    <button className="widget-gift-icon"><i className="bi bi-gift" /></button>
                  </div>
                  <div className="widget-gift-image" style={{backgroundColor: '#fef3c7'}}>
                    <img src="/assets/img/books/book-1.webp" alt="Book" />
                  </div>
                  <button className="btn btn-primary w-100">Send Gift ($35.00)</button>
                </div>
              </div>
            </div>
            {/* Gift Card 2 */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-gift-card">
                <div className="card-body">
                  <div className="widget-gift-header">
                    <h6 className="widget-gift-name">Sophie Laurent</h6>
                    <button className="widget-gift-icon"><i className="bi bi-gift" /></button>
                  </div>
                  <div className="widget-gift-image" style={{backgroundColor: '#e0f2fe'}}>
                    <img src="/assets/img/books/book-2.webp" alt="Book" />
                  </div>
                  <button className="btn btn-primary w-100">Send Gift ($42.00)</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Payment & Transaction Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Payment &amp; Transaction Cards</h5>
          <div className="row g-4">
            {/* Payment Methods Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Recent Transactions</h5>
                  <div className="card-actions">
                    <span className="text-muted small">Income Sources</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-payment-item">
                    <div className="widget-payment-icon paypal">
                      <i className="bi bi-paypal" />
                    </div>
                    <div className="widget-payment-info">
                      <span className="widget-payment-title">Client Payment</span>
                      <span className="widget-payment-subtitle">Project milestone</span>
                    </div>
                    <span className="widget-payment-amount positive">+$4,850</span>
                  </div>
                  <div className="widget-payment-item">
                    <div className="widget-payment-icon wallet">
                      <i className="bi bi-wallet2" />
                    </div>
                    <div className="widget-payment-info">
                      <span className="widget-payment-title">Wallet Transfer</span>
                      <span className="widget-payment-subtitle">Internal funds</span>
                    </div>
                    <span className="widget-payment-amount positive">+$720</span>
                  </div>
                  <div className="widget-payment-item">
                    <div className="widget-payment-icon credit">
                      <i className="bi bi-credit-card" />
                    </div>
                    <div className="widget-payment-info">
                      <span className="widget-payment-title">Subscription Revenue</span>
                      <span className="widget-payment-subtitle">Monthly recurring</span>
                    </div>
                    <span className="widget-payment-amount positive">+$3,190</span>
                  </div>
                  <div className="widget-payment-item">
                    <div className="widget-payment-icon refund">
                      <i className="bi bi-arrow-counterclockwise" />
                    </div>
                    <div className="widget-payment-info">
                      <span className="widget-payment-title">Service Fee</span>
                      <span className="widget-payment-subtitle">Platform charges</span>
                    </div>
                    <span className="widget-payment-amount negative">-$58</span>
                  </div>
                  <button className="btn btn-primary w-100 mt-3">View All Transactions</button>
                </div>
              </div>
            </div>
            {/* Upcoming Activity Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Upcoming Activity</h5>
                  <div className="card-actions">
                    <span className="text-muted small">This Week</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-activity-item-alt">
                    <div className="widget-activity-icon-alt primary">
                      <i className="bi bi-geo-alt" />
                    </div>
                    <div className="widget-activity-info-alt">
                      <span className="widget-activity-title-alt">Team offsite in Austin</span>
                      <span className="widget-activity-status-alt">confirmed</span>
                    </div>
                    <span className="widget-activity-time-alt">Tomorrow</span>
                  </div>
                  <div className="widget-activity-item-alt">
                    <div className="widget-activity-icon-alt info">
                      <i className="bi bi-archive" />
                    </div>
                    <div className="widget-activity-info-alt">
                      <span className="widget-activity-title-alt">Quarterly backup</span>
                      <span className="widget-activity-status-alt">scheduled</span>
                    </div>
                    <span className="widget-activity-time-alt">Wed</span>
                  </div>
                  <div className="widget-activity-item-alt">
                    <div className="widget-activity-icon-alt warning">
                      <i className="bi bi-person" />
                    </div>
                    <div className="widget-activity-info-alt">
                      <span className="widget-activity-title-alt">Investor presentation</span>
                      <span className="widget-activity-status-alt">preparing</span>
                    </div>
                    <span className="widget-activity-time-alt">Thu</span>
                  </div>
                  <div className="widget-activity-item-alt">
                    <div className="widget-activity-icon-alt success">
                      <i className="bi bi-people" />
                    </div>
                    <div className="widget-activity-info-alt">
                      <span className="widget-activity-title-alt">Product launch review</span>
                      <span className="widget-activity-status-alt">on track</span>
                    </div>
                    <span className="widget-activity-time-alt">Fri</span>
                  </div>
                  <div className="widget-activity-item-alt">
                    <div className="widget-activity-icon-alt muted">
                      <i className="bi bi-envelope" />
                    </div>
                    <div className="widget-activity-info-alt">
                      <span className="widget-activity-title-alt">Send contracts to legal</span>
                      <span className="widget-activity-status-alt">completed</span>
                    </div>
                    <span className="widget-activity-time-alt">Done</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Timeline Transaction Card */}
        <section className="section">
          <h5 className="section-title mb-3">Timeline Transaction Card</h5>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Recent Transactions</h5>
                </div>
                <div className="card-body">
                  <div className="widget-timeline">
                    <div className="widget-timeline-item">
                      <span className="widget-timeline-time">08:45</span>
                      <span className="widget-timeline-dot primary" />
                      <div className="widget-timeline-content">
                        <p>Invoice payment from Acme Corp for $2,340.00</p>
                      </div>
                    </div>
                    <div className="widget-timeline-item">
                      <span className="widget-timeline-time">10:15</span>
                      <span className="widget-timeline-dot success" />
                      <div className="widget-timeline-content">
                        <p>New order confirmed <a href="#" onClick={(event) => event.preventDefault()}>#INV-7821</a></p>
                      </div>
                    </div>
                    <div className="widget-timeline-item">
                      <span className="widget-timeline-time">11:30</span>
                      <span className="widget-timeline-dot warning" />
                      <div className="widget-timeline-content">
                        <p>Vendor payment of $890.50 to CloudHost Inc</p>
                      </div>
                    </div>
                    <div className="widget-timeline-item">
                      <span className="widget-timeline-time">14:00</span>
                      <span className="widget-timeline-dot info" />
                      <div className="widget-timeline-content">
                        <p>Subscription renewal <a href="#" onClick={(event) => event.preventDefault()}>#SUB-4523</a></p>
                      </div>
                    </div>
                    <div className="widget-timeline-item">
                      <span className="widget-timeline-time">15:20</span>
                      <span className="widget-timeline-dot danger" />
                      <div className="widget-timeline-content">
                        <p>Budget review meeting</p>
                      </div>
                    </div>
                    <div className="widget-timeline-item">
                      <span className="widget-timeline-time">17:00</span>
                      <span className="widget-timeline-dot primary" />
                      <div className="widget-timeline-content">
                        <p>Wire transfer from TechStart Ltd for $5,120.00</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Popular Products Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Popular Products</h5>
                  <div className="card-actions">
                    <span className="text-muted small">12k Monthly Views</span>
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table widget-products-table mb-0">
                    <thead>
                      <tr>
                        <th>Products</th>
                        <th>Payment</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="widget-product-cell">
                            <img src="/assets/img/products/product-thumb-1.webp" alt="Product" className="widget-product-thumb" />
                            <div>
                              <div className="widget-product-name-sm">ProMax Ultra 256GB Midnight Blue Edition</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="widget-product-payment">
                            <strong>$320</strong> / 799
                            <span className="widget-payment-label">Deposit paid</span>
                          </div>
                        </td>
                        <td><span className="badge badge-soft-success">Shipped</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-product-cell">
                            <img src="/assets/img/products/product-thumb-2.webp" alt="Product" className="widget-product-thumb" />
                            <div>
                              <div className="widget-product-name-sm">Studio Notebook 14 M2 Pro 512GB Silver</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="widget-product-payment">
                            <strong>$1,499</strong> / 1499
                            <span className="widget-payment-label">Complete</span>
                          </div>
                        </td>
                        <td><span className="badge badge-soft-success">Delivered</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-product-cell">
                            <img src="/assets/img/products/product-thumb-3.webp" alt="Product" className="widget-product-thumb" />
                            <div>
                              <div className="widget-product-name-sm">Elite Controller Wireless Edition White</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="widget-product-payment">
                            <strong>$0</strong> / 189
                            <span className="widget-payment-label">Refunded</span>
                          </div>
                        </td>
                        <td><span className="badge badge-soft-danger">Returned</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-product-cell">
                            <img src="/assets/img/products/product-thumb-4.webp" alt="Product" className="widget-product-thumb" />
                            <div>
                              <div className="widget-product-name-sm">ErgoFlex Executive Chair Lumbar Support</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div className="widget-product-payment">
                            <strong>$275</strong> / 549
                            <span className="widget-payment-label">Installment</span>
                          </div>
                        </td>
                        <td><span className="badge badge-soft-success">Processing</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Upcoming Schedules Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Upcoming Schedules</h5>
                  <div className="card-actions">
                    <span className="text-muted small">Logistics tracking</span>
                    <button className="btn btn-sm btn-light ms-2"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-schedule-tabs">
                    <button className="widget-schedule-tab active">Delivered</button>
                    <button className="widget-schedule-tab">In Transit</button>
                  </div>
                  <div className="widget-schedule-list">
                    <div className="widget-schedule-item">
                      <div className="widget-schedule-icon primary">
                        <i className="bi bi-truck" />
                      </div>
                      <div className="widget-schedule-info">
                        <span className="widget-schedule-title">Express Cargo</span>
                        <span className="widget-schedule-subtitle">#TRK-892341</span>
                      </div>
                      <span className="badge badge-soft-success">Arrived</span>
                    </div>
                    <div className="widget-schedule-item">
                      <span className="widget-schedule-dot info" />
                      <div className="widget-schedule-info">
                        <span className="widget-schedule-title">Rotterdam Port</span>
                        <span className="widget-schedule-subtitle">Netherlands</span>
                      </div>
                    </div>
                    <div className="widget-schedule-item">
                      <span className="widget-schedule-dot warning" />
                      <div className="widget-schedule-info">
                        <span className="widget-schedule-title">Berlin Distribution</span>
                        <span className="widget-schedule-subtitle">Germany</span>
                      </div>
                    </div>
                    <div className="widget-schedule-item">
                      <div className="widget-schedule-icon success">
                        <i className="bi bi-bus-front" />
                      </div>
                      <div className="widget-schedule-info">
                        <span className="widget-schedule-title">Ground Transport</span>
                        <span className="widget-schedule-subtitle">#GND-458712</span>
                      </div>
                      <span className="badge badge-soft-info">Active</span>
                    </div>
                    <div className="widget-schedule-item">
                      <span className="widget-schedule-dot primary" />
                      <div className="widget-schedule-info">
                        <span className="widget-schedule-title">Valencia Terminal</span>
                        <span className="widget-schedule-subtitle">Spain</span>
                      </div>
                    </div>
                    <div className="widget-schedule-item">
                      <span className="widget-schedule-dot danger" />
                      <div className="widget-schedule-info">
                        <span className="widget-schedule-title">Customs Processing</span>
                        <span className="widget-schedule-subtitle" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Review & Location Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Review &amp; Location Cards</h5>
          <div className="row g-4">
            {/* Latest Reviews Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <div>
                    <h5 className="card-title">Latest Reviews</h5>
                    <span className="text-muted small">Customer feedback from all channels</span>
                  </div>
                  <div className="card-actions d-flex gap-2">
                    <div className="input-group input-group-sm" style={{width: 150}}>
                      <span className="input-group-text"><i className="bi bi-search" /></span>
                      <input type="text" className="form-control" placeholder="Search" />
                    </div>
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table widget-reviews-table mb-0">
                    <thead>
                      <tr>
                        <th><input type="checkbox" className="form-check-input" /></th>
                        <th>Customer</th>
                        <th>Reviews</th>
                        <th>Time</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><input type="checkbox" className="form-check-input" /></td>
                        <td>
                          <div className="widget-reviewer">
                            <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-reviewer-avatar" />
                            <div>
                              <div className="widget-reviewer-name">Rachel Torres</div>
                              <div className="widget-reviewer-email">rtorres@company.io</div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="widget-review-text">Excellent interface and smooth onboarding. The team was very helpful...</p>
                        </td>
                        <td><span className="widget-review-time">Jan 14</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                      <tr>
                        <td><input type="checkbox" className="form-check-input" /></td>
                        <td>
                          <div className="widget-reviewer">
                            <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-reviewer-avatar" />
                            <div>
                              <div className="widget-reviewer-name">David Kim</div>
                              <div className="widget-reviewer-email">dkim@startup.co</div>
                              <div className="widget-reviewer-rating">
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="widget-review-text">Great product overall. Performance improvements are noticeable after...</p>
                        </td>
                        <td><span className="widget-review-time">Jan 12</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                      <tr>
                        <td><input type="checkbox" className="form-check-input" /></td>
                        <td>
                          <div className="widget-reviewer">
                            <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-reviewer-avatar" />
                            <div>
                              <div className="widget-reviewer-name">Maria Santos</div>
                              <div className="widget-reviewer-email">msantos@design.net</div>
                              <div className="widget-reviewer-rating">
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="widget-review-text">Absolutely love the new features. Customer support resolved my issue...</p>
                        </td>
                        <td><span className="widget-review-time">Jan 10</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                      <tr>
                        <td><input type="checkbox" className="form-check-input" /></td>
                        <td>
                          <div className="widget-reviewer">
                            <img src="/assets/img/avatars/avatar-4.webp" alt="User" className="widget-reviewer-avatar" />
                            <div>
                              <div className="widget-reviewer-name">Alex Bennett</div>
                              <div className="widget-reviewer-email">abennett@agency.com</div>
                              <div className="widget-reviewer-rating">
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star-fill" />
                                <i className="bi bi-star" />
                                <i className="bi bi-star" />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className="widget-review-text">Good value for the price. Would appreciate more customization options...</p>
                        </td>
                        <td><span className="widget-review-time">Jan 8</span></td>
                        <td><button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button></td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="widget-table-footer">
                    <span className="text-muted small">1-4 of 47</span>
                    <button className="btn btn-primary btn-sm">View All Reviews</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Sales from Locations Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Sales by Region</h5>
                  <div className="card-actions">
                    <span className="text-muted small">Europe</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-map-placeholder">
                    <i className="bi bi-geo-alt" />
                    <span>Map Placeholder</span>
                  </div>
                  <div className="widget-location-stats">
                    <div className="widget-location-item">
                      <span className="widget-location-code">UK</span>
                      <div className="widget-location-bar">
                        <div className="widget-location-fill" style={{width: '34%', background: 'var(--accent-color)'}} />
                      </div>
                      <span className="widget-location-percent">34%</span>
                    </div>
                    <div className="widget-location-item">
                      <span className="widget-location-code">DE</span>
                      <div className="widget-location-bar">
                        <div className="widget-location-fill" style={{width: '26%', background: 'var(--info-color)'}} />
                      </div>
                      <span className="widget-location-percent">26%</span>
                    </div>
                    <div className="widget-location-item">
                      <span className="widget-location-code">FR</span>
                      <div className="widget-location-bar">
                        <div className="widget-location-fill" style={{width: '22%', background: 'var(--warning-color)'}} />
                      </div>
                      <span className="widget-location-percent">22%</span>
                    </div>
                    <div className="widget-location-item">
                      <span className="widget-location-code">ES</span>
                      <div className="widget-location-bar">
                        <div className="widget-location-fill" style={{width: '18%', background: 'var(--danger-color)'}} />
                      </div>
                      <span className="widget-location-percent">18%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Credit Card & Stats Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Credit Card &amp; Stat Cards</h5>
          <div className="row g-4">
            {/* Payment Methods Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Payment Methods</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-credit-cards">
                    <div className="widget-credit-card visa">
                      <div className="widget-credit-card-number">**** 4521</div>
                      <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='16' viewBox='0 0 50 16'%3E%3Ctext x='0' y='12' fill='white' font-family='Arial' font-size='12' font-weight='bold'%3EVISA%3C/text%3E%3C/svg%3E" alt="Visa" className="widget-credit-card-logo" />
                      <div className="widget-credit-card-balance">
                        <span className="label">Balance</span>
                        <span className="amount">$18,742.85</span>
                      </div>
                    </div>
                    <div className="widget-credit-card mastercard">
                      <div className="widget-credit-card-number">**** 7893</div>
                      <div className="widget-credit-card-mc-logo">
                        <span className="mc-circle mc-red" />
                        <span className="mc-circle mc-orange" />
                      </div>
                      <div className="widget-credit-card-balance">
                        <span className="label">Balance</span>
                        <span className="amount">$9,234.50</span>
                      </div>
                    </div>
                  </div>
                  <div className="widget-transactions-mini">
                    <div className="widget-transactions-header">
                      <span>Transactions</span>
                      <a href="#" onClick={(event) => event.preventDefault()}>See All <i className="bi bi-chevron-right" /></a>
                    </div>
                    <div className="widget-transaction-item-mini">
                      <div className="widget-transaction-icon-mini netflix">S</div>
                      <div className="widget-transaction-info-mini">
                        <span className="widget-transaction-title-mini">Streaming Service</span>
                        <span className="widget-transaction-date-mini">Today, 11:45am</span>
                      </div>
                      <div className="widget-transaction-amount-mini">
                        <span className="badge badge-soft-success">Approved</span>
                        <span className="amount negative">- $15.99</span>
                        <span className="bonus positive">+8 Bonus</span>
                      </div>
                    </div>
                    <div className="widget-transaction-item-mini">
                      <div className="widget-transaction-icon-mini upwork">Fr</div>
                      <div className="widget-transaction-info-mini">
                        <span className="widget-transaction-title-mini">Freelance Platform</span>
                        <span className="widget-transaction-date-mini">Jan 18, 2:30pm</span>
                      </div>
                      <div className="widget-transaction-amount-mini">
                        <span className="badge badge-soft-warning">Processing</span>
                        <span className="amount positive">+ $2,450.00</span>
                        <span className="bonus positive">+120 Bonus</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earning Report Card */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Earning Report</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-light"><i className="bi bi-three-dots-vertical" /></button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-earning-list">
                    <div className="widget-earning-item">
                      <div className="widget-earning-icon primary">
                        <i className="bi bi-bank" />
                      </div>
                      <div className="widget-earning-info">
                        <span className="widget-earning-title">Direct Deposits</span>
                        <span className="widget-earning-subtitle">and +3 sources <i className="bi bi-info-circle" /></span>
                      </div>
                      <span className="badge badge-soft-success">+ 22.4%</span>
                    </div>
                    <div className="widget-earning-item">
                      <div className="widget-earning-icon danger">
                        <i className="bi bi-graph-up-arrow" />
                      </div>
                      <div className="widget-earning-info">
                        <span className="widget-earning-title">Operating Margin</span>
                        <span className="widget-earning-subtitle">and +2 metrics <i className="bi bi-info-circle" /></span>
                      </div>
                      <span className="badge badge-soft-success">+ 18.7%</span>
                    </div>
                    <div className="widget-earning-item">
                      <div className="widget-earning-icon success">
                        <i className="bi bi-currency-dollar" />
                      </div>
                      <div className="widget-earning-info">
                        <span className="widget-earning-title">Gross Revenue</span>
                        <span className="widget-earning-subtitle">and +5 streams <i className="bi bi-info-circle" /></span>
                      </div>
                      <span className="badge badge-soft-success">+ 31.2%</span>
                    </div>
                    <div className="widget-earning-item">
                      <div className="widget-earning-icon warning">
                        <i className="bi bi-receipt" />
                      </div>
                      <div className="widget-earning-info">
                        <span className="widget-earning-title">Operational Costs</span>
                        <span className="widget-earning-subtitle">and +4 categories <i className="bi bi-info-circle" /></span>
                      </div>
                      <span className="badge badge-soft-danger">- 5.8%</span>
                    </div>
                  </div>
                  <a href="#" onClick={(event) => event.preventDefault()} className="widget-earning-link">View detailed breakdown</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Mini Stat Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Mini Stat Cards</h5>
          <div className="row g-4">
            {/* Latest Deal Card */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-mini-stat">
                <div className="card-body">
                  <div className="widget-mini-stat-header">
                    <span className="widget-mini-stat-title">Active Campaign</span>
                    <span className="badge badge-soft-success">92.3%</span>
                  </div>
                  <p className="widget-mini-stat-subtitle">Last 30 days</p>
                  <div className="widget-mini-stat-values">
                    <span className="widget-mini-stat-current">$127,400</span>
                    <span className="widget-mini-stat-total">$138,000</span>
                  </div>
                  <p className="widget-mini-stat-info">Vouchers redeemed: 24/30</p>
                  <div className="widget-mini-stat-footer">
                    <span className="widget-mini-stat-label">Top Contributors</span>
                    <div className="widget-mini-stat-avatars">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="User" />
                      <img src="/assets/img/avatars/avatar-2.webp" alt="User" />
                      <img src="/assets/img/avatars/avatar-3.webp" alt="User" />
                      <img src="/assets/img/avatars/avatar-4.webp" alt="User" />
                      <span className="widget-mini-stat-more">+12</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Sales Stat Card */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-color-stat danger">
                <div className="card-body">
                  <div className="widget-color-stat-icon">
                    <i className="bi bi-bag-check" />
                  </div>
                  <div className="widget-color-stat-content">
                    <div className="widget-color-stat-value">3,847 <span className="widget-color-stat-change">+31%</span></div>
                    <div className="widget-color-stat-label">Orders</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Refunds Stat Card */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-color-stat success">
                <div className="card-body">
                  <div className="widget-color-stat-icon">
                    <i className="bi bi-arrow-counterclockwise" />
                  </div>
                  <div className="widget-color-stat-content">
                    <div className="widget-color-stat-value">186 <span className="widget-color-stat-change negative">-9%</span></div>
                    <div className="widget-color-stat-label">Returns</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Earnings Stat Card */}
            <div className="col-lg-3 col-md-6">
              <div className="card widget-color-stat primary">
                <div className="card-body">
                  <div className="widget-color-stat-icon">
                    <i className="bi bi-currency-dollar" />
                  </div>
                  <div className="widget-color-stat-content">
                    <div className="widget-color-stat-value">$312k <span className="widget-color-stat-change">+14%</span></div>
                    <div className="widget-color-stat-label">Revenue</div>
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

export default WidgetsCardsPage
