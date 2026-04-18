import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";
import ReusableDataGrid from "../../components/ReusableDataGrid";

const FrmUserList = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const brCategory = user?.brCategory;

  const [selectedUserLevel, setSelectedUserLevel] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
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
  const fetchBranches = async () => {
    try {
      const res = await apiClient.get(
        `/users/getBranches/?brcategory=${brCategory}&userLevel=${selectedUserLevel}`
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
  const fetchAgents = async () => {
    try {
      const res = await apiClient.get(
        `/users/getAgents/?brid=${selectedBranch}`
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

  useEffect(() => {
    if (selectedUserLevel && brCategory) {
        console.log(selectedUserLevel, brCategory)
      fetchBranches();
    }
  }, [selectedUserLevel, brCategory]);

  useEffect(() => {
    if (selectedBranch) {
      fetchAgents();
    }
  }, [selectedBranch]);

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

          {/* Dropdowns */}
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">User Level</label>
              <select
                className="form-select"
                onChange={(e) => {
                  setSelectedUserLevel(e.target.value);
                  setTableData([]);
                  setSelectedBranch("");
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
                onChange={(e) => setSelectedBranch(e.target.value)}
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