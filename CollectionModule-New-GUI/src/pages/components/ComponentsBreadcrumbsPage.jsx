function ComponentsBreadcrumbsPage() {
  return (
    <div>
      <div className="main-content page-components-breadcrumbs">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Breadcrumbs</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Breadcrumbs</span>
          </nav>
        </div>
        {/* Basic Breadcrumbs */}
        <section className="section">
          <div className="row g-4">
            {/* Default Breadcrumb */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Breadcrumb</h5>
                  <p className="card-subtitle">Basic breadcrumb navigation</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item active" aria-current="page">Home</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Library</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Library</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Products</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Electronics</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Smartphones</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* Dividers */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Custom Dividers</h5>
                  <p className="card-subtitle">Using different separator characters</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{'--bs-breadcrumb-divider': '">"'}}>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Library</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{'--bs-breadcrumb-divider': '"→"'}}>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Products</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Item</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb" style={{'--bs-breadcrumb-divider': '"|"'}}>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Category</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Page</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0" style={{'--bs-breadcrumb-divider': '"•"'}}>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Section</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Current</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Breadcrumb with Icons */}
        <section className="section">
          <h5 className="section-title mb-3">Breadcrumbs with Icons</h5>
          <div className="row g-4">
            {/* Icon Breadcrumbs */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Icons</h5>
                  <p className="card-subtitle">Breadcrumbs enhanced with icons</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-house-door" /></a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Library</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-house-door me-1" />Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-folder me-1" />Projects</a></li>
                      <li className="breadcrumb-item active" aria-current="page"><i className="bi bi-file-earmark me-1" />Document</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-grid me-1" />Dashboard</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-people me-1" />Users</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-person me-1" />Profile</a></li>
                      <li className="breadcrumb-item active" aria-current="page"><i className="bi bi-gear me-1" />Settings</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* Icon Only */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Icon Dividers</h5>
                  <p className="card-subtitle">Using icons as separators</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-chevron">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Products</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Details</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb breadcrumb-arrow">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Category</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Item</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb mb-0" style={{'--bs-breadcrumb-divider': 'url("data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="8" height="8"%3E%3Cpath d="M2.5 0L1 1.5 3.5 4 1 6.5 2.5 8l4-4-4-4z" fill="%236c757d"/%3E%3C/svg%3E")'}}>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Library</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Styled Breadcrumbs */}
        <section className="section">
          <h5 className="section-title mb-3">Styled Breadcrumbs</h5>
          <div className="row g-4">
            {/* Background Breadcrumbs */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Background</h5>
                  <p className="card-subtitle">Breadcrumbs with background styling</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-light p-3 rounded">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Library</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-primary bg-opacity-10 p-3 rounded">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()} className="text-primary">Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()} className="text-primary">Products</a></li>
                      <li className="breadcrumb-item active text-primary" aria-current="page">Item</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb bg-dark p-3 rounded mb-0">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()} className="text-light">Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()} className="text-light">Category</a></li>
                      <li className="breadcrumb-item active text-light opacity-75" aria-current="page">Page</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
            {/* Bordered Breadcrumbs */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Borders</h5>
                  <p className="card-subtitle">Bordered breadcrumb styles</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb border p-3 rounded">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Library</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Data</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb border-start border-primary border-3 bg-light p-3 rounded-0">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Products</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Item</li>
                    </ol>
                  </nav>
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb border-bottom pb-3 mb-0">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Home</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Section</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Page</li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Real-World Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* E-commerce */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">E-commerce Product Page</h5>
                  <p className="card-subtitle">Typical product navigation pattern</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-house-door" /></a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Electronics</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Computers</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Laptops</a></li>
                      <li className="breadcrumb-item active" aria-current="page">MacBook Pro 16"</li>
                    </ol>
                  </nav>
                  <div className="border rounded p-3">
                    <h5>MacBook Pro 16"</h5>
                    <p className="text-muted mb-0">Apple M3 Pro chip, 18GB RAM, 512GB SSD</p>
                  </div>
                </div>
              </div>
            </div>
            {/* File Manager */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">File Manager Navigation</h5>
                  <p className="card-subtitle">Folder path breadcrumb</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb bg-light p-2 rounded">
                      <li className="breadcrumb-item">
                        <a href="#" onClick={(event) => event.preventDefault()} className="d-flex align-items-center">
                          <i className="bi bi-hdd me-1" />My Drive
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#" onClick={(event) => event.preventDefault()} className="d-flex align-items-center">
                          <i className="bi bi-folder me-1" />Projects
                        </a>
                      </li>
                      <li className="breadcrumb-item">
                        <a href="#" onClick={(event) => event.preventDefault()} className="d-flex align-items-center">
                          <i className="bi bi-folder me-1" />2024
                        </a>
                      </li>
                      <li className="breadcrumb-item active d-flex align-items-center" aria-current="page">
                        <i className="bi bi-folder-fill me-1 text-warning" />Website Redesign
                      </li>
                    </ol>
                  </nav>
                  <div className="d-flex gap-3">
                    <div className="text-center">
                      <i className="bi bi-file-earmark-pdf text-danger fs-1" />
                      <div className="small">proposal.pdf</div>
                    </div>
                    <div className="text-center">
                      <i className="bi bi-file-earmark-image text-primary fs-1" />
                      <div className="small">mockup.png</div>
                    </div>
                    <div className="text-center">
                      <i className="bi bi-file-earmark-zip text-warning fs-1" />
                      <div className="small">assets.zip</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Documentation */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Documentation Site</h5>
                  <p className="card-subtitle">Technical docs navigation</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb" style={{'--bs-breadcrumb-divider': '"/"'}}>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Docs</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Components</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Forms</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Validation</li>
                    </ol>
                  </nav>
                  <div className="border-start border-primary border-3 ps-3">
                    <h5>Form Validation</h5>
                    <p className="text-muted small mb-2">Provide valuable, actionable feedback to your users with HTML5 form validation.</p>
                    <div className="d-flex gap-2">
                      <span className="badge badge-soft-primary">v5.3</span>
                      <span className="badge badge-soft-success">Stable</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Admin Panel */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Admin Settings</h5>
                  <p className="card-subtitle">Multi-level settings navigation</p>
                </div>
                <div className="card-body">
                  <nav aria-label="breadcrumb" className="mb-4">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-speedometer2 me-1" />Dashboard</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-gear me-1" />Settings</a></li>
                      <li className="breadcrumb-item"><a href="#" onClick={(event) => event.preventDefault()}>Security</a></li>
                      <li className="breadcrumb-item active" aria-current="page">Two-Factor Authentication</li>
                    </ol>
                  </nav>
                  <div className="alert alert-info mb-0">
                    <div className="d-flex">
                      <i className="bi bi-shield-check me-2 fs-5" />
                      <div>
                        <strong>Enhance your security</strong>
                        <p className="mb-0 small">Two-factor authentication adds an extra layer of security to your account.</p>
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

export default ComponentsBreadcrumbsPage
