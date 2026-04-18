import { useCallback, useMemo, useState } from 'react'
import { NotificationContext } from './notificationContextObject'

const typeToClass = {
  success: 'text-bg-success',
  error: 'text-bg-danger',
  warning: 'text-bg-warning',
  info: 'text-bg-primary',
}

const typeToTitle = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info',
}

function ToastStack({ notifications, removeNotification }) {
  return (
    <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1080 }}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`toast show align-items-center border-0 ${typeToClass[notification.type] || typeToClass.info}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
        >
          <div className="d-flex">
            <div className="toast-body">
              <strong className="me-2">{typeToTitle[notification.type] || typeToTitle.info}:</strong>
              {notification.message}
            </div>
            <button
              type="button"
              className="btn-close btn-close-white me-2 m-auto"
              aria-label="Close"
              onClick={() => removeNotification(notification.id)}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }, [])

  const addNotification = useCallback((message, type = 'info', duration = 3000) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
    const notification = { id, message, type }

    setNotifications((prev) => [...prev, notification])

    if (duration) {
      setTimeout(() => {
        removeNotification(id)
      }, duration)
    }

    return id
  }, [removeNotification])

  const value = useMemo(() => ({
    notifications,
    addNotification,
    showSuccess: (message, duration) => addNotification(message, 'success', duration),
    showError: (message, duration) => addNotification(message, 'error', duration),
    showWarning: (message, duration) => addNotification(message, 'warning', duration),
    showInfo: (message, duration) => addNotification(message, 'info', duration),
    removeNotification,
  }), [notifications, addNotification, removeNotification])

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastStack notifications={notifications} removeNotification={removeNotification} />
    </NotificationContext.Provider>
  )
}
