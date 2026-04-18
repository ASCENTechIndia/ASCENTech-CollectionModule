import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

function Header({ theme, onThemeToggle, notifications, onMarkAsRead, onMarkAllAsRead, onToggleSidebar, searchInputRef }) {
  const [activeLang, setActiveLang] = useState('en')
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [messagesOpen, setMessagesOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [quickAccessOpen, setQuickAccessOpen] = useState(false)
  const notificationPanelRef = useRef(null)
  const userMenuRef = useRef(null)
  const messagesPanelRef = useRef(null)
  const quickAccessRef = useRef(null)
  const localSearchRef = useRef(null)

  const unreadCount = notifications.filter((item) => !item.read).length

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationPanelRef.current && !notificationPanelRef.current.contains(event.target)) {
        setNotificationsOpen(false)
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false)
      }
      if (messagesPanelRef.current && !messagesPanelRef.current.contains(event.target)) {
        setMessagesOpen(false)
      }
      if (quickAccessRef.current && !quickAccessRef.current.contains(event.target)) {
        setQuickAccessOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="header-logo">
          <img src="/assets/img/logo.webp" alt="FlexAdmin" />
          <span>FlexAdmin</span>
        </Link>
      </div>

      <button className="sidebar-toggle" title="Toggle Sidebar" onClick={onToggleSidebar}>
        <i className="bi bi-layout-sidebar-inset" />
      </button>

      <div className="header-search">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <i className="bi bi-search search-icon" />
          <input ref={searchInputRef || localSearchRef} type="search" placeholder="Search users, invoices, tickets..." autoComplete="off" />
          <kbd className="search-shortcut">/</kbd>
        </form>
      </div>

      <div className="header-right">
        <div className="header-actions-desktop">
          <div className="header-action-cluster">
            {/* Language Switcher */}
            <div className="header-action-wrap dropdown lang-dropdown">
              <button
                className="header-action lang-trigger dropdown-toggle"
                onClick={() => setQuickAccessOpen(!quickAccessOpen)}
                title="Quick Access"
              >
                <i className="bi bi-grid-3x3-gap" />
              </button>
              {quickAccessOpen && (
                <div className="dropdown-menu dropdown-menu-end quickaccess-menu show" ref={quickAccessRef} style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                  <div className="menu-title">Quick Actions</div>
                  <div className="quickaccess-grid">
                    <Link to="/" className="quickaccess-item">
                      <span className="quickaccess-icon">
                        <i className="bi bi-calendar3" />
                      </span>
                      <span className="quickaccess-label">Calendar</span>
                    </Link>
                    <Link to="/" className="quickaccess-item">
                      <span className="quickaccess-icon">
                        <i className="bi bi-chat-dots" />
                      </span>
                      <span className="quickaccess-label">Chat</span>
                    </Link>
                    <Link to="/" className="quickaccess-item">
                      <span className="quickaccess-icon">
                        <i className="bi bi-envelope" />
                      </span>
                      <span className="quickaccess-label">Email</span>
                    </Link>
                    <Link to="/" className="quickaccess-item">
                      <span className="quickaccess-icon">
                        <i className="bi bi-kanban" />
                      </span>
                      <span className="quickaccess-label">Kanban</span>
                    </Link>
                    <Link to="/" className="quickaccess-item">
                      <span className="quickaccess-icon">
                        <i className="bi bi-folder2-open" />
                      </span>
                      <span className="quickaccess-label">Files</span>
                    </Link>
                    <Link to="/" className="quickaccess-item">
                      <span className="quickaccess-icon">
                        <i className="bi bi-headset" />
                      </span>
                      <span className="quickaccess-label">Support</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button className="header-action theme-toggle" title="Toggle Theme" onClick={onThemeToggle}>
              <i className={`ph-light ${theme === 'dark' ? 'ph-sun' : 'ph-moon-stars'}`} />
            </button>

            {/* Messages */}
            <div className="header-action-wrap dropdown messages-dropdown">
              <button
                className="header-action dropdown-toggle"
                onClick={() => setMessagesOpen(!messagesOpen)}
                title="Messages"
              >
                <i className="bi bi-chat-left-text" />
                <span className="header-badge">5</span>
              </button>
              {messagesOpen && (
                <div className="dropdown-menu dropdown-menu-end messages-menu show" ref={messagesPanelRef} style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                  <div className="notification-header">
                    <div>
                      <h6>Messages</h6>
                      <span className="notification-count">5 new messages</span>
                    </div>
                    <Link to="/" className="notification-mark-read">
                      Open chat
                    </Link>
                  </div>
                  <div className="notification-list">
                    <Link to="/" className="notification-item unread">
                      <span className="notification-dot" />
                      <img src="/assets/img/avatars/avatar-2.webp" alt="" className="notification-avatar" />
                      <div className="notification-content">
                        <div className="notification-title">Mia Rodriguez</div>
                        <div className="notification-text">Can you review the analytics wireframe today?</div>
                        <span className="notification-time">2m ago</span>
                      </div>
                    </Link>
                    <Link to="/" className="notification-item unread">
                      <span className="notification-dot" />
                      <img src="/assets/img/avatars/avatar-3.webp" alt="" className="notification-avatar" />
                      <div className="notification-content">
                        <div className="notification-title">Dev Channel</div>
                        <div className="notification-text">Build passed. Ready for production deploy.</div>
                        <span className="notification-time">12m ago</span>
                      </div>
                    </Link>
                  </div>
                  <div className="notification-footer">
                    <Link to="/">
                      View all messages <i className="bi bi-arrow-right" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

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
              <img src="/assets/img/profile-img.webp" alt="User" className="user-avatar" />
              <div className="user-brief">
                <span className="user-name">John Doe</span>
                <span className="user-role">Product Admin</span>
              </div>
              <i className="bi bi-chevron-down user-chevron" />
            </button>
            {userMenuOpen && (
              <div className="dropdown-menu dropdown-menu-end user-menu show" ref={userMenuRef} style={{ position: 'absolute', top: '100%', right: 0, zIndex: 1000 }}>
                <div className="user-menu-header">
                  <img src="/assets/img/profile-img.webp" alt="User" className="user-menu-avatar" />
                  <div className="user-menu-info">
                    <div className="user-menu-name">John Doe</div>
                    <div className="user-menu-email">john.doe@example.com</div>
                  </div>
                </div>
                <div className="user-menu-body">
                  <a href="/" className="user-menu-item">
                    <span className="user-menu-icon">
                      <i className="bi bi-person" />
                    </span>
                    <span>My Profile</span>
                  </a>
                  <a href="/" className="user-menu-item">
                    <span className="user-menu-icon">
                      <i className="bi bi-sliders" />
                    </span>
                    <span>Preferences</span>
                  </a>
                  <a href="/" className="user-menu-item">
                    <span className="user-menu-icon">
                      <i className="bi bi-activity" />
                    </span>
                    <span>Activity Log</span>
                  </a>
                  <a href="/" className="user-menu-item">
                    <span className="user-menu-icon">
                      <i className="bi bi-credit-card" />
                    </span>
                    <span>Billing</span>
                  </a>
                </div>
                <div className="user-menu-footer">
                  <a href="/auth/login" className="user-menu-logout">
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </a>
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
