function ComponentsToastsPage() {
  return (
    <div>
      <div className="main-content page-components-toasts">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Toasts</h1>
          <nav className="breadcrumb">
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Home</a>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Toasts</span>
          </nav>
        </div>
        {/* Basic Toasts */}
        <section className="section">
          <div className="row g-4">
            {/* Basic Toast */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Basic Toast</h5>
                  <p className="card-subtitle">Simple toast with header and body</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-bell text-primary me-2" />
                        <strong className="me-auto">Notification</strong>
                        <small className="text-muted">just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        Hello, world! This is a toast message.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Live Toast Demo */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Live Toast Demo</h5>
                  <p className="card-subtitle">Click the button to trigger the toast</p>
                </div>
                <div className="card-body">
                  <button type="button" className="btn btn-primary" id="liveToastBtn">Show Live Toast</button>
                  <div className="toast-container position-fixed bottom-0 end-0 p-3">
                    <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-check-circle text-success me-2" />
                        <strong className="me-auto">Success</strong>
                        <small>just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        Your changes have been saved successfully!
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Colored Toasts */}
        <section className="section">
          <h5 className="section-title mb-3">Colored Toasts</h5>
          <div className="row g-4">
            {/* Color Variants */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Color Variants</h5>
                  <p className="card-subtitle">Toasts with different background colors</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    {/* Primary */}
                    <div className="toast show align-items-center text-bg-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-info-circle me-2" />
                          This is a primary toast message.
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Success */}
                    <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-check-circle me-2" />
                          Success! Your action was completed.
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Warning */}
                    <div className="toast show align-items-center text-bg-warning border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-exclamation-triangle me-2" />
                          Warning! Please check your input.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Danger */}
                    <div className="toast show align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-x-circle me-2" />
                          Error! Something went wrong.
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Info */}
                    <div className="toast show align-items-center text-bg-info border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-info-circle me-2" />
                          Info: New updates are available.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Soft Color Variants */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Soft Color Variants</h5>
                  <p className="card-subtitle">Toasts with soft/light background colors</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    {/* Primary Soft */}
                    <div className="toast show align-items-center bg-primary-light text-primary border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-info-circle me-2" />
                          This is a soft primary toast.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Success Soft */}
                    <div className="toast show align-items-center bg-success-light text-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-check-circle me-2" />
                          Success! Operation completed.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Warning Soft */}
                    <div className="toast show align-items-center bg-warning-light text-warning border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-exclamation-triangle me-2" />
                          Warning! Review before proceeding.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Danger Soft */}
                    <div className="toast show align-items-center bg-danger-light text-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-x-circle me-2" />
                          Error! Please try again.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Info Soft */}
                    <div className="toast show align-items-center bg-info-light text-info border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body">
                          <i className="bi bi-info-circle me-2" />
                          Info: Check out new features.
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Toast with Custom Content */}
        <section className="section">
          <h5 className="section-title mb-3">Custom Content</h5>
          <div className="row g-4">
            {/* Toast with Image */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Toast with Avatar</h5>
                  <p className="card-subtitle">Toasts featuring user avatars</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle me-2" width={20} height={20} alt="User" />
                        <strong className="me-auto">John Doe</strong>
                        <small className="text-muted">2 mins ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        Hey! Just wanted to check in on the project status.
                      </div>
                    </div>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <img src="/assets/img/avatars/avatar-2.webp" className="rounded-circle me-2" width={20} height={20} alt="User" />
                        <strong className="me-auto">Sarah Smith</strong>
                        <small className="text-muted">5 mins ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        The design files are ready for review.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Toast with Actions */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Toast with Actions</h5>
                  <p className="card-subtitle">Toasts with action buttons</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-envelope text-primary me-2" />
                        <strong className="me-auto">New Message</strong>
                        <small className="text-muted">just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        You have received a new message from the support team.
                        <div className="mt-2 pt-2 border-top d-flex gap-2">
                          <button type="button" className="btn btn-primary btn-sm">View</button>
                          <button type="button" className="btn btn-outline-secondary btn-sm" data-bs-dismiss="toast">Dismiss</button>
                        </div>
                      </div>
                    </div>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-cloud-arrow-up text-success me-2" />
                        <strong className="me-auto">File Upload</strong>
                        <small className="text-muted">just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        Your file has been uploaded successfully.
                        <div className="mt-2 pt-2 border-top d-flex gap-2">
                          <button type="button" className="btn btn-success btn-sm">Open File</button>
                          <button type="button" className="btn btn-outline-secondary btn-sm">Share</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Toast Placements */}
        <section className="section">
          <h5 className="section-title mb-3">Toast Placements</h5>
          <div className="row g-4">
            {/* Placement Preview */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Placement Options</h5>
                  <p className="card-subtitle">Choose where toasts appear on screen</p>
                </div>
                <div className="card-body">
                  <div className="row g-3 mb-4">
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="top-0 start-0">Top Left</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="top-0 start-50 translate-middle-x">Top Center</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="top-0 end-0">Top Right</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="top-50 start-0 translate-middle-y">Middle Left</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="top-50 start-50 translate-middle">Middle Center</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="top-50 end-0 translate-middle-y">Middle Right</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="bottom-0 start-0">Bottom Left</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-outline-primary btn-sm" data-placement="bottom-0 start-50 translate-middle-x">Bottom Center</button>
                    </div>
                    <div className="col-auto">
                      <button type="button" className="btn btn-primary btn-sm" data-placement="bottom-0 end-0">Bottom Right (Default)</button>
                    </div>
                  </div>
                  {/* Placement Preview Box */}
                  <div className="position-relative bg-light rounded border" style={{height: 300}}>
                    {/* Visual representation of placement options */}
                    <div className="position-absolute top-0 start-0 m-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Top Left</div>
                    </div>
                    <div className="position-absolute top-0 start-50 translate-middle-x mt-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Top Center</div>
                    </div>
                    <div className="position-absolute top-0 end-0 m-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Top Right</div>
                    </div>
                    <div className="position-absolute top-50 start-0 translate-middle-y ms-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Middle Left</div>
                    </div>
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Center</div>
                    </div>
                    <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Middle Right</div>
                    </div>
                    <div className="position-absolute bottom-0 start-0 m-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Bottom Left</div>
                    </div>
                    <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2">
                      <div className="bg-primary-light text-primary px-2 py-1 rounded small">Bottom Center</div>
                    </div>
                    <div className="position-absolute bottom-0 end-0 m-2">
                      <div className="bg-success text-white px-2 py-1 rounded small">Bottom Right</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Stacking & Auto-hide */}
        <section className="section">
          <h5 className="section-title mb-3">Stacking &amp; Auto-hide</h5>
          <div className="row g-4">
            {/* Stacked Toasts */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Stacked Toasts</h5>
                  <p className="card-subtitle">Multiple toasts stack vertically</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-check-circle text-success me-2" />
                        <strong className="me-auto">Saved</strong>
                        <small className="text-muted">2 seconds ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        Document saved successfully.
                      </div>
                    </div>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-cloud-download text-primary me-2" />
                        <strong className="me-auto">Download</strong>
                        <small className="text-muted">5 seconds ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        File download started.
                      </div>
                    </div>
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-exclamation-triangle text-warning me-2" />
                        <strong className="me-auto">Warning</strong>
                        <small className="text-muted">10 seconds ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        Your session will expire in 5 minutes.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Auto-hide Options */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Auto-hide Options</h5>
                  <p className="card-subtitle">Configure toast visibility duration</p>
                </div>
                <div className="card-body">
                  <p className="text-muted small mb-3">Toasts can be configured to auto-hide after a delay or stay visible until dismissed.</p>
                  <div className="d-flex flex-column gap-3">
                    <div className="d-flex align-items-center gap-3">
                      <button type="button" className="btn btn-outline-primary btn-sm" id="autoHide3s">3 seconds</button>
                      <span className="small text-muted">Quick notification</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button type="button" className="btn btn-outline-primary btn-sm" id="autoHide5s">5 seconds</button>
                      <span className="small text-muted">Default duration</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button type="button" className="btn btn-outline-primary btn-sm" id="autoHide10s">10 seconds</button>
                      <span className="small text-muted">Important messages</span>
                    </div>
                    <div className="d-flex align-items-center gap-3">
                      <button type="button" className="btn btn-outline-warning btn-sm" id="noAutoHide">No auto-hide</button>
                      <span className="small text-muted">Requires manual dismiss</span>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-light rounded">
                    <code className="small">
                      data-bs-autohide="false"<br />
                      data-bs-delay="5000"
                    </code>
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
            {/* Notification Center */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Notification Center</h5>
                  <p className="card-subtitle">App-style notification toasts</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    {/* New Comment */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <span className="bg-primary rounded-circle me-2" style={{width: 8, height: 8, display: 'inline-block'}} />
                        <strong className="me-auto">New Comment</strong>
                        <small className="text-muted">1m ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body d-flex align-items-start gap-2">
                        <img src="/assets/img/avatars/avatar-3.webp" className="rounded-circle" width={32} height={32} alt="User" />
                        <div>
                          <p className="mb-1"><strong>Mike Johnson</strong> commented on your post:</p>
                          <p className="text-muted small mb-0">"Great work on this project! The design looks amazing..."</p>
                        </div>
                      </div>
                    </div>
                    {/* File Shared */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <span className="bg-success rounded-circle me-2" style={{width: 8, height: 8, display: 'inline-block'}} />
                        <strong className="me-auto">File Shared</strong>
                        <small className="text-muted">5m ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body d-flex align-items-center gap-2">
                        <div className="bg-warning-light text-warning rounded p-2">
                          <i className="bi bi-file-earmark-pdf" />
                        </div>
                        <div>
                          <p className="mb-0 fw-medium">Project_Proposal.pdf</p>
                          <p className="text-muted small mb-0">Shared by Emily Davis</p>
                        </div>
                      </div>
                    </div>
                    {/* Meeting Reminder */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <span className="bg-warning rounded-circle me-2" style={{width: 8, height: 8, display: 'inline-block'}} />
                        <strong className="me-auto">Meeting Reminder</strong>
                        <small className="text-muted">15m ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body d-flex align-items-center gap-2">
                        <div className="bg-info-light text-info rounded p-2">
                          <i className="bi bi-calendar-event" />
                        </div>
                        <div>
                          <p className="mb-0 fw-medium">Team Standup</p>
                          <p className="text-muted small mb-0">Starting in 15 minutes</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* System Status Toasts */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">System Status</h5>
                  <p className="card-subtitle">System and status notifications</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    {/* Connection Restored */}
                    <div className="toast show align-items-center text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body d-flex align-items-center gap-2">
                          <i className="bi bi-wifi" />
                          <div>
                            <strong>Connection Restored</strong>
                            <p className="mb-0 small opacity-75">You are back online</p>
                          </div>
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Update Available */}
                    <div className="toast show align-items-center text-bg-info border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body d-flex align-items-center gap-2">
                          <i className="bi bi-arrow-repeat" />
                          <div>
                            <strong>Update Available</strong>
                            <p className="mb-0 small opacity-75">Version 2.1.0 is ready to install</p>
                          </div>
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Low Storage */}
                    <div className="toast show align-items-center text-bg-warning border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body d-flex align-items-center gap-2">
                          <i className="bi bi-hdd" />
                          <div>
                            <strong>Low Storage</strong>
                            <p className="mb-0 small">Only 2.5 GB remaining</p>
                          </div>
                        </div>
                        <button type="button" className="btn-close me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                    {/* Error */}
                    <div className="toast show align-items-center text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="d-flex">
                        <div className="toast-body d-flex align-items-center gap-2">
                          <i className="bi bi-exclamation-octagon" />
                          <div>
                            <strong>Sync Failed</strong>
                            <p className="mb-0 small opacity-75">Unable to sync with server</p>
                          </div>
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* E-commerce Toasts */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">E-commerce Notifications</h5>
                  <p className="card-subtitle">Shopping and order notifications</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    {/* Added to Cart */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-cart-check text-success me-2" />
                        <strong className="me-auto">Added to Cart</strong>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body d-flex align-items-center gap-3">
                        <div className="bg-light rounded p-2" style={{width: 50, height: 50}}>
                          <img src="/assets/img/logo.webp" alt="Product" className="img-fluid" />
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-0 fw-medium">Wireless Headphones</p>
                          <p className="text-muted small mb-0">$149.99 × 1</p>
                        </div>
                        <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-primary btn-sm">View Cart</a>
                      </div>
                    </div>
                    {/* Order Shipped */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-truck text-primary me-2" />
                        <strong className="me-auto">Order Shipped</strong>
                        <small className="text-muted">2h ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        <p className="mb-2">Your order #12345 has been shipped!</p>
                        <div className="d-flex gap-2">
                          <button type="button" className="btn btn-outline-primary btn-sm">Track Order</button>
                          <button type="button" className="btn btn-outline-secondary btn-sm" data-bs-dismiss="toast">Dismiss</button>
                        </div>
                      </div>
                    </div>
                    {/* Discount Alert */}
                    <div className="toast show align-items-center border-0" role="alert" aria-live="assertive" aria-atomic="true" style={{background: 'linear-gradient(135deg, var(--accent-color), #8b5cf6)'}}>
                      <div className="d-flex text-white">
                        <div className="toast-body d-flex align-items-center gap-2">
                          <i className="bi bi-percent fs-4" />
                          <div>
                            <strong>Flash Sale!</strong>
                            <p className="mb-0 small opacity-75">Use code SAVE20 for 20% off</p>
                          </div>
                        </div>
                        <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Toasts */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Social Notifications</h5>
                  <p className="card-subtitle">Social media style notifications</p>
                </div>
                <div className="card-body">
                  <div className="toast-container position-static d-flex flex-column gap-2">
                    {/* New Follower */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-person-plus text-primary me-2" />
                        <strong className="me-auto">New Follower</strong>
                        <small className="text-muted">just now</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body d-flex align-items-center gap-3">
                        <img src="/assets/img/avatars/avatar-4.webp" className="rounded-circle" width={40} height={40} alt="User" />
                        <div className="flex-grow-1">
                          <p className="mb-0"><strong>Alex Turner</strong> started following you</p>
                          <p className="text-muted small mb-0">142 followers</p>
                        </div>
                        <button className="btn btn-primary btn-sm">Follow Back</button>
                      </div>
                    </div>
                    {/* Like Notification */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-heart-fill text-danger me-2" />
                        <strong className="me-auto">Post Liked</strong>
                        <small className="text-muted">3m ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        <div className="d-flex">
                          <div className="d-flex me-2">
                            <img src="/assets/img/avatars/avatar-5.webp" className="rounded-circle border border-2 border-white" width={24} height={24} alt="User" style={{marginRight: '-8px', zIndex: 3}} />
                            <img src="/assets/img/avatars/avatar-6.webp" className="rounded-circle border border-2 border-white" width={24} height={24} alt="User" style={{marginRight: '-8px', zIndex: 2}} />
                            <img src="/assets/img/avatars/avatar-7.webp" className="rounded-circle border border-2 border-white" width={24} height={24} alt="User" style={{zIndex: 1}} />
                          </div>
                          <span><strong>Emma, David</strong> and <strong>23 others</strong> liked your post</span>
                        </div>
                      </div>
                    </div>
                    {/* Mention */}
                    <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
                      <div className="toast-header">
                        <i className="bi bi-at text-info me-2" />
                        <strong className="me-auto">Mentioned You</strong>
                        <small className="text-muted">10m ago</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close" />
                      </div>
                      <div className="toast-body">
                        <img src="/assets/img/avatars/avatar-8.webp" className="rounded-circle me-2" width={20} height={20} alt="User" />
                        <strong>@chris_dev</strong> mentioned you in a comment: "Hey <span className="text-primary">@you</span> check this out!"
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

export default ComponentsToastsPage
