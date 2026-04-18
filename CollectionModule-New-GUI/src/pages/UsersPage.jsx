import { useMemo, useState } from 'react'
import { users } from '../data/users'
import PageHeader from '../components/ui/PageHeader'
import InsightCards from '../components/ui/InsightCards'
import FilterTabs from '../components/ui/FilterTabs'

const roleLabel = {
  admin: 'Admin',
  manager: 'Manager',
  user: 'User',
}

const roleIcon = {
  admin: 'bi bi-shield-check',
  manager: 'bi bi-person-gear',
  user: 'bi bi-person',
}

const statusLabel = {
  active: 'Active',
  inactive: 'Inactive',
  pending: 'Pending',
}

function UsersPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [roleFilter, setRoleFilter] = useState('all')
  const [query, setQuery] = useState('')

  const stats = useMemo(() => {
    const active = users.filter((user) => user.status === 'active').length
    const pending = users.filter((user) => user.status === 'pending').length
    const inactive = users.filter((user) => user.status === 'inactive').length

    return {
      total: users.length,
      active,
      pending,
      inactive,
    }
  }, [])

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchStatus = statusFilter === 'all' || user.status === statusFilter
      const matchRole = roleFilter === 'all' || user.role === roleFilter
      const q = query.trim().toLowerCase()
      const matchQuery =
        q.length === 0 ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        roleLabel[user.role].toLowerCase().includes(q)

      return matchStatus && matchRole && matchQuery
    })
  }, [query, roleFilter, statusFilter])

  const insightItems = [
    {
      className: 'users-insight-total',
      icon: 'bi bi-people',
      label: 'Total Users',
      value: stats.total,
      meta: 'Live data in React state',
    },
    {
      className: 'users-insight-active',
      icon: 'bi bi-person-check',
      label: 'Active',
      value: stats.active,
      meta: 'Currently engaged',
    },
    {
      className: 'users-insight-pending',
      icon: 'bi bi-hourglass-split',
      label: 'Pending',
      value: stats.pending,
      meta: 'Needs onboarding',
    },
    {
      className: 'users-insight-inactive',
      icon: 'bi bi-person-x',
      label: 'Inactive',
      value: stats.inactive,
      meta: 'Follow-up required',
    },
  ]

  const filterTabs = [
    { value: 'all', label: 'All', count: stats.total },
    { value: 'active', label: 'Active', count: stats.active },
    { value: 'pending', label: 'Pending', count: stats.pending },
    { value: 'inactive', label: 'Inactive', count: stats.inactive },
  ]

  const headerActions = (
    <>
      <button className="btn btn-outline-secondary btn-sm" type="button">
        <i className="bi bi-download me-1" /> Export
      </button>
      <button className="btn btn-primary btn-sm" type="button">
        <i className="bi bi-plus-lg me-1" /> Add User
      </button>
    </>
  )

  return (
    <div className="main-content page-users">
      <div className="page-users">
        <PageHeader
          title="People Directory"
          subtitle="Centralized user operations, access status, and lifecycle management."
          actions={headerActions}
        />

        <InsightCards items={insightItems} />

        <div className="card users-list-card">
          <div className="users-toolbar">
            <div className="users-toolbar-left">
              <FilterTabs tabs={filterTabs} activeValue={statusFilter} onChange={setStatusFilter} />
            </div>

            <div className="users-toolbar-right">
              <div className="users-search">
                <i className="bi bi-search" />
                <input
                  type="text"
                  placeholder="Search users, email, role..."
                  autoComplete="off"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                />
              </div>

              <select
                className="users-toolbar-btn"
                value={roleFilter}
                onChange={(event) => setRoleFilter(event.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
                <option value="user">User</option>
              </select>
            </div>
          </div>

          <div className="table-responsive users-table-wrap">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Active</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td>
                      <div className="users-user">
                        <div className="users-avatar-wrap">
                          <img src={user.avatar} alt={user.name} className="users-avatar" />
                          <span className={`users-avatar-status ${user.presence}`} />
                        </div>
                        <div className="users-user-info">
                          <span className="users-user-name">{user.name}</span>
                          <span className="users-user-email">{user.email}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`users-role ${user.role}`}>
                        <i className={roleIcon[user.role]} /> {roleLabel[user.role]}
                      </span>
                    </td>
                    <td>
                      <span className={`users-status ${user.status}`}>
                        <span className="users-status-dot" /> {statusLabel[user.status]}
                      </span>
                    </td>
                    <td className="users-meta">{user.lastActive}</td>
                    <td className="users-meta">{user.joined}</td>
                  </tr>
                ))}
                {filteredUsers.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center p-4 text-muted">No users match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="users-pagination">
            <div className="users-pagination-info">
              Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UsersPage
