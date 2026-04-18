function ComponentsModalPage() {
  return (
    <div>
      <div className="main-content page-components-modal">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Modal</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Modal</span>
          </nav>
        </div>
        {/* Basic Modals */}
        <section className="section">
          <div className="row g-4">
            {/* Default Modal */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Modal</h5>
                  <p className="card-subtitle">Basic modal with header, body, and footer</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#defaultModal">
                    Launch Demo Modal
                  </button>
                  <div className="modal fade" id="defaultModal" tabIndex={-1} aria-labelledby="defaultModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="defaultModalLabel">Modal Title</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                          <p>This is the modal body content. You can put any HTML content here including text, images, forms, and more.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Static Backdrop */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Static Backdrop</h5>
                  <p className="card-subtitle">Modal that won't close on backdrop click</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdropModal">
                    Launch Static Modal
                  </button>
                  <div className="modal fade" id="staticBackdropModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="staticBackdropLabel">Static Backdrop</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
                        </div>
                        <div className="modal-body">
                          <p>I will not close if you click outside me. Try clicking outside or pressing the escape key.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Understood</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Modal Sizes */}
        <section className="section">
          <h5 className="section-title mb-3">Modal Sizes</h5>
          <div className="row g-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Size Variations</h5>
                  <p className="card-subtitle">Small, default, large, and extra-large modals</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    {/* Small Modal */}
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalSm">
                      Small Modal
                    </button>
                    <div className="modal fade" id="modalSm" tabIndex={-1}>
                      <div className="modal-dialog modal-sm">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Small Modal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                          </div>
                          <div className="modal-body">
                            <p>This is a small modal. Width: 300px</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Default Modal */}
                    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#modalDefault">
                      Default Modal
                    </button>
                    <div className="modal fade" id="modalDefault" tabIndex={-1}>
                      <div className="modal-dialog">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Default Modal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                          </div>
                          <div className="modal-body">
                            <p>This is a default sized modal. Width: 500px</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Large Modal */}
                    <button type="button" className="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalLg">
                      Large Modal
                    </button>
                    <div className="modal fade" id="modalLg" tabIndex={-1}>
                      <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Large Modal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                          </div>
                          <div className="modal-body">
                            <p>This is a large modal. Width: 800px</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Extra Large Modal */}
                    <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalXl">
                      Extra Large Modal
                    </button>
                    <div className="modal fade" id="modalXl" tabIndex={-1}>
                      <div className="modal-dialog modal-xl">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Extra Large Modal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                          </div>
                          <div className="modal-body">
                            <p>This is an extra large modal. Width: 1140px</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Fullscreen Modal */}
                    <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target="#modalFullscreen">
                      Fullscreen Modal
                    </button>
                    <div className="modal fade" id="modalFullscreen" tabIndex={-1}>
                      <div className="modal-dialog modal-fullscreen">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5 className="modal-title">Fullscreen Modal</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" />
                          </div>
                          <div className="modal-body">
                            <p>This is a fullscreen modal that takes up the entire viewport.</p>
                          </div>
                          <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Vertically Centered & Scrollable */}
        <section className="section">
          <h5 className="section-title mb-3">Position &amp; Scrolling</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Vertically Centered</h5>
                  <p className="card-subtitle">Modal centered in the viewport</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#centeredModal">
                    Centered Modal
                  </button>
                  <div className="modal fade" id="centeredModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Centered Modal</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                          <p>This modal is vertically centered in the viewport.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Scrollable Modal</h5>
                  <p className="card-subtitle">Modal with scrollable body content</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#scrollableModal">
                    Scrollable Modal
                  </button>
                  <div className="modal fade" id="scrollableModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-scrollable">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Scrollable Modal</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                          <p>This is some long content that will cause the modal body to scroll.</p>
                          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.</p>
                          <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis.</p>
                          <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
                          <p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                          <button type="button" className="btn btn-primary">Save changes</button>
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
            {/* Confirmation Dialog */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Confirmation Dialog</h5>
                  <p className="card-subtitle">Delete confirmation modal</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">
                    <i className="bi bi-trash me-1" /> Delete Item
                  </button>
                  <div className="modal fade" id="deleteModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-body text-center py-4">
                          <div className="mb-3">
                            <span className="bg-danger-subtle text-danger rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: 64, height: 64}}>
                              <i className="bi bi-exclamation-triangle fs-1" />
                            </span>
                          </div>
                          <h5>Delete Item?</h5>
                          <p className="text-muted mb-0">Are you sure you want to delete this item? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer justify-content-center border-0 pt-0">
                          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" className="btn btn-danger">Delete</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Form Modal */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Form Modal</h5>
                  <p className="card-subtitle">Modal with form inputs</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#formModal">
                    <i className="bi bi-plus-lg me-1" /> Add New
                  </button>
                  <div className="modal fade" id="formModal" tabIndex={-1}>
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title">Add New Item</h5>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="mb-3">
                              <label htmlFor="itemName" className="form-label">Name</label>
                              <input type="text" className="form-control" id="itemName" placeholder="Enter name" />
                            </div>
                            <div className="mb-3">
                              <label htmlFor="itemCategory" className="form-label">Category</label>
                              <select className="form-select" id="itemCategory">
                                <option selected>Select category</option>
                                <option value={1}>Electronics</option>
                                <option value={2}>Clothing</option>
                                <option value={3}>Furniture</option>
                              </select>
                            </div>
                            <div className="mb-3">
                              <label htmlFor="itemDescription" className="form-label">Description</label>
                              <textarea className="form-control" id="itemDescription" rows={3} placeholder="Enter description" defaultValue={""} />
                            </div>
                          </form>
                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Cancel</button>
                          <button type="button" className="btn btn-primary">Save Item</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Success Modal */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Success Modal</h5>
                  <p className="card-subtitle">Confirmation success message</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-success" data-bs-toggle="modal" data-bs-target="#successModal">
                    Show Success
                  </button>
                  <div className="modal fade" id="successModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered modal-sm">
                      <div className="modal-content">
                        <div className="modal-body text-center py-4">
                          <div className="mb-3">
                            <span className="bg-success-subtle text-success rounded-circle d-inline-flex align-items-center justify-content-center" style={{width: 64, height: 64}}>
                              <i className="bi bi-check-lg fs-1" />
                            </span>
                          </div>
                          <h5>Success!</h5>
                          <p className="text-muted mb-3">Your changes have been saved successfully.</p>
                          <button type="button" className="btn btn-success" data-bs-dismiss="modal">Continue</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Preview Modal */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Image Preview</h5>
                  <p className="card-subtitle">Lightbox-style image modal</p>
                </div>
                <div className="card-body">
                  <div className="d-flex gap-2">
                    <a href="#" onClick={(event) => event.preventDefault()} data-bs-toggle="modal" data-bs-target="#imageModal1">
                      <img src="/assets/img/gallery/gallery-thumb-1.webp" className="rounded" alt="Thumbnail" />
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} data-bs-toggle="modal" data-bs-target="#imageModal2">
                      <img src="/assets/img/gallery/gallery-thumb-2.webp" className="rounded" alt="Thumbnail" />
                    </a>
                  </div>
                  <div className="modal fade" id="imageModal1" tabIndex={-1}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content bg-transparent border-0">
                        <div className="modal-body p-0">
                          <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3" data-bs-dismiss="modal" />
                          <img src="/assets/img/gallery/gallery-1.webp" className="img-fluid rounded" alt="Image" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal fade" id="imageModal2" tabIndex={-1}>
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                      <div className="modal-content bg-transparent border-0">
                        <div className="modal-body p-0">
                          <button type="button" className="btn-close btn-close-white position-absolute top-0 end-0 m-3 z-3" data-bs-dismiss="modal" />
                          <img src="/assets/img/gallery/gallery-2.webp" className="img-fluid rounded" alt="Image" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Login Modal */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Login Modal</h5>
                  <p className="card-subtitle">Authentication dialog</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                    <i className="bi bi-box-arrow-in-right me-1" /> Sign In
                  </button>
                  <div className="modal fade" id="loginModal" tabIndex={-1}>
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header border-0 pb-0">
                          <button type="button" className="btn-close" data-bs-dismiss="modal" />
                        </div>
                        <div className="modal-body px-4 pb-4">
                          <div className="text-center mb-4">
                            <h4>Welcome Back</h4>
                            <p className="text-muted">Sign in to continue to your account</p>
                          </div>
                          <form>
                            <div className="mb-3">
                              <label htmlFor="loginEmail" className="form-label">Email address</label>
                              <input type="email" className="form-control" id="loginEmail" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                              <div className="d-flex justify-content-between align-items-center mb-2">
                                <label htmlFor="loginPassword" className="form-label mb-0">Password</label>
                                <a href="#" onClick={(event) => event.preventDefault()} className="small">Forgot password?</a>
                              </div>
                              <input type="password" className="form-control" id="loginPassword" placeholder="Enter password" />
                            </div>
                            <div className="form-check mb-3">
                              <input className="form-check-input" type="checkbox" id="rememberMe" />
                              <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                            </div>
                            <div className="d-grid">
                              <button type="submit" className="btn btn-primary">Sign In</button>
                            </div>
                          </form>
                          <hr className="my-4" />
                          <div className="d-grid gap-2">
                            <button type="button" className="btn btn-outline-dark">
                              <i className="bi bi-google me-2" /> Continue with Google
                            </button>
                          </div>
                          <p className="text-center mt-3 mb-0">
                            Don't have an account? <a href="#" onClick={(event) => event.preventDefault()}>Sign up</a>
                          </p>
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

export default ComponentsModalPage
