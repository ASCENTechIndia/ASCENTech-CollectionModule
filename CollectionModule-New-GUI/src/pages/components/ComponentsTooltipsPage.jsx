import { Link } from 'react-router-dom';
function ComponentsTooltipsPage() {
  return (
    <div>
      <div className="main-content page-components-tooltips">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Tooltips</h1>
        </div>
        {/* Basic Tooltips */}
        <section className="section">
          <div className="row g-4">
            {/* Default Tooltip */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Default Tooltips</h5>
                  <p className="card-subtitle">Hover over elements to see tooltips</p>
                </div>
                <div className="card-body">
                  <p className="mb-4">
                    Tooltips are great for providing
                    <a href="#" onClick={(event) => event.preventDefault()} data-bs-toggle="tooltip" data-bs-title="This is a tooltip on a link">additional context</a>
                    to users without cluttering the interface.
                  </p>
                  <div className="d-flex flex-wrap gap-2">
                    <button type="button" className="btn btn-secondary" data-bs-toggle="tooltip" data-bs-title="Default tooltip">
                      Hover me
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-title="I'm a primary button tooltip">
                      Primary
                    </button>
                    <button type="button" className="btn btn-success" data-bs-toggle="tooltip" data-bs-title="Success action tooltip">
                      Success
                    </button>
                    <button type="button" className="btn btn-danger" data-bs-toggle="tooltip" data-bs-title="Danger! Be careful">
                      Danger
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Tooltip Directions */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Tooltip Directions</h5>
                  <p className="card-subtitle">Tooltips can appear in four directions</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap justify-content-center gap-3">
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Tooltip on top">
                      Top
                    </button>
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Tooltip on right">
                      Right
                    </button>
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tooltip on bottom">
                      Bottom
                    </button>
                    <button type="button" className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-placement="left" data-bs-title="Tooltip on left">
                      Left
                    </button>
                  </div>
                  <div className="mt-4 p-4 bg-light rounded text-center">
                    <p className="text-muted small mb-3">Visual direction reference:</p>
                    <div className="d-inline-block position-relative" style={{width: 120, height: 80}}>
                      <span className="position-absolute top-0 start-50 translate-middle-x badge bg-primary">Top</span>
                      <span className="position-absolute top-50 end-0 translate-middle-y badge bg-primary">Right</span>
                      <span className="position-absolute bottom-0 start-50 translate-middle-x badge bg-primary">Bottom</span>
                      <span className="position-absolute top-50 start-0 translate-middle-y badge bg-primary">Left</span>
                      <span className="position-absolute top-50 start-50 translate-middle border rounded px-3 py-2 bg-white">Element</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Tooltip on Elements */}
        <section className="section">
          <h5 className="section-title mb-3">Tooltips on Various Elements</h5>
          <div className="row g-4">
            {/* Icons */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Tooltips on Icons</h5>
                  <p className="card-subtitle">Common pattern for icon-only buttons</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-2 mb-4">
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Edit">
                      <i className="bi bi-pencil" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Delete">
                      <i className="bi bi-trash" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Download">
                      <i className="bi bi-download" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Share">
                      <i className="bi bi-share" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Settings">
                      <i className="bi bi-gear" />
                    </button>
                    <button type="button" className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="More options">
                      <i className="bi bi-three-dots-vertical" />
                    </button>
                  </div>
                  <p className="small text-muted mb-3">Standalone icons:</p>
                  <div className="d-flex flex-wrap gap-3">
                    <i className="bi bi-info-circle text-primary fs-5" data-bs-toggle="tooltip" data-bs-title="Information" style={{cursor: 'pointer'}} />
                    <i className="bi bi-question-circle text-info fs-5" data-bs-toggle="tooltip" data-bs-title="Help" style={{cursor: 'pointer'}} />
                    <i className="bi bi-exclamation-circle text-warning fs-5" data-bs-toggle="tooltip" data-bs-title="Warning" style={{cursor: 'pointer'}} />
                    <i className="bi bi-check-circle text-success fs-5" data-bs-toggle="tooltip" data-bs-title="Verified" style={{cursor: 'pointer'}} />
                    <i className="bi bi-x-circle text-danger fs-5" data-bs-toggle="tooltip" data-bs-title="Error" style={{cursor: 'pointer'}} />
                  </div>
                </div>
              </div>
            </div>
            {/* Links & Text */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Tooltips on Links &amp; Text</h5>
                  <p className="card-subtitle">Provide additional context for text elements</p>
                </div>
                <div className="card-body">
                  <p className="mb-3">
                    Our <a href="#" onClick={(event) => event.preventDefault()} data-bs-toggle="tooltip" data-bs-title="View our complete privacy policy">privacy policy</a>
                    explains how we handle your data. For questions about
                    <a href="#" onClick={(event) => event.preventDefault()} data-bs-toggle="tooltip" data-bs-title="Learn about our pricing tiers">pricing</a>,
                    please contact our <a href="#" onClick={(event) => event.preventDefault()} data-bs-toggle="tooltip" data-bs-title="Available Mon-Fri, 9am-5pm">sales team</a>.
                  </p>
                  <p className="mb-3">
                    Technical terms like <abbr title data-bs-toggle="tooltip" data-bs-title="Application Programming Interface">API</abbr>,
                    <abbr title data-bs-toggle="tooltip" data-bs-title="Cascading Style Sheets">CSS</abbr>, and
                    <abbr title data-bs-toggle="tooltip" data-bs-title="HyperText Markup Language">HTML</abbr>
                    can be explained with tooltips.
                  </p>
                  <div className="border-top pt-3 mt-3">
                    <p className="small text-muted mb-2">Inline help text:</p>
                    <p className="mb-0">
                      Password requirements
                      <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Must be 8+ characters with at least one uppercase, lowercase, number, and special character" />
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* HTML & Custom Tooltips */}
        <section className="section">
          <h5 className="section-title mb-3">HTML &amp; Custom Tooltips</h5>
          <div className="row g-4">
            {/* HTML Content */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">HTML Content in Tooltips</h5>
                  <p className="card-subtitle">Rich content with formatting</p>
                </div>
                <div className="card-body">
                  <div className="d-flex flex-wrap gap-3">
                    <button type="button" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<strong>Bold</strong> and <em>italic</em> text">
                      Formatted Text
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<i class='bi bi-star-fill text-warning'></i> 4.8 rating (2,453 reviews)">
                      With Icon
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="Line 1<br>Line 2<br>Line 3">
                      Multi-line
                    </button>
                    <button type="button" className="btn btn-primary" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<span class='badge bg-success'>Active</span> User is online">
                      With Badge
                    </button>
                  </div>
                  <div className="mt-4 p-3 bg-light rounded">
                    <code className="small">data-bs-html="true"</code>
                    <p className="small text-muted mb-0 mt-2">Enable HTML content in tooltips with this attribute.</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Disabled Elements */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Tooltips on Disabled Elements</h5>
                  <p className="card-subtitle">Wrap disabled elements in a container</p>
                </div>
                <div className="card-body">
                  <p className="text-muted small mb-3">Disabled elements need a wrapper for tooltips to work:</p>
                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <span data-bs-toggle="tooltip" data-bs-title="You don't have permission to perform this action">
                      <button className="btn btn-primary" disabled>Disabled Button</button>
                    </span>
                    <span data-bs-toggle="tooltip" data-bs-title="This feature is coming soon">
                      <button className="btn btn-success" disabled>Coming Soon</button>
                    </span>
                    <span data-bs-toggle="tooltip" data-bs-title="Please complete the form first">
                      <button className="btn btn-outline-primary" disabled>Submit</button>
                    </span>
                  </div>
                  <div className="p-3 bg-light rounded">
                    <p className="small mb-2"><strong>Pattern:</strong></p>
                    <code className="small">&lt;span data-bs-toggle="tooltip" title="..."&gt;<br />&nbsp;&nbsp;&lt;button disabled&gt;...&lt;/button&gt;<br />&lt;/span&gt;</code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Form Tooltips */}
        <section className="section">
          <h5 className="section-title mb-3">Tooltips in Forms</h5>
          <div className="row g-4">
            {/* Form Field Tooltips */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Form Field Tooltips</h5>
                  <p className="card-subtitle">Help users understand form requirements</p>
                </div>
                <div className="card-body">
                  <form>
                    <div className="mb-3">
                      <label htmlFor="usernameField" className="form-label">
                        Username
                        <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Choose a unique username between 3-20 characters. Only letters, numbers, and underscores allowed." />
                      </label>
                      <input type="text" className="form-control" id="usernameField" placeholder="Enter username" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="emailField" className="form-label">
                        Email address
                        <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="We'll never share your email with anyone else." />
                      </label>
                      <input type="email" className="form-control" id="emailField" placeholder="name@example.com" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="passwordField" className="form-label">
                        Password
                        <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<strong>Requirements:</strong><br>• 8+ characters<br>• One uppercase<br>• One lowercase<br>• One number" />
                      </label>
                      <input type="password" className="form-control" id="passwordField" placeholder="Enter password" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="apiKeyField" className="form-label">
                        API Key
                        <i className="bi bi-question-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Find your API key in Settings > Developer > API Keys" />
                      </label>
                      <div className="input-group">
                        <input type="text" className="form-control" id="apiKeyField" placeholder="sk_live_..." />
                        <button className="btn btn-outline-secondary" type="button" data-bs-toggle="tooltip" data-bs-title="Generate new key">
                          <i className="bi bi-arrow-repeat" />
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            {/* Validation Tooltips */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Validation Tooltips</h5>
                  <p className="card-subtitle">Bootstrap validation with tooltip feedback</p>
                </div>
                <div className="card-body">
                  <form className="needs-validation" noValidate>
                    <div className="mb-3 position-relative">
                      <label htmlFor="validationTooltip01" className="form-label">First name</label>
                      <input type="text" className="form-control" id="validationTooltip01" defaultValue="John" required />
                      <div className="valid-tooltip">Looks good!</div>
                    </div>
                    <div className="mb-3 position-relative">
                      <label htmlFor="validationTooltip02" className="form-label">Last name</label>
                      <input type="text" className="form-control" id="validationTooltip02" defaultValue="Doe" required />
                      <div className="valid-tooltip">Looks good!</div>
                    </div>
                    <div className="mb-3 position-relative">
                      <label htmlFor="validationTooltipUsername" className="form-label">Username</label>
                      <div className="input-group has-validation">
                        <span className="input-group-text">@</span>
                        <input type="text" className="form-control" id="validationTooltipUsername" required />
                        <div className="invalid-tooltip">Please choose a unique username.</div>
                      </div>
                    </div>
                    <div className="mb-3 position-relative">
                      <label htmlFor="validationTooltip03" className="form-label">City</label>
                      <input type="text" className="form-control" id="validationTooltip03" required />
                      <div className="invalid-tooltip">Please provide a valid city.</div>
                    </div>
                    <button className="btn btn-primary" type="submit">Validate Form</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Real-World Examples */}
        <section className="section">
          <h5 className="section-title mb-3">Real-World Examples</h5>
          <div className="row g-4">
            {/* Toolbar */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Editor Toolbar</h5>
                  <p className="card-subtitle">Text editor with tooltip-enabled buttons</p>
                </div>
                <div className="card-body">
                  <div className="border rounded">
                    <div className="d-flex flex-wrap gap-1 p-2 border-bottom bg-light">
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Bold (Ctrl+B)">
                        <i className="bi bi-type-bold" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Italic (Ctrl+I)">
                        <i className="bi bi-type-italic" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Underline (Ctrl+U)">
                        <i className="bi bi-type-underline" />
                      </button>
                      <div className="vr mx-1" />
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Align Left">
                        <i className="bi bi-text-left" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Align Center">
                        <i className="bi bi-text-center" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Align Right">
                        <i className="bi bi-text-right" />
                      </button>
                      <div className="vr mx-1" />
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Bulleted List">
                        <i className="bi bi-list-ul" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Numbered List">
                        <i className="bi bi-list-ol" />
                      </button>
                      <div className="vr mx-1" />
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Insert Link (Ctrl+K)">
                        <i className="bi bi-link-45deg" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Insert Image">
                        <i className="bi bi-image" />
                      </button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Insert Code">
                        <i className="bi bi-code-slash" />
                      </button>
                    </div>
                    <div className="p-3" style={{minHeight: 100}}>
                      <p className="text-muted mb-0">Start typing here...</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Table */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">User Table with Actions</h5>
                  <p className="card-subtitle">Tooltips on table action buttons</p>
                </div>
                <div className="card-body">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>User</th>
                        <th>Status</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img src="/assets/img/avatars/avatar-1.webp" className="rounded-circle" width={32} height={32} alt="User" />
                            <div>
                              <div className="fw-medium">John Doe</div>
                              <small className="text-muted">john@example.com</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-success" data-bs-toggle="tooltip" data-bs-title="Last active 2 minutes ago">Active</span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="View Profile">
                            <i className="bi bi-eye" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Edit User">
                            <i className="bi bi-pencil" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" data-bs-toggle="tooltip" data-bs-title="Delete User">
                            <i className="bi bi-trash" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img src="/assets/img/avatars/avatar-2.webp" className="rounded-circle" width={32} height={32} alt="User" />
                            <div>
                              <div className="fw-medium">Sarah Smith</div>
                              <small className="text-muted">sarah@example.com</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-warning" data-bs-toggle="tooltip" data-bs-title="Last active 3 hours ago">Away</span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="View Profile">
                            <i className="bi bi-eye" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Edit User">
                            <i className="bi bi-pencil" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" data-bs-toggle="tooltip" data-bs-title="Delete User">
                            <i className="bi bi-trash" />
                          </button>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <img src="/assets/img/avatars/avatar-3.webp" className="rounded-circle" width={32} height={32} alt="User" />
                            <div>
                              <div className="fw-medium">Mike Johnson</div>
                              <small className="text-muted">mike@example.com</small>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className="badge bg-secondary" data-bs-toggle="tooltip" data-bs-title="Last active 2 days ago">Offline</span>
                        </td>
                        <td className="text-end">
                          <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="View Profile">
                            <i className="bi bi-eye" />
                          </button>
                          <button className="btn btn-sm btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Edit User">
                            <i className="bi bi-pencil" />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" data-bs-toggle="tooltip" data-bs-title="Delete User">
                            <i className="bi bi-trash" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            {/* Stats Cards */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Stats with Tooltips</h5>
                  <p className="card-subtitle">Dashboard stats with explanatory tooltips</p>
                </div>
                <div className="card-body">
                  <div className="row g-3">
                    <div className="col-6">
                      <div className="border rounded p-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small">Total Revenue</span>
                          <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Total revenue before taxes and refunds" />
                        </div>
                        <h4 className="mb-0">$48,294</h4>
                        <small className="text-success">
                          <i className="bi bi-arrow-up" /> 12.5%
                          <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Compared to previous period">vs last month</span>
                        </small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small">Conversion Rate</span>
                          <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Percentage of visitors who made a purchase" />
                        </div>
                        <h4 className="mb-0">3.24%</h4>
                        <small className="text-danger">
                          <i className="bi bi-arrow-down" /> 2.1%
                          <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Compared to previous period">vs last month</span>
                        </small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small">Avg. Order Value</span>
                          <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Average amount spent per order" />
                        </div>
                        <h4 className="mb-0">$127.50</h4>
                        <small className="text-success">
                          <i className="bi bi-arrow-up" /> 5.3%
                          <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Compared to previous period">vs last month</span>
                        </small>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="border rounded p-3">
                        <div className="d-flex align-items-center justify-content-between mb-2">
                          <span className="text-muted small">Active Users</span>
                          <i className="bi bi-info-circle text-muted" data-bs-toggle="tooltip" data-bs-title="Users active in the last 30 days" />
                        </div>
                        <h4 className="mb-0">8,420</h4>
                        <small className="text-success">
                          <i className="bi bi-arrow-up" /> 18.2%
                          <span className="text-muted" data-bs-toggle="tooltip" data-bs-title="Compared to previous period">vs last month</span>
                        </small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Navigation */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Navigation with Tooltips</h5>
                  <p className="card-subtitle">Compact navigation with icon tooltips</p>
                </div>
                <div className="card-body">
                  <p className="text-muted small mb-3">Icon-only navigation (compact sidebar style):</p>
                  <div className="d-flex flex-column gap-2 p-3 bg-dark rounded" style={{width: 'fit-content'}}>
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Dashboard">
                      <i className="bi bi-grid text-white" />
                    </button>
                    <button className="btn btn-primary" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Analytics">
                      <i className="bi bi-bar-chart" />
                    </button>
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Messages">
                      <i className="bi bi-chat-dots text-white" />
                    </button>
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Calendar">
                      <i className="bi bi-calendar3 text-white" />
                    </button>
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Files">
                      <i className="bi bi-folder text-white" />
                    </button>
                    <hr className="border-secondary my-1" />
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Settings">
                      <i className="bi bi-gear text-white" />
                    </button>
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-placement="right" data-bs-title="Help & Support">
                      <i className="bi bi-question-circle text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Social Sharing */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Social Sharing Buttons</h5>
                  <p className="card-subtitle">Share buttons with platform names in tooltips</p>
                </div>
                <div className="card-body">
                  <p className="text-muted small mb-3">Share this article:</p>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-title="Share on Facebook">
                      <i className="bi bi-facebook" />
                    </button>
                    <button className="btn btn-outline-info" data-bs-toggle="tooltip" data-bs-title="Share on Twitter">
                      <i className="bi bi-twitter-x" />
                    </button>
                    <button className="btn btn-outline-primary" data-bs-toggle="tooltip" data-bs-title="Share on LinkedIn">
                      <i className="bi bi-linkedin" />
                    </button>
                    <button className="btn btn-outline-danger" data-bs-toggle="tooltip" data-bs-title="Share on Pinterest">
                      <i className="bi bi-pinterest" />
                    </button>
                    <button className="btn btn-outline-success" data-bs-toggle="tooltip" data-bs-title="Share via WhatsApp">
                      <i className="bi bi-whatsapp" />
                    </button>
                    <button className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Share via Email">
                      <i className="bi bi-envelope" />
                    </button>
                    <button className="btn btn-outline-secondary" data-bs-toggle="tooltip" data-bs-title="Copy Link">
                      <i className="bi bi-link-45deg" />
                    </button>
                  </div>
                  <hr />
                  <p className="text-muted small mb-3">Colored buttons variant:</p>
                  <div className="d-flex flex-wrap gap-2">
                    <button className="btn btn-primary" style={{backgroundColor: '#1877f2', borderColor: '#1877f2'}} data-bs-toggle="tooltip" data-bs-title="Share on Facebook">
                      <i className="bi bi-facebook" />
                    </button>
                    <button className="btn btn-dark" data-bs-toggle="tooltip" data-bs-title="Share on Twitter">
                      <i className="bi bi-twitter-x" />
                    </button>
                    <button className="btn btn-primary" style={{backgroundColor: '#0a66c2', borderColor: '#0a66c2'}} data-bs-toggle="tooltip" data-bs-title="Share on LinkedIn">
                      <i className="bi bi-linkedin" />
                    </button>
                    <button className="btn btn-danger" style={{backgroundColor: '#e60023', borderColor: '#e60023'}} data-bs-toggle="tooltip" data-bs-title="Share on Pinterest">
                      <i className="bi bi-pinterest" />
                    </button>
                    <button className="btn btn-success" style={{backgroundColor: '#25d366', borderColor: '#25d366'}} data-bs-toggle="tooltip" data-bs-title="Share via WhatsApp">
                      <i className="bi bi-whatsapp" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Truncated Text */}
            <div className="col-lg-6">
              <div className="card h-100">
                <div className="card-header">
                  <h5 className="card-title">Truncated Text with Tooltips</h5>
                  <p className="card-subtitle">Show full content on hover for truncated text</p>
                </div>
                <div className="card-body">
                  <ul className="list-group">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span className="text-truncate me-3" style={{maxWidth: 250}} data-bs-toggle="tooltip" data-bs-title="This is a very long file name that gets truncated in the UI display.pdf">
                        This is a very long file name that gets truncated in the UI display.pdf
                      </span>
                      <span className="badge bg-primary">2.4 MB</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span className="text-truncate me-3" style={{maxWidth: 250}} data-bs-toggle="tooltip" data-bs-title="Annual_Financial_Report_2024_Q4_Final_Version_Approved.xlsx">
                        Annual_Financial_Report_2024_Q4_Final_Version_Approved.xlsx
                      </span>
                      <span className="badge bg-success">1.8 MB</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span className="text-truncate me-3" style={{maxWidth: 250}} data-bs-toggle="tooltip" data-bs-title="Project_Documentation_and_Technical_Specifications_v3.2.docx">
                        Project_Documentation_and_Technical_Specifications_v3.2.docx
                      </span>
                      <span className="badge bg-info">856 KB</span>
                    </li>
                  </ul>
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

export default ComponentsTooltipsPage
