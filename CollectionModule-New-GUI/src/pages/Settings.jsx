import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="main-content page-settings">
         <div className="page-header">
        <h1 className="page-title">Web Users Login History</h1>
      </div>


        <div className="settings-shell row g-3">
          <div className="col-xl-3 col-lg-4">
            <div className="card settings-side-card">
              <div className="card-body p-2">
                <nav className="settings-nav">
                  <a href="settings.html" className="settings-nav-item active">
                    <i className="bi bi-sliders"></i>
                    <div className="settings-nav-text">
                      <span className="settings-nav-label">General</span>
                      <span className="settings-nav-desc">Profile and preferences</span>
                    </div>
                  </a>
                  <a href="notifications.html" className="settings-nav-item">
                    <i className="bi bi-bell"></i>
                    <div className="settings-nav-text">
                      <span className="settings-nav-label">Notifications</span>
                      <span className="settings-nav-desc">Alerts and channels</span>
                    </div>
                  </a>
                </nav>
              </div>
            </div>
          </div>

          <div className="col-xl-9 col-lg-8 settings-main">

            <div className="card mb-3">
              <div className="card-header">
                <h5 className="card-title mb-0">General Settings</h5>
              </div>
              <div className="card-body">
                <div className="settings-security-stack">

                  <div class="settings-security-item">
                    <div class="settings-security-info">
                      <h6 class="settings-security-title">Brand Logo</h6>
                      <p class="settings-security-desc">Manage brand logo image</p>
                    </div>
                    <a href="activity.html" class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#addUserModal">Manage</a>
                  </div>

                    <div className="settings-security-item">
                    <div className="settings-security-info">
                      <h6 className="settings-security-title">Two-Factor Authentication</h6>
                      <p className="settings-security-desc">Require verification code on sign-in</p>
                    </div>
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" id="settings2fa" defaultChecked />
                    </div>
                  </div>

                  <div className="settings-security-item">
                    <div className="settings-security-info">
                      <h6 className="settings-security-title">Password</h6>
                      <p className="settings-security-desc">Last changed 3 months ago</p>
                    </div>
                    <button type="button" className="btn btn-outline-primary btn-sm" data-bs-toggle="collapse" data-bs-target="#changePassword">Change</button>
                  </div>

                
                </div>
              </div>
            </div>
<div className="modal fade" id="addUserModal" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New User</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label">Password</label>
                      <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" placeholder="Confirm password" />
                    </div>
                    <div className="col-12">
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="sendInvite" defaultChecked />
                        <label className="form-check-label" htmlFor="sendInvite">Send welcome email with login details</label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary">Submit</button>
              </div>
            </div>
          </div>
        </div>
          </div>

          
        </div>
    </div>
  )
}
