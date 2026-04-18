import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function RolesPage() {
  const [selectedRole, setSelectedRole] = useState('Administrator')
  const [showAddRoleModal, setShowAddRoleModal] = useState(false)
  const [roleColor, setRoleColor] = useState('primary')
  const addRoleModalRef = useRef(null)

  const rolesData = [
    { id: 'admin', name: 'Administrator', users: 3, color: 'danger', icon: 'bi-shield-fill' },
    { id: 'manager', name: 'Manager', users: 8, color: 'warning', icon: 'bi-person-badge' },
    { id: 'editor', name: 'Editor', users: 12, color: 'info', icon: 'bi-pencil-square' },
    { id: 'user', name: 'User', users: 156, color: 'primary', icon: 'bi-person' },
    { id: 'viewer', name: 'Viewer', users: 45, color: 'secondary', icon: 'bi-eye' },
  ]

  const roleDetails = {
    Administrator: {
      name: 'Administrator',
      description: 'Full system access with all permissions enabled. Can manage users, roles, and system settings.',
      created: 'January 1, 2024',
      modified: 'May 15, 2024',
    },
    Manager: {
      name: 'Manager',
      description: 'Can manage users and content, with limited access to system settings.',
      created: 'January 5, 2024',
      modified: 'April 10, 2024',
    },
    Editor: {
      name: 'Editor',
      description: 'Can create and edit content, with no access to user management.',
      created: 'January 10, 2024',
      modified: 'March 20, 2024',
    },
    User: {
      name: 'User',
      description: 'Standard user with basic read and write permissions for own content.',
      created: 'January 15, 2024',
      modified: 'February 28, 2024',
    },
    Viewer: {
      name: 'Viewer',
      description: 'Read-only access to content, no create, edit, or delete permissions.',
      created: 'January 20, 2024',
      modified: 'March 1, 2024',
    },
  }

  const permissionsData = [
    {
      category: 'Dashboard',
      icon: 'bi-grid',
      modules: [
        { name: 'Analytics Dashboard', view: true, create: false, edit: false, delete: false },
        { name: 'Reports', view: true, create: true, edit: true, delete: true },
      ],
    },
    {
      category: 'User Management',
      icon: 'bi-people',
      modules: [
        { name: 'Users', view: true, create: true, edit: true, delete: true },
        { name: 'Roles & Permissions', view: true, create: true, edit: true, delete: true },
        { name: 'Teams', view: true, create: true, edit: true, delete: true },
      ],
    },
    {
      category: 'Content Management',
      icon: 'bi-file-earmark-text',
      modules: [
        { name: 'Pages', view: true, create: true, edit: true, delete: true },
        { name: 'Blog Posts', view: true, create: true, edit: true, delete: true },
        { name: 'Media Library', view: true, create: true, edit: true, delete: true },
      ],
    },
    {
      category: 'E-commerce',
      icon: 'bi-cart',
      modules: [
        { name: 'Products', view: true, create: true, edit: true, delete: true },
        { name: 'Orders', view: true, create: true, edit: true, delete: true },
        { name: 'Customers', view: true, create: true, edit: true, delete: true },
        { name: 'Coupons', view: true, create: true, edit: true, delete: true },
      ],
    },
    {
      category: 'System Settings',
      icon: 'bi-gear',
      modules: [
        { name: 'General Settings', view: true, create: false, edit: true, delete: false },
        { name: 'Email Templates', view: true, create: true, edit: true, delete: true },
        { name: 'API Keys', view: true, create: true, edit: true, delete: true },
        { name: 'Backup & Restore', view: true, create: true, edit: false, delete: true },
      ],
    },
  ]

  const usersWithRole = [
    {
      name: 'Sarah Johnson',
      email: 'sarah.johnson@example.com',
      avatar: '/assets/img/avatars/avatar-1.webp',
      status: 'Active',
      date: 'Jan 15, 2024',
    },
    {
      name: 'Chris Thompson',
      email: 'c.thompson@example.com',
      avatar: '/assets/img/avatars/avatar-8.webp',
      status: 'Active',
      date: 'Nov 20, 2023',
    },
    {
      name: 'Kevin Anderson',
      email: 'k.anderson@example.com',
      avatar: '/assets/img/profile-img.webp',
      status: 'Active',
      date: 'Jan 1, 2024',
    },
  ]

  const selectedRoleData = rolesData.find((role) => role.name === selectedRole)

  // Initialize Bootstrap modal
  useEffect(() => {
    if (addRoleModalRef.current && showAddRoleModal) {
      const modal = new window.bootstrap.Modal(addRoleModalRef.current)
      modal.show()
    }
  }, [showAddRoleModal])

  const handleAddRoleClick = () => {
    setShowAddRoleModal(true)
  }

  const handleCloseModal = () => {
    setShowAddRoleModal(false)
  }

  const getColorVariableClass = (color) => {
    const colorMap = {
      danger: 'var(--danger-color-light)',
      'danger-text': 'var(--danger-color)',
      warning: 'var(--warning-color-light)',
      'warning-text': 'var(--warning-color)',
      info: 'var(--info-color-light)',
      'info-text': 'var(--info-color)',
      primary: 'color-mix(in srgb, var(--accent-color), transparent 85%)',
      'primary-text': 'var(--accent-color)',
      secondary: 'var(--background-color)',
      'secondary-text': 'var(--muted-color)',
    }
    return colorMap[color] || colorMap['primary']
  }

  return (
    <div className="main-content page-roles">
      <div className="page-roles">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">Roles & Permissions</h1>
            <nav className="breadcrumb">
              <Link to="/" className="breadcrumb-item">
                Home
              </Link>
              <span className="breadcrumb-item active">Roles & Permissions</span>
            </nav>
          </div>
          <div className="page-header-actions">
            <button className="btn btn-primary btn-sm" onClick={handleAddRoleClick}>
              <i className="bi bi-plus-lg me-1" />
              Add Role
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
                  {rolesData.map((role) => (
                    <div
                      key={role.id}
                      className={`roles-item ${selectedRole === role.name ? 'active' : ''}`}
                      onClick={() => setSelectedRole(role.name)}
                    >
                      <div
                        className="roles-item-icon"
                        style={{
                          background: getColorVariableClass(role.color),
                          color: getColorVariableClass(`${role.color}-text`),
                        }}
                      >
                        <i className={`bi ${role.icon}`} />
                      </div>
                      <div className="roles-item-info">
                        <span className="roles-item-name">{role.name}</span>
                        <span className="roles-item-count">{role.users} users</span>
                      </div>
                      <button className="roles-item-edit" title="Edit">
                        <i className="bi bi-pencil" />
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
                    <span className="roles-detail-value">{roleDetails[selectedRole]?.name}</span>
                  </div>
                  <div className="roles-detail">
                    <span className="roles-detail-label">Description</span>
                    <span className="roles-detail-value">{roleDetails[selectedRole]?.description}</span>
                  </div>
                  <div className="roles-detail">
                    <span className="roles-detail-label">Created</span>
                    <span className="roles-detail-value">{roleDetails[selectedRole]?.created}</span>
                  </div>
                  <div className="roles-detail">
                    <span className="roles-detail-label">Last Modified</span>
                    <span className="roles-detail-value">{roleDetails[selectedRole]?.modified}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Permissions */}
          <div className="col-xl-8 col-lg-7">
            {/* Permissions Matrix */}
            <div className="card mb-4">
              <div className="card-header d-flex align-items-center justify-content-between">
                <div>
                  <h5 className="card-title mb-0">Permissions Matrix</h5>
                  <span className="roles-subtitle">Configure access for {selectedRole} role</span>
                </div>
                <button className="btn btn-primary btn-sm">
                  <i className="bi bi-check-lg me-1" />
                  Save Changes
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
                      <tr className="roles-perm-group">
                        <td colSpan="6">
                          <i className="bi bi-grid me-2" /> Dashboard
                        </td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Analytics Dashboard</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><span className="roles-perm-na">--</span></td>
                        <td className="text-center"><span className="roles-perm-na">--</span></td>
                        <td className="text-center"><span className="roles-perm-na">--</span></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked disabled /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Reports</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>

                      <tr className="roles-perm-group">
                        <td colSpan="6">
                          <i className="bi bi-people me-2" /> User Management
                        </td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Users</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Roles &amp; Permissions</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Teams</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>

                      <tr className="roles-perm-group">
                        <td colSpan="6">
                          <i className="bi bi-file-earmark-text me-2" /> Content Management
                        </td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Pages</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Blog Posts</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Media Library</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>

                      <tr className="roles-perm-group">
                        <td colSpan="6">
                          <i className="bi bi-cart me-2" /> E-commerce
                        </td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Products</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Orders</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Customers</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Coupons</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>

                      <tr className="roles-perm-group">
                        <td colSpan="6">
                          <i className="bi bi-gear me-2" /> System Settings
                        </td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">General Settings</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><span className="roles-perm-na">--</span></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><span className="roles-perm-na">--</span></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Email Templates</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">API Keys</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                      <tr>
                        <td className="roles-perm-module">Backup &amp; Restore</td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><span className="roles-perm-na">--</span></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                        <td className="text-center"><input type="checkbox" className="form-check-input" defaultChecked /></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Users with this role */}
            <div className="card">
              <div className="card-header d-flex align-items-center justify-content-between">
                <h5 className="card-title mb-0">Users with {selectedRole} Role</h5>
                <span className="roles-user-count">
                  {selectedRoleData?.users} user{selectedRoleData?.users !== 1 ? 's' : ''}
                </span>
              </div>
              <div className="card-body p-0">
                <div className="roles-users-list">
                  {usersWithRole.map((user, idx) => (
                    <div key={idx} className="roles-user">
                      <img src={user.avatar} alt={user.name} className="roles-user-avatar" />
                      <div className="roles-user-info">
                        <span className="roles-user-name">{user.name}</span>
                        <span className="roles-user-email">{user.email}</span>
                      </div>
                      <span className="roles-user-status active">{user.status}</span>
                      <span className="roles-user-date">{user.date}</span>
                      <button className="btn btn-outline-danger btn-sm roles-user-remove" title="Remove role">
                        <i className="bi bi-x-lg" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Role Modal */}
      <div className="modal fade" ref={addRoleModalRef} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Role</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal} />
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">
                    Role Name <span className="text-danger">*</span>
                  </label>
                  <input type="text" className="form-control" placeholder="Enter role name" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea className="form-control" rows="3" placeholder="Describe what this role can do" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Copy Permissions From</label>
                  <select className="form-select">
                    <option value="">Start with no permissions</option>
                    <option value="admin">Administrator</option>
                    <option value="manager">Manager</option>
                    <option value="editor">Editor</option>
                    <option value="user">User</option>
                    <option value="viewer">Viewer</option>
                  </select>
                  <div className="form-text">Optionally copy permissions from an existing role.</div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Role Color</label>
                  <div className="roles-color-options">
                    <label className="roles-color-option">
                      <input
                        type="radio"
                        name="roleColor"
                        value="danger"
                        checked={roleColor === 'danger'}
                        onChange={(e) => setRoleColor(e.target.value)}
                      />
                      <span className="roles-color-swatch" style={{ background: 'var(--danger-color)' }} />
                    </label>
                    <label className="roles-color-option">
                      <input
                        type="radio"
                        name="roleColor"
                        value="warning"
                        checked={roleColor === 'warning'}
                        onChange={(e) => setRoleColor(e.target.value)}
                      />
                      <span className="roles-color-swatch" style={{ background: 'var(--warning-color)' }} />
                    </label>
                    <label className="roles-color-option">
                      <input
                        type="radio"
                        name="roleColor"
                        value="primary"
                        checked={roleColor === 'primary'}
                        onChange={(e) => setRoleColor(e.target.value)}
                      />
                      <span className="roles-color-swatch" style={{ background: 'var(--accent-color)' }} />
                    </label>
                    <label className="roles-color-option">
                      <input
                        type="radio"
                        name="roleColor"
                        value="info"
                        checked={roleColor === 'info'}
                        onChange={(e) => setRoleColor(e.target.value)}
                      />
                      <span className="roles-color-swatch" style={{ background: 'var(--info-color)' }} />
                    </label>
                    <label className="roles-color-option">
                      <input
                        type="radio"
                        name="roleColor"
                        value="success"
                        checked={roleColor === 'success'}
                        onChange={(e) => setRoleColor(e.target.value)}
                      />
                      <span className="roles-color-swatch" style={{ background: 'var(--success-color)' }} />
                    </label>
                    <label className="roles-color-option">
                      <input
                        type="radio"
                        name="roleColor"
                        value="secondary"
                        checked={roleColor === 'secondary'}
                        onChange={(e) => setRoleColor(e.target.value)}
                      />
                      <span className="roles-color-swatch" style={{ background: 'var(--muted-color)' }} />
                    </label>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Cancel
              </button>
              <button type="button" className="btn btn-primary">
                Create Role
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RolesPage
