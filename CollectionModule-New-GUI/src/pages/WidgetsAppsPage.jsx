import { Link } from 'react-router-dom';
function WidgetsAppsPage() {
  return (
    <div>
      <div className="main-content page-widgets-apps">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">App Widgets</h1>
          <nav className="breadcrumb">
            <Link to="/" className="breadcrumb-item">Home</Link>
            <a href="#" onClick={(event) => event.preventDefault()} className="breadcrumb-item">Widgets</a>
            <span className="breadcrumb-item active">Apps</span>
          </nav>
        </div>
        {/* Row 1: Comments, Todo List, Projects */}
        <section className="section">
          <div className="row g-4">
            {/* Recent Comments Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Recent Comments</h5>
                </div>
                <div className="card-body">
                  <div className="widget-comment-item">
                    <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-comment-avatar" />
                    <div className="widget-comment-content">
                      <h6 className="widget-comment-author">Sarah Mitchell</h6>
                      <p className="widget-comment-text">The new dashboard layout looks fantastic. Great work on the responsive design implementation.</p>
                      <span className="badge badge-soft-warning">Pending</span>
                    </div>
                    <span className="widget-comment-date">Jan 18, 2026</span>
                  </div>
                  <div className="widget-comment-item">
                    <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-comment-avatar" />
                    <div className="widget-comment-content">
                      <h6 className="widget-comment-author">David Chen</h6>
                      <p className="widget-comment-text">Could we add dark mode support for the analytics section? Users have been requesting this feature.</p>
                      <div className="widget-comment-actions">
                        <span className="badge badge-soft-success">Approved</span>
                        <button className="btn btn-sm btn-link p-0"><i className="bi bi-pencil" /></button>
                        <button className="btn btn-sm btn-link p-0"><i className="bi bi-chat" /></button>
                        <button className="btn btn-sm btn-link p-0"><i className="bi bi-heart" /></button>
                      </div>
                    </div>
                    <span className="widget-comment-date">Jan 18, 2026</span>
                  </div>
                  <div className="widget-comment-item">
                    <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-comment-avatar" />
                    <div className="widget-comment-content">
                      <h6 className="widget-comment-author">Emily Rodriguez</h6>
                      <p className="widget-comment-text">I've reviewed the API documentation and found some inconsistencies in the endpoint naming.</p>
                      <span className="badge badge-soft-danger">Rejected</span>
                    </div>
                    <span className="widget-comment-date">Jan 17, 2026</span>
                  </div>
                </div>
              </div>
            </div>
            {/* To Do List Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">To Do List</h5>
                </div>
                <div className="card-body p-0">
                  <div className="widget-todo-list">
                    <div className="widget-todo-item">
                      <div className="widget-todo-check">
                        <input type="checkbox" className="form-check-input" id="todo1" />
                      </div>
                      <div className="widget-todo-content">
                        <label htmlFor="todo1" className="widget-todo-title">Review quarterly report</label>
                        <span className="widget-todo-date">15 January 2026</span>
                      </div>
                      <button className="btn btn-sm btn-light"><i className="bi bi-three-dots" /></button>
                    </div>
                    <div className="widget-todo-item">
                      <div className="widget-todo-check">
                        <input type="checkbox" className="form-check-input" id="todo2" />
                      </div>
                      <div className="widget-todo-content">
                        <label htmlFor="todo2" className="widget-todo-title">Schedule team standup</label>
                        <span className="widget-todo-date">16 January 2026</span>
                      </div>
                      <button className="btn btn-sm btn-light"><i className="bi bi-three-dots" /></button>
                    </div>
                    <div className="widget-todo-item">
                      <div className="widget-todo-check">
                        <input type="checkbox" className="form-check-input" id="todo3" />
                      </div>
                      <div className="widget-todo-content">
                        <label htmlFor="todo3" className="widget-todo-title">Update billing information</label>
                        <span className="widget-todo-date">18 January 2026</span>
                      </div>
                      <button className="btn btn-sm btn-light"><i className="bi bi-three-dots" /></button>
                    </div>
                    <div className="widget-todo-item">
                      <div className="widget-todo-check">
                        <input type="checkbox" className="form-check-input" id="todo4" />
                      </div>
                      <div className="widget-todo-content">
                        <label htmlFor="todo4" className="widget-todo-title">Prepare client presentation</label>
                        <span className="widget-todo-date">19 January 2026</span>
                      </div>
                      <button className="btn btn-sm btn-light"><i className="bi bi-three-dots" /></button>
                    </div>
                    <div className="widget-todo-item">
                      <div className="widget-todo-check">
                        <input type="checkbox" className="form-check-input" id="todo5" />
                      </div>
                      <div className="widget-todo-content">
                        <label htmlFor="todo5" className="widget-todo-title">Complete code review</label>
                        <span className="widget-todo-date">22 January 2026</span>
                      </div>
                      <button className="btn btn-sm btn-light"><i className="bi bi-three-dots" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Projects of the Month Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Projects of the Month</h5>
                  <div className="card-actions">
                    <select className="form-select form-select-sm" style={{width: 'auto'}}>
                      <option>January</option>
                      <option>February</option>
                      <option>March</option>
                    </select>
                  </div>
                </div>
                <div className="card-body p-0">
                  <table className="table widget-projects-table mb-0">
                    <thead>
                      <tr>
                        <th>Assigned</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <div className="widget-project-assignee">
                            <span className="widget-project-initial bg-primary">R</span>
                            <div>
                              <div className="widget-project-name">Rachel Kim</div>
                              <div className="widget-project-role">Lead Designer</div>
                            </div>
                          </div>
                        </td>
                        <td className="widget-project-client">Vertex Systems</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-project-assignee">
                            <span className="widget-project-initial bg-info">A</span>
                            <div>
                              <div className="widget-project-name">Alex Turner</div>
                              <div className="widget-project-role">Project Manager</div>
                            </div>
                          </div>
                        </td>
                        <td className="widget-project-client">Nova Industries</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-project-assignee">
                            <span className="widget-project-initial bg-warning">B</span>
                            <div>
                              <div className="widget-project-name">Brian Patel</div>
                              <div className="widget-project-role">Developer</div>
                            </div>
                          </div>
                        </td>
                        <td className="widget-project-client">MediPro Solutions</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-project-assignee">
                            <span className="widget-project-initial bg-success">N</span>
                            <div>
                              <div className="widget-project-name">Nina Vasquez</div>
                              <div className="widget-project-role">Frontend Dev</div>
                            </div>
                          </div>
                        </td>
                        <td className="widget-project-client">Quantum Labs</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-project-assignee">
                            <span className="widget-project-initial bg-danger">M</span>
                            <div>
                              <div className="widget-project-name">Marcus Chen</div>
                              <div className="widget-project-role">Content Writer</div>
                            </div>
                          </div>
                        </td>
                        <td className="widget-project-client">Stellar Agency</td>
                      </tr>
                      <tr>
                        <td>
                          <div className="widget-project-assignee">
                            <span className="widget-project-initial bg-secondary">J</span>
                            <div>
                              <div className="widget-project-name">Julia Santos</div>
                              <div className="widget-project-role">Graphic</div>
                            </div>
                          </div>
                        </td>
                        <td className="widget-project-client">Horizon Digital</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Row 2: Weather, User Profile, Task List */}
        <section className="section">
          <div className="row g-4">
            {/* Weather Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Weather Report</h5>
                  <div className="card-actions">
                    <select className="form-select form-select-sm" style={{width: 'auto'}}>
                      <option>Today</option>
                      <option>Tomorrow</option>
                      <option>This Week</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-weather-main">
                    <div className="widget-weather-icon">
                      <i className="bi bi-cloud-sun" />
                    </div>
                    <div className="widget-weather-temp">
                      <span className="widget-weather-degree">68</span>
                      <span className="widget-weather-unit">°</span>
                    </div>
                    <div className="widget-weather-info">
                      <h5>Friday</h5>
                      <p>San Francisco, CA</p>
                    </div>
                  </div>
                  <div className="widget-weather-details">
                    <div className="widget-weather-detail">
                      <span className="label">Wind</span>
                      <span className="value">NE 12 mph</span>
                    </div>
                    <div className="widget-weather-detail">
                      <span className="label">Humidity</span>
                      <span className="value">72%</span>
                    </div>
                    <div className="widget-weather-detail">
                      <span className="label">Pressure</span>
                      <span className="value">30.12 in</span>
                    </div>
                    <div className="widget-weather-detail">
                      <span className="label">Cloud Cover</span>
                      <span className="value">65%</span>
                    </div>
                    <div className="widget-weather-detail">
                      <span className="label">Visibility</span>
                      <span className="value">8 miles</span>
                    </div>
                  </div>
                  <div className="widget-weather-forecast">
                    <div className="widget-weather-forecast-item">
                      <span className="time">08:00</span>
                      <i className="bi bi-cloud-fog" />
                      <span className="temp">62°</span>
                    </div>
                    <div className="widget-weather-forecast-item">
                      <span className="time">11:00</span>
                      <i className="bi bi-cloud-sun" />
                      <span className="temp">67°</span>
                    </div>
                    <div className="widget-weather-forecast-item">
                      <span className="time">14:00</span>
                      <i className="bi bi-sun" />
                      <span className="temp">71°</span>
                    </div>
                    <div className="widget-weather-forecast-item">
                      <span className="time">17:00</span>
                      <i className="bi bi-cloud-sun" />
                      <span className="temp">68°</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* User Profile Card Widget */}
            <div className="col-lg-4">
              <div className="card widget-user-profile-full">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-user-profile-avatar" />
                  <h5 className="widget-user-profile-name">Rebecca Torres</h5>
                  <p className="widget-user-profile-email">rtorres@company.io</p>
                  <div className="widget-user-profile-tags">
                    <span className="badge badge-soft-primary">Dashboard</span>
                    <span className="badge badge-soft-info">UI</span>
                    <span className="badge badge-soft-warning">UX</span>
                    <span className="badge badge-soft-success">73</span>
                  </div>
                  <div className="widget-user-profile-actions">
                    <button className="btn btn-outline-primary btn-sm"><i className="bi bi-chat-dots" /> Message</button>
                    <button className="btn btn-outline-secondary btn-sm"><i className="bi bi-folder" /> Portfolio</button>
                  </div>
                </div>
              </div>
              {/* Recent Messages Widget */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Recent Messages</h5>
                </div>
                <div className="card-body p-0">
                  <div className="widget-message-list">
                    <div className="widget-message-item">
                      <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-message-avatar" />
                      <div className="widget-message-content">
                        <h6 className="widget-message-name">Nathan Brooks</h6>
                        <p className="widget-message-email">nbrooks@startup.io</p>
                      </div>
                    </div>
                    <div className="widget-message-item">
                      <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-message-avatar" />
                      <div className="widget-message-content">
                        <h6 className="widget-message-name">Olivia Martinez</h6>
                        <p className="widget-message-email">omartinez@design.co</p>
                      </div>
                    </div>
                    <div className="widget-message-item">
                      <img src="/assets/img/avatars/avatar-4.webp" alt="User" className="widget-message-avatar" />
                      <div className="widget-message-content">
                        <h6 className="widget-message-name">Kevin Park</h6>
                        <p className="widget-message-email">kpark@agency.net</p>
                      </div>
                    </div>
                    <div className="widget-message-item">
                      <img src="/assets/img/avatars/avatar-5.webp" alt="User" className="widget-message-avatar" />
                      <div className="widget-message-content">
                        <h6 className="widget-message-name">Lisa Chen</h6>
                        <p className="widget-message-email">lchen@corp.com</p>
                      </div>
                    </div>
                    <div className="widget-message-item">
                      <img src="/assets/img/avatars/avatar-6.webp" alt="User" className="widget-message-avatar" />
                      <div className="widget-message-content">
                        <h6 className="widget-message-name">Daniel Wright</h6>
                        <p className="widget-message-email">dwright@tech.io</p>
                      </div>
                    </div>
                    <div className="widget-message-item">
                      <img src="/assets/img/avatars/avatar-7.webp" alt="User" className="widget-message-avatar" />
                      <div className="widget-message-content">
                        <h6 className="widget-message-name">Amanda Foster</h6>
                        <p className="widget-message-email">afoster@media.co</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Task List with Progress */}
            <div className="col-lg-4">
              {/* User Stats Card */}
              <div className="card widget-user-stats-card">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-8.webp" alt="User" className="widget-user-stats-avatar" />
                  <h5 className="widget-user-stats-name">Rebecca Torres</h5>
                  <p className="widget-user-stats-role">UI/UX Designer</p>
                  <button className="btn btn-primary btn-sm mb-3">+ Follow</button>
                  <div className="widget-user-stats-grid">
                    <div className="widget-user-stat">
                      <span className="widget-user-stat-value">28</span>
                      <span className="widget-user-stat-label">Photos</span>
                    </div>
                    <div className="widget-user-stat">
                      <span className="widget-user-stat-value">73</span>
                      <span className="widget-user-stat-label">Videos</span>
                    </div>
                    <div className="widget-user-stat">
                      <span className="widget-user-stat-value">194</span>
                      <span className="widget-user-stat-label">Tasks</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Description Card */}
              <div className="card mt-4">
                <div className="card-body">
                  <p className="widget-description-text">Creative designer with 8+ years of experience in building user-centric digital products. Passionate about clean interfaces, micro-interactions, and seamless user experiences across web and mobile platforms.</p>
                  <div className="widget-description-actions">
                    <button className="btn btn-light btn-sm"><i className="bi bi-hand-thumbs-up" /></button>
                    <button className="btn btn-light btn-sm"><i className="bi bi-chat" /></button>
                    <button className="btn btn-light btn-sm"><i className="bi bi-mic" /></button>
                  </div>
                </div>
              </div>
              {/* Browser Stats */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Browser Stats</h5>
                </div>
                <div className="card-body p-0">
                  <div className="widget-browser-list">
                    <div className="widget-browser-item">
                      <div className="widget-browser-icon chrome">
                        <i className="bi bi-browser-chrome" />
                      </div>
                      <span className="widget-browser-name">Google Chrome</span>
                      <span className="widget-browser-percent">31%</span>
                    </div>
                    <div className="widget-browser-item">
                      <div className="widget-browser-icon firefox">
                        <i className="bi bi-browser-firefox" />
                      </div>
                      <span className="widget-browser-name">Mozilla Firefox</span>
                      <span className="widget-browser-percent">19%</span>
                    </div>
                    <div className="widget-browser-item">
                      <div className="widget-browser-icon safari">
                        <i className="bi bi-browser-safari" />
                      </div>
                      <span className="widget-browser-name">Apple Safari</span>
                      <span className="widget-browser-percent">12%</span>
                    </div>
                    <div className="widget-browser-item">
                      <div className="widget-browser-icon edge">
                        <i className="bi bi-browser-edge" />
                      </div>
                      <span className="widget-browser-name">Microsoft Edge</span>
                      <span className="widget-browser-percent">9%</span>
                    </div>
                    <div className="widget-browser-item">
                      <div className="widget-browser-icon opera">
                        <i className="bi bi-globe" />
                      </div>
                      <span className="widget-browser-name">Opera</span>
                      <span className="widget-browser-percent">17%</span>
                    </div>
                    <div className="widget-browser-item">
                      <div className="widget-browser-icon other">
                        <i className="bi bi-window" />
                      </div>
                      <span className="widget-browser-name">Other Browsers</span>
                      <span className="widget-browser-percent">12%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Row 3: People, Subscribe, Social Profile */}
        <section className="section">
          <div className="row g-4">
            {/* People You May Know */}
            <div className="col-lg-4">
              <div className="card widget-people-card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title text-white mb-0">People you may know</h5>
                  <button className="btn btn-sm btn-link text-white"><i className="bi bi-three-dots" /></button>
                </div>
                <div className="card-body">
                  <div className="widget-people-search">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search by Email" />
                      <button className="btn btn-primary"><i className="bi bi-search" /></button>
                    </div>
                  </div>
                  <div className="widget-people-list">
                    <div className="widget-people-item">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-people-avatar" />
                      <span className="widget-people-name">Nathan Brooks</span>
                      <button className="btn btn-sm btn-outline-primary">Connect</button>
                    </div>
                    <div className="widget-people-item">
                      <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-people-avatar" />
                      <span className="widget-people-name">Olivia Martinez</span>
                      <button className="btn btn-sm btn-outline-primary">Connect</button>
                    </div>
                    <div className="widget-people-item">
                      <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-people-avatar" />
                      <span className="widget-people-name">Kevin Park</span>
                      <button className="btn btn-sm btn-outline-primary">Connect</button>
                    </div>
                  </div>
                  <div className="widget-people-actions">
                    <button className="btn btn-info w-100 mb-2"><i className="bi bi-twitter me-2" />Invite from Twitter</button>
                    <button className="btn btn-outline-primary w-100"><i className="bi bi-facebook me-2" />Invite from Facebook</button>
                  </div>
                </div>
              </div>
              {/* Currency Exchange */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Currency Exchange</h5>
                  <span className="text-muted small">exchange currency from here</span>
                </div>
                <div className="card-body">
                  <div className="widget-currency-input">
                    <input type="text" className="form-control" defaultValue="1,500.00" />
                    <select className="form-select">
                      <option>EUR</option>
                      <option>USD</option>
                      <option>GBP</option>
                    </select>
                  </div>
                  <div className="widget-currency-swap">
                    <button className="btn btn-light btn-sm rounded-circle"><i className="bi bi-arrow-down-up" /></button>
                  </div>
                  <div className="widget-currency-input">
                    <input type="text" className="form-control" defaultValue="1,623.45" readOnly />
                    <select className="form-select">
                      <option>USD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                  </div>
                  <button className="btn btn-primary w-100 mt-3">Exchange Now</button>
                </div>
              </div>
            </div>
            {/* Subscribe & Social Profile */}
            <div className="col-lg-4">
              {/* Subscribe Widget */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Subscribe</h5>
                </div>
                <div className="card-body">
                  <input type="text" className="form-control mb-3" placeholder="Enter Name" />
                  <input type="email" className="form-control mb-3" placeholder="Enter email" />
                  <button className="btn btn-primary w-100">Submit</button>
                </div>
              </div>
              {/* Social Profile Widget */}
              <div className="card mt-4 widget-social-profile">
                <div className="card-body text-center">
                  <img src="/assets/img/avatars/avatar-4.webp" alt="User" className="widget-social-avatar" />
                  <h5 className="widget-social-name">Nathan Brooks</h5>
                  <div className="widget-social-stats">
                    <div className="widget-social-stat">
                      <span className="value">15K</span>
                      <span className="label">Followers</span>
                    </div>
                    <div className="widget-social-stat">
                      <span className="value">580</span>
                      <span className="label">Following</span>
                    </div>
                    <div className="widget-social-stat">
                      <span className="value">156</span>
                      <span className="label">Tweets</span>
                    </div>
                  </div>
                </div>
              </div>
              {/* Reviews Widget */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Reviews</h5>
                  <span className="text-muted small">Overview of Review</span>
                </div>
                <div className="card-body">
                  <div className="widget-reviews-summary">
                    <h2 className="widget-reviews-count">18,742</h2>
                    <p className="text-muted">This month we got 492 New Reviews</p>
                    <button className="btn btn-primary btn-sm">Checkout All Reviews</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Order & Poll Widgets */}
            <div className="col-lg-4">
              {/* Place Order Widget */}
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Place your Order</h5>
                  <div className="card-actions">
                    <span className="text-muted small">Buy and Sell Crypto as you like</span>
                    <select className="form-select form-select-sm ms-2" style={{width: 'auto'}}>
                      <option>Bitcoin</option>
                      <option>Ethereum</option>
                      <option>Litecoin</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <div className="widget-order-tabs">
                    <button className="widget-order-tab active">Buy</button>
                    <button className="widget-order-tab">Sell</button>
                  </div>
                  <div className="widget-order-form">
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="bi bi-currency-bitcoin" /></span>
                      <input type="text" className="form-control" placeholder="Amount" />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text"><i className="bi bi-currency-dollar" /></span>
                      <input type="text" className="form-control" placeholder="Price" />
                    </div>
                    <button className="btn btn-primary w-100">Buy Bitcoin</button>
                  </div>
                </div>
              </div>
              {/* Poll Widget */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Poll of the week</h5>
                  <span className="text-muted small">Here is the latest poll</span>
                </div>
                <div className="card-body">
                  <p className="widget-poll-question">What is your preferred work schedule?</p>
                  <div className="widget-poll-options">
                    <div className="widget-poll-option">
                      <input type="radio" name="poll" id="poll1" className="form-check-input" />
                      <label htmlFor="poll1">A. Fully Remote</label>
                    </div>
                    <div className="widget-poll-option selected">
                      <input type="radio" name="poll" id="poll2" className="form-check-input" defaultChecked />
                      <label htmlFor="poll2">B. Hybrid (3 days office)</label>
                    </div>
                    <div className="widget-poll-option">
                      <input type="radio" name="poll" id="poll3" className="form-check-input" />
                      <label htmlFor="poll3">C. Fully On-site</label>
                    </div>
                    <div className="widget-poll-option">
                      <input type="radio" name="poll" id="poll4" className="form-check-input" />
                      <label htmlFor="poll4">D. Flexible Schedule</label>
                    </div>
                  </div>
                  <button className="btn btn-warning btn-sm mt-3">Submit Answer</button>
                </div>
              </div>
              {/* Feeds Widget */}
              <div className="card mt-4">
                <div className="card-header">
                  <h5 className="card-title">Feeds</h5>
                </div>
                <div className="card-body p-0">
                  <div className="widget-feeds-list">
                    <div className="widget-feed-item">
                      <div className="widget-feed-icon warning">
                        <i className="bi bi-bell" />
                      </div>
                      <div className="widget-feed-content">
                        <p className="widget-feed-text">You have 6 pending tasks.</p>
                      </div>
                      <span className="widget-feed-time">Just Now</span>
                    </div>
                    <div className="widget-feed-item">
                      <div className="widget-feed-icon danger">
                        <i className="bi bi-exclamation-triangle" />
                      </div>
                      <div className="widget-feed-content">
                        <p className="widget-feed-text">Server #3 overloaded</p>
                      </div>
                      <span className="widget-feed-time">3 hr ago</span>
                    </div>
                    <div className="widget-feed-item">
                      <div className="widget-feed-icon success">
                        <i className="bi bi-cart-check" />
                      </div>
                      <div className="widget-feed-content">
                        <p className="widget-feed-text">New order received.</p>
                      </div>
                      <span className="widget-feed-time">28 May</span>
                    </div>
                    <div className="widget-feed-item">
                      <div className="widget-feed-icon info">
                        <i className="bi bi-person-plus" />
                      </div>
                      <div className="widget-feed-content">
                        <p className="widget-feed-text">New user registered.</p>
                      </div>
                      <span className="widget-feed-time">28 May</span>
                    </div>
                    <div className="widget-feed-item">
                      <div className="widget-feed-icon primary">
                        <i className="bi bi-box-seam" />
                      </div>
                      <div className="widget-feed-content">
                        <p className="widget-feed-text">New Version just arrived.</p>
                      </div>
                      <span className="widget-feed-time">25 May</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Row 4: Poll Results, Visits, Earnings */}
        <section className="section">
          <div className="row g-4">
            {/* Poll Results Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Result of Poll</h5>
                  <span className="text-muted small">Here is the result for the latest poll</span>
                </div>
                <div className="card-body">
                  <p className="widget-poll-question">What is your preferred work schedule?</p>
                  <div className="widget-poll-results">
                    <div className="widget-poll-result">
                      <div className="widget-poll-result-header">
                        <span>A. Fully Remote</span>
                        <span>48%</span>
                      </div>
                      <div className="progress" style={{height: 6}}>
                        <div className="progress-bar bg-primary" style={{width: '48%'}} />
                      </div>
                    </div>
                    <div className="widget-poll-result">
                      <div className="widget-poll-result-header">
                        <span>B. Hybrid (3 days office)</span>
                        <span>27%</span>
                      </div>
                      <div className="progress" style={{height: 6}}>
                        <div className="progress-bar bg-info" style={{width: '27%'}} />
                      </div>
                    </div>
                    <div className="widget-poll-result">
                      <div className="widget-poll-result-header">
                        <span>C. Fully On-site</span>
                        <span>12%</span>
                      </div>
                      <div className="progress" style={{height: 6}}>
                        <div className="progress-bar bg-warning" style={{width: '12%'}} />
                      </div>
                    </div>
                    <div className="widget-poll-result">
                      <div className="widget-poll-result-header">
                        <span>D. Flexible Schedule</span>
                        <span>13%</span>
                      </div>
                      <div className="progress" style={{height: 6}}>
                        <div className="progress-bar bg-danger" style={{width: '13%'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Visits by Country Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Visits around the countries</h5>
                </div>
                <div className="card-body">
                  <div className="widget-visits-list">
                    <div className="widget-visit-item">
                      <div className="widget-visit-info">
                        <h4 className="widget-visit-count">8,240</h4>
                        <span className="widget-visit-country">from Germany</span>
                      </div>
                      <div className="widget-visit-bar">
                        <div className="progress" style={{height: 6}}>
                          <div className="progress-bar bg-primary" style={{width: '52%'}} />
                        </div>
                        <span className="widget-visit-percent">52%</span>
                      </div>
                    </div>
                    <div className="widget-visit-item">
                      <div className="widget-visit-info">
                        <h4 className="widget-visit-count">4,120</h4>
                        <span className="widget-visit-country">from United Kingdom</span>
                      </div>
                      <div className="widget-visit-bar">
                        <div className="progress" style={{height: 6}}>
                          <div className="progress-bar bg-success" style={{width: '89%'}} />
                        </div>
                        <span className="widget-visit-percent">89%</span>
                      </div>
                    </div>
                    <div className="widget-visit-item">
                      <div className="widget-visit-info">
                        <h4 className="widget-visit-count">1,890</h4>
                        <span className="widget-visit-country">from Canada</span>
                      </div>
                      <div className="widget-visit-bar">
                        <div className="progress" style={{height: 6}}>
                          <div className="progress-bar bg-warning" style={{width: '68%'}} />
                        </div>
                        <span className="widget-visit-percent">68%</span>
                      </div>
                    </div>
                    <div className="widget-visit-item">
                      <div className="widget-visit-info">
                        <h4 className="widget-visit-count">1,540</h4>
                        <span className="widget-visit-country">from Japan</span>
                      </div>
                      <div className="widget-visit-bar">
                        <div className="progress" style={{height: 6}}>
                          <div className="progress-bar bg-danger" style={{width: '41%'}} />
                        </div>
                        <span className="widget-visit-percent">41%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Total Earnings Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Total Earning</h5>
                  <div className="card-actions">
                    <select className="form-select form-select-sm" style={{width: 'auto'}}>
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                </div>
                <div className="card-body">
                  <h3 className="widget-earning-total">$742</h3>
                  <div className="widget-earning-users">
                    <div className="widget-earning-user">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="User" className="widget-earning-avatar" />
                      <span className="widget-earning-name">Sarah Mitchell</span>
                      <span className="badge bg-primary">$2,840</span>
                    </div>
                    <div className="widget-earning-user">
                      <img src="/assets/img/avatars/avatar-2.webp" alt="User" className="widget-earning-avatar" />
                      <span className="widget-earning-name">David Chen</span>
                      <span className="badge bg-success">$3,920</span>
                    </div>
                    <div className="widget-earning-user">
                      <img src="/assets/img/avatars/avatar-3.webp" alt="User" className="widget-earning-avatar" />
                      <span className="widget-earning-name">Emily Rodriguez</span>
                      <span className="badge bg-info">$4,150</span>
                    </div>
                    <div className="widget-earning-user">
                      <img src="/assets/img/avatars/avatar-4.webp" alt="User" className="widget-earning-avatar" />
                      <span className="widget-earning-name">Nathan Brooks</span>
                      <span className="badge bg-warning">$2,680</span>
                    </div>
                    <div className="widget-earning-user">
                      <img src="/assets/img/avatars/avatar-5.webp" alt="User" className="widget-earning-avatar" />
                      <span className="widget-earning-name">Olivia Martinez</span>
                      <span className="badge bg-danger">$5,230</span>
                    </div>
                    <div className="widget-earning-user">
                      <img src="/assets/img/avatars/avatar-6.webp" alt="User" className="widget-earning-avatar" />
                      <span className="widget-earning-name">Kevin Park</span>
                      <span className="badge bg-secondary">$8,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Activity & Tasks Widgets */}
        <section className="section">
          <h5 className="section-title mb-3">Activity &amp; Tasks</h5>
          <div className="row g-4">
            {/* Activity Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Recent Activity</h5>
                  <div className="card-actions">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-outline-primary">View All</a>
                  </div>
                </div>
                <div className="card-body widget-activity">
                  <div className="activity-item">
                    <div className="activity-icon primary">
                      <i className="bi bi-person-plus" />
                    </div>
                    <div className="activity-content">
                      <div className="activity-title"><a href="#" onClick={(event) => event.preventDefault()}>Sarah Johnson</a> joined the team</div>
                      <div className="activity-text">New team member added to the Marketing department</div>
                      <div className="activity-time">2 minutes ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon success">
                      <i className="bi bi-check-circle" />
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Project <a href="#" onClick={(event) => event.preventDefault()}>Website Redesign</a> completed</div>
                      <div className="activity-text">All tasks have been marked as done</div>
                      <div className="activity-time">1 hour ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon warning">
                      <i className="bi bi-exclamation-triangle" />
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Server load warning</div>
                      <div className="activity-text">CPU usage exceeded 80% threshold</div>
                      <div className="activity-time">3 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon danger">
                      <i className="bi bi-bug" />
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">Bug reported in <a href="#" onClick={(event) => event.preventDefault()}>Payment Module</a></div>
                      <div className="activity-text">Transaction failed for order #12485</div>
                      <div className="activity-time">5 hours ago</div>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon info">
                      <i className="bi bi-info-circle" />
                    </div>
                    <div className="activity-content">
                      <div className="activity-title">System update available</div>
                      <div className="activity-text">Version 2.4.0 is ready for installation</div>
                      <div className="activity-time">Yesterday</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Task List Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Tasks</h5>
                  <div className="card-actions">
                    <button className="btn btn-sm btn-primary"><i className="bi bi-plus me-1" />Add Task</button>
                  </div>
                </div>
                <div className="card-body">
                  <div className="task-list">
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task1" />
                        <label htmlFor="task1" />
                      </div>
                      <div className="task-info">
                        <div className="task-title">Review dashboard design mockups</div>
                        <div className="task-meta">
                          <span className="task-due"><i className="bi bi-calendar" /> Today</span>
                          <span className="badge badge-soft-danger">High</span>
                        </div>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task2" defaultChecked />
                        <label htmlFor="task2" />
                      </div>
                      <div className="task-info">
                        <div className="task-title">Team standup meeting at 10 AM</div>
                        <div className="task-meta">
                          <span className="task-due"><i className="bi bi-clock" /> 10:00 AM</span>
                          <span className="badge badge-soft-warning">Medium</span>
                        </div>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task3" />
                        <label htmlFor="task3" />
                      </div>
                      <div className="task-info">
                        <div className="task-title">Prepare quarterly report</div>
                        <div className="task-meta">
                          <span className="task-due"><i className="bi bi-calendar" /> Tomorrow</span>
                          <span className="badge badge-soft-primary">Normal</span>
                        </div>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task4" />
                        <label htmlFor="task4" />
                      </div>
                      <div className="task-info">
                        <div className="task-title">Update user documentation</div>
                        <div className="task-meta">
                          <span className="task-due"><i className="bi bi-calendar" /> Jan 25</span>
                          <span className="badge badge-soft-success">Low</span>
                        </div>
                      </div>
                    </div>
                    <div className="task-item">
                      <div className="task-checkbox">
                        <input type="checkbox" id="task5" defaultChecked />
                        <label htmlFor="task5" />
                      </div>
                      <div className="task-info">
                        <div className="task-title">Fix authentication bug</div>
                        <div className="task-meta">
                          <span className="task-due"><i className="bi bi-check-circle text-success" /> Completed</span>
                          <span className="badge badge-soft-danger">High</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Transaction & News Widgets */}
        <section className="section">
          <h5 className="section-title mb-3">Transactions &amp; News</h5>
          <div className="row g-4">
            {/* Transaction List Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Recent Transactions</h5>
                  <div className="card-actions">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-outline-primary">View All</a>
                  </div>
                </div>
                <div className="card-body">
                  <div className="transaction-list">
                    <div className="transaction-item">
                      <div className="transaction-icon success">
                        <i className="bi bi-arrow-down-left" />
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-title">Payment from John Doe</div>
                        <div className="transaction-meta">Jan 20, 2026 • 2:45 PM</div>
                      </div>
                      <div className="transaction-amount positive">+$1,250.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon danger">
                        <i className="bi bi-arrow-up-right" />
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-title">Server Hosting Fee</div>
                        <div className="transaction-meta">Jan 19, 2026 • 10:30 AM</div>
                      </div>
                      <div className="transaction-amount negative">-$299.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon success">
                        <i className="bi bi-arrow-down-left" />
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-title">Subscription Renewal</div>
                        <div className="transaction-meta">Jan 18, 2026 • 4:15 PM</div>
                      </div>
                      <div className="transaction-amount positive">+$89.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon danger">
                        <i className="bi bi-arrow-up-right" />
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-title">Software License</div>
                        <div className="transaction-meta">Jan 17, 2026 • 9:00 AM</div>
                      </div>
                      <div className="transaction-amount negative">-$450.00</div>
                    </div>
                    <div className="transaction-item">
                      <div className="transaction-icon success">
                        <i className="bi bi-arrow-down-left" />
                      </div>
                      <div className="transaction-details">
                        <div className="transaction-title">Client Payment - ABC Corp</div>
                        <div className="transaction-meta">Jan 16, 2026 • 11:20 AM</div>
                      </div>
                      <div className="transaction-amount positive">+$3,500.00</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* News Widget */}
            <div className="col-lg-6">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Latest News</h5>
                  <div className="card-actions">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-outline-primary">View All</a>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="widget-news-item px-3">
                    <div className="widget-news-image bg-light d-flex align-items-center justify-content-center rounded">
                      <i className="bi bi-newspaper text-muted" />
                    </div>
                    <div className="widget-news-content">
                      <div className="widget-news-title"><a href="#" onClick={(event) => event.preventDefault()}>New Feature Release: Dark Mode Support Now Available</a></div>
                      <div className="widget-news-meta">Jan 20, 2026 • 5 min read</div>
                    </div>
                  </div>
                  <div className="widget-news-item px-3">
                    <div className="widget-news-image bg-light d-flex align-items-center justify-content-center rounded">
                      <i className="bi bi-graph-up text-muted" />
                    </div>
                    <div className="widget-news-content">
                      <div className="widget-news-title"><a href="#" onClick={(event) => event.preventDefault()}>Q4 2025 Performance Report Shows Record Growth</a></div>
                      <div className="widget-news-meta">Jan 18, 2026 • 8 min read</div>
                    </div>
                  </div>
                  <div className="widget-news-item px-3">
                    <div className="widget-news-image bg-light d-flex align-items-center justify-content-center rounded">
                      <i className="bi bi-people text-muted" />
                    </div>
                    <div className="widget-news-content">
                      <div className="widget-news-title"><a href="#" onClick={(event) => event.preventDefault()}>Team Expansion: Welcome Our New Engineering Team</a></div>
                      <div className="widget-news-meta">Jan 15, 2026 • 3 min read</div>
                    </div>
                  </div>
                  <div className="widget-news-item px-3">
                    <div className="widget-news-image bg-light d-flex align-items-center justify-content-center rounded">
                      <i className="bi bi-award text-muted" />
                    </div>
                    <div className="widget-news-content">
                      <div className="widget-news-title"><a href="#" onClick={(event) => event.preventDefault()}>Company Wins Best SaaS Product Award 2025</a></div>
                      <div className="widget-news-meta">Jan 12, 2026 • 4 min read</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Calendar & Quick Actions Widgets */}
        <section className="section">
          <h5 className="section-title mb-3">Calendar &amp; Quick Actions</h5>
          <div className="row g-4">
            {/* Mini Calendar Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Calendar</h5>
                </div>
                <div className="card-body">
                  <div className="widget-calendar-header">
                    <span className="widget-calendar-month">January 2026</span>
                    <div className="widget-calendar-nav">
                      <button className="btn btn-sm"><i className="bi bi-chevron-left" /></button>
                      <button className="btn btn-sm"><i className="bi bi-chevron-right" /></button>
                    </div>
                  </div>
                  <div className="widget-calendar-grid">
                    <div className="widget-calendar-day-header">Sun</div>
                    <div className="widget-calendar-day-header">Mon</div>
                    <div className="widget-calendar-day-header">Tue</div>
                    <div className="widget-calendar-day-header">Wed</div>
                    <div className="widget-calendar-day-header">Thu</div>
                    <div className="widget-calendar-day-header">Fri</div>
                    <div className="widget-calendar-day-header">Sat</div>
                    <div className="widget-calendar-day other-month">28</div>
                    <div className="widget-calendar-day other-month">29</div>
                    <div className="widget-calendar-day other-month">30</div>
                    <div className="widget-calendar-day other-month">31</div>
                    <div className="widget-calendar-day">1</div>
                    <div className="widget-calendar-day">2</div>
                    <div className="widget-calendar-day">3</div>
                    <div className="widget-calendar-day">4</div>
                    <div className="widget-calendar-day">5</div>
                    <div className="widget-calendar-day">6</div>
                    <div className="widget-calendar-day">7</div>
                    <div className="widget-calendar-day">8</div>
                    <div className="widget-calendar-day">9</div>
                    <div className="widget-calendar-day">10</div>
                    <div className="widget-calendar-day">11</div>
                    <div className="widget-calendar-day">12</div>
                    <div className="widget-calendar-day">13</div>
                    <div className="widget-calendar-day">14</div>
                    <div className="widget-calendar-day">15</div>
                    <div className="widget-calendar-day">16</div>
                    <div className="widget-calendar-day">17</div>
                    <div className="widget-calendar-day">18</div>
                    <div className="widget-calendar-day">19</div>
                    <div className="widget-calendar-day today">20</div>
                    <div className="widget-calendar-day">21</div>
                    <div className="widget-calendar-day">22</div>
                    <div className="widget-calendar-day">23</div>
                    <div className="widget-calendar-day">24</div>
                    <div className="widget-calendar-day">25</div>
                    <div className="widget-calendar-day">26</div>
                    <div className="widget-calendar-day">27</div>
                    <div className="widget-calendar-day">28</div>
                    <div className="widget-calendar-day">29</div>
                    <div className="widget-calendar-day">30</div>
                    <div className="widget-calendar-day">31</div>
                    <div className="widget-calendar-day other-month">1</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Quick Actions Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Quick Actions</h5>
                </div>
                <div className="card-body">
                  <div className="quick-actions-grid">
                    <div className="quick-action-item">
                      <div className="quick-action-icon" style={{background: 'color-mix(in srgb, var(--accent-color), transparent 90%)', color: 'var(--accent-color)'}}>
                        <i className="bi bi-plus-circle" />
                      </div>
                      <span className="quick-action-label">New Task</span>
                    </div>
                    <div className="quick-action-item">
                      <div className="quick-action-icon" style={{background: 'var(--success-color-light)', color: 'var(--success-color)'}}>
                        <i className="bi bi-person-plus" />
                      </div>
                      <span className="quick-action-label">Add User</span>
                    </div>
                    <div className="quick-action-item">
                      <div className="quick-action-icon" style={{background: 'var(--warning-color-light)', color: 'var(--warning-color)'}}>
                        <i className="bi bi-file-earmark-plus" />
                      </div>
                      <span className="quick-action-label">New Invoice</span>
                    </div>
                    <div className="quick-action-item">
                      <div className="quick-action-icon" style={{background: 'var(--info-color-light)', color: 'var(--info-color)'}}>
                        <i className="bi bi-calendar-plus" />
                      </div>
                      <span className="quick-action-label">Schedule</span>
                    </div>
                    <div className="quick-action-item">
                      <div className="quick-action-icon" style={{background: 'var(--danger-color-light)', color: 'var(--danger-color)'}}>
                        <i className="bi bi-envelope-plus" />
                      </div>
                      <span className="quick-action-label">New Email</span>
                    </div>
                    <div className="quick-action-item">
                      <div className="quick-action-icon" style={{background: 'color-mix(in srgb, var(--heading-color), transparent 90%)', color: 'var(--heading-color)'}}>
                        <i className="bi bi-gear" />
                      </div>
                      <span className="quick-action-label">Settings</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Contact List Widget */}
            <div className="col-lg-4">
              <div className="card">
                <div className="card-header">
                  <h5 className="card-title">Recent Contacts</h5>
                  <div className="card-actions">
                    <a href="#" onClick={(event) => event.preventDefault()} className="btn btn-sm btn-outline-primary">View All</a>
                  </div>
                </div>
                <div className="card-body p-0">
                  <div className="contact-list">
                    <div className="contact-item">
                      <img src="/assets/img/avatars/avatar-1.webp" alt="John Smith" className="contact-avatar" />
                      <div className="contact-info">
                        <div className="contact-name">John Smith</div>
                        <div className="contact-company">Acme Corporation</div>
                      </div>
                      <div className="contact-stats">
                        <div className="contact-deals">3 deals</div>
                        <div className="contact-value">$24,500</div>
                      </div>
                    </div>
                    <div className="contact-item">
                      <img src="/assets/img/avatars/avatar-2.webp" alt="Sarah Johnson" className="contact-avatar" />
                      <div className="contact-info">
                        <div className="contact-name">Sarah Johnson</div>
                        <div className="contact-company">Tech Solutions Inc</div>
                      </div>
                      <div className="contact-stats">
                        <div className="contact-deals">5 deals</div>
                        <div className="contact-value">$42,800</div>
                      </div>
                    </div>
                    <div className="contact-item">
                      <img src="/assets/img/avatars/avatar-3.webp" alt="Michael Brown" className="contact-avatar" />
                      <div className="contact-info">
                        <div className="contact-name">Michael Brown</div>
                        <div className="contact-company">Global Industries</div>
                      </div>
                      <div className="contact-stats">
                        <div className="contact-deals">2 deals</div>
                        <div className="contact-value">$18,200</div>
                      </div>
                    </div>
                    <div className="contact-item">
                      <img src="/assets/img/avatars/avatar-4.webp" alt="Emily Davis" className="contact-avatar" />
                      <div className="contact-info">
                        <div className="contact-name">Emily Davis</div>
                        <div className="contact-company">StartUp Hub</div>
                      </div>
                      <div className="contact-stats">
                        <div className="contact-deals">1 deal</div>
                        <div className="contact-value">$8,500</div>
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

export default WidgetsAppsPage
