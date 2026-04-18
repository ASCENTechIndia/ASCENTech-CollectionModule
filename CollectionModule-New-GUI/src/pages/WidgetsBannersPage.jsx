function WidgetsBannersPage() {
  return (
    <div>
      <div className="main-content page-widgets-banners">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Banner Widgets</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Widgets</a>
            <span className="breadcrumb-item active">Banners</span>
          </nav>
        </div>
        {/* Welcome Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Welcome Banners</h5>
          <div className="row g-4">
            {/* Welcome Banner with Gradient */}
            <div className="col-lg-8">
              <div className="widget-banner-welcome gradient-primary">
                <div className="widget-banner-content">
                  <h4 className="widget-banner-title">Good morning, Sarah!</h4>
                  <p className="widget-banner-text">Your productivity increased by 38% this week. Keep up the momentum!</p>
                  <button className="btn btn-danger btn-sm">View Report</button>
                </div>
                <div className="widget-banner-image">
                  <img src="/assets/img/banners/banner-welcome.webp" alt="Welcome" />
                </div>
              </div>
            </div>
            {/* Level Up Banner */}
            <div className="col-lg-4">
              <div className="card widget-banner-achievement">
                <div className="card-body text-center">
                  <span className="widget-banner-label">MILESTONE</span>
                  <div className="widget-banner-badge">
                    <i className="bi bi-trophy-fill" />
                  </div>
                  <h5 className="widget-banner-heading">Goal Achieved!</h5>
                  <p className="widget-banner-desc">You completed 100 tasks this month. Claim your reward.</p>
                  <button className="btn btn-info btn-sm">Claim Now</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Promo Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Promo Banners</h5>
          <div className="row g-4">
            {/* Track Transaction Banner */}
            <div className="col-lg-8">
              <div className="widget-banner-promo light">
                <div className="widget-banner-content">
                  <h4 className="widget-banner-title">Organize Your Workflow Seamlessly</h4>
                  <p className="widget-banner-text">Manage projects, collaborate with your team, and automate repetitive tasks all in one place</p>
                  <button className="btn btn-primary btn-sm">Get Started</button>
                </div>
                <div className="widget-banner-image">
                  <img src="/assets/img/banners/banner-promo.webp" alt="Promo" />
                </div>
              </div>
            </div>
            {/* Mutual Friend Banner */}
            <div className="col-lg-4">
              <div className="card widget-banner-friend">
                <div className="card-body text-center">
                  <h5 className="widget-banner-heading">New Connection Request</h5>
                  <div className="widget-banner-avatar-wrapper">
                    <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-banner-avatar" />
                    <span className="widget-banner-notification">1</span>
                  </div>
                  <h6 className="widget-banner-name">Alexandra Mitchell</h6>
                  <p className="widget-banner-desc">Review and respond to the connection request</p>
                  <div className="widget-banner-actions">
                    <button className="btn btn-primary btn-sm">Approve</button>
                    <button className="btn btn-outline-danger btn-sm">Decline</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Status Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Status Banners</h5>
          <div className="row g-4">
            {/* Error Banner */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-status">
                <div className="card-body text-center">
                  <div className="widget-banner-icon-wrapper">
                    <img src="/assets/img/banners/banner-error.webp" alt="Error" className="widget-banner-illustration" />
                  </div>
                  <h5 className="widget-banner-heading">Connection Lost</h5>
                  <p className="widget-banner-desc">Unable to reach the server. Check your network settings.</p>
                  <button className="btn btn-danger btn-sm rounded-pill">Reconnect</button>
                </div>
              </div>
            </div>
            {/* Empty Cart Banner */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-status">
                <div className="card-body text-center">
                  <div className="widget-banner-icon-wrapper">
                    <div className="widget-banner-empty-cart">
                      <i className="bi bi-bag" />
                    </div>
                  </div>
                  <h5 className="widget-banner-heading">No Items Found</h5>
                  <p className="widget-banner-desc">Your wishlist is empty. Browse our catalog to find items.</p>
                  <button className="btn btn-primary btn-sm">Browse Products</button>
                </div>
              </div>
            </div>
            {/* Welcome Stats Banner */}
            <div className="col-lg-4 col-md-6">
              <div className="widget-banner-stats gradient-primary">
                <div className="widget-banner-content">
                  <h4 className="widget-banner-title">Hello Marcus Chen</h4>
                  <p className="widget-banner-text">Here's your weekly summary</p>
                  <div className="widget-banner-stat-group">
                    <div className="widget-banner-stat">
                      <span className="widget-banner-stat-value">428</span>
                      <span className="widget-banner-stat-label">Tasks Done</span>
                    </div>
                    <div className="widget-banner-stat">
                      <span className="widget-banner-stat-value">92%</span>
                      <span className="widget-banner-stat-label">On Track</span>
                    </div>
                  </div>
                </div>
                <div className="widget-banner-image bottom">
                  <img src="/assets/img/banners/banner-user.webp" alt="User" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Alert Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Alert Banners</h5>
          <div className="row g-4">
            {/* Success Alert Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-alert success">
                <div className="widget-banner-alert-icon">
                  <i className="bi bi-check-circle-fill" />
                </div>
                <div className="widget-banner-alert-content">
                  <h6 className="widget-banner-alert-title">Export Completed!</h6>
                  <p className="widget-banner-alert-text">Your data export of 2,847 records has finished. Download available for 24 hours.</p>
                </div>
                <button className="widget-banner-alert-close"><i className="bi bi-x" /></button>
              </div>
            </div>
            {/* Warning Alert Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-alert warning">
                <div className="widget-banner-alert-icon">
                  <i className="bi bi-exclamation-triangle-fill" />
                </div>
                <div className="widget-banner-alert-content">
                  <h6 className="widget-banner-alert-title">Storage Almost Full</h6>
                  <p className="widget-banner-alert-text">You've used 85% of your allocated storage. Consider upgrading or removing unused files.</p>
                </div>
                <button className="widget-banner-alert-close"><i className="bi bi-x" /></button>
              </div>
            </div>
            {/* Info Alert Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-alert info">
                <div className="widget-banner-alert-icon">
                  <i className="bi bi-info-circle-fill" />
                </div>
                <div className="widget-banner-alert-content">
                  <h6 className="widget-banner-alert-title">New Updates Available</h6>
                  <p className="widget-banner-alert-text">Version 3.2.1 includes performance improvements and bug fixes. Update at your convenience.</p>
                </div>
                <button className="widget-banner-alert-close"><i className="bi bi-x" /></button>
              </div>
            </div>
            {/* Danger Alert Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-alert danger">
                <div className="widget-banner-alert-icon">
                  <i className="bi bi-shield-exclamation" />
                </div>
                <div className="widget-banner-alert-content">
                  <h6 className="widget-banner-alert-title">Password Change Required</h6>
                  <p className="widget-banner-alert-text">Your password hasn't been updated in 180 days. Please create a new secure password.</p>
                </div>
                <button className="widget-banner-alert-close"><i className="bi bi-x" /></button>
              </div>
            </div>
          </div>
        </section>
        {/* CTA Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Call-to-Action Banners</h5>
          <div className="row g-4">
            {/* Upgrade Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-cta gradient-success">
                <div className="widget-banner-cta-content">
                  <span className="widget-banner-cta-badge">PREMIUM</span>
                  <h4 className="widget-banner-cta-title">Unlock Advanced Features</h4>
                  <p className="widget-banner-cta-text">Access analytics dashboards, custom integrations, and dedicated support resources.</p>
                  <div className="widget-banner-cta-buttons">
                    <button className="btn btn-light btn-sm">Start Trial</button>
                    <button className="btn btn-outline-light btn-sm">Compare Plans</button>
                  </div>
                </div>
                <div className="widget-banner-cta-icon">
                  <i className="bi bi-rocket-takeoff" />
                </div>
              </div>
            </div>
            {/* Invite Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-cta gradient-info">
                <div className="widget-banner-cta-content">
                  <span className="widget-banner-cta-badge">REFERRAL</span>
                  <h4 className="widget-banner-cta-title">Share &amp; Get Rewarded</h4>
                  <p className="widget-banner-cta-text">Invite colleagues to join and receive 500 bonus credits for each verified signup.</p>
                  <div className="widget-banner-cta-buttons">
                    <button className="btn btn-light btn-sm">Copy Link</button>
                    <button className="btn btn-outline-light btn-sm">See History</button>
                  </div>
                </div>
                <div className="widget-banner-cta-icon">
                  <i className="bi bi-gift" />
                </div>
              </div>
            </div>
            {/* Download App Banner */}
            <div className="col-12">
              <div className="widget-banner-cta gradient-primary horizontal">
                <div className="widget-banner-cta-content">
                  <h4 className="widget-banner-cta-title">Get the Mobile Experience</h4>
                  <p className="widget-banner-cta-text">Manage your dashboard anywhere. Free on all mobile platforms.</p>
                </div>
                <div className="widget-banner-cta-buttons">
                  <button className="btn btn-dark btn-sm"><i className="bi bi-apple me-1" />App Store</button>
                  <button className="btn btn-dark btn-sm"><i className="bi bi-google-play me-1" />Play Store</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Notification Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Notification Banners</h5>
          <div className="row g-4">
            {/* New Message Notification */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-notification">
                <div className="card-body">
                  <div className="widget-banner-notif-header">
                    <div className="widget-banner-notif-icon primary">
                      <i className="bi bi-envelope" />
                    </div>
                    <span className="widget-banner-notif-time">5 mins ago</span>
                  </div>
                  <h6 className="widget-banner-notif-title">Document Shared With You</h6>
                  <p className="widget-banner-notif-text">Michael Torres shared "Q4 Budget Report" with editing permissions.</p>
                  <div className="widget-banner-notif-actions">
                    <button className="btn btn-primary btn-sm">Open File</button>
                    <button className="btn btn-light btn-sm">Later</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Order Update Notification */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-notification">
                <div className="card-body">
                  <div className="widget-banner-notif-header">
                    <div className="widget-banner-notif-icon success">
                      <i className="bi bi-box-seam" />
                    </div>
                    <span className="widget-banner-notif-time">1 hour ago</span>
                  </div>
                  <h6 className="widget-banner-notif-title">Deployment Complete</h6>
                  <p className="widget-banner-notif-text">Production build v2.4.7 deployed successfully to all regions.</p>
                  <div className="widget-banner-notif-actions">
                    <button className="btn btn-success btn-sm">View Logs</button>
                    <button className="btn btn-light btn-sm">Dismiss</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Calendar Reminder Notification */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-notification">
                <div className="card-body">
                  <div className="widget-banner-notif-header">
                    <div className="widget-banner-notif-icon warning">
                      <i className="bi bi-calendar-event" />
                    </div>
                    <span className="widget-banner-notif-time">In 15 mins</span>
                  </div>
                  <h6 className="widget-banner-notif-title">Client Call Starting Soon</h6>
                  <p className="widget-banner-notif-text">Review meeting with Acme Corp begins shortly. Prepare your notes.</p>
                  <div className="widget-banner-notif-actions">
                    <button className="btn btn-warning btn-sm">Join Now</button>
                    <button className="btn btn-light btn-sm">Postpone</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Feature Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Feature Announcement Banners</h5>
          <div className="row g-4">
            {/* New Feature Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-feature">
                <div className="widget-banner-feature-badge">NEW</div>
                <div className="widget-banner-feature-content">
                  <h5 className="widget-banner-feature-title">AI Assistant Now Available</h5>
                  <p className="widget-banner-feature-text">Get intelligent suggestions and automate routine tasks with our new AI-powered helper.</p>
                  <a href="#" onClick={(event) => event.preventDefault()} className="widget-banner-feature-link">Enable Feature <i className="bi bi-arrow-right" /></a>
                </div>
                <div className="widget-banner-feature-icon">
                  <i className="bi bi-robot" />
                </div>
              </div>
            </div>
            {/* Update Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-feature">
                <div className="widget-banner-feature-badge update">IMPROVED</div>
                <div className="widget-banner-feature-content">
                  <h5 className="widget-banner-feature-title">Faster Search Experience</h5>
                  <p className="widget-banner-feature-text">Search results now load 60% faster with improved filters and instant previews.</p>
                  <a href="#" onClick={(event) => event.preventDefault()} className="widget-banner-feature-link">Read More <i className="bi bi-arrow-right" /></a>
                </div>
                <div className="widget-banner-feature-icon">
                  <i className="bi bi-lightning-charge" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Onboarding Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Onboarding Banners</h5>
          <div className="row g-4">
            {/* Welcome Onboarding */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-onboarding">
                <div className="card-body text-center">
                  <div className="widget-banner-onboarding-step">1</div>
                  <div className="widget-banner-onboarding-icon">
                    <i className="bi bi-person-plus" />
                  </div>
                  <h6 className="widget-banner-onboarding-title">Set Up Your Workspace</h6>
                  <p className="widget-banner-onboarding-text">Customize your dashboard layout and configure notification preferences.</p>
                  <button className="btn btn-primary btn-sm w-100">Configure</button>
                </div>
              </div>
            </div>
            {/* Connect Onboarding */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-onboarding">
                <div className="card-body text-center">
                  <div className="widget-banner-onboarding-step">2</div>
                  <div className="widget-banner-onboarding-icon">
                    <i className="bi bi-link-45deg" />
                  </div>
                  <h6 className="widget-banner-onboarding-title">Import Your Data</h6>
                  <p className="widget-banner-onboarding-text">Bring in existing projects from external tools or upload spreadsheets.</p>
                  <button className="btn btn-outline-primary btn-sm w-100">Import</button>
                </div>
              </div>
            </div>
            {/* Explore Onboarding */}
            <div className="col-lg-4 col-md-6">
              <div className="card widget-banner-onboarding">
                <div className="card-body text-center">
                  <div className="widget-banner-onboarding-step completed">
                    <i className="bi bi-check" />
                  </div>
                  <div className="widget-banner-onboarding-icon success">
                    <i className="bi bi-compass" />
                  </div>
                  <h6 className="widget-banner-onboarding-title">Invite Your Team</h6>
                  <p className="widget-banner-onboarding-text">Setup complete! Add team members to collaborate on projects together.</p>
                  <button className="btn btn-success btn-sm w-100">Add Members</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Sale Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Sale &amp; Promotion Banners</h5>
          <div className="row g-4">
            {/* Flash Sale Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-sale gradient-danger">
                <div className="widget-banner-sale-content">
                  <span className="widget-banner-sale-badge">LIMITED TIME</span>
                  <h3 className="widget-banner-sale-title">40% OFF</h3>
                  <p className="widget-banner-sale-text">Annual subscription discount ends soon</p>
                  <div className="widget-banner-sale-timer">
                    <div className="widget-banner-timer-item">
                      <span className="widget-banner-timer-value">05</span>
                      <span className="widget-banner-timer-label">Hours</span>
                    </div>
                    <div className="widget-banner-timer-item">
                      <span className="widget-banner-timer-value">23</span>
                      <span className="widget-banner-timer-label">Mins</span>
                    </div>
                    <div className="widget-banner-timer-item">
                      <span className="widget-banner-timer-value">47</span>
                      <span className="widget-banner-timer-label">Secs</span>
                    </div>
                  </div>
                  <button className="btn btn-light btn-sm">Upgrade Plan</button>
                </div>
              </div>
            </div>
            {/* Discount Code Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-sale gradient-warning">
                <div className="widget-banner-sale-content">
                  <span className="widget-banner-sale-badge dark">SPECIAL</span>
                  <h3 className="widget-banner-sale-title">Get 3 Months Free</h3>
                  <p className="widget-banner-sale-text">Apply promo code at checkout</p>
                  <div className="widget-banner-sale-code">
                    <span className="widget-banner-code">NEWYEAR2026</span>
                    <button className="widget-banner-copy-btn"><i className="bi bi-clipboard" /></button>
                  </div>
                  <button className="btn btn-dark btn-sm">Use Code</button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Cookie & Consent Banners */}
        <section className="section">
          <h5 className="section-title mb-3">Cookie &amp; Consent Banners</h5>
          <div className="row g-4">
            {/* Cookie Banner */}
            <div className="col-12">
              <div className="widget-banner-cookie">
                <div className="widget-banner-cookie-icon">
                  <i className="bi bi-cookie" />
                </div>
                <div className="widget-banner-cookie-content">
                  <h6 className="widget-banner-cookie-title">Privacy Preferences</h6>
                  <p className="widget-banner-cookie-text">We use essential cookies to operate the site and optional analytics to improve your experience. You can manage your preferences anytime.</p>
                </div>
                <div className="widget-banner-cookie-actions">
                  <button className="btn btn-primary btn-sm">Accept All</button>
                  <button className="btn btn-outline-secondary btn-sm">Manage</button>
                  <button className="btn btn-link btn-sm">Privacy Policy</button>
                </div>
              </div>
            </div>
            {/* Newsletter Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-newsletter">
                <div className="widget-banner-newsletter-icon">
                  <i className="bi bi-newspaper" />
                </div>
                <div className="widget-banner-newsletter-content">
                  <h6 className="widget-banner-newsletter-title">Weekly Insights Digest</h6>
                  <p className="widget-banner-newsletter-text">Receive curated tips, product updates, and industry trends every Thursday.</p>
                  <div className="widget-banner-newsletter-form">
                    <input type="email" className="form-control form-control-sm" placeholder="your@email.com" />
                    <button className="btn btn-primary btn-sm">Join</button>
                  </div>
                </div>
              </div>
            </div>
            {/* App Install Banner */}
            <div className="col-lg-6">
              <div className="widget-banner-app-install">
                <div className="widget-banner-app-icon">
                  <i className="bi bi-phone" />
                </div>
                <div className="widget-banner-app-content">
                  <h6 className="widget-banner-app-title">Add to Home Screen</h6>
                  <p className="widget-banner-app-text">Install this app for offline access and push notifications.</p>
                </div>
                <div className="widget-banner-app-actions">
                  <button className="btn btn-primary btn-sm">Add Now</button>
                  <button className="btn btn-light btn-sm">Maybe Later</button>
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

export default WidgetsBannersPage
