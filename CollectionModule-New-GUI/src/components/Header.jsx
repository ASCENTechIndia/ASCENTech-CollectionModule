import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Header({ theme, onThemeToggle, notifications, onMarkAsRead, onMarkAllAsRead, onToggleSidebar }) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const notificationPanelRef = useRef(null)
  const userMenuRef = useRef(null)
  const displayName = user?.name || user?.userName || user?.fullName || user?.userId || 'User'
  const displayEmail = user?.email || ''
  const displayRole = user?.role || user?.designation || 'User'
  const brandImage = user?.brandImage || null

  const unreadCount = notifications.filter((item) => !item.read).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setUserMenuOpen(false)
    await logout()
    navigate('/auth/login', { replace: true })
  }

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img src="/assets/img/logo.png" alt="FlexAdmin" />
          <span>Collection Module</span>
        </Link>
      </div>

      <button className="sidebar-toggle" title="Toggle Sidebar" onClick={onToggleSidebar}>
        <i className="bi bi-layout-sidebar-inset" />
      </button>

      {brandImage && (
        <div className="header-center" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', zIndex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', pointerEvents: 'none' }}>
          <img
            src={`data:image/png;base64,${brandImage}`}
            alt="Brand"
            style={{ height: 48, maxWidth: 160, objectFit: 'contain', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
          />
        </div>
      )}


      <div className="header-right">
        <div className="header-actions-desktop">
          <div className="header-action-cluster">
            {/* Theme Toggle */}
            {/* <button className="header-action theme-toggle" title="Toggle Theme" onClick={onThemeToggle}>
              <i className={`ph-light ${theme === 'dark' ? 'ph-sun' : 'ph-moon-stars'}`} />
            </button> */}

            {/* Notifications */}
            <div className="header-action-wrap dropdown notification-dropdown">
              <button
                className="header-action dropdown-toggle"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                title="Notifications"
              >
                <i className="bi bi-bell" />
                {unreadCount > 0 && <span className="header-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>}
              </button>
              {notificationsOpen && (
                <div
                  className="dropdown-menu dropdown-menu-end notification-menu show"
                  ref={notificationPanelRef}
                  style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}
                >
                  <div className="notification-header">
                    <div>
                      <h6>Notifications</h6>
                      <span className="notification-count">{unreadCount} unread</span>
                    </div>
                    <button type="button" className="notification-mark-read" onClick={onMarkAllAsRead}>
                      Mark all read
                    </button>
                  </div>

                  <div className="notification-list">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`notification-item ${item.read ? '' : 'unread'}`}
                        onClick={() => onMarkAsRead(item.id)}
                      >
                        <span className="notification-dot" />
                        <div className="notification-icon info">
                          <i className="bi bi-rocket-takeoff" />
                        </div>
                        <div className="notification-content">
                          <div className="notification-title">{item.title}</div>
                          <div className="notification-text">{item.message}</div>
                          <span className="notification-time">{item.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="notification-footer">
                    <Link to="/">
                      Open notification center <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>

          <span className="header-divider" />

          {/* User Profile */}
          <div className="header-action-wrap dropdown user-dropdown">
            <button
              className="dropdown-toggle user-trigger"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <img src="/assets/img/profile-img.jpg" alt="User" className="user-avatar" />
              <div className="user-brief">
                <span className="user-name">{displayName}</span>
                <span className="user-role">{displayRole}</span>
              </div>
              <i className="bi bi-chevron-down user-chevron" />
            </button>
            {userMenuOpen && (
              <div className="dropdown-menu dropdown-menu-end user-menu show" ref={userMenuRef} style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                <div className="user-menu-header">
                  <img src="/assets/img/profile-img.jpg" alt="User" className="user-menu-avatar" />
                  <div className="user-menu-info">
                    <div className="user-menu-name">{displayName}</div>
                    <div className="user-menu-email">{displayEmail}</div>
                  </div>
                </div>
                <div className="user-menu-body">
                  <a href="/" className="user-menu-item">
                    <span className="user-menu-icon">
                      <i className="bi bi-person" />
                    </span>
                    <span>My Profile</span>
                  </a>
                  <Link to="/user/reset-password" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                    <span className="user-menu-icon">
                      <i className="bi bi-key" />
                    </span>
                    <span>Reset Password</span>
                  </Link>
                  <Link to="/user/change-password" className="user-menu-item" onClick={() => setUserMenuOpen(false)}>
                    <span className="user-menu-icon">
                      <i className="bi bi-shield-lock" />
                    </span>
                    <span>Change Password</span>
                  </Link>
                </div>
                <div className="user-menu-footer">
                  <button type="button" className="user-menu-logout" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
