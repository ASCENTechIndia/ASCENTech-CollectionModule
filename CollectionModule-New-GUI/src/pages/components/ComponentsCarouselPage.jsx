import { Link } from 'react-router-dom';
function ComponentsCarouselPage() {
  return (
    <div>
      <div className="main-content page-components-carousel">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Carousel</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Carousel</span>
          </nav>
        </div>
        {/* Basic Carousels */}
        <section className="section">
          <div className="row g-4">
            {/* Slides Only */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Slides Only</h5>
                  <p className="card-subtitle">Basic carousel without controls</p>
                </div>
                <div className="card-body">
                  <div id="carouselSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* With Controls */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Controls</h5>
                  <p className="card-subtitle">Carousel with previous/next buttons</p>
                </div>
                <div className="card-body">
                  <div id="carouselWithControls" className="carousel slide">
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselWithControls" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselWithControls" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Indicators & Captions */}
        <section className="section">
          <h5 className="section-title mb-3">Indicators &amp; Captions</h5>
          <div className="row g-4">
            {/* With Indicators */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Indicators</h5>
                  <p className="card-subtitle">Carousel with slide indicators</p>
                </div>
                <div className="card-body">
                  <div id="carouselIndicators" className="carousel slide">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                      <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to={1} aria-label="Slide 2" />
                      <button type="button" data-bs-target="#carouselIndicators" data-bs-slide-to={2} aria-label="Slide 3" />
                    </div>
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselIndicators" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselIndicators" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* With Captions */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Captions</h5>
                  <p className="card-subtitle">Carousel with text overlays</p>
                </div>
                <div className="card-body">
                  <div id="carouselCaptions" className="carousel slide">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                      <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to={1} aria-label="Slide 2" />
                      <button type="button" data-bs-target="#carouselCaptions" data-bs-slide-to={2} aria-label="Slide 3" />
                    </div>
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" style={{filter: 'brightness(0.6)'}} />
                        <div className="carousel-caption">
                          <h5>First Slide Label</h5>
                          <p>Some representative placeholder content for the first slide.</p>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" style={{filter: 'brightness(0.6)'}} />
                        <div className="carousel-caption">
                          <h5>Second Slide Label</h5>
                          <p>Some representative placeholder content for the second slide.</p>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" style={{filter: 'brightness(0.6)'}} />
                        <div className="carousel-caption">
                          <h5>Third Slide Label</h5>
                          <p>Some representative placeholder content for the third slide.</p>
                        </div>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselCaptions" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselCaptions" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Transitions & Options */}
        <section className="section">
          <h5 className="section-title mb-3">Transitions &amp; Options</h5>
          <div className="row g-4">
            {/* Crossfade */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Crossfade Effect</h5>
                  <p className="card-subtitle">Fade transition instead of slide</p>
                </div>
                <div className="card-body">
                  <div id="carouselFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselFade" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselFade" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Auto-play Interval */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Custom Interval</h5>
                  <p className="card-subtitle">Different timing per slide (2s, 3s, 4s)</p>
                </div>
                <div className="card-body">
                  <div id="carouselInterval" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active" data-bs-interval={2000}>
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" />
                        <div className="carousel-caption">
                          <p className="mb-0 bg-dark bg-opacity-50 px-2 py-1 rounded">2 second interval</p>
                        </div>
                      </div>
                      <div className="carousel-item" data-bs-interval={3000}>
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" />
                        <div className="carousel-caption">
                          <p className="mb-0 bg-dark bg-opacity-50 px-2 py-1 rounded">3 second interval</p>
                        </div>
                      </div>
                      <div className="carousel-item" data-bs-interval={4000}>
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" />
                        <div className="carousel-caption">
                          <p className="mb-0 bg-dark bg-opacity-50 px-2 py-1 rounded">4 second interval</p>
                        </div>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselInterval" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselInterval" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Dark Variant & Touch */}
        <section className="section">
          <h5 className="section-title mb-3">Dark Variant &amp; Touch</h5>
          <div className="row g-4">
            {/* Dark Carousel */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Dark Variant</h5>
                  <p className="card-subtitle">Carousel with dark controls</p>
                </div>
                <div className="card-body">
                  <div id="carouselDark" className="carousel carousel-dark slide">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselDark" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                      <button type="button" data-bs-target="#carouselDark" data-bs-slide-to={1} aria-label="Slide 2" />
                      <button type="button" data-bs-target="#carouselDark" data-bs-slide-to={2} aria-label="Slide 3" />
                    </div>
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" style={{filter: 'brightness(1.2)'}} />
                        <div className="carousel-caption">
                          <h5>First Slide</h5>
                          <p>Dark indicators and controls for light images.</p>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" style={{filter: 'brightness(1.2)'}} />
                        <div className="carousel-caption">
                          <h5>Second Slide</h5>
                          <p>Perfect for light-colored backgrounds.</p>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" style={{filter: 'brightness(1.2)'}} />
                        <div className="carousel-caption">
                          <h5>Third Slide</h5>
                          <p>Maintains visibility on any background.</p>
                        </div>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselDark" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselDark" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Disable Touch */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Disable Touch Swiping</h5>
                  <p className="card-subtitle">Carousel without touch/swipe support</p>
                </div>
                <div className="card-body">
                  <div id="carouselNoTouch" className="carousel slide" data-bs-touch="false">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselNoTouch" data-bs-slide-to={0} className="active" aria-current="true" aria-label="Slide 1" />
                      <button type="button" data-bs-target="#carouselNoTouch" data-bs-slide-to={1} aria-label="Slide 2" />
                      <button type="button" data-bs-target="#carouselNoTouch" data-bs-slide-to={2} aria-label="Slide 3" />
                    </div>
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-1.webp" className="d-block w-100" alt="Slide 1" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-2.webp" className="d-block w-100" alt="Slide 2" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-3.webp" className="d-block w-100" alt="Slide 3" />
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselNoTouch" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselNoTouch" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                  <div className="alert alert-info mt-3 mb-0">
                    <i className="bi bi-info-circle me-2" />
                    Touch swiping is disabled on this carousel. Use the arrows to navigate.
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
            {/* Hero Slider */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Hero Slider</h5>
                  <p className="card-subtitle">Full-featured promotional carousel</p>
                </div>
                <div className="card-body">
                  <div id="carouselHero" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                      <button type="button" data-bs-target="#carouselHero" data-bs-slide-to={0} className="active" />
                      <button type="button" data-bs-target="#carouselHero" data-bs-slide-to={1} />
                      <button type="button" data-bs-target="#carouselHero" data-bs-slide-to={2} />
                    </div>
                    <div className="carousel-inner rounded">
                      <div className="carousel-item active">
                        <img src="/assets/img/slides/slide-hero-1.webp" className="d-block w-100" alt="Hero 1" style={{filter: 'brightness(0.5)'}} />
                        <div className="carousel-caption text-start">
                          <span className="badge bg-primary mb-2">New Arrival</span>
                          <h2>Summer Collection 2026</h2>
                          <p className="d-none d-md-block">Discover our latest collection with up to 40% off on selected items.</p>
                          <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-primary">Shop Now</a>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-hero-2.webp" className="d-block w-100" alt="Hero 2" style={{filter: 'brightness(0.5)'}} />
                        <div className="carousel-caption">
                          <span className="badge bg-danger mb-2">Limited Time</span>
                          <h2>Flash Sale - 50% Off</h2>
                          <p className="d-none d-md-block">Don't miss out on our biggest sale of the year. Ends soon!</p>
                          <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-danger">View Deals</a>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/slides/slide-hero-3.webp" className="d-block w-100" alt="Hero 3" style={{filter: 'brightness(0.5)'}} />
                        <div className="carousel-caption text-end">
                          <span className="badge bg-success mb-2">Free Shipping</span>
                          <h2>Premium Quality Products</h2>
                          <p className="d-none d-md-block">Free shipping on all orders over $50. Quality guaranteed.</p>
                          <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-success">Learn More</a>
                        </div>
                      </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselHero" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true" />
                      <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselHero" data-bs-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true" />
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Testimonials Carousel */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Testimonials</h5>
                  <p className="card-subtitle">Customer reviews carousel</p>
                </div>
                <div className="card-body">
                  <div id="carouselTestimonials" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                      <div className="carousel-item active">
                        <div className="text-center px-4 py-3">
                          <img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle mb-3" width={64} height={64} alt="Customer" />
                          <div className="text-warning mb-2">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                          <p className="mb-3">"Absolutely amazing product! The quality exceeded my expectations and the customer service was top-notch."</p>
                          <h6 className="mb-0">Sarah Johnson</h6>
                          <small className="text-muted">Marketing Director</small>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="text-center px-4 py-3">
                          <img src="/assets/img/avatars/avatar-2.webp" className="rounded-circle mb-3" width={64} height={64} alt="Customer" />
                          <div className="text-warning mb-2">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-half" />
                          </div>
                          <p className="mb-3">"Great experience from start to finish. Would highly recommend to anyone looking for quality products."</p>
                          <h6 className="mb-0">Michael Chen</h6>
                          <small className="text-muted">Software Engineer</small>
                        </div>
                      </div>
                      <div className="carousel-item">
                        <div className="text-center px-4 py-3">
                          <img src="/assets/img/avatars/avatar-3.webp" className="rounded-circle mb-3" width={64} height={64} alt="Customer" />
                          <div className="text-warning mb-2">
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                            <i className="bi bi-star-fill" />
                          </div>
                          <p className="mb-3">"Fast shipping and excellent packaging. The product works exactly as described. Very satisfied!"</p>
                          <h6 className="mb-0">Emily Davis</h6>
                          <small className="text-muted">Product Designer</small>
                        </div>
                      </div>
                    </div>
                    <div className="d-flex justify-content-center gap-2 mt-3">
                      <button className="btn btn-sm btn-outline-secondary" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="prev">
                        <i className="bi bi-chevron-left" />
                      </button>
                      <button className="btn btn-sm btn-outline-secondary" type="button" data-bs-target="#carouselTestimonials" data-bs-slide="next">
                        <i className="bi bi-chevron-right" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Product Gallery */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Product Gallery</h5>
                  <p className="card-subtitle">Product image showcase</p>
                </div>
                <div className="card-body">
                  <div id="carouselProduct" className="carousel slide" data-bs-ride="false">
                    <div className="carousel-inner rounded mb-2">
                      <div className="carousel-item active">
                        <img src="/assets/img/products/product-gallery-1.webp" className="d-block w-100" alt="Product 1" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/products/product-gallery-2.webp" className="d-block w-100" alt="Product 2" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/products/product-gallery-3.webp" className="d-block w-100" alt="Product 3" />
                      </div>
                      <div className="carousel-item">
                        <img src="/assets/img/products/product-gallery-4.webp" className="d-block w-100" alt="Product 4" />
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button type="button" data-bs-target="#carouselProduct" data-bs-slide-to={0} className="border-0 p-0 rounded overflow-hidden active" style={{width: 60, height: 60}}>
                        <img src="/assets/img/products/product-gallery-1.webp" className="w-100 h-100 object-fit-cover" alt="Thumb 1" />
                      </button>
                      <button type="button" data-bs-target="#carouselProduct" data-bs-slide-to={1} className="border-0 p-0 rounded overflow-hidden" style={{width: 60, height: 60}}>
                        <img src="/assets/img/products/product-gallery-2.webp" className="w-100 h-100 object-fit-cover" alt="Thumb 2" />
                      </button>
                      <button type="button" data-bs-target="#carouselProduct" data-bs-slide-to={2} className="border-0 p-0 rounded overflow-hidden" style={{width: 60, height: 60}}>
                        <img src="/assets/img/products/product-gallery-3.webp" className="w-100 h-100 object-fit-cover" alt="Thumb 3" />
                      </button>
                      <button type="button" data-bs-target="#carouselProduct" data-bs-slide-to={3} className="border-0 p-0 rounded overflow-hidden" style={{width: 60, height: 60}}>
                        <img src="/assets/img/products/product-gallery-4.webp" className="w-100 h-100 object-fit-cover" alt="Thumb 4" />
                      </button>
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

export default ComponentsCarouselPage
