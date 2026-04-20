import { Link } from 'react-router-dom';
function ComponentsProgressPage() {
  return (
    <div>
      <div className="main-content page-components-progress">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Progress</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Components</a>
            <span className="breadcrumb-item active">Progress</span>
          </nav>
        </div>
        {/* Basic Progress Bars */}
        <section className="section">
          <div className="row g-4">
            {/* Default Progress */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Progress</h5>
                  <p className="card-subtitle">Basic progress bars with different values</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="progress" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '0%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '25%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '50%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '75%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '100%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Colored Progress Bars */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Colored Progress Bars</h5>
                  <p className="card-subtitle">Progress bars with different status colors</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="progress" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '60%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={70} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-success" style={{width: '70%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{width: '55%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-danger" style={{width: '40%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={80} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-info" style={{width: '80%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Progress with Labels & Sizes */}
        <section className="section">
          <h5 className="section-title mb-3">Progress Variations</h5>
          <div className="row g-4">
            {/* Progress with Labels */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Progress with Labels</h5>
                  <p className="card-subtitle">Show percentage inside the progress bar</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="progress progress-xl" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar" style={{width: '25%'}}>25%</div>
                    </div>
                    <div className="progress progress-xl" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-success" style={{width: '50%'}}>50%</div>
                    </div>
                    <div className="progress progress-xl" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-warning" style={{width: '75%'}}>75%</div>
                    </div>
                    <div className="progress progress-xl" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar bg-info" style={{width: '100%'}}>100%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Progress Sizes */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Progress Sizes</h5>
                  <p className="card-subtitle">Different height options for progress bars</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div>
                      <span className="small text-muted d-block mb-1">Small (4px)</span>
                      <div className="progress progress-sm" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar" style={{width: '60%'}} />
                      </div>
                    </div>
                    <div>
                      <span className="small text-muted d-block mb-1">Default (8px)</span>
                      <div className="progress" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-success" style={{width: '60%'}} />
                      </div>
                    </div>
                    <div>
                      <span className="small text-muted d-block mb-1">Large (12px)</span>
                      <div className="progress progress-lg" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-warning" style={{width: '60%'}} />
                      </div>
                    </div>
                    <div>
                      <span className="small text-muted d-block mb-1">Extra Large (16px)</span>
                      <div className="progress progress-xl" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-info" style={{width: '60%'}}>60%</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Striped & Animated */}
        <section className="section">
          <h5 className="section-title mb-3">Striped &amp; Animated Progress</h5>
          <div className="row g-4">
            {/* Striped Progress */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Striped Progress</h5>
                  <p className="card-subtitle">Progress bars with stripe pattern</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="progress" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped" style={{width: '30%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped bg-success" style={{width: '45%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped bg-warning" style={{width: '60%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped bg-danger" style={{width: '75%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped bg-info" style={{width: '90%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Animated Striped */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Animated Striped</h5>
                  <p className="card-subtitle">Progress bars with animated stripes</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    <div className="progress" role="progressbar" aria-valuenow={30} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '30%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={45} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated bg-success" style={{width: '45%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={60} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated bg-warning" style={{width: '60%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated bg-danger" style={{width: '75%'}} />
                    </div>
                    <div className="progress" role="progressbar" aria-valuenow={90} aria-valuemin={0} aria-valuemax={100}>
                      <div className="progress-bar progress-bar-striped progress-bar-animated bg-info" style={{width: '90%'}} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Multiple Bars & With Labels */}
        <section className="section">
          <h5 className="section-title mb-3">Multiple Bars &amp; External Labels</h5>
          <div className="row g-4">
            {/* Multiple Bars (Stacked) */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Multiple Bars (Stacked)</h5>
                  <p className="card-subtitle">Multiple progress bars stacked together</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-4">
                    <div>
                      <p className="small text-muted mb-2">Storage Usage (40GB of 100GB)</p>
                      <div className="progress" role="progressbar" aria-label="Storage usage">
                        <div className="progress-bar" style={{width: '20%'}} title="Documents">Documents</div>
                        <div className="progress-bar bg-success" style={{width: '10%'}} title="Photos">Photos</div>
                        <div className="progress-bar bg-warning" style={{width: '10%'}} title="Other">Other</div>
                      </div>
                      <div className="d-flex gap-3 mt-2 small">
                        <span><span className="badge bg-primary me-1">&nbsp;</span>Documents 20%</span>
                        <span><span className="badge bg-success me-1">&nbsp;</span>Photos 10%</span>
                        <span><span className="badge bg-warning me-1">&nbsp;</span>Other 10%</span>
                      </div>
                    </div>
                    <div>
                      <p className="small text-muted mb-2">Project Progress</p>
                      <div className="progress progress-lg" role="progressbar" aria-label="Project progress">
                        <div className="progress-bar bg-success" style={{width: '35%'}}>Complete</div>
                        <div className="progress-bar bg-warning" style={{width: '25%'}}>In Progress</div>
                        <div className="progress-bar bg-danger" style={{width: '10%'}}>Blocked</div>
                      </div>
                    </div>
                    <div>
                      <p className="small text-muted mb-2">Task Distribution</p>
                      <div className="progress" role="progressbar" aria-label="Task distribution">
                        <div className="progress-bar bg-info" style={{width: '15%'}} />
                        <div className="progress-bar" style={{width: '30%'}} />
                        <div className="progress-bar bg-success" style={{width: '20%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Progress with External Label */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Progress with External Label</h5>
                  <p className="card-subtitle">Labels positioned outside the progress bar</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-4">
                    <div className="progress-with-label">
                      <div className="progress flex-grow-1" role="progressbar" aria-valuenow={25} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar" style={{width: '25%'}} />
                      </div>
                      <span className="progress-label">25%</span>
                    </div>
                    <div className="progress-with-label">
                      <div className="progress flex-grow-1" role="progressbar" aria-valuenow={50} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-success" style={{width: '50%'}} />
                      </div>
                      <span className="progress-label">50%</span>
                    </div>
                    <div className="progress-with-label">
                      <div className="progress flex-grow-1" role="progressbar" aria-valuenow={75} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-warning" style={{width: '75%'}} />
                      </div>
                      <span className="progress-label">75%</span>
                    </div>
                    <div className="progress-with-label">
                      <div className="progress flex-grow-1" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-info" style={{width: '100%'}} />
                      </div>
                      <span className="progress-label">100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Progress Groups & Circles */}
        <section className="section">
          <h5 className="section-title mb-3">Progress Groups &amp; Circles</h5>
          <div className="row g-4">
            {/* Progress Group */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Progress Group</h5>
                  <p className="card-subtitle">Multiple progress bars with labels and values</p>
                </div>
                <div className="card-body">
                  <div className="progress-group">
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <span className="progress-group-label">HTML/CSS</span>
                        <span className="progress-group-value">85%</span>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={85} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar" style={{width: '85%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <span className="progress-group-label">JavaScript</span>
                        <span className="progress-group-value">72%</span>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={72} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-success" style={{width: '72%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <span className="progress-group-label">React</span>
                        <span className="progress-group-value">68%</span>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={68} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-info" style={{width: '68%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <span className="progress-group-label">Node.js</span>
                        <span className="progress-group-value">55%</span>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={55} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-warning" style={{width: '55%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <span className="progress-group-label">Python</span>
                        <span className="progress-group-value">40%</span>
                      </div>
                      <div className="progress" role="progressbar" aria-valuenow={40} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{width: '40%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Circular Progress */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Circular Progress</h5>
                  <p className="card-subtitle">SVG-based circular progress indicators</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap justify-content-around gap-4">
                    {/* Small Circle */}
                    <div className="text-center">
                      <div className="progress-circle progress-circle-sm">
                        <svg width={60} height={60} viewBox="0 0 60 60">
                          <circle className="progress-circle-track" cx={30} cy={30} r={25} strokeWidth={6} />
                          <circle className="progress-circle-bar" cx={30} cy={30} r={25} strokeWidth={6} strokeDasharray="110, 157" />
                        </svg>
                        <span className="progress-circle-value">70%</span>
                      </div>
                      <span className="small text-muted d-block mt-2">Small</span>
                    </div>
                    {/* Default Circle */}
                    <div className="text-center">
                      <div className="progress-circle">
                        <svg width={80} height={80} viewBox="0 0 80 80">
                          <circle className="progress-circle-track" cx={40} cy={40} r={34} strokeWidth={8} />
                          <circle className="progress-circle-bar success" cx={40} cy={40} r={34} strokeWidth={8} strokeDasharray="171, 214" />
                        </svg>
                        <span className="progress-circle-value">80%</span>
                      </div>
                      <span className="small text-muted d-block mt-2">Success</span>
                    </div>
                    {/* Large Circle */}
                    <div className="text-center">
                      <div className="progress-circle progress-circle-lg">
                        <svg width={100} height={100} viewBox="0 0 100 100">
                          <circle className="progress-circle-track" cx={50} cy={50} r={42} strokeWidth={10} />
                          <circle className="progress-circle-bar warning" cx={50} cy={50} r={42} strokeWidth={10} strokeDasharray="159, 264" />
                        </svg>
                        <span className="progress-circle-value">60%</span>
                      </div>
                      <span className="small text-muted d-block mt-2">Warning</span>
                    </div>
                    {/* Danger Circle */}
                    <div className="text-center">
                      <div className="progress-circle progress-circle-lg">
                        <svg width={100} height={100} viewBox="0 0 100 100">
                          <circle className="progress-circle-track" cx={50} cy={50} r={42} strokeWidth={10} />
                          <circle className="progress-circle-bar danger" cx={50} cy={50} r={42} strokeWidth={10} strokeDasharray="92, 264" />
                        </svg>
                        <span className="progress-circle-value">35%</span>
                      </div>
                      <span className="small text-muted d-block mt-2">Danger</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Step Progress */}
        <section className="section">
          <h5 className="section-title mb-3">Step Progress</h5>
          <div className="row g-4">
            {/* Step Progress Basic */}
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Step Progress</h5>
                  <p className="card-subtitle">Multi-step progress indicator for wizards and processes</p>
                </div>
                <div className="card-body">
                  <div className="step-progress mb-5">
                    <div className="step-progress-item completed">
                      <div className="step-progress-marker">
                        <i className="bi bi-check" />
                      </div>
                      <span className="step-progress-label">Account Info</span>
                    </div>
                    <div className="step-progress-item completed">
                      <div className="step-progress-marker">
                        <i className="bi bi-check" />
                      </div>
                      <span className="step-progress-label">Personal Details</span>
                    </div>
                    <div className="step-progress-item active">
                      <div className="step-progress-marker">3</div>
                      <span className="step-progress-label">Payment Method</span>
                    </div>
                    <div className="step-progress-item">
                      <div className="step-progress-marker">4</div>
                      <span className="step-progress-label">Confirmation</span>
                    </div>
                  </div>
                  <hr className="my-4" />
                  <div className="step-progress">
                    <div className="step-progress-item completed">
                      <div className="step-progress-marker">
                        <i className="bi bi-check" />
                      </div>
                      <span className="step-progress-label">Order Placed</span>
                    </div>
                    <div className="step-progress-item completed">
                      <div className="step-progress-marker">
                        <i className="bi bi-check" />
                      </div>
                      <span className="step-progress-label">Processing</span>
                    </div>
                    <div className="step-progress-item completed">
                      <div className="step-progress-marker">
                        <i className="bi bi-check" />
                      </div>
                      <span className="step-progress-label">Shipped</span>
                    </div>
                    <div className="step-progress-item active">
                      <div className="step-progress-marker">
                        <i className="bi bi-truck" />
                      </div>
                      <span className="step-progress-label">Out for Delivery</span>
                    </div>
                    <div className="step-progress-item">
                      <div className="step-progress-marker">
                        <i className="bi bi-box-seam" />
                      </div>
                      <span className="step-progress-label">Delivered</span>
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
            {/* File Upload Progress */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">File Upload Progress</h5>
                  <p className="card-subtitle">Progress tracking for file uploads</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-column gap-3">
                    {/* Completed Upload */}
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                      <i className="bi bi-file-earmark-pdf text-danger fs-4" />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small fw-medium">document.pdf</span>
                          <span className="small text-success"><i className="bi bi-check-circle me-1" />Complete</span>
                        </div>
                        <div className="progress progress-sm" role="progressbar" aria-valuenow={100} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar bg-success" style={{width: '100%'}} />
                        </div>
                        <span className="small text-muted">2.4 MB</span>
                      </div>
                    </div>
                    {/* In Progress Upload */}
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                      <i className="bi bi-file-earmark-image text-primary fs-4" />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small fw-medium">photo-gallery.zip</span>
                          <span className="small text-primary">67%</span>
                        </div>
                        <div className="progress progress-sm" role="progressbar" aria-valuenow={67} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar progress-bar-striped progress-bar-animated" style={{width: '67%'}} />
                        </div>
                        <span className="small text-muted">15.2 MB of 22.7 MB</span>
                      </div>
                    </div>
                    {/* Queued Upload */}
                    <div className="d-flex align-items-center gap-3 p-3 bg-light rounded">
                      <i className="bi bi-file-earmark-zip text-warning fs-4" />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between mb-1">
                          <span className="small fw-medium">project-files.zip</span>
                          <span className="small text-muted">Queued</span>
                        </div>
                        <div className="progress progress-sm" role="progressbar" aria-valuenow={0} aria-valuemin={0} aria-valuemax={100}>
                          <div className="progress-bar" style={{width: '0%'}} />
                        </div>
                        <span className="small text-muted">45.8 MB</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Profile Completion */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Profile Completion</h5>
                  <p className="card-subtitle">User profile progress indicator</p>
                </div>
                <div className="card-body">
                  <div className="text-center mb-4">
                    <div className="progress-circle progress-circle-lg mx-auto">
                      <svg width={120} height={120} viewBox="0 0 120 120">
                        <circle className="progress-circle-track" cx={60} cy={60} r={50} strokeWidth={12} />
                        <circle className="progress-circle-bar" cx={60} cy={60} r={50} strokeWidth={12} strokeDasharray="236, 314" />
                      </svg>
                      <span className="progress-circle-value" style={{fontSize: '1.5rem'}}>75%</span>
                    </div>
                    <p className="mt-3 mb-0 text-muted">Profile is <strong>75%</strong> complete</p>
                  </div>
                  <div className="border-top pt-3">
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-check-circle-fill text-success" />
                      <span className="small">Basic information</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-check-circle-fill text-success" />
                      <span className="small">Profile picture</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-check-circle-fill text-success" />
                      <span className="small">Email verified</span>
                    </div>
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <i className="bi bi-circle text-muted" />
                      <span className="small text-muted">Phone verification</span>
                    </div>
                    <div className="d-flex align-items-center gap-2">
                      <i className="bi bi-circle text-muted" />
                      <span className="small text-muted">Two-factor authentication</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Project Dashboard */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Project Status</h5>
                  <p className="card-subtitle">Team project completion tracking</p>
                </div>
                <div className="card-body">
                  <div className="progress-group">
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <div className="d-flex align-items-center gap-2">
                          <span className="avatar avatar-xs bg-primary-light text-primary rounded-circle">
                            <i className="bi bi-globe2" />
                          </span>
                          <span className="progress-group-label">Website Redesign</span>
                        </div>
                        <span className="badge bg-success-light text-success">92%</span>
                      </div>
                      <div className="progress progress-sm" role="progressbar" aria-valuenow={92} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-success" style={{width: '92%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <div className="d-flex align-items-center gap-2">
                          <span className="avatar avatar-xs bg-warning-light text-warning rounded-circle">
                            <i className="bi bi-phone" />
                          </span>
                          <span className="progress-group-label">Mobile App Development</span>
                        </div>
                        <span className="badge bg-warning-light text-warning">65%</span>
                      </div>
                      <div className="progress progress-sm" role="progressbar" aria-valuenow={65} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-warning" style={{width: '65%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <div className="d-flex align-items-center gap-2">
                          <span className="avatar avatar-xs bg-info-light text-info rounded-circle">
                            <i className="bi bi-database" />
                          </span>
                          <span className="progress-group-label">Database Migration</span>
                        </div>
                        <span className="badge bg-primary-light text-primary">48%</span>
                      </div>
                      <div className="progress progress-sm" role="progressbar" aria-valuenow={48} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar" style={{width: '48%'}} />
                      </div>
                    </div>
                    <div className="progress-group-item">
                      <div className="progress-group-header">
                        <div className="d-flex align-items-center gap-2">
                          <span className="avatar avatar-xs bg-danger-light text-danger rounded-circle">
                            <i className="bi bi-bug" />
                          </span>
                          <span className="progress-group-label">Bug Fixes Sprint</span>
                        </div>
                        <span className="badge bg-danger-light text-danger">23%</span>
                      </div>
                      <div className="progress progress-sm" role="progressbar" aria-valuenow={23} aria-valuemin={0} aria-valuemax={100}>
                        <div className="progress-bar bg-danger" style={{width: '23%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Storage Usage */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Storage Usage</h5>
                  <p className="card-subtitle">Disk space breakdown by category</p>
                </div>
                <div className="card-body">
                  <div className="text-center mb-4">
                    <h2 className="mb-1">73.6 GB</h2>
                    <p className="text-muted mb-3">of 100 GB used</p>
                    <div className="progress progress-lg" role="progressbar" aria-label="Storage usage">
                      <div className="progress-bar" style={{width: '35%'}} data-bs-toggle="tooltip" title="Documents: 35 GB" />
                      <div className="progress-bar bg-success" style={{width: '20%'}} data-bs-toggle="tooltip" title="Photos: 20 GB" />
                      <div className="progress-bar bg-warning" style={{width: '12%'}} data-bs-toggle="tooltip" title="Videos: 12 GB" />
                      <div className="progress-bar bg-info" style={{width: '6.6%'}} data-bs-toggle="tooltip" title="Other: 6.6 GB" />
                    </div>
                  </div>
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-primary">&nbsp;</span>
                        <div>
                          <span className="small d-block">Documents</span>
                          <span className="fw-medium">35 GB</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-success">&nbsp;</span>
                        <div>
                          <span className="small d-block">Photos</span>
                          <span className="fw-medium">20 GB</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-warning">&nbsp;</span>
                        <div>
                          <span className="small d-block">Videos</span>
                          <span className="fw-medium">12 GB</span>
                        </div>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="d-flex align-items-center gap-2">
                        <span className="badge bg-info">&nbsp;</span>
                        <div>
                          <span className="small d-block">Other</span>
                          <span className="fw-medium">6.6 GB</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-center">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-cloud-upload me-1" />Upgrade Storage
                    </a>
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

export default ComponentsProgressPage
