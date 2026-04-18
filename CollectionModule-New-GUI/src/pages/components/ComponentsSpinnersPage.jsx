function ComponentsSpinnersPage() {
  return (
    <div>
      <div className="main-content page-components-spinners">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Spinners</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Spinners</span>
          </nav>
        </div>
        {/* Border Spinners */}
        <section className="section">
          <div className="row g-4">
            {/* Border Spinner */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Border Spinner</h5>
                  <p className="card-subtitle">Lightweight loading indicator with border animation</p>
                </div>
                <div className="card-body">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Growing Spinner */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Growing Spinner</h5>
                  <p className="card-subtitle">Repeatedly grows and fades the spinner</p>
                </div>
                <div className="card-body">
                  <div className="spinner-grow" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Colored Spinners */}
        <section className="section">
          <h5 className="section-title mb-3">Colored Spinners</h5>
          <div className="row g-4">
            {/* Border Spinner Colors */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Border Spinner Colors</h5>
                  <p className="card-subtitle">Border spinners with different color variants</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-3">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-border text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Growing Spinner Colors */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Growing Spinner Colors</h5>
                  <p className="card-subtitle">Growing spinners with different color variants</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-3">
                    <div className="spinner-grow text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-secondary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-warning" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-light" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Spinner Sizes */}
        <section className="section">
          <h5 className="section-title mb-3">Spinner Sizes</h5>
          <div className="row g-4">
            {/* Border Spinner Sizes */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Border Spinner Sizes</h5>
                  <p className="card-subtitle">Small, default, and custom sized spinners</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-4">
                    <div className="text-center">
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Small</p>
                    </div>
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Default</p>
                    </div>
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Large (3rem)</p>
                    </div>
                    <div className="text-center">
                      <div className="spinner-border text-primary" role="status" style={{width: '4rem', height: '4rem'}}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Extra Large</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Growing Spinner Sizes */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Growing Spinner Sizes</h5>
                  <p className="card-subtitle">Small, default, and custom sized growing spinners</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-4">
                    <div className="text-center">
                      <div className="spinner-grow spinner-grow-sm text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Small</p>
                    </div>
                    <div className="text-center">
                      <div className="spinner-grow text-success" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Default</p>
                    </div>
                    <div className="text-center">
                      <div className="spinner-grow text-success" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Large (3rem)</p>
                    </div>
                    <div className="text-center">
                      <div className="spinner-grow text-success" role="status" style={{width: '4rem', height: '4rem'}}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="small text-muted mt-2 mb-0">Extra Large</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Spinners with Buttons */}
        <section className="section">
          <h5 className="section-title mb-3">Spinners in Buttons</h5>
          <div className="row g-4">
            {/* Border Spinner Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Border Spinner in Buttons</h5>
                  <p className="card-subtitle">Loading state indicators for buttons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                      <span className="visually-hidden">Loading...</span>
                    </button>
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Loading...
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <button className="btn btn-success" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Saving...
                    </button>
                    <button className="btn btn-danger" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Deleting...
                    </button>
                    <button className="btn btn-warning" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Processing...
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-outline-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Loading...
                    </button>
                    <button className="btn btn-outline-secondary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                      Please wait...
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Growing Spinner Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Growing Spinner in Buttons</h5>
                  <p className="card-subtitle">Alternative loading style for buttons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm" aria-hidden="true" />
                      <span className="visually-hidden">Loading...</span>
                    </button>
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />
                      Loading...
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2 mb-3">
                    <button className="btn btn-success" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />
                      Uploading...
                    </button>
                    <button className="btn btn-info" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />
                      Syncing...
                    </button>
                    <button className="btn btn-secondary" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />
                      Connecting...
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-outline-success" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />
                      Submitting...
                    </button>
                    <button className="btn btn-outline-info" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-2" aria-hidden="true" />
                      Fetching...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Alignment & Placement */}
        <section className="section">
          <h5 className="section-title mb-3">Alignment &amp; Placement</h5>
          <div className="row g-4">
            {/* Flex Alignment */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Flex Alignment</h5>
                  <p className="card-subtitle">Center spinners using flexbox utilities</p>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-center mb-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between mb-4">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <div className="spinner-grow text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="spinner-border text-info" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Text Alignment */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Text Alignment</h5>
                  <p className="card-subtitle">Center spinners using text alignment utilities</p>
                </div>
                <div className="card-body">
                  <div className="text-start mb-4">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ms-2">Left aligned</span>
                  </div>
                  <div className="text-center mb-4">
                    <div className="spinner-border text-success" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <span className="ms-2">Center aligned</span>
                  </div>
                  <div className="text-end">
                    <span className="me-2">Right aligned</span>
                    <div className="spinner-border text-danger" role="status">
                      <span className="visually-hidden">Loading...</span>
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
            {/* Loading Card */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Loading Card</h5>
                  <p className="card-subtitle">Card with loading overlay</p>
                </div>
                <div className="card-body">
                  <div className="position-relative">
                    <div className="border rounded p-4" style={{minHeight: 200}}>
                      <h6>Card Content</h6>
                      <p className="text-muted mb-0">This content is being loaded...</p>
                    </div>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-white bg-opacity-75 rounded">
                      <div className="text-center">
                        <div className="spinner-border text-primary mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mb-0 small text-muted">Loading content...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Loading Table */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Loading Table</h5>
                  <p className="card-subtitle">Table with loading state</p>
                </div>
                <div className="card-body">
                  <div className="position-relative">
                    <table className="table table-sm mb-0">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={3} className="text-center py-5">
                            <div className="spinner-border spinner-border-sm text-primary me-2" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            <span className="text-muted">Loading data...</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Page Loading */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Page Loading Overlay</h5>
                  <p className="card-subtitle">Full page loading indicator example</p>
                </div>
                <div className="card-body">
                  <div className="position-relative bg-light rounded" style={{minHeight: 250}}>
                    <div className="position-absolute top-0 start-0 w-100 h-100 d-flex flex-column align-items-center justify-content-center">
                      <div className="spinner-border text-primary" role="status" style={{width: '3rem', height: '3rem'}}>
                        <span className="visually-hidden">Loading...</span>
                      </div>
                      <p className="mt-3 mb-0 fw-medium">Loading, please wait...</p>
                      <p className="small text-muted">This may take a few moments</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Inline Loading */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Inline Loading States</h5>
                  <p className="card-subtitle">Spinners used inline with content</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Checking server status...</span>
                      <div className="spinner-border spinner-border-sm text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Verifying credentials...</span>
                      <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Database connection</span>
                      <span className="badge bg-success"><i className="bi bi-check" /> Connected</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span>Loading user profile...</span>
                      <div className="spinner-border spinner-border-sm text-info" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Form Submission */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Form Submission</h5>
                  <p className="card-subtitle">Loading state during form submission</p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="exampleEmail" className="form-label">Email address</label>
                      <input type="email" className="form-control" id="exampleEmail" defaultValue="john@example.com" disabled />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="examplePassword" className="form-label">Password</label>
                      <input type="password" className="form-control" id="examplePassword" defaultValue="password123" disabled />
                    </div>
                    <div className="d-flex gap-2">
                      <button type="submit" className="btn btn-primary" disabled>
                        <span className="spinner-border spinner-border-sm me-2" aria-hidden="true" />
                        Signing in...
                      </button>
                      <button type="button" className="btn btn-outline-secondary" disabled>Cancel</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Multiple Spinners Animation */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Multiple Spinners</h5>
                  <p className="card-subtitle">Creative loading animations with multiple spinners</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-4">
                    {/* Dots Loading */}
                    <div className="text-center">
                      <p className="small text-muted mb-2">Growing Dots</p>
                      <div className="d-flex justify-content-center gap-2">
                        <div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{animationDelay: '0s'}}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{animationDelay: '0.15s'}}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-primary" role="status" style={{animationDelay: '0.3s'}}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                    {/* Rainbow Spinners */}
                    <div className="text-center">
                      <p className="small text-muted mb-2">Rainbow Loading</p>
                      <div className="d-flex justify-content-center gap-1">
                        <div className="spinner-grow spinner-grow-sm text-primary" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-success" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-warning" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-danger" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-grow spinner-grow-sm text-info" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                    {/* Concentric Spinners */}
                    <div className="text-center">
                      <p className="small text-muted mb-2">Concentric Spinners</p>
                      <div className="position-relative d-inline-block" style={{width: 48, height: 48}}>
                        <div className="spinner-border text-primary position-absolute top-50 start-50 translate-middle" role="status" style={{width: 48, height: 48}}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <div className="spinner-border text-success position-absolute top-50 start-50 translate-middle" role="status" style={{width: 32, height: 32, animationDirection: 'reverse'}}>
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Empty State with Loading */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Search Results Loading</h5>
                  <p className="card-subtitle">Loading state for search or filter operations</p>
                </div>
                <div className="card-body">
                  <div className="input-group mb-3">
                    <input type="text" className="form-control" placeholder="Search..." defaultValue="bootstrap" disabled />
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" aria-hidden="true" />
                    </button>
                  </div>
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary mb-3" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="text-muted mb-0">Searching for "bootstrap"...</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Skeleton with Spinner */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Widget Loading</h5>
                  <p className="card-subtitle">Loading state for dashboard widgets</p>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="border rounded p-3 text-center">
                        <div className="spinner-border spinner-border-sm text-primary mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="small text-muted mb-0">Revenue</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3 text-center">
                        <div className="spinner-border spinner-border-sm text-success mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="small text-muted mb-0">Orders</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3 text-center">
                        <div className="spinner-border spinner-border-sm text-warning mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="small text-muted mb-0">Users</p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3 text-center">
                        <div className="spinner-border spinner-border-sm text-info mb-2" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="small text-muted mb-0">Visits</p>
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

export default ComponentsSpinnersPage
