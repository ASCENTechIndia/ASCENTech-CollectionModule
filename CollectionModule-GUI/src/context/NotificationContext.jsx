import { createContext, useContext, useState, useCallback } from 'react'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
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

  const value = {
    notifications,
    addNotification,
    showSuccess: (message, duration) => addNotification(message, 'success', duration),
    showError: (message, duration) => addNotification(message, 'error', duration),
    showWarning: (message, duration) => addNotification(message, 'warning', duration),
    showInfo: (message, duration) => addNotification(message, 'info', duration),
    removeNotification,
  }

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider')
  }
  return context
}
