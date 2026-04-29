import { Link } from "react-router-dom";

export default function Settings() {
  return (
    <div className="main-content page-settings">
         <div className="page-header">
        <h1 className="page-title">Web Users Login History</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Last Login History</span>
        </nav>
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
                <h5 className="card-title mb-0">Security Controls</h5>
              </div>
              <div className="card-body">
                <div className="settings-security-stack">

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

          </div>
        </div>
    </div>
  )
}
