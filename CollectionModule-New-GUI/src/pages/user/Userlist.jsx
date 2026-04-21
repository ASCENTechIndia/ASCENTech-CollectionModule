// src/pages/Users/UsersList.jsx
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  Edit,
  Trash2,
  Mail,
  Key,
  MoreVertical,
  Download,
  Plus,
  Search,
  Sliders,
  Monitor,
  Smartphone,
} from "lucide-react";
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

  // Filter states (frontend filters)
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);

  const [page, setPage] = useState(1);
const [limit, setLimit] = useState(10);
const [totalPages, setTotalPages] = useState(1);
const [counts, setCounts] = useState({
  total: 0,
  active: 0,
  inactive: 0
});

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

  // Fetch branches when userLevel changes
  const fetchBranches = async (level) => {
    if (!level || !brCategory) return;
    try {
      const res = await apiClient.get(
        `/users/getBranches/?brcategory=${brCategory}&userLevel=${level}`,
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

  // Fetch agents (users) when branchId changes
 const fetchAgents = async () => {

  setLoading(true);
  try {
    const params = new URLSearchParams();

    // 🔹 Optional params
    if (branchId) params.append("brid", branchId);
    if (filterStatus !== "all") {
      params.append("status", filterStatus === "active" ? "A" : "I");
    }
    if (filterRole !== "all") {
      params.append("roleId", filterRole);
    }

    params.append("page", page);
    params.append("limit", limit);

    const res = await apiClient.get(
      `/users/getAgentsNew?${params.toString()}`
    );

    if (res.success) {
      const apiData = res.data;

      // 🔹 Map users
      const userList = apiData.data.map((agent, i) => ({
        id: agent.USERID,
        name: agent.EMPNAME,
        email: agent.EMAIL,
        mobile: agent.MOBNO?.toString(),
        role: mapRole(agent.VAR_USERROLE_NAME),
        status: agent.VAR_USERMST_STATUS === "A" ? "active" : "inactive",lastActive: "Recently",
        joined: new Date().toLocaleDateString(),
        avatar: `avatar-${i}.webp`,
      }));

      setUsers(userList);

      // 🔹 Pagination
      setTotalPages(apiData.pagination.totalPages);

      // 🔹 Counts
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

  // Helper to map backend role names to frontend role keys
  const mapRole = (roleName) => {
    const roleMap = {
      Admin: "admin",
      Manager: "manager",
      User: "user",
      // Add more mappings as needed
    };
    return roleMap[roleName] || "user";
  };

  // Clear users when branch changes
useEffect(() => {
    fetchAgents();
}, [branchId, filterRole, filterStatus, page]);

useEffect(() => {
  setPage(1);
}, [branchId, filterRole, filterStatus]);

  // Reset branch options when userLevel changes
  useEffect(() => {
    setBranchId("");
    if (userLevel) {
      fetchBranches(userLevel);
    } else {
      setBranchOptions([]);
    }
  }, [userLevel]);

  // Filter users (frontend)
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.mobile?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map((u) => u.id)));
    }
  };

  const toggleUserSelection = (userId) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const getRoleBadge = (role) => {
    const roles = {
      admin: { icon: "🛡️", label: "Admin", class: "admin" },
      manager: { icon: "⚙️", label: "Manager", class: "manager" },
      user: { icon: "👤", label: "User", class: "user" },
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
              Centralized user operations, access status, and lifecycle
              management.
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

        <div className="users-insight-row mb-3">
          <div className="users-insight users-insight-total">
            <span className="users-insight-icon">👥</span>
            <span className="users-insight-label">Total Users</span>
            <span className="users-insight-value">{counts.total}</span>
          </div>
          <div className="users-insight users-insight-active">
            <span className="users-insight-icon">✓</span>
            <span className="users-insight-label">Active</span>
            <span className="users-insight-value">
              {counts.active}
            </span>
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
                    {users.filter((u) => u.status === "A").length}
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
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              <div className="d-flex gap-2">
                <select
                  className=""
                  style={dropdownStyle}
                  value={userLevel}
                  onChange={(e) => setUserLevel(e.target.value)}
                >
                  <option value="">Select User Level</option>
                  <option value="Zone">Zone</option>
                  <option value="Region">Region</option>
                  <option value="Branch">Branch</option>
                </select>

                <select
                  className=""
                  value={branchId}
                  style={dropdownStyle}
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
                  className=""
                  value={filterRole}
                  style={dropdownStyle}
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
                    <th className="users-th-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        onChange={handleSelectAll}
                        checked={
                          selectedUsers.size === filteredUsers.length &&
                          filteredUsers.length > 0
                        }
                      />
                    </th>
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
                    const status = getStatusBadge(userItem.VAR_USERMST_STATUS);
                    return (
                      <tr key={userItem.id}>
                        <td>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            checked={selectedUsers.has(userItem.id)}
                            onChange={() => toggleUserSelection(userItem.id)}
                          />
                        </td>
                        <td>
                          <div className="users-user">
                            <div className="users-avatar-wrap">
                              <img
                                src={`/assets/img/profile-img.jpg`}
                                alt=""
                                className="users-avatar"
                              />
                              <span
                                className={`users-avatar-status online`}
                              ></span>
                            </div>
                            <div className="users-user-info">
                              <Link
                                to={`/users/${userItem.id}`}
                                className="users-user-name"
                              >
                                {userItem.name}
                              </Link>
                              <span className="users-user-email">
                                {userItem.email}
                              </span>
                              {userItem.mobile && (
                                <span className="users-user-mobile">
                                  {userItem.mobile}
                                </span>
                              )}
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
                            <span className="users-status-dot"></span>{" "}
                            {status.label}
                          </span>
                        </td>
                        <td className="users-meta">{userItem.lastActive}</td>
                        <td className="users-meta">{userItem.joined}</td>
                        <td>
                          <div className="users-actions">
                            <Link
                              to={`/users/${userItem.id}`}
                              className="users-action-btn"
                              title="View"
                            >
                              <Eye size={16} />
                            </Link>
                            <Link
                               to="/user/roles"
                               state={{ employeeId: userItem.id }}
                              className="users-action-btn"
                              title="Edit"
                            >
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

      {/* PREVIOUS */}
      <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
        <button
          className="page-link"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          ← Previous
        </button>
      </li>

      {/* NEXT */}
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

        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add New User</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setShowAddModal(false)}
                  ></button>
                </div>
                <div className="modal-body">
                  <form>
                    <div className="row g-3">
                      <div className="col-sm-6">
                        <label className="form-label">First Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter first name"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Last Name</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter last name"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="Enter email address"
                        />
                      </div>
                      <div className="col-12">
                        <label className="form-label">Role</label>
                        <select className="form-select">
                          <option value="">Select role...</option>
                          <option value="admin">Admin</option>
                          <option value="manager">Manager</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Enter password"
                        />
                      </div>
                      <div className="col-sm-6">
                        <label className="form-label">Confirm Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm password"
                        />
                      </div>
                      <div className="col-12">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="sendInvite"
                            defaultChecked
                          />
                          <label
                            className="form-check-label"
                            htmlFor="sendInvite"
                          >
                            Send welcome email with login details
                          </label>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="button" className="btn btn-primary">
                    Add User
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
