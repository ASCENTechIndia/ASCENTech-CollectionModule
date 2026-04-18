function ComponentsButtonsPage() {
  return (
    <div>
      <div className="main-content page-components-buttons">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Buttons</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Buttons</span>
          </nav>
        </div>
        {/* Basic Buttons */}
        <section className="section">
          <div className="row g-4">
            {/* Solid Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Solid Buttons</h5>
                  <p className="card-subtitle">Default button styles</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-primary">Primary</button>
                    <button type="button" className="btn btn-secondary">Secondary</button>
                    <button type="button" className="btn btn-success">Success</button>
                    <button type="button" className="btn btn-danger">Danger</button>
                    <button type="button" className="btn btn-warning">Warning</button>
                    <button type="button" className="btn btn-info">Info</button>
                    <button type="button" className="btn btn-light">Light</button>
                    <button type="button" className="btn btn-dark">Dark</button>
                    <button type="button" className="btn btn-link">Link</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Outline Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Outline Buttons</h5>
                  <p className="card-subtitle">Buttons with outlined style</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline-primary">Primary</button>
                    <button type="button" className="btn btn-outline-secondary">Secondary</button>
                    <button type="button" className="btn btn-outline-success">Success</button>
                    <button type="button" className="btn btn-outline-danger">Danger</button>
                    <button type="button" className="btn btn-outline-warning">Warning</button>
                    <button type="button" className="btn btn-outline-info">Info</button>
                    <button type="button" className="btn btn-outline-light">Light</button>
                    <button type="button" className="btn btn-outline-dark">Dark</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Soft & Ghost Buttons */}
        <section className="section">
          <h5 className="section-title mb-3">Additional Styles</h5>
          <div className="row g-4">
            {/* Soft Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Soft Buttons</h5>
                  <p className="card-subtitle">Light background with colored text</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-soft-primary">Primary</button>
                    <button type="button" className="btn btn-soft-secondary">Secondary</button>
                    <button type="button" className="btn btn-soft-success">Success</button>
                    <button type="button" className="btn btn-soft-danger">Danger</button>
                    <button type="button" className="btn btn-soft-warning">Warning</button>
                    <button type="button" className="btn btn-soft-info">Info</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Gradient Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Gradient Buttons</h5>
                  <p className="card-subtitle">Buttons with gradient backgrounds</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-gradient-primary">Primary</button>
                    <button type="button" className="btn btn-gradient-success">Success</button>
                    <button type="button" className="btn btn-gradient-danger">Danger</button>
                    <button type="button" className="btn btn-gradient-warning">Warning</button>
                    <button type="button" className="btn btn-gradient-info">Info</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Button Sizes */}
        <section className="section">
          <h5 className="section-title mb-3">Button Sizes</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Size Variations</h5>
                  <p className="card-subtitle">Small, default, and large buttons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                    <button type="button" className="btn btn-primary btn-sm">Small</button>
                    <button type="button" className="btn btn-primary">Default</button>
                    <button type="button" className="btn btn-primary btn-lg">Large</button>
                  </div>
                  <div className="d-flex flex-wrap align-items-center gap-2">
                    <button type="button" className="btn btn-outline-secondary btn-sm">Small</button>
                    <button type="button" className="btn btn-outline-secondary">Default</button>
                    <button type="button" className="btn btn-outline-secondary btn-lg">Large</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Block Buttons</h5>
                  <p className="card-subtitle">Full-width button options</p>
                </div>
                <div className="card-body">
                  <div className="d-grid gap-2">
                    <button className="btn btn-primary" type="button">Block Button</button>
                    <button className="btn btn-outline-secondary" type="button">Block Button</button>
                  </div>
                  <hr />
                  <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                    <button className="btn btn-secondary" type="button">Cancel</button>
                    <button className="btn btn-primary" type="button">Save Changes</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Buttons with Icons */}
        <section className="section">
          <h5 className="section-title mb-3">Buttons with Icons</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Icon Buttons</h5>
                  <p className="card-subtitle">Buttons with icons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button type="button" className="btn btn-primary">
                      <i className="bi bi-download me-1" /> Download
                    </button>
                    <button type="button" className="btn btn-success">
                      <i className="bi bi-check-lg me-1" /> Approve
                    </button>
                    <button type="button" className="btn btn-danger">
                      <i className="bi bi-trash me-1" /> Delete
                    </button>
                    <button type="button" className="btn btn-info">
                      <i className="bi bi-upload me-1" /> Upload
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-outline-primary">
                      Edit <i className="bi bi-pencil ms-1" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      Share <i className="bi bi-share ms-1" />
                    </button>
                    <button type="button" className="btn btn-outline-success">
                      Next <i className="bi bi-arrow-right ms-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Icon Only Buttons</h5>
                  <p className="card-subtitle">Square and circle icon buttons</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Square Icons</h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button type="button" className="btn btn-primary btn-icon">
                      <i className="bi bi-plus-lg" />
                    </button>
                    <button type="button" className="btn btn-success btn-icon">
                      <i className="bi bi-check-lg" />
                    </button>
                    <button type="button" className="btn btn-danger btn-icon">
                      <i className="bi bi-x-lg" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-icon">
                      <i className="bi bi-gear" />
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-icon">
                      <i className="bi bi-search" />
                    </button>
                  </div>
                  <h6 className="small text-muted text-uppercase mb-3">Circle Icons</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-primary btn-icon rounded-circle">
                      <i className="bi bi-plus-lg" />
                    </button>
                    <button type="button" className="btn btn-success btn-icon rounded-circle">
                      <i className="bi bi-check-lg" />
                    </button>
                    <button type="button" className="btn btn-danger btn-icon rounded-circle">
                      <i className="bi bi-x-lg" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-icon rounded-circle">
                      <i className="bi bi-gear" />
                    </button>
                    <button type="button" className="btn btn-outline-primary btn-icon rounded-circle">
                      <i className="bi bi-search" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Button States */}
        <section className="section">
          <h5 className="section-title mb-3">Button States</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Active &amp; Disabled</h5>
                  <p className="card-subtitle">Different button states</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Active State</h6>
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button type="button" className="btn btn-primary active">Active Primary</button>
                    <button type="button" className="btn btn-outline-primary active">Active Outline</button>
                  </div>
                  <h6 className="small text-muted text-uppercase mb-3">Disabled State</h6>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-primary" disabled>Disabled Primary</button>
                    <button type="button" className="btn btn-secondary" disabled>Disabled Secondary</button>
                    <button type="button" className="btn btn-outline-primary" disabled>Disabled Outline</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Loading States</h5>
                  <p className="card-subtitle">Buttons with loading indicators</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button className="btn btn-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                      Loading...
                    </button>
                    <button className="btn btn-secondary" type="button" disabled>
                      <span className="spinner-grow spinner-grow-sm me-1" role="status" aria-hidden="true" />
                      Loading...
                    </button>
                  </div>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-outline-primary" type="button" disabled>
                      <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
                      <span className="visually-hidden">Loading...</span>
                    </button>
                    <button className="btn btn-success" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                      Saving...
                    </button>
                    <button className="btn btn-danger" type="button" disabled>
                      <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true" />
                      Deleting...
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Button Groups */}
        <section className="section">
          <h5 className="section-title mb-3">Button Groups</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Basic Button Groups</h5>
                  <p className="card-subtitle">Group buttons together</p>
                </div>
                <div className="card-body">
                  <div className="btn-group mb-3" role="group" aria-label="Basic example">
                    <button type="button" className="btn btn-primary">Left</button>
                    <button type="button" className="btn btn-primary">Middle</button>
                    <button type="button" className="btn btn-primary">Right</button>
                  </div>
                  <br />
                  <div className="btn-group mb-3" role="group" aria-label="Outline example">
                    <button type="button" className="btn btn-outline-secondary">Left</button>
                    <button type="button" className="btn btn-outline-secondary">Middle</button>
                    <button type="button" className="btn btn-outline-secondary">Right</button>
                  </div>
                  <br />
                  <div className="btn-group" role="group" aria-label="Mixed styles">
                    <button type="button" className="btn btn-danger">Delete</button>
                    <button type="button" className="btn btn-warning">Archive</button>
                    <button type="button" className="btn btn-success">Approve</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Button Toolbar</h5>
                  <p className="card-subtitle">Combine groups into toolbars</p>
                </div>
                <div className="card-body">
                  <div className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group me-2" role="group" aria-label="First group">
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-type-bold" /></button>
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-type-italic" /></button>
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-type-underline" /></button>
                    </div>
                    <div className="btn-group me-2" role="group" aria-label="Second group">
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-text-left" /></button>
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-text-center" /></button>
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-text-right" /></button>
                    </div>
                    <div className="btn-group" role="group" aria-label="Third group">
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-link-45deg" /></button>
                    </div>
                  </div>
                  <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with input">
                    <div className="btn-group me-2" role="group">
                      <button type="button" className="btn btn-outline-primary"><i className="bi bi-skip-backward" /></button>
                      <button type="button" className="btn btn-primary"><i className="bi bi-play-fill" /></button>
                      <button type="button" className="btn btn-outline-primary"><i className="bi bi-skip-forward" /></button>
                    </div>
                    <div className="btn-group" role="group">
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-volume-mute" /></button>
                      <button type="button" className="btn btn-outline-secondary"><i className="bi bi-volume-up" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Toggle & Checkbox Buttons */}
        <section className="section">
          <h5 className="section-title mb-3">Toggle Buttons</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Checkbox Buttons</h5>
                  <p className="card-subtitle">Toggle multiple options</p>
                </div>
                <div className="card-body">
                  <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                    <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-primary" htmlFor="btncheck1">Checkbox 1</label>
                    <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="btncheck2">Checkbox 2</label>
                    <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="btncheck3">Checkbox 3</label>
                  </div>
                  <hr />
                  <h6 className="small text-muted text-uppercase mb-3">Icon Toggle</h6>
                  <div className="btn-group" role="group">
                    <input type="checkbox" className="btn-check" id="btncheckIcon1" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-danger" htmlFor="btncheckIcon1"><i className="bi bi-heart-fill" /></label>
                    <input type="checkbox" className="btn-check" id="btncheckIcon2" autoComplete="off" />
                    <label className="btn btn-outline-warning" htmlFor="btncheckIcon2"><i className="bi bi-star-fill" /></label>
                    <input type="checkbox" className="btn-check" id="btncheckIcon3" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="btncheckIcon3"><i className="bi bi-bookmark-fill" /></label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Radio Buttons</h5>
                  <p className="card-subtitle">Toggle single option</p>
                </div>
                <div className="card-body">
                  <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-primary" htmlFor="btnradio1">Radio 1</label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="btnradio2">Radio 2</label>
                    <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />
                    <label className="btn btn-outline-primary" htmlFor="btnradio3">Radio 3</label>
                  </div>
                  <hr />
                  <h6 className="small text-muted text-uppercase mb-3">View Mode Toggle</h6>
                  <div className="btn-group" role="group">
                    <input type="radio" className="btn-check" name="viewMode" id="viewModeGrid" autoComplete="off" defaultChecked />
                    <label className="btn btn-outline-secondary" htmlFor="viewModeGrid"><i className="bi bi-grid-3x3-gap" /></label>
                    <input type="radio" className="btn-check" name="viewMode" id="viewModeList" autoComplete="off" />
                    <label className="btn btn-outline-secondary" htmlFor="viewModeList"><i className="bi bi-list" /></label>
                    <input type="radio" className="btn-check" name="viewMode" id="viewModeTable" autoComplete="off" />
                    <label className="btn btn-outline-secondary" htmlFor="viewModeTable"><i className="bi bi-table" /></label>
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
            {/* Card Actions */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Card Action Buttons</h5>
                  <p className="card-subtitle">Common card footer patterns</p>
                </div>
                <div className="card-body">
                  <div className="border rounded p-3 mb-3">
                    <h6>Confirmation Dialog</h6>
                    <p className="text-muted small mb-3">Are you sure you want to delete this item? This action cannot be undone.</p>
                    <div className="d-flex gap-2 justify-content-end">
                      <button type="button" className="btn btn-outline-secondary">Cancel</button>
                      <button type="button" className="btn btn-danger">Delete</button>
                    </div>
                  </div>
                  <div className="border rounded p-3">
                    <h6>Form Actions</h6>
                    <p className="text-muted small mb-3">Save your changes or reset the form to its original state.</p>
                    <div className="d-flex gap-2 justify-content-between">
                      <button type="button" className="btn btn-link text-danger p-0">Reset</button>
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-outline-secondary">Save Draft</button>
                        <button type="button" className="btn btn-primary">Publish</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Buttons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Social &amp; Action Buttons</h5>
                  <p className="card-subtitle">Common social media patterns</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-3">Social Login</h6>
                  <div className="d-grid gap-2 mb-4">
                    <button type="button" className="btn btn-outline-dark">
                      <i className="bi bi-google me-2" /> Continue with Google
                    </button>
                    <button type="button" className="btn btn-outline-dark">
                      <i className="bi bi-github me-2" /> Continue with GitHub
                    </button>
                    <button type="button" className="btn btn-outline-dark">
                      <i className="bi bi-twitter-x me-2" /> Continue with X
                    </button>
                  </div>
                  <h6 className="small text-muted text-uppercase mb-3">Share Actions</h6>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-primary btn-icon rounded-circle">
                      <i className="bi bi-facebook" />
                    </button>
                    <button type="button" className="btn btn-outline-info btn-icon rounded-circle">
                      <i className="bi bi-twitter-x" />
                    </button>
                    <button type="button" className="btn btn-outline-danger btn-icon rounded-circle">
                      <i className="bi bi-pinterest" />
                    </button>
                    <button type="button" className="btn btn-outline-success btn-icon rounded-circle">
                      <i className="bi bi-whatsapp" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary btn-icon rounded-circle">
                      <i className="bi bi-link-45deg" />
                    </button>
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

export default ComponentsButtonsPage
