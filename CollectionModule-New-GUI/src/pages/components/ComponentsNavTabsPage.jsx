function ComponentsNavTabsPage() {
  return (
    <div>
      <div className="main-content page-components-nav-tabs">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Navs &amp; Tabs</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Navs &amp; Tabs</span>
          </nav>
        </div>
        {/* Basic Navs */}
        <section className="section">
          <div className="row g-4">
            {/* Base Nav */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Base Nav</h5>
                  <p className="card-subtitle">Simple navigation links</p>
                </div>
                <div className="card-body">
                  <ul className="nav">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Horizontal Alignment */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Horizontal Alignment</h5>
                  <p className="card-subtitle">Center and end aligned navs</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Centered</h6>
                  <ul className="nav justify-content-center mb-4">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">End Aligned</h6>
                  <ul className="nav justify-content-end">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tabs & Pills */}
        <section className="section">
          <h5 className="section-title mb-3">Tabs &amp; Pills</h5>
          <div className="row g-4">
            {/* Tabs */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Tab Style</h5>
                  <p className="card-subtitle">Navigation styled as tabs</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs mb-3">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">With Dropdown</h6>
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(event) => event.preventDefault()}>Dropdown</a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Pills */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Pill Style</h5>
                  <p className="card-subtitle">Navigation styled as pills</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-pills mb-3">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">With Dropdown</h6>
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item dropdown">
                      <a className="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" onClick={(event) => event.preventDefault()}>Dropdown</a>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Underline & Fill */}
        <section className="section">
          <h5 className="section-title mb-3">Underline &amp; Fill Variations</h5>
          <div className="row g-4">
            {/* Underline */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Underline Style</h5>
                  <p className="card-subtitle">Nav with underline indicator</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-underline">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Fill & Justified */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Fill &amp; Justified</h5>
                  <p className="card-subtitle">Full-width navigation</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Fill</h6>
                  <ul className="nav nav-pills nav-fill mb-4">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Longer Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">Justified</h6>
                  <ul className="nav nav-pills nav-justified">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Longer Link</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Vertical & With Icons */}
        <section className="section">
          <h5 className="section-title mb-3">Vertical &amp; With Icons</h5>
          <div className="row g-4">
            {/* Vertical */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Vertical Navigation</h5>
                  <p className="card-subtitle">Stacked vertical nav</p>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-6">
                      <h6 className="small text-muted text-uppercase mb-3">Default</h6>
                      <ul className="nav flex-column">
                        <li className="nav-item">
                          <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-6">
                      <h6 className="small text-muted text-uppercase mb-3">Pills</h6>
                      <ul className="nav nav-pills flex-column">
                        <li className="nav-item">
                          <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}>Active</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}>Link</a>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* With Icons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Icons</h5>
                  <p className="card-subtitle">Navigation items with icons</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Tabs with Icons</h6>
                  <ul className="nav nav-tabs mb-4">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-house me-1" />Home</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-person me-1" />Profile</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-envelope me-1" />Messages</a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-gear me-1" />Settings</a>
                    </li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">Icon-Only Pills</h6>
                  <ul className="nav nav-pills">
                    <li className="nav-item">
                      <a className="nav-link active" href="#" onClick={(event) => event.preventDefault()} title="Home"><i className="bi bi-house" /></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()} title="Profile"><i className="bi bi-person" /></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()} title="Messages"><i className="bi bi-envelope" /></a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="#" onClick={(event) => event.preventDefault()} title="Settings"><i className="bi bi-gear" /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tabs with Content */}
        <section className="section">
          <h5 className="section-title mb-3">Tabs with Content</h5>
          <div className="row g-4">
            {/* Basic Tabs Content */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Basic Tab Panels</h5>
                  <p className="card-subtitle">Tabs that switch content panels</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs" id="basicTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-panel" type="button" role="tab">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-panel" type="button" role="tab">Profile</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact-panel" type="button" role="tab">Contact</button>
                    </li>
                  </ul>
                  <div className="tab-content p-3 border border-top-0 rounded-bottom" id="basicTabsContent">
                    <div className="tab-pane fade show active" id="home-panel" role="tabpanel">
                      <p className="mb-0">This is the home tab content. Welcome to our application! Here you'll find an overview of your dashboard and recent activity.</p>
                    </div>
                    <div className="tab-pane fade" id="profile-panel" role="tabpanel">
                      <p className="mb-0">This is the profile tab content. Manage your account settings, update your personal information, and configure your preferences here.</p>
                    </div>
                    <div className="tab-pane fade" id="contact-panel" role="tabpanel">
                      <p className="mb-0">This is the contact tab content. Get in touch with our support team or browse our FAQ section for quick answers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Pills Content */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Pills Tab Panels</h5>
                  <p className="card-subtitle">Pills that switch content panels</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-pills mb-3" id="pillTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" id="pill-home-tab" data-bs-toggle="pill" data-bs-target="#pill-home" type="button" role="tab">Home</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pill-profile-tab" data-bs-toggle="pill" data-bs-target="#pill-profile" type="button" role="tab">Profile</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" id="pill-contact-tab" data-bs-toggle="pill" data-bs-target="#pill-contact" type="button" role="tab">Contact</button>
                    </li>
                  </ul>
                  <div className="tab-content p-3 bg-light rounded" id="pillTabsContent">
                    <div className="tab-pane fade show active" id="pill-home" role="tabpanel">
                      <p className="mb-0">Home panel content with pill navigation style. The pills provide a more modern, button-like appearance.</p>
                    </div>
                    <div className="tab-pane fade" id="pill-profile" role="tabpanel">
                      <p className="mb-0">Profile panel content. Pills work great for horizontal and vertical layouts alike.</p>
                    </div>
                    <div className="tab-pane fade" id="pill-contact" role="tabpanel">
                      <p className="mb-0">Contact panel content. Choose pills for a softer, more contemporary look.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Vertical Tabs */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Vertical Tabs</h5>
                  <p className="card-subtitle">Side navigation with content panels</p>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist">
                        <button className="nav-link active text-start" id="v-pills-home-tab" data-bs-toggle="pill" data-bs-target="#v-pills-home" type="button" role="tab">
                          <i className="bi bi-house me-2" />Home
                        </button>
                        <button className="nav-link text-start" id="v-pills-profile-tab" data-bs-toggle="pill" data-bs-target="#v-pills-profile" type="button" role="tab">
                          <i className="bi bi-person me-2" />Profile
                        </button>
                        <button className="nav-link text-start" id="v-pills-messages-tab" data-bs-toggle="pill" data-bs-target="#v-pills-messages" type="button" role="tab">
                          <i className="bi bi-envelope me-2" />Messages
                        </button>
                        <button className="nav-link text-start" id="v-pills-settings-tab" data-bs-toggle="pill" data-bs-target="#v-pills-settings" type="button" role="tab">
                          <i className="bi bi-gear me-2" />Settings
                        </button>
                      </div>
                    </div>
                    <div className="col-md-9">
                      <div className="tab-content" id="v-pills-tabContent">
                        <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel">
                          <h5>Home</h5>
                          <p>Welcome to the home panel. This is where you can see an overview of your account activity, recent notifications, and quick actions. The vertical tab layout works great for settings pages and dashboards.</p>
                        </div>
                        <div className="tab-pane fade" id="v-pills-profile" role="tabpanel">
                          <h5>Profile</h5>
                          <p>Manage your profile information here. Update your display name, avatar, bio, and other personal details. Your profile is visible to other users on the platform.</p>
                        </div>
                        <div className="tab-pane fade" id="v-pills-messages" role="tabpanel">
                          <h5>Messages</h5>
                          <p>View and manage your messages. You have 3 unread messages and 12 conversations in your inbox. Use the search function to find specific messages or filter by sender.</p>
                        </div>
                        <div className="tab-pane fade" id="v-pills-settings" role="tabpanel">
                          <h5>Settings</h5>
                          <p>Configure your account settings including privacy, notifications, security, and preferences. Changes are saved automatically as you make them.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Real-World Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* Product Tabs */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Product Details Tabs</h5>
                  <p className="card-subtitle">E-commerce product information</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-tabs" id="productTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#description-tab" type="button">Description</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#specs-tab" type="button">Specifications</button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#reviews-tab" type="button">Reviews <span className="badge bg-primary ms-1">24</span></button>
                    </li>
                  </ul>
                  <div className="tab-content border border-top-0 rounded-bottom p-3">
                    <div className="tab-pane fade show active" id="description-tab">
                      <p>Premium wireless headphones with active noise cancellation. Experience crystal-clear audio with deep bass and crisp highs.</p>
                      <ul className="mb-0">
                        <li>40-hour battery life</li>
                        <li>Bluetooth 5.0 connectivity</li>
                        <li>Foldable design for portability</li>
                      </ul>
                    </div>
                    <div className="tab-pane fade" id="specs-tab">
                      <table className="table table-sm mb-0">
                        <tbody><tr>
                            <td className="text-muted">Brand</td>
                            <td>AudioMax</td>
                          </tr>
                          <tr>
                            <td className="text-muted">Model</td>
                            <td>AX-500</td>
                          </tr>
                          <tr>
                            <td className="text-muted">Driver Size</td>
                            <td>40mm</td>
                          </tr>
                          <tr>
                            <td className="text-muted">Weight</td>
                            <td>250g</td>
                          </tr>
                        </tbody></table>
                    </div>
                    <div className="tab-pane fade" id="reviews-tab">
                      <div className="d-flex align-items-center mb-3">
                        <div className="text-warning me-2">
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-fill" />
                          <i className="bi bi-star-half" />
                        </div>
                        <span className="fw-bold">4.5</span>
                        <span className="text-muted ms-1">(24 reviews)</span>
                      </div>
                      <p className="small text-muted mb-0">"Great sound quality and comfortable to wear for extended periods. Highly recommended!"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Settings Navigation */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Settings Navigation</h5>
                  <p className="card-subtitle">Account settings tabs</p>
                </div>
                <div className="card-body">
                  <ul className="nav nav-pills nav-fill mb-3" id="settingsTabs" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button className="nav-link active" data-bs-toggle="pill" data-bs-target="#general-settings" type="button">
                        <i className="bi bi-gear d-block mb-1 fs-5" />
                        <span className="small">General</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#security-settings" type="button">
                        <i className="bi bi-shield-lock d-block mb-1 fs-5" />
                        <span className="small">Security</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#notifications-settings" type="button">
                        <i className="bi bi-bell d-block mb-1 fs-5" />
                        <span className="small">Notifications</span>
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button className="nav-link" data-bs-toggle="pill" data-bs-target="#billing-settings" type="button">
                        <i className="bi bi-credit-card d-block mb-1 fs-5" />
                        <span className="small">Billing</span>
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="general-settings">
                      <p className="text-muted small">Manage your general account preferences.</p>
                    </div>
                    <div className="tab-pane fade" id="security-settings">
                      <p className="text-muted small">Configure security settings and two-factor auth.</p>
                    </div>
                    <div className="tab-pane fade" id="notifications-settings">
                      <p className="text-muted small">Set up your notification preferences.</p>
                    </div>
                    <div className="tab-pane fade" id="billing-settings">
                      <p className="text-muted small">Manage billing and payment methods.</p>
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

export default ComponentsNavTabsPage
