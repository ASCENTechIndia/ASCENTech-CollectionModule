// src/pages/Users/UsersList.jsx
import { useState } from "react";
import { Link } from "react-router-dom";
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
} from "lucide-react";

export default function UsersList() {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@example.com",
      avatar: "avatar-1.webp",
      role: "admin",
      status: "active",
      lastActive: "Just now",
      joined: "Jan 15, 2024",
    },
    {
      id: 2,
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "avatar-2.webp",
      role: "manager",
      status: "active",
      lastActive: "5 min ago",
      joined: "Feb 3, 2024",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      email: "emily.r@example.com",
      avatar: "avatar-3.webp",
      role: "user",
      status: "active",
      lastActive: "2 hours ago",
      joined: "Mar 12, 2024",
    },
    {
      id: 4,
      name: "David Kim",
      email: "d.kim@example.com",
      avatar: "avatar-4.webp",
      role: "user",
      status: "inactive",
      lastActive: "3 days ago",
      joined: "Jan 28, 2024",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState(new Set());
  const [showAddModal, setShowAddModal] = useState(false);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
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
      pending: { class: "pending", label: "Pending" },
    };
    return statuses[status] || statuses.inactive;
  };

  return (
    <div className="main-content">
      <div className="page-users">
        <div className="page-header users-page-header">
          <div>
            <h1 className="page-title">People Directory</h1>
            <p className="users-page-subtitle">
              Centralized user operations, access status, and lifecycle
              management.
            </p>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-outline-secondary btn-sm">
              <Download className="inline mr-2" size={16} /> Export
            </button>
            <button
              className="btn btn-primary btn-sm"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="inline mr-2" size={16} /> Add User
            </button>
          </div>
        </div>

        <div className="users-insight-row mb-3">
          <div className="users-insight users-insight-total">
            <span className="users-insight-icon">👥</span>
            <span className="users-insight-label">Total Users</span>
            <span className="users-insight-value">{users.length}</span>
            <span className="users-insight-meta">+18 this month</span>
          </div>
          <div className="users-insight users-insight-active">
            <span className="users-insight-icon">✓</span>
            <span className="users-insight-label">Active</span>
            <span className="users-insight-value">
              {users.filter((u) => u.status === "active").length}
            </span>
            <span className="users-insight-meta">75% engagement</span>
          </div>
          <div className="users-insight users-insight-pending">
            <span className="users-insight-icon">⏳</span>
            <span className="users-insight-label">Pending</span>
            <span className="users-insight-value">
              {users.filter((u) => u.status === "pending").length}
            </span>
            <span className="users-insight-meta">Needs onboarding</span>
          </div>
          <div className="users-insight users-insight-inactive">
            <span className="users-insight-icon">✗</span>
            <span className="users-insight-label">Inactive</span>
            <span className="users-insight-value">
              {users.filter((u) => u.status === "inactive").length}
            </span>
            <span className="users-insight-meta">Follow-up required</span>
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
                  className={`users-filter-tab ${filterStatus === "pending" ? "active" : ""}`}
                  onClick={() => setFilterStatus("pending")}
                >
                  Pending{" "}
                  <span className="users-filter-count">
                    {users.filter((u) => u.status === "pending").length}
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
                  placeholder="Search users, email, role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* <div className="dropdown">
                <button className="users-toolbar-btn dropdown-toggle">
                  <Sliders className="inline mr-1" size={16} /> Role
                </button>
              </div> */}
              <div className="d-flex">
                <select className="form-select mx-1">
                  <option value="">Select User Level</option>
                  <option value="zone">Zone</option>
                  <option value="region">Region</option>
                  <option value="branch">Branch</option>
                </select>
                <select className="form-select mx-1">
                  <option value="">Select Z/R/B</option>
                  <option value="1">Zone1</option>
                  <option value="2">Zone2</option>
                  <option value="3">Zone3</option>
                </select>
                <select className="form-select mx-1">
                  <option value="">Select role...</option>
                  <option value="admin">Admin</option>
                  <option value="manager">Manager</option>
                  <option value="user">User</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-responsive users-table-wrap">
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
                {filteredUsers.map((user) => {
                  const role = getRoleBadge(user.role);
                  const status = getStatusBadge(user.status);
                  return (
                    <tr key={user.id}>
                      <td>
                        <input
                          type="checkbox"
                          className="form-check-input"
                          checked={selectedUsers.has(user.id)}
                          onChange={() => toggleUserSelection(user.id)}
                        />
                      </td>
                      <td>
                        <div className="users-user">
                          <div className="users-avatar-wrap">
                            <img
                              src={`/assets/img/avatars/${user.avatar}`}
                              alt=""
                              className="users-avatar"
                            />
                            <span
                              className={`users-avatar-status ${user.status}`}
                            ></span>
                          </div>
                          <div className="users-user-info">
                            <Link
                              to={`/users/${user.id}`}
                              className="users-user-name"
                            >
                              {user.name}
                            </Link>
                            <span className="users-user-email">
                              {user.email}
                            </span>
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
                      <td className="users-meta">{user.lastActive}</td>
                      <td className="users-meta">{user.joined}</td>
                      <td>
                        <div className="users-actions">
                          <Link
                            to={`/users/${user.id}`}
                            className="users-action-btn"
                            title="View"
                          >
                            <Eye size={16} />
                          </Link>
                          <Link
                            to={`/users/${user.id}/edit`}
                            className="users-action-btn"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </Link>
                          <div className="dropdown">
                            <button className="users-action-btn dropdown-toggle">
                              <MoreVertical size={16} />
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <a className="dropdown-item" href="#">
                                  <Mail className="inline mr-2" size={14} />{" "}
                                  Send Email
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  <Key className="inline mr-2" size={14} />{" "}
                                  Reset Password
                                </a>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  onClick={() => deleteUser(user.id)}
                                >
                                  <Trash2 className="inline mr-2" size={14} />{" "}
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="users-pagination">
            <div className="users-pagination-info">
              Showing <strong>1-{filteredUsers.length}</strong> of{" "}
              <strong>{users.length}</strong> users
            </div>
            <nav>
              <ul className="pagination pagination-sm mb-0">
                <li className="page-item disabled">
                  <a className="page-link" href="#">
                    ←
                  </a>
                </li>
                <li className="page-item active">
                  <a className="page-link" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    →
                  </a>
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
