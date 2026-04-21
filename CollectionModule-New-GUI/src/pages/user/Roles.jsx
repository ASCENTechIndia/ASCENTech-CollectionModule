// src/pages/Roles.jsx
import { useState } from 'react';
import { Plus, Edit, Trash2, Users } from 'lucide-react';

export default function Roles() {
  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrator', icon: '🛡️', color: 'danger', users: 3, description: 'Full system access with all permissions enabled.' },
    { id: 2, name: 'Manager', icon: '⚙️', color: 'warning', users: 8, description: 'Can manage team members and approve changes.' },
    { id: 3, name: 'Editor', icon: '✏️', color: 'info', users: 12, description: 'Can create, edit and publish content.' },
    { id: 4, name: 'User', icon: '👤', color: 'accent', users: 156, description: 'Standard user access.' },
    { id: 5, name: 'Viewer', icon: '👁️', color: 'muted', users: 45, description: 'Read-only access to the system.' }
  ]);

  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [permissions, setPermissions] = useState({
    dashboard: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: true, edit: true, delete: true },
    users: { view: true, create: true, edit: true, delete: true },
    roles: { view: true, create: true, edit: true, delete: true },
    teams: { view: true, create: true, edit: true, delete: true },
    pages: { view: true, create: true, edit: true, delete: true },
    blog: { view: true, create: true, edit: true, delete: true },
    media: { view: true, create: true, edit: true, delete: true },
    products: { view: true, create: true, edit: true, delete: true },
    orders: { view: true, create: true, edit: true, delete: true },
    customers: { view: true, create: true, edit: true, delete: true },
    coupons: { view: true, create: true, edit: true, delete: true },
    settings: { view: true, create: false, edit: true, delete: false },
    email: { view: true, create: true, edit: true, delete: true },
    api: { view: true, create: true, edit: true, delete: true },
    backup: { view: true, create: true, edit: false, delete: true }
  });

  const modules = [
    { group: '📊 Dashboard', items: ['dashboard', 'reports'] },
    { group: '👥 User Management', items: ['users', 'roles', 'teams'] },
    { group: '📄 Content Management', items: ['pages', 'blog', 'media'] },
    { group: '🛒 E-commerce', items: ['products', 'orders', 'customers', 'coupons'] },
    { group: '⚙️ System Settings', items: ['settings', 'email', 'api', 'backup'] }
  ];

  const roleUsers = [
    { id: 1, name: 'Sarah Johnson', email: 'sarah.johnson@example.com', avatar: 'avatar-1.webp', status: 'active', joined: 'Jan 15, 2024' },
    { id: 8, name: 'Chris Thompson', email: 'c.thompson@example.com', avatar: 'avatar-8.webp', status: 'active', joined: 'Nov 20, 2023' },
    { id: 9, name: 'Kevin Anderson', email: 'k.anderson@example.com', avatar: 'profile-img.webp', status: 'active', joined: 'Jan 1, 2024' }
  ];

  const handlePermissionChange = (module, action) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module],
        [action]: !prev[module][action]
      }
    }));
  };

  const handleSelectAll = (module) => {
    const allSelected = permissions[module].view && permissions[module].create && 
                        permissions[module].edit && permissions[module].delete;
    setPermissions(prev => ({
      ...prev,
      [module]: {
        view: !allSelected,
        create: !allSelected,
        edit: !allSelected,
        delete: !allSelected
      }
    }));
  };

  return (
    <div className="page-roles">
      <div className="page-header">
        <div>
          <h1 className="page-title">Roles & Permissions</h1>
          <nav className="breadcrumb">
            <a href="/" className="breadcrumb-item">Home</a>
            <span className="breadcrumb-item active">Roles & Permissions</span>
          </nav>
        </div>
        <div className="page-header-actions">
          <button 
            className="btn btn-primary btn-sm"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="inline mr-1" size={14} /> Add Role
          </button>
        </div>
      </div>

      <div className="row g-4">
        {/* Roles List */}
        <div className="col-xl-4 col-lg-5">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Roles</h5>
            </div>
            <div className="card-body p-0">
              <div className="roles-list">
                {roles.map(role => (
                  <div 
                    key={role.id}
                    className={`roles-item ${selectedRole.id === role.id ? 'active' : ''}`}
                    onClick={() => setSelectedRole(role)}
                  >
                    <div className={`roles-item-icon role-${role.color}`}>
                      {role.icon}
                    </div>
                    <div className="roles-item-info">
                      <span className="roles-item-name">{role.name}</span>
                      <span className="roles-item-count">{role.users} users</span>
                    </div>
                    <button className="roles-item-edit" title="Edit">
                      <Edit size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Role Info */}
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Role Details</h5>
            </div>
            <div className="card-body">
              <div className="roles-detail-list">
                <div className="roles-detail">
                  <span className="roles-detail-label">Name</span>
                  <span className="roles-detail-value">{selectedRole.name}</span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">Description</span>
                  <span className="roles-detail-value">{selectedRole.description}</span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">Created</span>
                  <span className="roles-detail-value">January 1, 2024</span>
                </div>
                <div className="roles-detail">
                  <span className="roles-detail-label">Last Modified</span>
                  <span className="roles-detail-value">May 15, 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Permissions & Users */}
        <div className="col-xl-8 col-lg-7">
          {/* Permissions Matrix */}
          <div className="card mb-4">
            <div className="card-header d-flex align-items-center justify-content-between">
              <div>
                <h5 className="card-title mb-0">Permissions Matrix</h5>
                <span className="roles-subtitle">Configure access for {selectedRole.name} role</span>
              </div>
              <button className="btn btn-primary btn-sm">
                <span>✓</span> Save Changes
              </button>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table roles-perm-table mb-0">
                  <thead>
                    <tr>
                      <th>Module</th>
                      <th className="text-center">View</th>
                      <th className="text-center">Create</th>
                      <th className="text-center">Edit</th>
                      <th className="text-center">Delete</th>
                      <th className="text-center">All</th>
                    </tr>
                  </thead>
                  <tbody>
                    {modules.map((moduleGroup, gidx) => (
                      <React.Fragment key={gidx}>
                        <tr className="roles-perm-group">
                          <td colSpan="6">{moduleGroup.group}</td>
                        </tr>
                        {moduleGroup.items.map(module => (
                          <tr key={module}>
                            <td className="roles-perm-module">
                              {module.charAt(0).toUpperCase() + module.slice(1)}
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input"
                                checked={permissions[module]?.view || false}
                                onChange={() => handlePermissionChange(module, 'view')}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input"
                                checked={permissions[module]?.create || false}
                                onChange={() => handlePermissionChange(module, 'create')}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input"
                                checked={permissions[module]?.edit || false}
                                onChange={() => handlePermissionChange(module, 'edit')}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input"
                                checked={permissions[module]?.delete || false}
                                onChange={() => handlePermissionChange(module, 'delete')}
                              />
                            </td>
                            <td className="text-center">
                              <input 
                                type="checkbox" 
                                className="form-check-input"
                                checked={
                                  permissions[module]?.view && 
                                  permissions[module]?.create && 
                                  permissions[module]?.edit && 
                                  permissions[module]?.delete
                                }
                                onChange={() => handleSelectAll(module)}
                              />
                            </td>
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Users with this role */}
          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between">
              <h5 className="card-title mb-0">Users with {selectedRole.name} Role</h5>
              <span className="roles-user-count">{selectedRole.users} users</span>
            </div>
            <div className="card-body p-0">
              <div className="roles-users-list">
                {roleUsers.map(user => (
                  <div key={user.id} className="roles-user">
                    <img src={`assets/img/avatars/${user.avatar}`} alt={user.name} className="roles-user-avatar" />
                    <div className="roles-user-info">
                      <span className="roles-user-name">{user.name}</span>
                      <span className="roles-user-email">{user.email}</span>
                    </div>
                    <span className="roles-user-status active">Active</span>
                    <span className="roles-user-date">{user.joined}</span>
                    <button className="btn btn-outline-danger btn-sm roles-user-remove" title="Remove role">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add New Role</h5>
                <button 
                  type="button" 
                  className="btn-close"
                  onClick={() => setShowAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Role Name <span className="text-danger">*</span></label>
                    <input type="text" className="form-control" placeholder="Enter role name" />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea className="form-control" rows="3" placeholder="Describe what this role can do"></textarea>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Copy Permissions From</label>
                    <select className="form-select">
                      <option value="">Start with no permissions</option>
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                    <div className="form-text">Optionally copy permissions from an existing role.</div>
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                  Cancel
                </button>
                <button type="button" className="btn btn-primary">Create Role</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}