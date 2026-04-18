function ComponentsPopoversPage() {
  return (
    <div>
      <div className="main-content page-components-popovers">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-Title">Popovers</h1>
          <nav className="breadcrumb">
            <a href="#" className="breadcrumb-item">Home</a>
            <a href="#" className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Popovers</span>
          </nav>
        </div>
        {/* Basic Popovers */}
        <section className="section">
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Basic Popover</h5>
                  <p className="card-subTitle">Click to toggle popover</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" data-bs-toggle="popover" data-bs-title="Popover Title" data-bs-content="This is the popover content. Click the button again to close.">
                    Click to toggle popover
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Dismissible Popover</h5>
                  <p className="card-subTitle">Click anywhere to dismiss</p>
                </div>
                <div className="card-body">
                  <a tabIndex={0} className="btn btn-danger" role="button" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="Dismissible popover" data-bs-content="Click anywhere outside this popover to close it.">
                    Dismissible popover
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Popover Directions */}
        <section className="section">
          <h5 className="section-title mb-3">Popover Directions</h5>
          <div className="row g-4">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-Title">Placement Options</h5>
                  <p className="card-subTitle">Top, right, bottom, and left placement</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="top" data-bs-title="Top Popover" data-bs-content="This popover appears on top of the button.">
                      Popover on top
                    </button>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="right" data-bs-title="Right Popover" data-bs-content="This popover appears to the right of the button.">
                      Popover on right
                    </button>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="bottom" data-bs-title="Bottom Popover" data-bs-content="This popover appears below the button.">
                      Popover on bottom
                    </button>
                    <button type="button" className="btn btn-secondary" data-bs-toggle="popover" data-bs-placement="left" data-bs-title="Left Popover" data-bs-content="This popover appears to the left of the button.">
                      Popover on left
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Hover Trigger */}
        <section className="section">
          <h5 className="section-title mb-3">Trigger Options</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Hover Trigger</h5>
                  <p className="card-subTitle">Show popover on hover</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-info" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-title="Hover Popover" data-bs-content="This popover appears when you hover over the button.">
                    Hover over me
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Focus Trigger</h5>
                  <p className="card-subTitle">Show popover on focus</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-warning" data-bs-toggle="popover" data-bs-trigger="focus" data-bs-title="Focus Popover" data-bs-content="This popover appears when the button receives focus.">
                    Focus on me
                  </button>
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
                  <h5 className="card-Title">HTML Content</h5>
                  <p className="card-subTitle">Popover with rich HTML content</p>
                </div>
                <div className="card-body">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-toggle="popover"
                    data-bs-html="true"
                    data-bs-title={'<i className="bi bi-info-circle me-1"></i> HTML Title'}
                    data-bs-content={'<strong>Bold text</strong> and <em>italic text</em>.<br><br><a href="#">A link</a> and some more content.'}
                  >
                    HTML Popover
                  </button>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Disabled Elements</h5>
                  <p className="card-subTitle">Popover on disabled elements</p>
                </div>
                <div className="card-body">
                  <span className="d-inline-block" tabIndex={0} data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-content="This button is disabled but you can still see this popover.">
                    <button className="btn btn-primary" type="button" disabled>Disabled button</button>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Real-World Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* Help Popovers */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Form Help Popovers</h5>
                  <p className="card-subTitle">Contextual help for form fields</p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="username" className="form-label">
                        Username
                        <i className="bi bi-question-circle text-muted ms-1" data-bs-toggle="popover" data-bs-trigger="hover focus" data-bs-placement="right" data-bs-content="Username must be 3-20 characters and can only contain letters, numbers, and underscores." />
                      </label>
                      <input type="text" className="form-control" id="username" placeholder="Enter username" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="password" className="form-label">
                        Password
                        <i
                          className="bi bi-question-circle text-muted ms-1"
                          data-bs-toggle="popover"
                          data-bs-trigger="hover focus"
                          data-bs-placement="right"
                          data-bs-html="true"
                          data-bs-content={`<strong>Password requirements:</strong><ul className="mb-0 ps-3"><li>At least 8 characters</li><li>One uppercase letter</li><li>One number</li><li>One special character</li></ul>`}
                        />
                      </label>
                      <input type="password" className="form-control" id="password" placeholder="Enter password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
            {/* Info Popovers */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Information Cards</h5>
                  <p className="card-subTitle">Additional info on hover</p>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-3 p-3 border rounded">
                    <div>
                      <h6 className="mb-1">Monthly Revenue</h6>
                      <h4 className="mb-0">$45,250</h4>
                    </div>
                    <span
                      className="badge bg-success"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="left"
                      data-bs-html="true"
                      data-bs-content={`<strong>+12.5%</strong> compared to last month<br><small className="text-muted">Previous: $40,200</small>`}
                    >
                      <i className="bi bi-arrow-up me-1" />12.5%
                    </span>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-3 border rounded">
                    <div>
                      <h6 className="mb-1">Active Users</h6>
                      <h4 className="mb-0">2,845</h4>
                    </div>
                    <span
                      className="badge bg-danger"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover"
                      data-bs-placement="left"
                      data-bs-html="true"
                      data-bs-content={`<strong>-3.2%</strong> compared to last month<br><small className="text-muted">Previous: 2,939</small>`}
                    >
                      <i className="bi bi-arrow-down me-1" />3.2%
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* User Profile Popover */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">User Profile Preview</h5>
                  <p className="card-subTitle">Hover to see user details</p>
                </div>
                <div className="card-body">
                  <p>
                    This task was assigned to
                    <a
                      href="#"
                      className="text-decoration-none"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover focus"
                      data-bs-html="true"
                      data-bs-content={`<div className="d-flex align-items-center"><img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle me-2" width="40" height="40"><div><strong>Sarah Johnson</strong><br><small className="text-muted">Product Designer</small></div></div><hr className="my-2"><small><i className="bi bi-envelope me-1"></i>sarah@example.com</small>`}
                    >
                      @sarah
                    </a>
                    for review.
                  </p>
                  <p className="mb-0">
                    The code changes were merged by
                    <a
                      href="#"
                      className="text-decoration-none"
                      data-bs-toggle="popover"
                      data-bs-trigger="hover focus"
                      data-bs-html="true"
                      data-bs-content={`<div className="d-flex align-items-center"><img src="/assets/img/avatars/avatar-2.webp" className="rounded-circle me-2" width="40" height="40"><div><strong>Michael Chen</strong><br><small className="text-muted">Senior Developer</small></div></div><hr className="my-2"><small><i className="bi bi-envelope me-1"></i>michael@example.com</small>`}
                    >
                      @michael
                    </a>
                    yesterday.
                  </p>
                </div>
              </div>
            </div>
            {/* Status Explanations */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-Title">Status Explanations</h5>
                  <p className="card-subTitle">Hover over badges for details</p>
                </div>
                <div className="card-body">
                  <table className="table table-sm">
                    <thead>
                      <tr>
                        <th>Order</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>#ORD-001</td>
                        <td>
                          <span className="badge bg-success" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="Order has been delivered to the customer on Jan 15, 2024.">
                            Delivered
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>#ORD-002</td>
                        <td>
                          <span className="badge bg-info" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="Package is in transit. Estimated delivery: Jan 20, 2024.">
                            Shipped
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>#ORD-003</td>
                        <td>
                          <span className="badge bg-warning text-dark" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="Order is being prepared for shipment. Processing time: 1-2 business days.">
                            Processing
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td>#ORD-004</td>
                        <td>
                          <span className="badge bg-danger" data-bs-toggle="popover" data-bs-trigger="hover" data-bs-content="Order was cancelled by the customer on Jan 10, 2024. Refund issued.">
                            Cancelled
                          </span>
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
            <a href="#">Docs</a>
            <a href="#">Privacy</a>
            <a href="#">Security</a>
            <a href="#">Support</a>
          </div>
          <div className="footer-credits">
            <div className="footer-copyright">
              © 2026 <a href="#">FlexAdmin</a>
            </div>
            <div className="footer-copyright">
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default ComponentsPopoversPage
