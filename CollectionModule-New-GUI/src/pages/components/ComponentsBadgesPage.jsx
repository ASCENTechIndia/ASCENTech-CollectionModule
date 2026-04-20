import { Link } from 'react-router-dom';
function ComponentsBadgesPage() {
  return (
    <div>
      <div className="main-content page-components-badges">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Badges</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Badges</span>
          </nav>
        </div>
        {/* Default Badges */}
        <section className="section">
          <div className="row g-4">
            {/* Contextual Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Badges</h5>
                  <p className="card-subtitle">Contextual badge variations</p>
                </div>
                <div className="card-body">
                  <span className="badge bg-primary">Primary</span>
                  <span className="badge bg-secondary">Secondary</span>
                  <span className="badge bg-success">Success</span>
                  <span className="badge bg-danger">Danger</span>
                  <span className="badge bg-warning text-dark">Warning</span>
                  <span className="badge bg-info">Info</span>
                  <span className="badge bg-light text-dark">Light</span>
                  <span className="badge bg-dark">Dark</span>
                </div>
              </div>
            </div>
            {/* Pill Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Pill Badges</h5>
                  <p className="card-subtitle">Rounded pill badges</p>
                </div>
                <div className="card-body">
                  <span className="badge rounded-pill bg-primary">Primary</span>
                  <span className="badge rounded-pill bg-secondary">Secondary</span>
                  <span className="badge rounded-pill bg-success">Success</span>
                  <span className="badge rounded-pill bg-danger">Danger</span>
                  <span className="badge rounded-pill bg-warning text-dark">Warning</span>
                  <span className="badge rounded-pill bg-info">Info</span>
                  <span className="badge rounded-pill bg-light text-dark">Light</span>
                  <span className="badge rounded-pill bg-dark">Dark</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Soft & Outline Badges */}
        <section className="section">
          <h5 className="section-title mb-3">Badge Styles</h5>
          <div className="row g-4">
            {/* Soft Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Soft Badges</h5>
                  <p className="card-subtitle">Light background with colored text</p>
                </div>
                <div className="card-body">
                  <span className="badge badge-soft-primary">Primary</span>
                  <span className="badge badge-soft-secondary">Secondary</span>
                  <span className="badge badge-soft-success">Success</span>
                  <span className="badge badge-soft-danger">Danger</span>
                  <span className="badge badge-soft-warning">Warning</span>
                  <span className="badge badge-soft-info">Info</span>
                  <hr />
                  <h6 className="small text-muted text-uppercase mb-3">Soft Pill Badges</h6>
                  <span className="badge badge-soft-primary rounded-pill">Primary</span>
                  <span className="badge badge-soft-secondary rounded-pill">Secondary</span>
                  <span className="badge badge-soft-success rounded-pill">Success</span>
                  <span className="badge badge-soft-danger rounded-pill">Danger</span>
                  <span className="badge badge-soft-warning rounded-pill">Warning</span>
                  <span className="badge badge-soft-info rounded-pill">Info</span>
                </div>
              </div>
            </div>
            {/* Outline Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Outline Badges</h5>
                  <p className="card-subtitle">Bordered badges without fill</p>
                </div>
                <div className="card-body">
                  <span className="badge badge-outline-primary">Primary</span>
                  <span className="badge badge-outline-secondary">Secondary</span>
                  <span className="badge badge-outline-success">Success</span>
                  <span className="badge badge-outline-danger">Danger</span>
                  <span className="badge badge-outline-warning">Warning</span>
                  <span className="badge badge-outline-info">Info</span>
                  <hr />
                  <h6 className="small text-muted text-uppercase mb-3">Outline Pill Badges</h6>
                  <span className="badge badge-outline-primary rounded-pill">Primary</span>
                  <span className="badge badge-outline-secondary rounded-pill">Secondary</span>
                  <span className="badge badge-outline-success rounded-pill">Success</span>
                  <span className="badge badge-outline-danger rounded-pill">Danger</span>
                  <span className="badge badge-outline-warning rounded-pill">Warning</span>
                  <span className="badge badge-outline-info rounded-pill">Info</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Badges in Headings */}
        <section className="section">
          <h5 className="section-title mb-3">Badges in Context</h5>
          <div className="row g-4">
            {/* Heading Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Heading Badges</h5>
                  <p className="card-subtitle">Badges scale to match parent element</p>
                </div>
                <div className="card-body">
                  <h1>Heading 1 <span className="badge bg-primary">New</span></h1>
                  <h2>Heading 2 <span className="badge bg-secondary">New</span></h2>
                  <h3>Heading 3 <span className="badge bg-success">New</span></h3>
                  <h4>Heading 4 <span className="badge bg-danger">New</span></h4>
                  <h5>Heading 5 <span className="badge bg-warning text-dark">New</span></h5>
                  <h6>Heading 6 <span className="badge bg-info">New</span></h6>
                </div>
              </div>
            </div>
            {/* Button Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Button Badges</h5>
                  <p className="card-subtitle">Badges inside buttons for counters</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button type="button" className="btn btn-primary">
                      Notifications <span className="badge bg-light text-dark">4</span>
                    </button>
                    <button type="button" className="btn btn-secondary">
                      Messages <span className="badge bg-light text-dark">12</span>
                    </button>
                    <button type="button" className="btn btn-success">
                      Updates <span className="badge bg-light text-dark">3</span>
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline-primary">
                      Inbox <span className="badge bg-primary">99+</span>
                    </button>
                    <button type="button" className="btn btn-outline-danger">
                      Errors <span className="badge bg-danger">5</span>
                    </button>
                    <button type="button" className="btn btn-outline-warning">
                      Warnings <span className="badge bg-warning text-dark">8</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Badge Sizes & Icons */}
        <section className="section">
          <h5 className="section-title mb-3">Sizes &amp; Icons</h5>
          <div className="row g-4">
            {/* Badge Sizes */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Badge Sizes</h5>
                  <p className="card-subtitle">Different badge size variations</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-4">
                    <span className="badge bg-primary badge-sm">Small</span>
                    <span className="badge bg-primary">Default</span>
                    <span className="badge bg-primary badge-lg">Large</span>
                  </div>
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <span className="badge rounded-pill bg-success badge-sm">Small Pill</span>
                    <span className="badge rounded-pill bg-success">Default Pill</span>
                    <span className="badge rounded-pill bg-success badge-lg">Large Pill</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Badges with Icons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Badges with Icons</h5>
                  <p className="card-subtitle">Combine badges with icons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className="badge bg-primary"><i className="bi bi-star-fill me-1" /> Featured</span>
                    <span className="badge bg-success"><i className="bi bi-check-circle me-1" /> Verified</span>
                    <span className="badge bg-danger"><i className="bi bi-exclamation-triangle me-1" /> Alert</span>
                    <span className="badge bg-info"><i className="bi bi-info-circle me-1" /> Info</span>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge rounded-pill bg-primary"><i className="bi bi-heart-fill me-1" /> 245</span>
                    <span className="badge rounded-pill bg-secondary"><i className="bi bi-chat-fill me-1" /> 18</span>
                    <span className="badge rounded-pill bg-success"><i className="bi bi-eye-fill me-1" /> 1.2k</span>
                    <span className="badge rounded-pill bg-warning text-dark"><i className="bi bi-share-fill me-1" /> 32</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Positioned Badges */}
        <section className="section">
          <h5 className="section-title mb-3">Positioned Badges</h5>
          <div className="row g-4">
            {/* Notification Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Notification Badges</h5>
                  <p className="card-subtitle">Position badges on icons and avatars</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-4">
                    <button type="button" className="btn btn-primary position-relative">
                      Inbox
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                        <span className="visually-hidden">unread messages</span>
                      </span>
                    </button>
                    <button type="button" className="btn btn-outline-secondary position-relative">
                      <i className="bi bi-bell fs-5" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        5
                      </span>
                    </button>
                    <button type="button" className="btn btn-outline-secondary position-relative">
                      <i className="bi bi-cart fs-5" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                        3
                      </span>
                    </button>
                    <button type="button" className="btn btn-outline-secondary position-relative">
                      <i className="bi bi-envelope fs-5" />
                      <span className="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
                        <span className="visually-hidden">New alerts</span>
                      </span>
                    </button>
                  </div>
                  <hr />
                  <h6 className="small text-muted text-uppercase mb-3">Avatar Badges</h6>
                  <div className="d-flex flex-wrap align-items-center gap-4">
                    <div className="position-relative d-inline-block">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="Avatar" className="rounded-circle" width={48} height={48} />
                      <span className="position-absolute bottom-0 end-0 p-1 bg-success border border-2 border-white rounded-circle" />
                    </div>
                    <div className="position-relative d-inline-block">
                      <img src="/assets/img/avatars/avatar-2.webp" alt="Avatar" className="rounded-circle" width={48} height={48} />
                      <span className="position-absolute bottom-0 end-0 p-1 bg-danger border border-2 border-white rounded-circle" />
                    </div>
                    <div className="position-relative d-inline-block">
                      <img src="/assets/img/avatars/avatar-3.webp" alt="Avatar" className="rounded-circle" width={48} height={48} />
                      <span className="position-absolute bottom-0 end-0 p-1 bg-warning border border-2 border-white rounded-circle" />
                    </div>
                    <div className="position-relative d-inline-block">
                      <img src="/assets/img/avatars/avatar-4.webp" alt="Avatar" className="rounded-circle" width={48} height={48} />
                      <span className="position-absolute bottom-0 end-0 p-1 bg-secondary border border-2 border-white rounded-circle" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Link Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Link &amp; Clickable Badges</h5>
                  <p className="card-subtitle">Badges that are clickable links</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge bg-primary text-decoration-none">Primary Link</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge bg-secondary text-decoration-none">Secondary Link</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge bg-success text-decoration-none">Success Link</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge bg-danger text-decoration-none">Danger Link</a>
                  </div>
                  <h6 className="small text-muted text-uppercase mb-3">Tag Style</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge badge-soft-primary text-decoration-none">
                      <i className="bi bi-tag me-1" />JavaScript
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge badge-soft-success text-decoration-none">
                      <i className="bi bi-tag me-1" />Vue.js
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge badge-soft-info text-decoration-none">
                      <i className="bi bi-tag me-1" />React
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge badge-soft-warning text-decoration-none">
                      <i className="bi bi-tag me-1" />Angular
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="badge badge-soft-danger text-decoration-none">
                      <i className="bi bi-tag me-1" />Node.js
                    </a>
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
            {/* Status Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Status Indicators</h5>
                  <p className="card-subtitle">Common status badge patterns</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Order Status</h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className="badge badge-soft-warning">Pending</span>
                    <span className="badge badge-soft-info">Processing</span>
                    <span className="badge badge-soft-primary">Shipped</span>
                    <span className="badge badge-soft-success">Delivered</span>
                    <span className="badge badge-soft-danger">Cancelled</span>
                    <span className="badge badge-soft-secondary">Refunded</span>
                  </div>
                  <h6 className="small text-muted text-uppercase mb-3">User Status</h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <span className="badge bg-success"><i className="bi bi-circle-fill me-1 small" />Online</span>
                    <span className="badge bg-warning text-dark"><i className="bi bi-circle-fill me-1 small" />Away</span>
                    <span className="badge bg-danger"><i className="bi bi-circle-fill me-1 small" />Busy</span>
                    <span className="badge bg-secondary"><i className="bi bi-circle-fill me-1 small" />Offline</span>
                  </div>
                  <h6 className="small text-muted text-uppercase mb-3">Priority Levels</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <span className="badge bg-danger">Critical</span>
                    <span className="badge bg-warning text-dark">High</span>
                    <span className="badge bg-info">Medium</span>
                    <span className="badge bg-secondary">Low</span>
                  </div>
                </div>
              </div>
            </div>
            {/* List with Badges */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">List with Badges</h5>
                  <p className="card-subtitle">Badges in list items</p>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-envelope me-2 text-muted" />Inbox</span>
                      <span className="badge bg-primary rounded-pill">12</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-star me-2 text-muted" />Starred</span>
                      <span className="badge bg-warning rounded-pill text-dark">3</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-send me-2 text-muted" />Sent</span>
                      <span className="badge bg-secondary rounded-pill">24</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-file-earmark me-2 text-muted" />Drafts</span>
                      <span className="badge bg-info rounded-pill">5</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-trash me-2 text-muted" />Trash</span>
                      <span className="badge bg-danger rounded-pill">8</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Table with Badges */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Table with Badges</h5>
                  <p className="card-subtitle">Using badges in data tables</p>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>Product</th>
                          <th>Category</th>
                          <th>Status</th>
                          <th>Stock</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <div className="fw-medium">Premium Headphones</div>
                            <small className="text-muted">SKU: HP-001</small>
                          </td>
                          <td><span className="badge badge-soft-primary">Electronics</span></td>
                          <td><span className="badge bg-success">In Stock</span></td>
                          <td><span className="badge rounded-pill bg-light text-dark">245</span></td>
                          <td>$299.99</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="fw-medium">Wireless Mouse</div>
                            <small className="text-muted">SKU: WM-042</small>
                          </td>
                          <td><span className="badge badge-soft-primary">Electronics</span></td>
                          <td><span className="badge bg-warning text-dark">Low Stock</span></td>
                          <td><span className="badge rounded-pill bg-light text-dark">12</span></td>
                          <td>$49.99</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="fw-medium">USB-C Cable</div>
                            <small className="text-muted">SKU: UC-108</small>
                          </td>
                          <td><span className="badge badge-soft-secondary">Accessories</span></td>
                          <td><span className="badge bg-danger">Out of Stock</span></td>
                          <td><span className="badge rounded-pill bg-light text-dark">0</span></td>
                          <td>$19.99</td>
                        </tr>
                        <tr>
                          <td>
                            <div className="fw-medium">Laptop Stand <span className="badge bg-info badge-sm ms-1">New</span></div>
                            <small className="text-muted">SKU: LS-055</small>
                          </td>
                          <td><span className="badge badge-soft-warning">Furniture</span></td>
                          <td><span className="badge bg-success">In Stock</span></td>
                          <td><span className="badge rounded-pill bg-light text-dark">89</span></td>
                          <td>$79.99</td>
                        </tr>
                      </tbody>
                    </table>
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

export default ComponentsBadgesPage
