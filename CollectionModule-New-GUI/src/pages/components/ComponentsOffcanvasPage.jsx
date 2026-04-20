import { Link } from 'react-router-dom';
function ComponentsOffcanvasPage() {
  return (
    <div>
      <div className="main-content page-components-offcanvas">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Offcanvas</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Offcanvas</span>
          </nav>
        </div>
        {/* Basic Offcanvas */}
        <section className="section">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Basic Offcanvas</h5>
                  <p className="card-subtitle">Simple offcanvas panel from the start</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBasic">
                    Open Offcanvas
                  </button>
                  <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasBasic">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">Offcanvas Title</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body">
                      <p>This is the offcanvas body content. You can put any content here including text, images, forms, and more.</p>
                      <p>The offcanvas slides in from the side of the screen and can be dismissed by clicking the close button or clicking outside.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Static Backdrop</h5>
                  <p className="card-subtitle">Offcanvas that doesn't close on backdrop click</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasStatic">
                    Open Static Offcanvas
                  </button>
                  <div className="offcanvas offcanvas-start" data-bs-backdrop="static" tabIndex={-1} id="offcanvasStatic">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">Static Backdrop</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body">
                      <p>I won't close when you click outside of me. You must use the close button to dismiss this offcanvas.</p>
                      <p>This is useful for important content that requires user interaction before dismissing.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Placement */}
        <section className="section">
          <h5 className="section-title mb-3">Placement Options</h5>
          <div className="row g-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Offcanvas Directions</h5>
                  <p className="card-subtitle">Start, end, top, and bottom placement</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2">
                    {/* Start (Default) */}
                    <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasStart">
                      <i className="bi bi-arrow-bar-right me-1" /> Start (Left)
                    </button>
                    <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasStart">
                      <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Offcanvas Start</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                      </div>
                      <div className="offcanvas-body">
                        <p>This offcanvas slides in from the left (start) side of the screen.</p>
                      </div>
                    </div>
                    {/* End */}
                    <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasEnd">
                      <i className="bi bi-arrow-bar-left me-1" /> End (Right)
                    </button>
                    <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasEnd">
                      <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Offcanvas End</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                      </div>
                      <div className="offcanvas-body">
                        <p>This offcanvas slides in from the right (end) side of the screen.</p>
                      </div>
                    </div>
                    {/* Top */}
                    <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop">
                      <i className="bi bi-arrow-bar-down me-1" /> Top
                    </button>
                    <div className="offcanvas offcanvas-top" tabIndex={-1} id="offcanvasTop" style={{height: 'auto', maxHeight: '50vh'}}>
                      <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Offcanvas Top</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                      </div>
                      <div className="offcanvas-body">
                        <p>This offcanvas slides in from the top of the screen.</p>
                      </div>
                    </div>
                    {/* Bottom */}
                    <button className="btn btn-outline-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom">
                      <i className="bi bi-arrow-bar-up me-1" /> Bottom
                    </button>
                    <div className="offcanvas offcanvas-bottom" tabIndex={-1} id="offcanvasBottom" style={{height: 'auto', maxHeight: '50vh'}}>
                      <div className="offcanvas-header">
                        <h5 className="offcanvas-title">Offcanvas Bottom</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                      </div>
                      <div className="offcanvas-body">
                        <p>This offcanvas slides in from the bottom of the screen.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Backdrop & Scroll */}
        <section className="section">
          <h5 className="section-title mb-3">Backdrop &amp; Scroll Options</h5>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Body Scrolling</h5>
                  <p className="card-subtitle">Allow scrolling when offcanvas is open</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScroll">
                    Enable Body Scroll
                  </button>
                  <div className="offcanvas offcanvas-start" data-bs-scroll="true" data-bs-backdrop="false" tabIndex={-1} id="offcanvasScroll">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">Body Scrolling Enabled</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body">
                      <p>Try scrolling the rest of the page while this offcanvas is open.</p>
                      <p>The page content is still scrollable because <code>data-bs-scroll="true"</code> is set.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Scroll + Backdrop</h5>
                  <p className="card-subtitle">Both scrolling and backdrop enabled</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrollBackdrop">
                    Scroll with Backdrop
                  </button>
                  <div className="offcanvas offcanvas-start" data-bs-scroll="true" tabIndex={-1} id="offcanvasScrollBackdrop">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">Scroll + Backdrop</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body">
                      <p>Both body scrolling and backdrop are enabled here.</p>
                      <p>The backdrop is visible but you can still scroll the page content.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">No Backdrop</h5>
                  <p className="card-subtitle">Offcanvas without backdrop overlay</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNoBackdrop">
                    No Backdrop
                  </button>
                  <div className="offcanvas offcanvas-start" data-bs-backdrop="false" tabIndex={-1} id="offcanvasNoBackdrop">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">No Backdrop</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body">
                      <p>This offcanvas has no backdrop overlay.</p>
                      <p>The page behind remains fully visible and interactive.</p>
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
            {/* Navigation Menu */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Mobile Navigation</h5>
                  <p className="card-subtitle">Slide-out navigation menu</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNav">
                    <i className="bi bi-list me-1" /> Open Menu
                  </button>
                  <div className="offcanvas offcanvas-start" tabIndex={-1} id="offcanvasNav" style={{width: 280}}>
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">
                        <img src="/assets/img/logo.webp" alt="Logo" height={30} />
                      </h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body p-0">
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-action active">
                          <i className="bi bi-house me-2" /> Dashboard
                        </li>
                        <li className="list-group-item list-group-item-action">
                          <i className="bi bi-person me-2" /> Profile
                        </li>
                        <li className="list-group-item list-group-item-action">
                          <i className="bi bi-envelope me-2" /> Messages
                          <span className="badge bg-primary float-end">3</span>
                        </li>
                        <li className="list-group-item list-group-item-action">
                          <i className="bi bi-bell me-2" /> Notifications
                        </li>
                        <li className="list-group-item list-group-item-action">
                          <i className="bi bi-gear me-2" /> Settings
                        </li>
                      </ul>
                      <hr className="my-2" />
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item list-group-item-action text-danger">
                          <i className="bi bi-box-arrow-right me-2" /> Logout
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Shopping Cart */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Shopping Cart</h5>
                  <p className="card-subtitle">E-commerce cart sidebar</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary position-relative" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasCart">
                    <i className="bi bi-cart me-1" /> Cart
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">2</span>
                  </button>
                  <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasCart">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">Shopping Cart (2)</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body d-flex flex-column">
                      <div className="flex-grow-1">
                        {/* Cart Item 1 */}
                        <div className="d-flex gap-3 mb-3 pb-3 border-bottom">
                          <img src="/assets/img/products/product-thumb-1.webp" className="rounded" alt="Product" />
                          <div className="flex-grow-1">
                            <h6 className="mb-1">Wireless Headphones</h6>
                            <p className="text-muted small mb-1">Color: Black</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold">$149.99</span>
                              <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-secondary">-</button>
                                <button className="btn btn-outline-secondary" disabled>1</button>
                                <button className="btn btn-outline-secondary">+</button>
                              </div>
                            </div>
                          </div>
                          <button className="btn btn-link text-danger p-0"><i className="bi bi-x-lg" /></button>
                        </div>
                        {/* Cart Item 2 */}
                        <div className="d-flex gap-3 mb-3 pb-3 border-bottom">
                          <img src="/assets/img/products/product-thumb-2.webp" className="rounded" alt="Product" />
                          <div className="flex-grow-1">
                            <h6 className="mb-1">USB-C Cable</h6>
                            <p className="text-muted small mb-1">Length: 2m</p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="fw-bold">$19.99</span>
                              <div className="btn-group btn-group-sm">
                                <button className="btn btn-outline-secondary">-</button>
                                <button className="btn btn-outline-secondary" disabled>2</button>
                                <button className="btn btn-outline-secondary">+</button>
                              </div>
                            </div>
                          </div>
                          <button className="btn btn-link text-danger p-0"><i className="bi bi-x-lg" /></button>
                        </div>
                      </div>
                      <div className="border-top pt-3">
                        <div className="d-flex justify-content-between mb-2">
                          <span>Subtotal</span>
                          <span className="fw-bold">$189.97</span>
                        </div>
                        <div className="d-flex justify-content-between mb-3 text-muted small">
                          <span>Shipping</span>
                          <span>Calculated at checkout</span>
                        </div>
                        <div className="d-grid gap-2">
                          <button className="btn btn-primary">Checkout</button>
                          <button className="btn btn-outline-secondary" data-bs-dismiss="offcanvas">Continue Shopping</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Filter Panel */}
            <div className="col-lg-4">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Filter Panel</h5>
                  <p className="card-subtitle">Product filter sidebar</p>
                </div>
                <div className="card-body">
                  <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasFilter">
                    <i className="bi bi-funnel me-1" /> Filters
                  </button>
                  <div className="offcanvas offcanvas-end" tabIndex={-1} id="offcanvasFilter">
                    <div className="offcanvas-header">
                      <h5 className="offcanvas-title">Filters</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="offcanvas" />
                    </div>
                    <div className="offcanvas-body">
                      {/* Categories */}
                      <div className="mb-4">
                        <h6 className="mb-3">Categories</h6>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="catElectronics" defaultChecked />
                          <label className="form-check-label" htmlFor="catElectronics">Electronics</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="catClothing" />
                          <label className="form-check-label" htmlFor="catClothing">Clothing</label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="checkbox" id="catAccessories" />
                          <label className="form-check-label" htmlFor="catAccessories">Accessories</label>
                        </div>
                      </div>
                      {/* Price Range */}
                      <div className="mb-4">
                        <h6 className="mb-3">Price Range</h6>
                        <div className="row g-2">
                          <div className="col">
                            <input type="number" className="form-control form-control-sm" placeholder="Min" />
                          </div>
                          <div className="col">
                            <input type="number" className="form-control form-control-sm" placeholder="Max" />
                          </div>
                        </div>
                      </div>
                      {/* Rating */}
                      <div className="mb-4">
                        <h6 className="mb-3">Rating</h6>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="radio" name="rating" id="rating4" />
                          <label className="form-check-label" htmlFor="rating4">
                            <span className="text-warning">★★★★</span>★ &amp; up
                          </label>
                        </div>
                        <div className="form-check mb-2">
                          <input className="form-check-input" type="radio" name="rating" id="rating3" />
                          <label className="form-check-label" htmlFor="rating3">
                            <span className="text-warning">★★★</span>★★ &amp; up
                          </label>
                        </div>
                      </div>
                      <div className="d-grid gap-2">
                        <button className="btn btn-primary">Apply Filters</button>
                        <button className="btn btn-outline-secondary">Clear All</button>
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

export default ComponentsOffcanvasPage
