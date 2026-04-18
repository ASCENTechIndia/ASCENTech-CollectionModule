function ComponentsPaginationPage() {
  return (
    <div>
      <div className="main-content page-components-pagination">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Pagination</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Pagination</span>
          </nav>
        </div>
        {/* Basic Pagination */}
        <section className="section">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Basic Pagination</h5>
                  <p className="card-subtitle">Simple pagination navigation</p>
                </div>
                <div className="card-body">
                  <nav>
                    <ul className="pagination">
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Previous</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Icons</h5>
                  <p className="card-subtitle">Navigation with arrow icons</p>
                </div>
                <div className="card-body">
                  <nav>
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()} aria-label="Previous">
                          <i className="bi bi-chevron-left" />
                        </a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>4</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>5</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()} aria-label="Next">
                          <i className="bi bi-chevron-right" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Active & Disabled States */}
        <section className="section">
          <h5 className="section-title mb-3">States &amp; Sizes</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Active &amp; Disabled</h5>
                  <p className="card-subtitle">Different pagination states</p>
                </div>
                <div className="card-body">
                  <nav>
                    <ul className="pagination">
                      <li className="page-item disabled">
                        <a className="page-link">Previous</a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item active" aria-current="page">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Next</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Pagination Sizes</h5>
                  <p className="card-subtitle">Small, default, and large sizes</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-2">Small</h6>
                  <nav>
                    <ul className="pagination pagination-sm mb-3">
                      <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                    </ul>
                  </nav>
                  <h6 className="small text-muted text-uppercase mb-2">Default</h6>
                  <nav>
                    <ul className="pagination mb-3">
                      <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                    </ul>
                  </nav>
                  <h6 className="small text-muted text-uppercase mb-2">Large</h6>
                  <nav>
                    <ul className="pagination pagination-lg mb-0">
                      <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Alignment */}
        <section className="section">
          <h5 className="section-title mb-3">Alignment</h5>
          <div className="row g-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Pagination Alignment</h5>
                  <p className="card-subtitle">Start, center, and end alignment</p>
                </div>
                <div className="card-body">
                  <h6 className="small text-muted text-uppercase mb-2">Start (Default)</h6>
                  <nav>
                    <ul className="pagination mb-4">
                      <li className="page-item disabled"><a className="page-link">Previous</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Next</a></li>
                    </ul>
                  </nav>
                  <h6 className="small text-muted text-uppercase mb-2">Center</h6>
                  <nav>
                    <ul className="pagination justify-content-center mb-4">
                      <li className="page-item disabled"><a className="page-link">Previous</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Next</a></li>
                    </ul>
                  </nav>
                  <h6 className="small text-muted text-uppercase mb-2">End</h6>
                  <nav>
                    <ul className="pagination justify-content-end mb-0">
                      <li className="page-item disabled"><a className="page-link">Previous</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Next</a></li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Advanced Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Advanced Examples</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Ellipsis</h5>
                  <p className="card-subtitle">Truncated pagination for many pages</p>
                </div>
                <div className="card-body">
                  <nav>
                    <ul className="pagination">
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-double-left" /></a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-left" /></a>
                      </li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                      <li className="page-item disabled"><a className="page-link">...</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>4</a></li>
                      <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>5</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>6</a></li>
                      <li className="page-item disabled"><a className="page-link">...</a></li>
                      <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>20</a></li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-right" /></a>
                      </li>
                      <li className="page-item">
                        <a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-double-right" /></a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Page Info</h5>
                  <p className="card-subtitle">Pagination with current page indicator</p>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Showing 1-10 of 100 results</span>
                    <nav>
                      <ul className="pagination mb-0">
                        <li className="page-item disabled">
                          <a className="page-link"><i className="bi bi-chevron-left" /></a>
                        </li>
                        <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                        <li className="page-item">
                          <a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-right" /></a>
                        </li>
                      </ul>
                    </nav>
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
            {/* Table Pagination */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Data Table Pagination</h5>
                  <p className="card-subtitle">Pagination with items per page selector</p>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>John Doe</td>
                          <td>john@example.com</td>
                          <td><span className="badge bg-success">Active</span></td>
                        </tr>
                        <tr>
                          <td>2</td>
                          <td>Jane Smith</td>
                          <td>jane@example.com</td>
                          <td><span className="badge bg-success">Active</span></td>
                        </tr>
                        <tr>
                          <td>3</td>
                          <td>Bob Johnson</td>
                          <td>bob@example.com</td>
                          <td><span className="badge bg-warning">Pending</span></td>
                        </tr>
                        <tr>
                          <td>4</td>
                          <td>Alice Brown</td>
                          <td>alice@example.com</td>
                          <td><span className="badge bg-success">Active</span></td>
                        </tr>
                        <tr>
                          <td>5</td>
                          <td>Charlie Wilson</td>
                          <td>charlie@example.com</td>
                          <td><span className="badge bg-secondary">Inactive</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="card-footer">
                  <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <label className="text-muted mb-0">Show</label>
                      <select className="form-select form-select-sm" style={{width: 'auto'}}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                      <span className="text-muted">entries</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <span className="text-muted">Showing 1 to 5 of 47 entries</span>
                      <nav>
                        <ul className="pagination pagination-sm mb-0">
                          <li className="page-item disabled"><a className="page-link">Previous</a></li>
                          <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                          <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                          <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                          <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>4</a></li>
                          <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>5</a></li>
                          <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>Next</a></li>
                        </ul>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Simple Prev/Next */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Simple Prev/Next</h5>
                  <p className="card-subtitle">Blog post navigation style</p>
                </div>
                <div className="card-body">
                  <nav className="d-flex justify-content-between">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-outline-secondary">
                      <i className="bi bi-arrow-left me-1" /> Previous Post
                    </a>
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-outline-secondary">
                      Next Post <i className="bi bi-arrow-right ms-1" />
                    </a>
                  </nav>
                </div>
              </div>
            </div>
            {/* Page Jump */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">With Page Jump</h5>
                  <p className="card-subtitle">Direct page navigation input</p>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center gap-3">
                    <nav>
                      <ul className="pagination mb-0">
                        <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-left" /></a></li>
                        <li className="page-item active"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>1</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>2</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}>3</a></li>
                        <li className="page-item"><a className="page-link" href="#" onClick={(event) => event.preventDefault()}><i className="bi bi-chevron-right" /></a></li>
                      </ul>
                    </nav>
                    <div className="d-flex align-items-center gap-2">
                      <span className="text-muted text-nowrap">Go to</span>
                      <input type="number" className="form-control form-control-sm" style={{width: 60}} min={1} max={10} defaultValue={1} />
                      <span className="text-muted">of 10</span>
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

export default ComponentsPaginationPage
