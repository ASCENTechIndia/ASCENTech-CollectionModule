import React from 'react'
import { clsx } from 'clsx'

// ===================== BASIC COMPONENTS =====================

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  ...props
}) {
  const baseStyles = 'font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500',
    secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500',
    outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    ghost: 'text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
    danger: 'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={clsx(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export function Card({ children, className, ...props }) {
  return (
    <div
      className={clsx(
        'bg-white rounded-lg shadow-soft border border-gray-200',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function Badge({ children, variant = 'success', className, ...props }) {
  const variants = {
    success: 'bg-success-100 text-success-700',
    warning: 'bg-warning-100 text-warning-700',
    danger: 'bg-danger-100 text-danger-700',
    info: 'bg-primary-100 text-primary-700',
  }

  return (
    <span
      className={clsx(
        'inline-block px-2 py-1 text-xs font-semibold rounded-full',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

export const Input = React.forwardRef(({
  label,
  error,
  className,
  id,
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <input
        ref={ref}
        id={id}
        className={clsx(
          'input-field',
          error && 'border-danger-500 focus:ring-danger-500 focus:border-transparent',
          className
        )}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="text-danger-600 text-xs mt-1.5 block">{error}</span>}
    </div>
  )
})
Input.displayName = 'Input'

export const Select = React.forwardRef(({
  label,
  error,
  options = [],
  className,
  id,
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <select
        ref={ref}
        id={id}
        className={clsx(
          'input-field',
          error && 'border-danger-500 focus:ring-danger-500 focus:border-transparent',
          className
        )}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      >
        <option value="">Select an option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span id={`${id}-error`} className="text-danger-600 text-xs mt-1.5 block">{error}</span>}
    </div>
  )
})
Select.displayName = 'Select'

export const Textarea = React.forwardRef(({
  label,
  error,
  className,
  id,
  ...props
}, ref) => {
  return (
    <div className="form-group">
      {label && <label htmlFor={id} className="form-label">{label}</label>}
      <textarea
        ref={ref}
        id={id}
        className={clsx(
          'input-field resize-none',
          error && 'border-danger-500 focus:ring-danger-500 focus:border-transparent',
          className
        )}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && <span id={`${id}-error`} className="text-danger-600 text-xs mt-1.5 block">{error}</span>}
    </div>
  )
})
Textarea.displayName = 'Textarea'

export function Alert({ children, variant = 'info', className, ...props }) {
  const variants = {
    info: 'bg-primary-50 border-l-4 border-primary-400 text-primary-700',
    success: 'bg-success-50 border-l-4 border-success-400 text-success-700',
    warning: 'bg-warning-50 border-l-4 border-warning-400 text-warning-700',
    danger: 'bg-danger-50 border-l-4 border-danger-400 text-danger-700',
  }

  return (
    <div
      className={clsx(
        'p-4 rounded-r-lg',
        variants[variant],
        className
      )}
      role="alert"
      {...props}
    >
      {children}
    </div>
  )
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
    </div>
  )
}

// ===================== RE-EXPORT GROUPED COMPONENTS =====================

// Form Controls (Checkbox, Radio)
export { Checkbox, Radio, RadioGroup, CheckboxGroup } from './FormControls'

// Advanced Inputs (DatePicker, TimePicker, ToggleSwitch, Autocomplete)
export { ToggleSwitch, DatePicker, DateRangePicker, TimePicker, Autocomplete } from './AdvancedInputs'

// File Upload (TagInput, FileUpload, MultiFileUpload)
export { TagInput, FileUpload, MultiFileUpload } from './FileUpload'

// Navigation (Tabs, Accordion, Breadcrumb, Stepper, DropdownMenu)
export { Tabs, Accordion, Breadcrumb, Stepper, DropdownMenu } from './Navigation'

// Data Components (DataTable, Pagination, Modal) - Not yet implemented
// export { DataTable, Pagination } from './DataTable'
// export { Modal, ConfirmDialog } from './Modal'

// Charts - Not yet implemented
// export { BarChartComponent, LineChartComponent, PieChartComponent } from './Charts'

// Feedback (ProgressBar, Tooltip, Toast, Calendar)
export { ProgressBar, Tooltip, Toast, Calendar } from './Feedback'

// Maps (MapComponent, LocationPicker)
export { MapComponent, LocationPicker } from './Maps'
