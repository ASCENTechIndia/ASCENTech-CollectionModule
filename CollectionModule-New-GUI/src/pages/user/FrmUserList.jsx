import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

const FrmUserList = () => {
  const navigate = useNavigate();

  return (
    <div className="main-content">
         <div className="page-header">
        <h1 className="page-title">User List</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item active">User List</span>
        </nav>
      </div>

    
        <div className="card mb-4">

          <div className="card-body">

            {/* Buttons */}
            <div className="d-flex gap-3 mb-4">
              <button
                className="btn btn-primary"
                onClick={() => navigate("/User/FrmUserCreation")}
              >
                New Mobile User
              </button>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/User/FrmUserCreationWeb")}
              >
                New Web User
              </button>
            </div>

            {/* Department Dropdown (Forms UI मधून घेतलं) */}
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Department</label>
                <select className="form-select">
                  <option>Operations</option>
                  <option>Marketing</option>
                  <option>Engineering</option>
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">User Type</label>
                <select className="form-select">
                  <option>Admin</option>
                  <option>User</option>
                  <option>Manager</option>
                </select>
              </div>
            </div>

            {/* Table Placeholder */}
            <div className="mt-4 border rounded p-4 text-center text-muted">
              Table will appear here
            </div>

          </div>
        </div>
    
    </div>
  );
};

export default FrmUserList;