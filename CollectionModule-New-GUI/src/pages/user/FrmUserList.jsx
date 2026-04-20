import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import ReusableDataGrid from "../../components/ReusableDataGrid";

const FrmUserList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const brCategory = user?.brCategory;

  const [, setSelectedUserLevel] = useState("");
  const [, setSelectedBranch] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [tableData, setTableData] = useState([]);

  // 🔹 Columns (Grid format)
  const columns = [
    { label: "Agent ID", sortable: true },
    { label: "Agent Name", sortable: true },
    { label: "Mobile Number", sortable: true },
    { label: "Email", sortable: true },
    { label: "Role", sortable: true },
  ];

  // 🔹 Fetch Branches
  const fetchBranches = async (userLevel) => {
    try {
      const res = await apiClient.get(
        `/users/getBranches/?brcategory=${brCategory}&userLevel=${userLevel}`
      );
      //   console.log("res", res)
      if (res.success) {
        const options = res.data.map((i) => ({
          label: i.BRANCHNAME,
          value: i.BRID,
        }));
        setBranchOptions(options);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // 🔹 Fetch Agents
  const fetchAgents = async (branchId) => {
    try {
      const res = await apiClient.get(
        `/users/getAgents/?brid=${branchId}`
      );

      if (res.success) {
        const rows = res.data.map((i) => ([
          i.USERID,
          i.EMPNAME,
          i.MOBNO,
          i.EMAIL,
          i.VAR_USERROLE_NAME,
        ]));
        setTableData(rows);
      }
    } catch (err) {
      console.error(err);
    }
  };

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

      <div className="d-flex justify-content-end gap-3 mb-3 flex-wrap">
        <button
          className="btn btn-primary d-inline-flex align-items-center"
          onClick={() => navigate("/User/FrmUserCreation")}
        >
          <i className="bi bi-person-plus-fill me-2" />
          New Mobile User
        </button>

        <button
          className="btn btn-primary d-inline-flex align-items-center"
          onClick={() => navigate("/User/FrmUserCreationWeb")}
        >
          <i className="bi bi-globe2 me-2" />
          New Web User
        </button>
      </div>

      <div className="card mb-4">
        <div className="card-body">

          {/* Dropdowns */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">User Level</label>
              <select
                className="form-select"
                onChange={(e) => {
                  const userLevel = e.target.value;
                  setSelectedUserLevel(userLevel);
                  setTableData([]);
                  setSelectedBranch("");
                  setBranchOptions([]);

                  if (userLevel && brCategory) {
                    fetchBranches(userLevel);
                  }
                }}
              >
                <option value="">Select</option>
                <option value="Zone">Zone</option>
                <option value="Region">Region</option>
                <option value="Branch">Branch</option>
              </select>
            </div>

            <div className="col-md-6">
              <label className="form-label">Zone/Region/Branch</label>
              <select
                className="form-select"
                onChange={(e) => {
                  const branchId = e.target.value;
                  setSelectedBranch(branchId);

                  if (branchId) {
                    fetchAgents(branchId);
                  }
                }}
              >
                <option value="">Select</option>
                {branchOptions.map((item) => (
                  <option value={item.value} key={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {tableData.length > 0 && (
            <div className="mt-4">
              <ReusableDataGrid
                columns={columns}
                rows={tableData}
                title="User List"
              />
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default FrmUserList;
