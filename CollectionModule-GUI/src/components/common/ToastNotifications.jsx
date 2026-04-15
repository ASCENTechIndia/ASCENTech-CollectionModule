import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from 'lucide-react'
import { useNotification } from '../../context/NotificationContext'

const TYPE_STYLES = {
  success: {
    container: 'bg-success-600 text-white',
    icon: CheckCircle,
  },
  error: {
    container: 'bg-danger-600 text-white',
    icon: AlertCircle,
  },
  warning: {
    container: 'bg-warning-600 text-white',
    icon: AlertTriangle,
  },
  info: {
    container: 'bg-primary-600 text-white',
    icon: Info,
  },
}

export default function ToastNotifications() {
  const { notifications, removeNotification } = useNotification()

  if (!notifications.length) return null

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex w-80 flex-col gap-2">
      {notifications.map((notification) => {
        const config = TYPE_STYLES[notification.type] || TYPE_STYLES.info
        const Icon = config.icon

        return (
          <div
            key={notification.id}
            className={`rounded-lg p-4 shadow-lg animate-slideUp flex items-center gap-3 ${config.container}`}
          >
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="flex-1 text-sm">{notification.message}</span>
            <button
              type="button"
              onClick={() => removeNotification(notification.id)}
              className="ml-2 hover:opacity-80"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
