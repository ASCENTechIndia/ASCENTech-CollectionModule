function ComponentsAlertsPage() {
  return (
    <div>
      <div className="main-content page-components-alerts">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Alerts</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Alerts</span>
          </nav>
        </div>
        {/* Default Alerts */}
        <section className="section">
          <div className="row g-4">
            {/* Basic Alerts */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Alerts</h5>
                  <p className="card-subtitle">Basic alert styles for different contexts</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-primary" role="alert">
                    A simple primary alert—check it out!
                  </div>
                  <div className="alert alert-secondary" role="alert">
                    A simple secondary alert—check it out!
                  </div>
                  <div className="alert alert-success" role="alert">
                    A simple success alert—check it out!
                  </div>
                  <div className="alert alert-danger" role="alert">
                    A simple danger alert—check it out!
                  </div>
                  <div className="alert alert-warning" role="alert">
                    A simple warning alert—check it out!
                  </div>
                  <div className="alert alert-info mb-0" role="alert">
                    A simple info alert—check it out!
                  </div>
                </div>
              </div>
            </div>
            {/* Alerts with Links */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Alerts with Links</h5>
                  <p className="card-subtitle">Use <code>.alert-link</code> class for matching links</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-primary" role="alert">
                    A simple primary alert with <a href="#" onClick={(event) => event.preventDefault()} className="alert-link">an example link</a>. Give it a click if you like.
                  </div>
                  <div className="alert alert-secondary" role="alert">
                    A simple secondary alert with <a href="#" onClick={(event) => event.preventDefault()} className="alert-link">an example link</a>. Give it a click if you like.
                  </div>
                  <div className="alert alert-success" role="alert">
                    A simple success alert with <a href="#" onClick={(event) => event.preventDefault()} className="alert-link">an example link</a>. Give it a click if you like.
                  </div>
                  <div className="alert alert-danger" role="alert">
                    A simple danger alert with <a href="#" onClick={(event) => event.preventDefault()} className="alert-link">an example link</a>. Give it a click if you like.
                  </div>
                  <div className="alert alert-warning" role="alert">
                    A simple warning alert with <a href="#" onClick={(event) => event.preventDefault()} className="alert-link">an example link</a>. Give it a click if you like.
                  </div>
                  <div className="alert alert-info mb-0" role="alert">
                    A simple info alert with <a href="#" onClick={(event) => event.preventDefault()} className="alert-link">an example link</a>. Give it a click if you like.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Dismissible Alerts */}
        <section className="section">
          <h5 className="section-title mb-3">Dismissible Alerts</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Dismissible Alerts</h5>
                  <p className="card-subtitle">Add close button to dismiss alerts</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-primary alert-dismissible fade show" role="alert">
                    <strong>Primary!</strong> This alert can be dismissed.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Success!</strong> Your action has been completed successfully.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    <strong>Warning!</strong> Please review the information carefully.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-danger alert-dismissible fade show mb-0" role="alert">
                    <strong>Danger!</strong> An error occurred while processing.
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Alerts with Heading</h5>
                  <p className="card-subtitle">Use <code>.alert-heading</code> for titles</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <h4 className="alert-heading">Well done!</h4>
                    <p>You successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works.</p>
                    <hr />
                    <p className="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-danger alert-dismissible fade show mb-0" role="alert">
                    <h4 className="alert-heading">Something went wrong!</h4>
                    <p>We couldn't process your request at this time. Please try again later or contact support if the problem persists.</p>
                    <hr />
                    <p className="mb-0">Error Code: <code>ERR_CONNECTION_REFUSED</code></p>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Alerts with Icons */}
        <section className="section">
          <h5 className="section-title mb-3">Alerts with Icons</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Icon Alerts</h5>
                  <p className="card-subtitle">Alerts with icons using flex layout</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-primary alert-icon" role="alert">
                    <i className="bi bi-info-circle" />
                    <div className="alert-icon-content">
                      <strong>Heads up!</strong> This alert needs your attention, but it's not super important.
                    </div>
                  </div>
                  <div className="alert alert-success alert-icon" role="alert">
                    <i className="bi bi-check-circle" />
                    <div className="alert-icon-content">
                      <strong>Success!</strong> Your changes have been saved successfully.
                    </div>
                  </div>
                  <div className="alert alert-warning alert-icon" role="alert">
                    <i className="bi bi-exclamation-triangle" />
                    <div className="alert-icon-content">
                      <strong>Warning!</strong> This action may have unexpected consequences.
                    </div>
                  </div>
                  <div className="alert alert-danger alert-icon mb-0" role="alert">
                    <i className="bi bi-x-circle" />
                    <div className="alert-icon-content">
                      <strong>Error!</strong> Something went wrong. Please try again.
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Icon Alerts Dismissible</h5>
                  <p className="card-subtitle">Icon alerts with close button</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-primary alert-icon alert-dismissible fade show" role="alert">
                    <i className="bi bi-bell" />
                    <div className="alert-icon-content">
                      <strong>New notification!</strong> You have 3 unread messages in your inbox.
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-success alert-icon alert-dismissible fade show" role="alert">
                    <i className="bi bi-cloud-check" />
                    <div className="alert-icon-content">
                      <strong>Backup complete!</strong> All your data has been securely saved.
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-warning alert-icon alert-dismissible fade show" role="alert">
                    <i className="bi bi-shield-exclamation" />
                    <div className="alert-icon-content">
                      <strong>Security alert!</strong> We noticed a new login from an unknown device.
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-danger alert-icon alert-dismissible fade show mb-0" role="alert">
                    <i className="bi bi-bug" />
                    <div className="alert-icon-content">
                      <strong>System error!</strong> Please contact support with error ID: #4521.
                    </div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Outline Alerts */}
        <section className="section">
          <h5 className="section-title mb-3">Outline Alerts</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Outline Style</h5>
                  <p className="card-subtitle">Alerts with transparent background</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-outline-primary" role="alert">
                    A simple outline primary alert—check it out!
                  </div>
                  <div className="alert alert-outline-success" role="alert">
                    A simple outline success alert—check it out!
                  </div>
                  <div className="alert alert-outline-warning" role="alert">
                    A simple outline warning alert—check it out!
                  </div>
                  <div className="alert alert-outline-danger" role="alert">
                    A simple outline danger alert—check it out!
                  </div>
                  <div className="alert alert-outline-info mb-0" role="alert">
                    A simple outline info alert—check it out!
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Outline with Icons</h5>
                  <p className="card-subtitle">Outline alerts with icons</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-outline-primary alert-icon" role="alert">
                    <i className="bi bi-info-circle" />
                    <div className="alert-icon-content">
                      <strong>Info!</strong> This is an informational outline alert.
                    </div>
                  </div>
                  <div className="alert alert-outline-success alert-icon" role="alert">
                    <i className="bi bi-check-circle" />
                    <div className="alert-icon-content">
                      <strong>Success!</strong> Operation completed without issues.
                    </div>
                  </div>
                  <div className="alert alert-outline-warning alert-icon" role="alert">
                    <i className="bi bi-exclamation-triangle" />
                    <div className="alert-icon-content">
                      <strong>Warning!</strong> Please proceed with caution.
                    </div>
                  </div>
                  <div className="alert alert-outline-danger alert-icon" role="alert">
                    <i className="bi bi-x-circle" />
                    <div className="alert-icon-content">
                      <strong>Error!</strong> The action could not be completed.
                    </div>
                  </div>
                  <div className="alert alert-outline-info alert-icon mb-0" role="alert">
                    <i className="bi bi-lightbulb" />
                    <div className="alert-icon-content">
                      <strong>Tip!</strong> You can use keyboard shortcuts for faster navigation.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Solid Alerts */}
        <section className="section">
          <h5 className="section-title mb-3">Solid Alerts</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Solid Style</h5>
                  <p className="card-subtitle">Alerts with solid background colors</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-solid-primary" role="alert">
                    A simple solid primary alert—check it out!
                  </div>
                  <div className="alert alert-solid-success" role="alert">
                    A simple solid success alert—check it out!
                  </div>
                  <div className="alert alert-solid-warning" role="alert">
                    A simple solid warning alert—check it out!
                  </div>
                  <div className="alert alert-solid-danger" role="alert">
                    A simple solid danger alert—check it out!
                  </div>
                  <div className="alert alert-solid-info mb-0" role="alert">
                    A simple solid info alert—check it out!
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Solid with Icons</h5>
                  <p className="card-subtitle">Solid alerts with icons</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-solid-primary alert-icon" role="alert">
                    <i className="bi bi-info-circle" />
                    <div className="alert-icon-content">
                      <strong>Info!</strong> This is an informational solid alert.
                    </div>
                  </div>
                  <div className="alert alert-solid-success alert-icon" role="alert">
                    <i className="bi bi-check-circle" />
                    <div className="alert-icon-content">
                      <strong>Success!</strong> Operation completed successfully.
                    </div>
                  </div>
                  <div className="alert alert-solid-warning alert-icon" role="alert">
                    <i className="bi bi-exclamation-triangle" />
                    <div className="alert-icon-content">
                      <strong>Warning!</strong> Please review before continuing.
                    </div>
                  </div>
                  <div className="alert alert-solid-danger alert-icon" role="alert">
                    <i className="bi bi-x-circle" />
                    <div className="alert-icon-content">
                      <strong>Error!</strong> Critical failure detected.
                    </div>
                  </div>
                  <div className="alert alert-solid-info alert-icon mb-0" role="alert">
                    <i className="bi bi-lightbulb" />
                    <div className="alert-icon-content">
                      <strong>Tip!</strong> Check out our documentation for more info.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Alerts with Lists */}
        <section className="section">
          <h5 className="section-title mb-3">Alerts with Additional Content</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Alerts with Lists</h5>
                  <p className="card-subtitle">Include bullet points in alerts</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-warning" role="alert">
                    <h5 className="alert-heading">Please fix the following errors:</h5>
                    <ul className="mb-0">
                      <li>Email address is required</li>
                      <li>Password must be at least 8 characters</li>
                      <li>Please accept the terms and conditions</li>
                    </ul>
                  </div>
                  <div className="alert alert-info mb-0" role="alert">
                    <h5 className="alert-heading">System requirements:</h5>
                    <ul className="mb-0">
                      <li>Minimum 4GB RAM recommended</li>
                      <li>Chrome 90+ or Firefox 88+</li>
                      <li>Stable internet connection</li>
                      <li>JavaScript must be enabled</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Alerts with Buttons</h5>
                  <p className="card-subtitle">Include action buttons in alerts</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-warning alert-icon" role="alert">
                    <i className="bi bi-exclamation-triangle" />
                    <div className="alert-icon-content">
                      <h5 className="alert-heading">Your trial is expiring!</h5>
                      <p className="mb-3">Your free trial will expire in 3 days. Upgrade now to continue enjoying all premium features.</p>
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-warning btn-sm">Upgrade Now</button>
                        <button type="button" className="btn btn-outline-dark btn-sm">Learn More</button>
                      </div>
                    </div>
                  </div>
                  <div className="alert alert-danger alert-icon mb-0" role="alert">
                    <i className="bi bi-shield-x" />
                    <div className="alert-icon-content">
                      <h5 className="alert-heading">Account Suspended</h5>
                      <p className="mb-3">Your account has been suspended due to suspicious activity. Please verify your identity to restore access.</p>
                      <div className="d-flex gap-2">
                        <button type="button" className="btn btn-danger btn-sm">Verify Identity</button>
                        <button type="button" className="btn btn-outline-danger btn-sm">Contact Support</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Live Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Live Examples</h5>
          <div className="row g-4">
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Toast-style Alerts</h5>
                  <p className="card-subtitle">Compact alerts for notifications</p>
                </div>
                <div className="card-body">
                  <div className="alert alert-success alert-icon alert-dismissible fade show py-2" role="alert">
                    <i className="bi bi-check-circle" />
                    <div className="alert-icon-content">File uploaded successfully</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-danger alert-icon alert-dismissible fade show py-2" role="alert">
                    <i className="bi bi-x-circle" />
                    <div className="alert-icon-content">Failed to save changes</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-warning alert-icon alert-dismissible fade show py-2" role="alert">
                    <i className="bi bi-exclamation-circle" />
                    <div className="alert-icon-content">Your session will expire in 5 minutes</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                  <div className="alert alert-info alert-icon alert-dismissible fade show py-2 mb-0" role="alert">
                    <i className="bi bi-download" />
                    <div className="alert-icon-content">Download started...</div>
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Trigger Alerts</h5>
                  <p className="card-subtitle">Click buttons to show alerts dynamically</p>
                </div>
                <div className="card-body">
                  <div id="alertPlaceholder" />
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-primary btn-sm" onclick="showAlert('primary', 'info-circle', 'Info', 'This is a primary alert triggered by button click.')">
                      <i className="bi bi-info-circle me-1" /> Info
                    </button>
                    <button type="button" className="btn btn-success btn-sm" onclick="showAlert('success', 'check-circle', 'Success', 'Action completed successfully!')">
                      <i className="bi bi-check-circle me-1" /> Success
                    </button>
                    <button type="button" className="btn btn-warning btn-sm" onclick="showAlert('warning', 'exclamation-triangle', 'Warning', 'Please be careful with this action.')">
                      <i className="bi bi-exclamation-triangle me-1" /> Warning
                    </button>
                    <button type="button" className="btn btn-danger btn-sm" onclick="showAlert('danger', 'x-circle', 'Error', 'Something went wrong. Please try again.')">
                      <i className="bi bi-x-circle me-1" /> Error
                    </button>
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
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Common Use Cases</h5>
                  <p className="card-subtitle">Examples of alerts in typical scenarios</p>
                </div>
                <div className="card-body">
                  <div className="row g-4">
                    {/* Cookie Consent */}
                    <div className="col-lg-6">
                      <h6 className="text-muted small text-uppercase mb-3">Cookie Consent</h6>
                      <div className="alert alert-info alert-dismissible fade show" role="alert">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-cookie fs-4" />
                          <div className="flex-grow-1">
                            <strong>We use cookies</strong>
                            <p className="mb-2 small">This website uses cookies to improve your experience. By continuing to browse, you agree to our use of cookies.</p>
                            <div className="d-flex gap-2">
                              <button type="button" className="btn btn-info btn-sm">Accept All</button>
                              <button type="button" className="btn btn-outline-secondary btn-sm">Customize</button>
                            </div>
                          </div>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                      </div>
                    </div>
                    {/* Email Verification */}
                    <div className="col-lg-6">
                      <h6 className="text-muted small text-uppercase mb-3">Email Verification</h6>
                      <div className="alert alert-warning alert-dismissible fade show" role="alert">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-envelope-exclamation fs-4" />
                          <div className="flex-grow-1">
                            <strong>Verify your email address</strong>
                            <p className="mb-2 small">We sent a verification email to <strong>john@example.com</strong>. Click the link in the email to verify your account.</p>
                            <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-link btn-sm p-0">Resend verification email</a>
                          </div>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                      </div>
                    </div>
                    {/* Payment Success */}
                    <div className="col-lg-6">
                      <h6 className="text-muted small text-uppercase mb-3">Payment Success</h6>
                      <div className="alert alert-success" role="alert">
                        <div className="d-flex align-items-start gap-3">
                          <div className="rounded-circle bg-success bg-opacity-25 p-2">
                            <i className="bi bi-credit-card text-success fs-5" />
                          </div>
                          <div>
                            <strong>Payment Successful!</strong>
                            <p className="mb-1 small">Your payment of <strong>$99.00</strong> has been processed.</p>
                            <p className="mb-0 small text-muted">Transaction ID: <code>#TXN-2024-001234</code></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* System Maintenance */}
                    <div className="col-lg-6">
                      <h6 className="text-muted small text-uppercase mb-3">System Maintenance</h6>
                      <div className="alert alert-solid-primary" role="alert">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-tools fs-4" />
                          <div>
                            <strong>Scheduled Maintenance</strong>
                            <p className="mb-1 small">Our system will undergo maintenance on <strong>January 25, 2026</strong> from <strong>2:00 AM to 4:00 AM UTC</strong>.</p>
                            <p className="mb-0 small opacity-75">Some features may be temporarily unavailable during this time.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* New Feature Announcement */}
                    <div className="col-lg-6">
                      <h6 className="text-muted small text-uppercase mb-3">Feature Announcement</h6>
                      <div className="alert alert-primary alert-dismissible fade show" role="alert">
                        <div className="d-flex align-items-start gap-3">
                          <span className="badge bg-primary rounded-pill">New</span>
                          <div className="flex-grow-1">
                            <strong>Dark mode is here!</strong>
                            <p className="mb-2 small">You can now switch to dark mode for a more comfortable viewing experience in low-light conditions.</p>
                            <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-primary">Try it now</a>
                          </div>
                        </div>
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" />
                      </div>
                    </div>
                    {/* Form Validation Error */}
                    <div className="col-lg-6">
                      <h6 className="text-muted small text-uppercase mb-3">Form Validation</h6>
                      <div className="alert alert-danger" role="alert">
                        <div className="d-flex align-items-start gap-3">
                          <i className="bi bi-exclamation-octagon fs-4" />
                          <div>
                            <strong>Please correct the following errors:</strong>
                            <ul className="mb-0 small mt-2">
                              <li>Username is already taken</li>
                              <li>Password must contain at least one uppercase letter</li>
                              <li>Phone number format is invalid</li>
                            </ul>
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

export default ComponentsAlertsPage
