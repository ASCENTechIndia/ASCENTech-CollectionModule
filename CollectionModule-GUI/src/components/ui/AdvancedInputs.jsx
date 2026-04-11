import { clsx } from 'clsx'
import { useState } from 'react'

/**
 * ToggleSwitch Component - Accessible toggle switch
 * @param {Object} props
 * @param {string} props.label - Label text
 * @param {boolean} props.checked - Checked state
 * @param {boolean} props.disabled - Disabled state
 * @param {Function} props.onChange - Change handler
 * @returns {React.ReactElement}
 */
export function ToggleSwitch({
  label,
  checked = false,
  disabled = false,
  onChange,
  className,
  id,
  ...props
}) {
  const handleKeyDown = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault()
      !disabled && onChange(!checked)
    }
  }

  return (
    <div className={clsx('form-group flex items-center gap-3', className)}>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => !disabled && onChange(!checked)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        id={id}
        className={clsx(
          'relative inline-flex h-6 w-11 rounded-full transition-all duration-250',
          'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
          checked ? 'bg-primary-600' : 'bg-gray-300',
          disabled && 'opacity-50 cursor-not-allowed',
          !disabled && 'cursor-pointer hover:shadow-sm'
        )}
        {...props}
      >
        <span
          className={clsx(
            'inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200',
            'shadow-md',
            checked ? 'translate-x-5' : 'translate-x-0.5'
          )}
          aria-hidden="true"
        />
      </button>
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-700 cursor-pointer">
          {label}
        </label>
      )}
    </div>
  )
}

/**
 * DatePicker Component - Accessible date input with validation
 */
export function DatePicker({
  label,
  value,
  onChange,
  error,
  disabled = false,
  minDate,
  maxDate,
  className,
  id,
  ...props
}) {
  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type="date"
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          min={minDate}
          max={maxDate}
          aria-label={label}
          aria-describedby={error ? `${id}-error` : undefined}
        />
        {error && (
          <p id={`${id}-error`} className="text-xs text-danger-600 mt-1">
            {error}
          </p>
        )}
      </div>
    </div>
  )
}

/**
 * DateRangePicker Component - Select date range with validation
 */
export function DateRangePicker({
  label,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  error,
  disabled = false,
  className,
}) {
  return (
    <div className={clsx('form-group', className)}>
      {label && <label className="form-label">{label}</label>}
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartDateChange(e.target.value)}
          disabled={disabled}
          aria-label="Start date"
          className={clsx(
            'input-field flex-1',
            error && 'border-danger-500 focus:ring-danger-500 focus:border-transparent',
            disabled && 'bg-gray-100 cursor-not-allowed'
          )}
        />
        <span className="flex items-center text-gray-400 px-2 text-sm sm:text-base">
          →
        </span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          disabled={disabled}
          min={startDate}
          aria-label="End date"
          className={clsx(
            'input-field flex-1',
            error && 'border-danger-500 focus:ring-danger-500 focus:border-transparent',
            disabled && 'bg-gray-100 cursor-not-allowed'
          )}
        />
        <span className="flex items-center text-gray-400 px-2">to</span>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndDateChange(e.target.value)}
          disabled={disabled}
          min={startDate}
          className={clsx(
            'input-field flex-1',
            error && 'border-danger-500 focus:ring-danger-500 focus:border-transparent',
            disabled && 'bg-gray-100 cursor-not-allowed'
          )}
        />
      </div>
      {error && (
        <span className="text-danger-600 text-xs mt-1.5 block">{error}</span>
      )}
    </div>
  )
}

/**
 * TimePicker Component - Select time with validation
 */
export function TimePicker({
  label,
  value,
  onChange,
  error,
  disabled = false,
  className,
  id,
  ...props
}) {
  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label htmlFor={id} className="form-label">
          {label}
        </label>
      )}
      <input
        type="time"
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        aria-label={label}
        aria-describedby={error ? `${id}-error` : undefined}
        className={clsx(
          'input-field flex-1',
          error && 'border-danger-500 focus:ring-danger-500',
          disabled && 'bg-gray-100 cursor-not-allowed'
        )}
      />
      {error && (
        <span id={`${id}-error`} className="text-danger-600 text-xs mt-1">{error}</span>
      )}
    </div>
  )
}

/**
 * Autocomplete Component - Search and select from suggestions with keyboard navigation
 */
export function Autocomplete({
  label,
  value,
  onChange,
  options = [],
  onSearch,
  placeholder,
  error,
  disabled = false,
  className,
  id = 'autocomplete',
}) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState(value?.label || '')
  const [highlightedIndex, setHighlightedIndex] = useState(-1)

  const filteredOptions = search
    ? options.filter((item) =>
        item.label.toLowerCase().includes(search.toLowerCase())
      )
    : options

  const handleKeyDown = (e) => {
    if (!isOpen && e.key === 'ArrowDown') {
      setIsOpen(true)
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedIndex(Math.min(highlightedIndex + 1, filteredOptions.length - 1))
        break
      case 'ArrowUp':
        setHighlightedIndex(Math.max(highlightedIndex - 1, -1))
        break
      case 'Enter':
        if (highlightedIndex >= 0) {
          handleSelect(filteredOptions[highlightedIndex])
        }
        break
      case 'Escape':
        setIsOpen(false)
        break
      default:
        break
    }
  }

  const handleSelect = (option) => {
    onChange?.(option)
    setSearch(option.label)
    setIsOpen(false)
  }

  return (
    <div className={clsx('form-group relative', className)}>
      {label && <label className="form-label">{label}</label>}
      <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          placeholder={placeholder}
          className={clsx(
            'input-field',
            error && 'border-danger-500 focus:ring-danger-500'
          )}
        />
        {isOpen && filteredOptions.length > 0 && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-48 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <li
                key={option.value}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={clsx(
                  'w-full text-left px-4 py-2.5 text-sm transition-colors duration-150',
                  'border-b border-gray-200 last:border-0',
                  highlightedIndex === index
                    ? 'bg-primary-100 text-primary-700'
                    : 'hover:bg-gray-50'
                )}
                onClick={() => handleSelect(option)}
                role="option"
                aria-selected={highlightedIndex === index}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      {error && <span className="text-danger-600 text-sm mt-1">{error}</span>}
    </div>
  )
}
