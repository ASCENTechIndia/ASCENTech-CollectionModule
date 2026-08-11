import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Home = () => {

    const {user} =  useAuth();
    const displayName = user?.name || user?.userName || user?.fullName || user?.userId || 'User'
 

  return (
    <div>
      <div className="main-content page-widgets-banners">
        {/* Page Header */}
        <div className="page-header">
          <h1 className="page-title">Home</h1>
        </div>
        {/* Welcome Banners */}
        <section className="section">
          <div className="row g-4">
            {/* Welcome Banner with Gradient */}
            <div className="col-lg-12">
              <div className="widget-banner-welcome gradient-primary">
                <div className="widget-banner-content">
                  <h4 className="widget-banner-title" style={{color:"white"}}>Welcome, {displayName}!</h4>
                <p className="widget-banner-text">
  Stay on top of your collection performance. Track daily recoveries, monitor pending cases, and ensure timely follow-ups to maximize efficiency.
</p></div>
                <div className="widget-banner-image">
                  <img src="/assets/img/banners/banner-welcome.jpg" alt="Welcome" />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Feature Banners */}
        <section className="section">
  <div className="row g-4">

    {/* Daily Visit Dashboard */}
    <div className="col-lg-4">
      <div className="widget-banner-feature">
        <div className="widget-banner-feature-content">
          <h5 className="widget-banner-feature-title">Daily Visit</h5>
          <p className="widget-banner-feature-text">
            Track daily visits, field activity, and performance insights in real-time.
          </p>
          <Link to="/Dashboard/DailyVisitNew" className="btn btn-primary btn-sm">
            View Dashboard
          </Link>
        </div>
        <div className="widget-banner-feature-icon">
          <i className="bi bi-bar-chart-line" />
        </div>
      </div>
    </div>

    {/* Active Agents Dashboard */}
    <div className="col-lg-4">
      <div className="widget-banner-feature">
        <div className="widget-banner-feature-content">
          <h5 className="widget-banner-feature-title">Active Agents</h5>
          <p className="widget-banner-feature-text">
            Monitor currently active agents, their status, and live productivity metrics.
          </p>
          <Link to="/Dashboard/FrmActiveAgentsNew" className="btn btn-success btn-sm">
            View Dashboard
          </Link>
        </div>
        <div className="widget-banner-feature-icon">
          <i className="bi bi-people" />
        </div>
      </div>
    </div>

    {/* Disposition Report Dashboard */}
    <div className="col-lg-4">
      <div className="widget-banner-feature">
        <div className="widget-banner-feature-content">
          <h5 className="widget-banner-feature-title">Disposition Report</h5>
          <p className="widget-banner-feature-text">
            Analyze call outcomes, dispositions, and performance reports in detail.
          </p>
          <Link to="Dashboard/FrmNewDashboard2New" style={{color:"white"}} className="btn btn-warning btn-sm">
            View Dashboard
          </Link>
        </div>
        <div className="widget-banner-feature-icon">
          <i className="bi bi-file-earmark-text" />
        </div>
      </div>
    </div>

  </div>
</section>
      </div>
    </div>
  )
};

export default Home;
