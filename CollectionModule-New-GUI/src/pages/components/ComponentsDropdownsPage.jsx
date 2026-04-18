function ComponentsDropdownsPage() {
  return (
    <div>
      <div className="main-content page-components-dropdowns">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Dropdowns</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Dropdowns</span>
          </nav>
        </div>
        {/* Basic Dropdowns */}
        <section className="section">
          <div className="row g-4">
            {/* Single Button */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Single Button Dropdowns</h5>
                  <p className="card-subtitle">Basic dropdown with button trigger</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Primary
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Secondary
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Success
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-danger dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Danger
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Split Button */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Split Button Dropdowns</h5>
                  <p className="card-subtitle">Dropdown with split toggle</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="btn-group">
                      <button type="button" className="btn btn-primary">Primary</button>
                      <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Separated link</a></li>
                      </ul>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-secondary">Secondary</button>
                      <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    <div className="btn-group">
                      <button type="button" className="btn btn-success">Success</button>
                      <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
                        <span className="visually-hidden">Toggle Dropdown</span>
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Dropdown Sizes & Outline */}
        <section className="section">
          <h5 className="section-title mb-3">Sizes &amp; Outline</h5>
          <div className="row g-4">
            {/* Sizes */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Dropdown Sizes</h5>
                  <p className="card-subtitle">Small, default, and large</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <div className="dropdown">
                      <button className="btn btn-primary btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Small
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Default
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-primary btn-lg dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Large
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Outline */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Outline Dropdowns</h5>
                  <p className="card-subtitle">Dropdowns with outline buttons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-outline-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Primary
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Secondary
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Success
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Directions */}
        <section className="section">
          <h5 className="section-title mb-3">Dropdown Directions</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Directions</h5>
                  <p className="card-subtitle">Up, down, start, and end</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    {/* Dropdown (default) */}
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Dropdown
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    {/* Dropup */}
                    <div className="dropup">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Dropup
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    {/* Dropstart */}
                    <div className="dropstart">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Dropstart
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    {/* Dropend */}
                    <div className="dropend">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Dropend
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Menu Alignment</h5>
                  <p className="card-subtitle">Align menu to start or end</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Default (Start)
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else here</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        End Aligned
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else here</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Menu Content */}
        <section className="section">
          <h5 className="section-title mb-3">Menu Content</h5>
          <div className="row g-4">
            {/* Headers & Dividers */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Headers &amp; Dividers</h5>
                  <p className="card-subtitle">Organize menu items</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        With Header
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <h6 className="dropdown-header">Dropdown header</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        With Divider
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Separated link</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Multiple Sections
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <h6 className="dropdown-header">Section 1</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Action</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another action</a></li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li>
                          <h6 className="dropdown-header">Section 2</h6>
                        </li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Something else</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Active & Disabled */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Active &amp; Disabled</h5>
                  <p className="card-subtitle">Item states</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        With Active
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Regular link</a></li>
                        <li><a className="dropdown-item active" href="#" onClick={(event) => event.preventDefault()}>Active link</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another link</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        With Disabled
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Regular link</a></li>
                        <li><a className="dropdown-item disabled" href="#" onClick={(event) => event.preventDefault()}>Disabled link</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Another link</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* With Icons & Forms */}
        <section className="section">
          <h5 className="section-title mb-3">Icons &amp; Forms</h5>
          <div className="row g-4">
            {/* With Icons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Dropdown with Icons</h5>
                  <p className="card-subtitle">Menu items with icons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        <i className="bi bi-gear me-1" /> Settings
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-person me-2" />Profile</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-gear me-2" />Settings</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-bell me-2" />Notifications</a></li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item text-danger" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-box-arrow-right me-2" />Logout</a></li>
                      </ul>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                        Actions
                      </button>
                      <ul className="dropdown-menu">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-eye me-2" />View</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-pencil me-2" />Edit</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-files me-2" />Duplicate</a></li>
                        <li>
                          <hr className="dropdown-divider" />
                        </li>
                        <li><a className="dropdown-item text-danger" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-trash me-2" />Delete</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* With Forms */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Dropdown Forms</h5>
                  <p className="card-subtitle">Form elements inside dropdown</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                        Login Form
                      </button>
                      <div className="dropdown-menu p-3" style={{width: 280}}>
                        <form>
                          <div className="mb-3">
                            <label htmlFor="dropdownEmail" className="form-label">Email</label>
                            <input type="email" className="form-control form-control-sm" id="dropdownEmail" placeholder="email@example.com" />
                          </div>
                          <div className="mb-3">
                            <label htmlFor="dropdownPassword" className="form-label">Password</label>
                            <input type="password" className="form-control form-control-sm" id="dropdownPassword" placeholder="Password" />
                          </div>
                          <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" id="dropdownCheck" />
                            <label className="form-check-label" htmlFor="dropdownCheck">Remember me</label>
                          </div>
                          <button type="submit" className="btn btn-primary btn-sm w-100">Sign in</button>
                        </form>
                      </div>
                    </div>
                    <div className="dropdown">
                      <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" data-bs-auto-close="outside">
                        Filter
                      </button>
                      <div className="dropdown-menu p-3" style={{width: 220}}>
                        <h6 className="dropdown-header px-0">Filter Options</h6>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="filterActive" defaultChecked />
                          <label className="form-check-label" htmlFor="filterActive">Active</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="filterPending" />
                          <label className="form-check-label" htmlFor="filterPending">Pending</label>
                        </div>
                        <div className="form-check">
                          <input className="form-check-input" type="checkbox" id="filterCompleted" />
                          <label className="form-check-label" htmlFor="filterCompleted">Completed</label>
                        </div>
                        <hr className="dropdown-divider" />
                        <button className="btn btn-sm btn-primary w-100">Apply</button>
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
            {/* User Menu */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">User Profile Menu</h5>
                  <p className="card-subtitle">Common user dropdown pattern</p>
                </div>
                <div className="card-body">
                  <div className="dropdown">
                    <button className="btn btn-light dropdown-toggle d-flex align-items-center" type="button" data-bs-toggle="dropdown">
                      <img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle me-2" width={32} height={32} alt="User" />
                      <span>John Doe</span>
                    </button>
                    <ul className="dropdown-menu">
                      <li className="px-3 py-2">
                        <div className="d-flex align-items-center">
                          <img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle me-2" width={40} height={40} alt="User" />
                          <div>
                            <div className="fw-medium">John Doe</div>
                            <small className="text-muted">john@example.com</small>
                          </div>
                        </div>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-person me-2" />My Profile</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-gear me-2" />Settings</a></li>
                      <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-credit-card me-2" />Billing</a></li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-question-circle me-2" />Help Center</a></li>
                      <li><a className="dropdown-item text-danger" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-box-arrow-right me-2" />Sign Out</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Notification Menu */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Notifications</h5>
                  <p className="card-subtitle">Notification dropdown</p>
                </div>
                <div className="card-body">
                  <div className="dropdown">
                    <button className="btn btn-light position-relative dropdown-toggle" type="button" data-bs-toggle="dropdown">
                      <i className="bi bi-bell fs-5" />
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        3
                      </span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end" style={{width: 320}}>
                      <div className="d-flex justify-content-between align-items-center px-3 py-2 border-bottom">
                        <h6 className="mb-0">Notifications</h6>
                        <a href="#" onClick={(event) => event.preventDefault()} className="text-primary small">Mark all read</a>
                      </div>
                      <div style={{maxHeight: 300, overflowY: 'auto'}}>
                        <a href="#" onClick={(event) => event.preventDefault()} className="dropdown-item py-2 bg-light">
                          <div className="d-flex">
                            <div className="flex-shrink-0">
                              <span className="avatar avatar-sm bg-primary-subtle text-primary rounded-circle p-2">
                                <i className="bi bi-cart" />
                              </span>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p className="mb-0">New order received</p>
                              <small className="text-muted">2 minutes ago</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" onClick={(event) => event.preventDefault()} className="dropdown-item py-2">
                          <div className="d-flex">
                            <div className="flex-shrink-0">
                              <img src="/assets/img/avatars/avatar-2.webp" className="rounded-circle" width={32} height={32} alt />
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p className="mb-0"><strong>Sarah</strong> commented on your post</p>
                              <small className="text-muted">1 hour ago</small>
                            </div>
                          </div>
                        </a>
                        <a href="#" onClick={(event) => event.preventDefault()} className="dropdown-item py-2">
                          <div className="d-flex">
                            <div className="flex-shrink-0">
                              <span className="avatar avatar-sm bg-success-subtle text-success rounded-circle p-2">
                                <i className="bi bi-check-lg" />
                              </span>
                            </div>
                            <div className="flex-grow-1 ms-3">
                              <p className="mb-0">Task completed successfully</p>
                              <small className="text-muted">3 hours ago</small>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="border-top px-3 py-2 text-center">
                        <a href="#" onClick={(event) => event.preventDefault()} className="text-primary small">View all notifications</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Table Actions */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Table Row Actions</h5>
                  <p className="card-subtitle">Action menu for table rows</p>
                </div>
                <div className="card-body">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Project Alpha</td>
                        <td><span className="badge bg-success">Active</span></td>
                        <td className="text-end">
                          <div className="dropdown">
                            <button className="btn btn-link btn-sm p-0" data-bs-toggle="dropdown">
                              <i className="bi bi-three-dots-vertical" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-eye me-2" />View</a></li>
                              <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-pencil me-2" />Edit</a></li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li><a className="dropdown-item text-danger" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-trash me-2" />Delete</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>Project Beta</td>
                        <td><span className="badge bg-warning">Pending</span></td>
                        <td className="text-end">
                          <div className="dropdown">
                            <button className="btn btn-link btn-sm p-0" data-bs-toggle="dropdown">
                              <i className="bi bi-three-dots-vertical" />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-eye me-2" />View</a></li>
                              <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-pencil me-2" />Edit</a></li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li><a className="dropdown-item text-danger" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-trash me-2" />Delete</a></li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
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

export default ComponentsDropdownsPage
