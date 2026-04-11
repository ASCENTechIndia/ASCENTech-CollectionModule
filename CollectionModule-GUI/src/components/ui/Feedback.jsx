import { clsx } from 'clsx'
import { useEffect, useState } from 'react'

/**
 * ProgressBar Component - Visual progress indicator
 * @param {number} props.value - Current progress value
 * @param {number} props.max - Maximum value
 * @param {string} props.variant - Color variant (primary, success, warning, danger)
 * @param {boolean} props.showPercentage - Show percentage text
 * @param {string} props.label - Optional label
 */
export function ProgressBar({
  value = 0,
  max = 100,
  variant = 'primary',
  showPercentage = true,
  label,
  className,
}) {
  const percentage = Math.min((value / max) * 100, 100)

  const variants = {
    primary: 'bg-gradient-to-r from-primary-500 to-primary-600',
    success: 'bg-gradient-to-r from-success-500 to-success-600',
    warning: 'bg-gradient-to-r from-warning-500 to-warning-600',
    danger: 'bg-gradient-to-r from-danger-500 to-danger-600',
  }

  return (
    <div className={className}>
      {label && <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2">{label}</p>}
      <div className="w-full bg-gray-200 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
        <div
          className={clsx('h-full transition-all duration-500 ease-out', variants[variant])}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percentage)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
      {showPercentage && (
        <p className="text-xs text-gray-600 mt-1.5 text-right font-medium">
          {Math.round(percentage)}%
        </p>
      )}
    </div>
  )
}

/**
 * Tooltip Component - Accessible tooltip with positioning
 */
export function Tooltip({
  content,
  children,
  position = 'top',
  className,
}) {
  const [isVisible, setIsVisible] = useState(false)

  const positions = {
    top: 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 transform -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 transform -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 transform -translate-y-1/2 ml-2',
  }

  const arrowPositions = {
    top: 'top-full left-1/2 -translate-x-1/2 -translate-y-1',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 translate-y-1',
    left: 'left-full top-1/2 -translate-y-1/2 translate-x-1',
    right: 'right-full top-1/2 -translate-y-1/2 -translate-x-1',
  }

  return (
    <div
      className={clsx('relative inline-block group', className)}
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className={clsx(
            'absolute z-50 px-2.5 py-1.5 bg-gray-900 text-white text-xs rounded',
            'whitespace-nowrap shadow-lg animate-fadeIn',
            positions[position]
          )}
          role="tooltip"
        >
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * Toast Notification Component - Dismissible notification message
 */
export function Toast({
  message,
  variant = 'info',
  onClose,
  autoClose = true,
  autoCloseDelay = 3000,
  action,
}) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        onClose?.()
      }, autoCloseDelay)
      return () => clearTimeout(timer)
    }
  }, [autoClose, autoCloseDelay, onClose])

  if (!isVisible) return null

  const variants = {
    success: 'bg-success-600 text-white',
    error: 'bg-danger-600 text-white',
    warning: 'bg-warning-600 text-white',
    info: 'bg-primary-600 text-white',
  }

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  }

  return (
    <div
      className={clsx(
        'fixed bottom-4 right-4 p-4 rounded-lg shadow-lg flex items-center gap-3 max-w-sm',
        variants[variant],
        'animate-slideUp'
      )}
      role="status"
      aria-live="polite"
      aria-label={`${variant} notification`}
    >
      <span className="text-lg flex-shrink-0">{icons[variant]}</span>
      <span className="flex-1 text-sm sm:text-base">{message}</span>
      {action && (
        <button
          onClick={action.onClick}
          className="ml-2 font-medium hover:opacity-80 transition-opacity duration-200 underline text-xs sm:text-sm"
        >
          {action.label}
        </button>
      )}
      <button
        onClick={() => {
          setIsVisible(false)
          onClose?.()
        }}
        className="ml-2 hover:opacity-80 transition-opacity duration-200 flex-shrink-0"
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  )
}

/**
 * Calendar Component - Interactive date picker calendar
 */
export function Calendar({
  value,
  onChange,
  disabled = false,
}) {
  const [currentDate, setCurrentDate] = useState(new Date(value || Date.now()))

  const daysInMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date) =>
    new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const days = Array.from({ length: firstDayOfMonth(currentDate) })
    .fill(null)
    .concat(
      Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1)
    )

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    )
  }

  const handleDayClick = (day) => {
    if (day) {
      const selectedDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        day
      )
      onChange?.(selectedDate.toISOString().split('T')[0])
    }
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="p-4 border border-gray-200 rounded-lg bg-white shadow-md">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={handlePrevMonth}
          disabled={disabled}
          className={clsx(
            'p-2 hover:bg-gray-100 rounded transition-colors duration-150',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          aria-label="Previous month"
        >
          ←
        </button>
        <h3 className="font-semibold text-gray-900 text-sm sm:text-base">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          disabled={disabled}
          className={clsx(
            'p-2 hover:bg-gray-100 rounded transition-colors duration-150',
            disabled && 'cursor-not-allowed opacity-50'
          )}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-3">
        {dayNames.map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-gray-600 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day, index) => (
          <button
            key={index}
            onClick={() => handleDayClick(day)}
            disabled={!day || disabled}
            className={clsx(
              'p-2 text-sm rounded transition-colors',
              !day
                ? 'pointer-events-none'
                : 'hover:bg-primary-100 text-gray-900'
            )}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}
