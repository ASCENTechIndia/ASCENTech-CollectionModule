import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, Edit, Search, Monitor, Smartphone } from "lucide-react";
import apiClient from "../../services/apiClient";
import { useAuth } from "../../context/AuthContext";

export default function UsersList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const brCategory = user?.brCategory;

  // State for dropdowns and API data
  const [userLevel, setUserLevel] = useState("");
  const [branchId, setBranchId] = useState("");
  const [branchOptions, setBranchOptions] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 10; // fixed limit
  const [totalPages, setTotalPages] = useState(1);
  const [counts, setCounts] = useState({ total: 0, active: 0, inactive: 0 });

  const dropdownStyle = {
    padding: "0.375rem 2rem 0.375rem 0.75rem",
    fontSize: "0.875rem",
    lineHeight: "1.5",
    color: "#212529",
    backgroundColor: "#fff",
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M2 5l6 6 6-6'/%3e%3c/svg%3e")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 0.75rem center",
    backgroundSize: "16px 12px",
    border: "1px solid #dee2e6",
    borderRadius: "0.375rem",
    appearance: "none",
    outline: "none",
    transition: "border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out",
  };

  // Fetch branches
  const fetchBranches = async (level) => {
    if (!level || !brCategory) return;
    try {
      const res = await apiClient.get(
        `/users/getBranches/?brcategory=${brCategory}&userLevel=${level}`
      );
      if (res.success) {
        const options = res.data.map((i) => ({
          label: i.BRANCHNAME,
          value: i.BRID,
        }));
        setBranchOptions(options);
      } else {
        setBranchOptions([]);
      }
    } catch (err) {
      console.error("Error fetching branches:", err);
      setBranchOptions([]);
    }
  };

  // Fetch agents
  const fetchAgents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (branchId) params.append("brid", branchId);
      if (filterStatus !== "all") {
        params.append("status", filterStatus === "active" ? "A" : "I");
      }
      if (filterRole !== "all") {
        params.append("roleId", filterRole);
      }
      params.append("page", page);
      params.append("limit", limit);

      const res = await apiClient.get(`/users/getAgentsNew?${params.toString()}`);
      if (res.success) {
        const apiData = res.data;
        const userList = apiData.data.map((agent, i) => ({
          id: agent.USERID,
          name: agent.EMPNAME,
          email: agent.EMAIL,
          mobile: agent.MOBNO?.toString(),
          role: mapRole(agent.VAR_USERROLE_NAME),
          status: agent.VAR_USERMST_STATUS === "A" ? "active" : "inactive",
          lastActive: "Recently",
          joined: new Date().toLocaleDateString(),
          avatar: `avatar-${i}.webp`,
        }));
        setUsers(userList);
        setTotalPages(apiData.pagination.totalPages);
        setCounts(apiData.counts);
      } else {
        setUsers([]);
      }
    } catch (err) {
      console.error("Error fetching agents:", err);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const mapRole = (roleName) => {
    const roleMap = {
      Admin: "admin",
      Manager: "manager",
      User: "user",
      FOS: "1",
      "Generic View": "5",
    };
    return roleMap[roleName] || "user";
  };

  // Trigger API when filters change
  useEffect(() => {
    fetchAgents();
  }, [branchId, filterRole, filterStatus, page]);

  useEffect(() => {
    setPage(1);
  }, [branchId, filterRole, filterStatus]);

  // Reset branch when userLevel changes
  useEffect(() => {
    setBranchId("");
    if (userLevel) {
      fetchBranches(userLevel);
    } else {
      setBranchOptions([]);
    }
  }, [userLevel]);

  // Frontend filter: only search and status (role already filtered by API)
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (user.mobile?.toLowerCase() || "").includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getRoleBadge = (role) => {
    const roles = {
      admin: { icon: "🛡️", label: "Admin", class: "admin" },
      manager: { icon: "⚙️", label: "Manager", class: "manager" },
      user: { icon: "👤", label: "User", class: "user" },
      1: { icon: "📱", label: "FOS", class: "fos" },
      5: { icon: "👁️", label: "Generic View", class: "generic" },
    };
    return roles[role] || roles.user;
  };

  const getStatusBadge = (status) => {
    const statuses = {
      active: { class: "active", label: "Active" },
      inactive: { class: "inactive", label: "Inactive" },
    };
    return statuses[status] || statuses.active;
  };

  return (
    <div className="main-content">
      <div className="page-users">
        <div className="page-header users-page-header">
          <div>
            <h1 className="page-title">User List</h1>
            <p className="users-page-subtitle">
              Centralized user operations, access status, and lifecycle management.
            </p>
          </div>
          <div className="page-header-actions">
            <button
              className="btn btn-outline-secondary btn-sm"
              onClick={() => navigate("/User/FrmUserCreationWeb")}
            >
              <Monitor className="inline mr-2" size={16} /> Web User
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => navigate("/User/FrmUserCreation")}
            >
              <Smartphone className="inline mr-2" size={16} /> Mobile User
            </button>
          </div>
        </div>

        {/* <div className="users-insight-row mb-3">
          <div className="users-insight users-insight-total">
            <span className="users-insight-icon">👥</span>
            <span className="users-insight-label">Total Users</span>
            <span className="users-insight-value">{counts.total}</span>
            <span className="users-insight-meta">All registered users</span>
          </div>
          <div className="users-insight users-insight-active">
            <span className="users-insight-icon">✓</span>
            <span className="users-insight-label">Active</span>
            <span className="users-insight-value">{counts.active}</span>
          </div>
          <div className="users-insight users-insight-inactive">
            <span className="users-insight-icon">✗</span>
            <span className="users-insight-label">Inactive</span>
            <span className="users-insight-value">
              {counts.inactive}
            </span>
          </div>
        </div>

        <div className="card users-list-card">
          <div className="users-toolbar">
            <div className="users-toolbar-left">
              <div className="users-filter-tabs">
                <button
                  className={`users-filter-tab ${filterStatus === "all" ? "active" : ""}`}
                  onClick={() => setFilterStatus("all")}
                >
                  All <span className="users-filter-count">{users.length}</span>
                </button>
                <button
                  className={`users-filter-tab ${filterStatus === "active" ? "active" : ""}`}
                  onClick={() => setFilterStatus("active")}
                >
                  Active{" "}
                  <span className="users-filter-count">
                    {users.filter((u) => u.status === "active").length}
                  </span>
                </button>
                <button
                  className={`users-filter-tab ${filterStatus === "inactive" ? "active" : ""}`}
                  onClick={() => setFilterStatus("inactive")}
                >
                  Inactive{" "}
                  <span className="users-filter-count">
                    {users.filter((u) => u.status === "inactive").length}
                  </span>
                </button>
              </div>
            </div>

            <div className="users-toolbar-right">
              <div className="users-search">
                <Search className="inline search-icon" size={16} />
                <input
                  type="text"
                  placeholder="Search users, email, mobile..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(1);
                  }}
                />
              </div>

              <div className="d-flex gap-2">
                <select style={dropdownStyle} value={userLevel} onChange={(e) => setUserLevel(e.target.value)}>
                  <option value="">Select User Level</option>
                  <option value="Zone">Zone</option>
                  <option value="Region">Region</option>
                  <option value="Branch">Branch</option>
                </select>

                <select
                  style={dropdownStyle}
                  value={branchId}
                  onChange={(e) => setBranchId(e.target.value)}
                  disabled={!userLevel}
                >
                  <option value="">Select Z/R/B</option>
                  {branchOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>

                <select
                  style={dropdownStyle}
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                >
                  <option value="all">All roles</option>
                  <option value="5">Generic</option>
                  <option value="1">FOS</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-responsive users-table-wrap">
            {loading ? (
              <div className="text-center py-5">Loading users...</div>
            ) : (
              <table className="table table-hover align-middle mb-0">
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Active</th>
                    <th>Joined</th>
                    <th className="users-th-actions">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((userItem) => {
                    const role = getRoleBadge(userItem.role);
                    const status = getStatusBadge(userItem.status);
                    return (
                      <tr key={userItem.id}>
                        <td>
                          <div className="users-user">
                            <div className="users-avatar-wrap">
                              <img src={`/assets/img/profile-img.jpg`} alt="" className="users-avatar" />
                              <span className="users-avatar-status online"></span>
                            </div>
                            <div className="users-user-info">
                              <Link to={`/users/${userItem.id}`} className="users-user-name">
                                {userItem.name}
                              </Link>
                              <span className="users-user-email">{userItem.email}</span>
                              {userItem.mobile && <span className="users-user-mobile">{userItem.mobile}</span>}
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`users-role ${role.class}`}>
                            {role.icon} {role.label}
                          </span>
                        </td>
                        <td>
                          <span className={`users-status ${status.class}`}>
                            <span className="users-status-dot"></span> {status.label}
                          </span>
                        </td>
                        <td className="users-meta">{userItem.lastActive}</td>
                        <td className="users-meta">{userItem.joined}</td>
                        <td>
                          <div className="users-actions">
                            <Link to={`/users/${userItem.id}`} className="users-action-btn" title="View">
                              <Eye size={16} />
                            </Link>
                            <Link to="/user/roles" state={{ employeeId: userItem.id }} className="users-action-btn" title="Edit">
                              <Edit size={16} />
                            </Link>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>

          <div className="users-pagination">
            <div className="users-pagination-info">
              Showing{" "}
              <strong>
                {counts.total === 0 ? 0 : (page - 1) * limit + 1} -{" "}
                {Math.min(page * limit, counts.total)}
              </strong>{" "}
              of <strong>{counts.total}</strong> users
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => setPage((prev) => prev - 1)} disabled={page === 1}>
                    ← Previous
                  </button>
                </li>
                <li className={`page-item ${page === totalPages || totalPages === 0 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page === totalPages || totalPages === 0}
                  >
                    Next →
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}