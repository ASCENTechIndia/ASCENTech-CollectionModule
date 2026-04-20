import { Link } from 'react-router-dom';
function ComponentsCardsPage() {
  return (
    <div>
      <div className="main-content page-components-cards">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Cards</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Cards</span>
          </nav>
        </div>
        {/* Basic Cards */}
        <section className="section">
          <div className="row g-4">
            {/* Simple Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card Title</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            {/* Card with Header */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Featured</h5>
                </div>
                <div className="card-body">
                  <h5 className="card-title">Special title treatment</h5>
                  <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
                  <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-primary">Go somewhere</a>
                </div>
              </div>
            </div>
            {/* Card with Footer */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card with Footer</h5>
                  <p className="card-text">Some quick example text to build on the card title.</p>
                </div>
                <div className="card-footer text-muted">
                  2 days ago
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Cards with Images */}
        <section className="section">
          <h5 className="section-title mb-3">Cards with Images</h5>
          <div className="row g-4">
            {/* Image Top */}
            <div className="col-lg-4">
              <div className="card">
                <img src="/assets/img/cards/card-1.webp" className="card-img-top" alt="Card image" />
                <div className="card-body">
                  <h5 className="card-title">Card with Image Top</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-primary">Read More</a>
                </div>
              </div>
            </div>
            {/* Image Bottom */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Card with Image Bottom</h5>
                  <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                  <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-outline-primary">View Details</a>
                </div>
                <img src="/assets/img/cards/card-2.webp" className="card-img-bottom" alt="Card image" />
              </div>
            </div>
            {/* Image Overlay */}
            <div className="col-lg-4">
              <div className="card text-bg-dark">
                <img src="/assets/img/cards/card-3.webp" className="card-img" alt="Card image" style={{opacity: '0.6'}} />
                <div className="card-img-overlay d-flex flex-column justify-content-end">
                  <h5 className="card-title">Image Overlay</h5>
                  <p className="card-text">This is a card with supporting text below as a natural lead-in.</p>
                  <p className="card-text"><small>Last updated 3 mins ago</small></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Card Styles */}
        <section className="section">
          <h5 className="section-title mb-3">Card Styles</h5>
          <div className="row g-4">
            {/* Colored Headers */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">Primary Header</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Some example text to show the card content.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">Success Header</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Some example text to show the card content.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header bg-danger text-white">
                  <h5 className="card-title mb-0">Danger Header</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Some example text to show the card content.</p>
                </div>
              </div>
            </div>
            {/* Bordered Cards */}
            <div className="col-lg-4">
              <div className="card border-primary">
                <div className="card-header bg-transparent border-primary">
                  <h5 className="card-title text-primary mb-0">Primary Border</h5>
                </div>
                <div className="card-body text-primary">
                  <p className="card-text">Some example text to show card styling with borders.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-success">
                <div className="card-header bg-transparent border-success">
                  <h5 className="card-title text-success mb-0">Success Border</h5>
                </div>
                <div className="card-body text-success">
                  <p className="card-text">Some example text to show card styling with borders.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card border-warning">
                <div className="card-header bg-transparent border-warning">
                  <h5 className="card-title text-warning mb-0">Warning Border</h5>
                </div>
                <div className="card-body text-warning">
                  <p className="card-text">Some example text to show card styling with borders.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Background Colors */}
        <section className="section">
          <h5 className="section-title mb-3">Background Colors</h5>
          <div className="row g-4">
            <div className="col-lg-3">
              <div className="card text-bg-primary">
                <div className="card-body">
                  <h5 className="card-title">Primary Card</h5>
                  <p className="card-text">Some text to show the card content with a primary background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-secondary">
                <div className="card-body">
                  <h5 className="card-title">Secondary Card</h5>
                  <p className="card-text">Some text to show the card content with secondary background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-success">
                <div className="card-body">
                  <h5 className="card-title">Success Card</h5>
                  <p className="card-text">Some text to show the card content with success background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-danger">
                <div className="card-body">
                  <h5 className="card-title">Danger Card</h5>
                  <p className="card-text">Some text to show the card content with danger background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-warning">
                <div className="card-body">
                  <h5 className="card-title">Warning Card</h5>
                  <p className="card-text">Some text to show the card content with warning background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-info">
                <div className="card-body">
                  <h5 className="card-title">Info Card</h5>
                  <p className="card-text">Some text to show the card content with info background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-light">
                <div className="card-body">
                  <h5 className="card-title">Light Card</h5>
                  <p className="card-text">Some text to show the card content with light background.</p>
                </div>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="card text-bg-dark">
                <div className="card-body">
                  <h5 className="card-title">Dark Card</h5>
                  <p className="card-text">Some text to show the card content with dark background.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Card with List Groups */}
        <section className="section">
          <h5 className="section-title mb-3">Cards with List Groups</h5>
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">List Group Card</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">An item</li>
                  <li className="list-group-item">A second item</li>
                  <li className="list-group-item">A third item</li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">With Icons</h5>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-envelope me-2 text-primary" /> Messages
                    <span className="badge bg-primary rounded-pill ms-auto">12</span>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-bell me-2 text-warning" /> Notifications
                    <span className="badge bg-warning rounded-pill ms-auto">3</span>
                  </li>
                  <li className="list-group-item d-flex align-items-center">
                    <i className="bi bi-gear me-2 text-secondary" /> Settings
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Mixed Content</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">Some text before the list.</p>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">First item</li>
                  <li className="list-group-item">Second item</li>
                </ul>
                <div className="card-body">
                  <a href="#" onClick={(event) => event.preventDefault()} className="card-link">Card link</a>
                  <a href="#" onClick={(event) => event.preventDefault()} className="card-link">Another link</a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Horizontal Cards */}
        <section className="section">
          <h5 className="section-title mb-3">Horizontal Cards</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src="/assets/img/cards/card-horizontal-1.webp" className="img-fluid rounded-start h-100 object-fit-cover" alt="Card image" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Horizontal Card</h5>
                      <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content.</p>
                      <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card">
                <div className="row g-0">
                  <div className="col-md-8">
                    <div className="card-body">
                      <h5 className="card-title">Image on Right</h5>
                      <p className="card-text">This card has the image positioned on the right side instead of left.</p>
                      <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-primary">Learn More</a>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <img src="/assets/img/cards/card-horizontal-2.webp" className="img-fluid rounded-end h-100 object-fit-cover" alt="Card image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Card Grid */}
        <section className="section">
          <h5 className="section-title mb-3">Card Grid</h5>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <div className="col">
              <div className="card h-100">
                <img src="/assets/img/cards/card-1.webp" className="card-img-top" alt="Card image" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/assets/img/cards/card-2.webp" className="card-img-top" alt="Card image" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card h-100">
                <img src="/assets/img/cards/card-3.webp" className="card-img-top" alt="Card image" />
                <div className="card-body">
                  <h5 className="card-title">Card title</h5>
                  <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content.</p>
                </div>
                <div className="card-footer">
                  <small className="text-muted">Last updated 3 mins ago</small>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Real-World Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* Profile Card */}
            <div className="col-lg-4">
              <div className="card text-center">
                <div className="card-body">
                  <img src="/assets/img/avatars/avatar-1.webp" alt="Profile" className="rounded-circle mb-3" width={80} height={80} />
                  <h5 className="card-title mb-1">Sarah Johnson</h5>
                  <p className="text-muted small mb-3">UI/UX Designer</p>
                  <div className="d-flex justify-content-center gap-3 mb-3">
                    <div className="text-center">
                      <div className="fw-bold">152</div>
                      <small className="text-muted">Posts</small>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">2.5k</div>
                      <small className="text-muted">Followers</small>
                    </div>
                    <div className="text-center">
                      <div className="fw-bold">180</div>
                      <small className="text-muted">Following</small>
                    </div>
                  </div>
                  <button className="btn btn-primary btn-sm">Follow</button>
                  <button className="btn btn-outline-secondary btn-sm">Message</button>
                </div>
              </div>
            </div>
            {/* Product Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="position-relative">
                  <img src="/assets/img/products/product-card.webp" className="card-img-top" alt="Product" />
                  <span className="badge bg-danger position-absolute top-0 end-0 m-2">-25%</span>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h5 className="card-title mb-1">Wireless Headphones</h5>
                      <p className="text-muted small mb-0">Electronics</p>
                    </div>
                    <button className="btn btn-link p-0 text-danger">
                      <i className="bi bi-heart" />
                    </button>
                  </div>
                  <div className="d-flex align-items-center mb-2">
                    <div className="text-warning me-1">
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-fill" />
                      <i className="bi bi-star-half" />
                    </div>
                    <small className="text-muted">(245 reviews)</small>
                  </div>
                  <div className="d-flex align-items-center justify-content-between">
                    <div>
                      <span className="h5 mb-0">$149.99</span>
                      <small className="text-muted text-decoration-line-through ms-1">$199.99</small>
                    </div>
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-cart-plus me-1" /> Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Stats Card */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <h6 className="card-title mb-0">Monthly Revenue</h6>
                    <div className="dropdown">
                      <button className="btn btn-link p-0 text-muted" data-bs-toggle="dropdown">
                        <i className="bi bi-three-dots-vertical" />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>View Details</a></li>
                        <li><a className="dropdown-item" href="#" onClick={(event) => event.preventDefault()}>Download Report</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="d-flex align-items-end gap-2 mb-3">
                    <h2 className="mb-0">$45,250</h2>
                    <span className="badge bg-success-subtle text-success mb-1">
                      <i className="bi bi-arrow-up" /> 12.5%
                    </span>
                  </div>
                  <p className="text-muted small mb-0">Compared to $40,200 last month</p>
                </div>
                <div className="card-footer bg-light">
                  <div className="d-flex justify-content-between small">
                    <span className="text-muted">Target: $50,000</span>
                    <span className="fw-medium">90% achieved</span>
                  </div>
                  <div className="progress mt-2" style={{height: 4}}>
                    <div className="progress-bar bg-primary" role="progressbar" style={{width: '90%'}} />
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

export default ComponentsCardsPage
