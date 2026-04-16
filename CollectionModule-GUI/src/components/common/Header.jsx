import { useEffect, useState, useRef } from 'react'
import { Menu, LogOut, Settings, User, Bell, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

export function Header({ onMenuClick }) {
  const { user, logout } = useAuth()
  const [showUserMenu, setShowUserMenu] = useState(false)
  // const [showNotifications, setShowNotifications] = useState(false)
  // const notificationRef = useRef(null)
  const userMenuRef = useRef(null)
  // const [notifications, setNotifications] = useState([
  //   { id: 1, type: 'success', title: 'Asset Created', message: 'New asset has been added successfully', time: '5 minutes ago' },
  //   { id: 2, type: 'warning', title: 'Maintenance Alert', message: 'Asset needs maintenance', time: '1 hour ago' },
  //   { id: 3, type: 'info', title: 'Report Generated', message: 'Monthly report is ready to download', time: '2 hours ago' },
  // ])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // const removeNotification = (id) => {
  //   setNotifications(notifications.filter(notif => notif.id !== id))
  // }

  // const getNotificationIcon = (type) => {
  //   switch (type) {
  //     case 'success':
  //       return <CheckCircle size={18} className="text-green-500" />
  //     case 'warning':
  //       return <AlertCircle size={18} className="text-yellow-500" />
  //     case 'info':
  //       return <Info size={18} className="text-blue-500" />
  //     default:
  //       return <Bell size={18} className="text-gray-500" />
  //   }
  // }

  return (
    <header className="bg-gradient-to-r from-primary-600 to-primary-700 border-b-4 border-primary-800 sticky top-0 z-40 shadow-lg">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section - Menu & Logo */}
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 text-white hover:bg-primary-500 rounded-lg transition-all duration-200"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-primary-600 shadow-md">
              CB
            </div>
            <h1 className="text-lg font-bold text-white hidden sm:block">
             Collection Module
            </h1>
          </div>
        </div>

        {/* Right Section - Notifications & User Menu */}
        <div className="flex items-center gap-3 ml-auto">
          {/* Notification Bell */}
          {/* <div className="relative" ref={notificationRef}>
            <button 
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-white hover:bg-primary-500 rounded-lg transition-all duration-200"
            >
              <Bell size={20} />
              {notifications.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 bg-gradient-to-r from-primary-50 to-primary-100 border-b border-primary-200">
                  <h3 className="text-sm font-semibold text-primary-900">Notifications</h3>
                  <p className="text-xs text-primary-600">{notifications.length} new notification{notifications.length !== 1 ? 's' : ''}</p>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div key={notif.id} className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150">
                        <div className="flex items-start gap-3">
                          {getNotificationIcon(notif.type)}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                            <p className="text-xs text-gray-600 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-400 mt-1">{notif.time}</p>
                          </div>
                          <button
                            onClick={() => removeNotification(notif.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center">
                      <Bell size={32} className="mx-auto text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500">No notifications</p>
                    </div>
                  )}
                </div>

                {notifications.length > 0 && (
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50 text-center">
                    <button className="text-xs text-primary-600 hover:text-primary-700 font-medium">
                      Mark all as read
                    </button>
                  </div>
                )}
              </div>
            )}
          </div> */}

          {/* User Menu */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 px-2 py-1 text-white hover:bg-primary-500 rounded-lg transition-all duration-200 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-md group-hover:shadow-lg transition-shadow">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm font-medium hidden sm:block">{user?.name?.split(' ')[0]}</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                  <p className="text-sm font-semibold text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{user?.role}</p>
                </div>
                <Link
                  to="/profile"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150"
                >
                  <User size={16} />
                  <span>Profile</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-all duration-150 border-t border-gray-100"
                >
                  <Settings size={16} />
                  <span>Settings</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-all duration-150 border-t border-gray-100"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
