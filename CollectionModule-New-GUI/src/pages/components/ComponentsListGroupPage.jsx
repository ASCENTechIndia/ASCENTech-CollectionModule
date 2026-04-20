import { Link } from 'react-router-dom';
function ComponentsListGroupPage() {
  return (
    <div>
      <div className="main-content page-components-list-group">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">List Group</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">List Group</span>
          </nav>
        </div>
        {/* Basic List Groups */}
        <section className="section">
          <div className="row g-4">
            {/* Basic */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Basic List Group</h5>
                  <p className="card-subtitle">Simple list of items</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Active & Disabled */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Active &amp; Disabled</h5>
                  <p className="card-subtitle">Items with different states</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item active" aria-current="true">Active item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item disabled" aria-disabled="true">Disabled item</li>
                    <li className="list-group-item">And a fifth one</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Links & Buttons */}
        <section className="section">
          <h5 className="section-title mb-3">Links &amp; Buttons</h5>
          <div className="row g-4">
            {/* Links */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Actionable Items (Links)</h5>
                  <p className="card-subtitle">Clickable list items as links</p>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action active" aria-current="true">
                      Active link item
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action">A second link item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action">A third link item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action">A fourth link item</a>
                    <a className="list-group-item list-group-item-action disabled" aria-disabled="true">Disabled link item</a>
                  </div>
                </div>
              </div>
            </div>
            {/* Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Actionable Items (Buttons)</h5>
                  <p className="card-subtitle">Clickable list items as buttons</p>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <button type="button" className="list-group-item list-group-item-action active" aria-current="true">
                      Active button item
                    </button>
                    <button type="button" className="list-group-item list-group-item-action">A second button item</button>
                    <button type="button" className="list-group-item list-group-item-action">A third button item</button>
                    <button type="button" className="list-group-item list-group-item-action">A fourth button item</button>
                    <button type="button" className="list-group-item list-group-item-action" disabled>Disabled button item</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Flush & Numbered */}
        <section className="section">
          <h5 className="section-title mb-3">Flush &amp; Numbered</h5>
          <div className="row g-4">
            {/* Flush */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Flush List Group</h5>
                  <p className="card-subtitle">Remove outer borders and rounded corners</p>
                </div>
                <div className="card-body p-0">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                    <li className="list-group-item">A fourth item</li>
                    <li className="list-group-item">And a fifth one</li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Numbered */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Numbered List Group</h5>
                  <p className="card-subtitle">Auto-numbered list items</p>
                </div>
                <div className="card-body">
                  <ol className="list-group list-group-numbered">
                    <li className="list-group-item">First item in the list</li>
                    <li className="list-group-item">Second item in the list</li>
                    <li className="list-group-item">Third item in the list</li>
                    <li className="list-group-item">Fourth item in the list</li>
                    <li className="list-group-item">Fifth item in the list</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Horizontal */}
        <section className="section">
          <h5 className="section-title mb-3">Horizontal List Group</h5>
          <div className="row g-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Horizontal Layouts</h5>
                  <p className="card-subtitle">Display items horizontally at different breakpoints</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Always Horizontal</h6>
                  <ul className="list-group list-group-horizontal mb-4">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">Horizontal from SM</h6>
                  <ul className="list-group list-group-horizontal-sm mb-4">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">Horizontal from MD</h6>
                  <ul className="list-group list-group-horizontal-md mb-4">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                  </ul>
                  <h6 className="small text-muted text-uppercase mb-3">Horizontal from LG</h6>
                  <ul className="list-group list-group-horizontal-lg">
                    <li className="list-group-item">An item</li>
                    <li className="list-group-item">A second item</li>
                    <li className="list-group-item">A third item</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Contextual Colors */}
        <section className="section">
          <h5 className="section-title mb-3">Contextual Colors</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Background Colors</h5>
                  <p className="card-subtitle">Contextual background variants</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item list-group-item-primary">Primary list item</li>
                    <li className="list-group-item list-group-item-secondary">Secondary list item</li>
                    <li className="list-group-item list-group-item-success">Success list item</li>
                    <li className="list-group-item list-group-item-danger">Danger list item</li>
                    <li className="list-group-item list-group-item-warning">Warning list item</li>
                    <li className="list-group-item list-group-item-info">Info list item</li>
                    <li className="list-group-item list-group-item-light">Light list item</li>
                    <li className="list-group-item list-group-item-dark">Dark list item</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Actionable Colored Items</h5>
                  <p className="card-subtitle">Clickable colored list items</p>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action list-group-item-primary">Primary action item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action list-group-item-secondary">Secondary action item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action list-group-item-success">Success action item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action list-group-item-danger">Danger action item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action list-group-item-warning">Warning action item</a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action list-group-item-info">Info action item</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* With Badges */}
        <section className="section">
          <h5 className="section-title mb-3">With Badges &amp; Icons</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Badges</h5>
                  <p className="card-subtitle">List items with badge counters</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Inbox
                      <span className="badge bg-primary rounded-pill">14</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Drafts
                      <span className="badge bg-secondary rounded-pill">2</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Sent
                      <span className="badge bg-success rounded-pill">1</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Spam
                      <span className="badge bg-danger rounded-pill">99+</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      Trash
                      <span className="badge bg-warning rounded-pill text-dark">5</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Icons</h5>
                  <p className="card-subtitle">List items with leading icons</p>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action d-flex align-items-center">
                      <i className="bi bi-house me-3 text-primary" />
                      <span>Dashboard</span>
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action d-flex align-items-center">
                      <i className="bi bi-person me-3 text-success" />
                      <span>Profile</span>
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action d-flex align-items-center">
                      <i className="bi bi-envelope me-3 text-info" />
                      <span>Messages</span>
                      <span className="badge bg-info ms-auto">3</span>
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action d-flex align-items-center">
                      <i className="bi bi-gear me-3 text-secondary" />
                      <span>Settings</span>
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action d-flex align-items-center text-danger">
                      <i className="bi bi-box-arrow-right me-3" />
                      <span>Logout</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Custom Content */}
        <section className="section">
          <h5 className="section-title mb-3">Custom Content</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Rich Content</h5>
                  <p className="card-subtitle">List items with headings and text</p>
                </div>
                <div className="card-body">
                  <div className="list-group">
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action active" aria-current="true">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small>3 days ago</small>
                      </div>
                      <p className="mb-1">Some placeholder content in a paragraph.</p>
                      <small>And some small print.</small>
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Some placeholder content in a paragraph.</p>
                      <small className="text-muted">And some muted small print.</small>
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="list-group-item list-group-item-action">
                      <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">List group item heading</h5>
                        <small className="text-muted">3 days ago</small>
                      </div>
                      <p className="mb-1">Some placeholder content in a paragraph.</p>
                      <small className="text-muted">And some muted small print.</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Checkboxes</h5>
                  <p className="card-subtitle">Selectable list items</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultValue id="listCheck1" defaultChecked />
                      <label className="form-check-label stretched-link" htmlFor="listCheck1">First checkbox</label>
                    </li>
                    <li className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultValue id="listCheck2" />
                      <label className="form-check-label stretched-link" htmlFor="listCheck2">Second checkbox</label>
                    </li>
                    <li className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultValue id="listCheck3" />
                      <label className="form-check-label stretched-link" htmlFor="listCheck3">Third checkbox</label>
                    </li>
                    <li className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultValue id="listCheck4" />
                      <label className="form-check-label stretched-link" htmlFor="listCheck4">Fourth checkbox</label>
                    </li>
                    <li className="list-group-item">
                      <input className="form-check-input me-2" type="checkbox" defaultValue id="listCheck5" />
                      <label className="form-check-label stretched-link" htmlFor="listCheck5">Fifth checkbox</label>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Real-World Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* User List */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">Team Members</h5>
                  <span className="badge bg-primary">5 members</span>
                </div>
                <div className="card-body p-0">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item d-flex align-items-center">
                      <img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle me-3" width={40} height={40} alt="User" />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Sarah Johnson</h6>
                        <small className="text-muted">Product Designer</small>
                      </div>
                      <span className="badge bg-success">Online</span>
                    </div>
                    <div className="list-group-item d-flex align-items-center">
                      <img src="/assets/img/avatars/avatar-2.webp" className="rounded-circle me-3" width={40} height={40} alt="User" />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Michael Chen</h6>
                        <small className="text-muted">Frontend Developer</small>
                      </div>
                      <span className="badge bg-success">Online</span>
                    </div>
                    <div className="list-group-item d-flex align-items-center">
                      <img src="/assets/img/avatars/avatar-3.webp" className="rounded-circle me-3" width={40} height={40} alt="User" />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Emily Davis</h6>
                        <small className="text-muted">Backend Developer</small>
                      </div>
                      <span className="badge bg-warning text-dark">Away</span>
                    </div>
                    <div className="list-group-item d-flex align-items-center">
                      <img src="/assets/img/avatars/avatar-4.webp" className="rounded-circle me-3" width={40} height={40} alt="User" />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">James Wilson</h6>
                        <small className="text-muted">DevOps Engineer</small>
                      </div>
                      <span className="badge bg-secondary">Offline</span>
                    </div>
                    <div className="list-group-item d-flex align-items-center">
                      <img src="/assets/img/avatars/avatar-5.webp" className="rounded-circle me-3" width={40} height={40} alt="User" />
                      <div className="flex-grow-1">
                        <h6 className="mb-0">Lisa Thompson</h6>
                        <small className="text-muted">Project Manager</small>
                      </div>
                      <span className="badge bg-danger">Busy</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Activity Feed */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title mb-0">Recent Activity</h5>
                </div>
                <div className="card-body p-0">
                  <div className="list-group list-group-flush">
                    <div className="list-group-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <span className="bg-primary-subtle text-primary rounded-circle d-flex align-items-center justify-content-center" style={{width: 36, height: 36}}>
                            <i className="bi bi-plus-lg" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="mb-1"><strong>New project created</strong></p>
                          <small className="text-muted">Website Redesign project was created</small>
                          <br /><small className="text-muted">2 minutes ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <span className="bg-success-subtle text-success rounded-circle d-flex align-items-center justify-content-center" style={{width: 36, height: 36}}>
                            <i className="bi bi-check-lg" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="mb-1"><strong>Task completed</strong></p>
                          <small className="text-muted">Design mockups completed by Sarah</small>
                          <br /><small className="text-muted">1 hour ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <span className="bg-warning-subtle text-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: 36, height: 36}}>
                            <i className="bi bi-chat-dots" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="mb-1"><strong>New comment</strong></p>
                          <small className="text-muted">Michael commented on the design file</small>
                          <br /><small className="text-muted">3 hours ago</small>
                        </div>
                      </div>
                    </div>
                    <div className="list-group-item">
                      <div className="d-flex">
                        <div className="flex-shrink-0">
                          <span className="bg-info-subtle text-info rounded-circle d-flex align-items-center justify-content-center" style={{width: 36, height: 36}}>
                            <i className="bi bi-upload" />
                          </span>
                        </div>
                        <div className="flex-grow-1 ms-3">
                          <p className="mb-1"><strong>File uploaded</strong></p>
                          <small className="text-muted">assets.zip was uploaded to the project</small>
                          <br /><small className="text-muted">5 hours ago</small>
                        </div>
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

export default ComponentsListGroupPage
