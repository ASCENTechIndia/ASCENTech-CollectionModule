import { clsx } from 'clsx'

/**
 * Checkbox Component - Custom styled checkbox
 */
export function Checkbox({
  label,
  checked = false,
  onChange,
  error,
  disabled = false,
  id,
  className,
}) {
  return (
    <div className={clsx('form-group', className)}>
      <label htmlFor={id} className="flex items-center cursor-pointer gap-2">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only peer"
        />
        <div
          className={clsx(
            'w-5 h-5 border-2 rounded transition-all duration-200',
            checked
              ? 'bg-primary-600 border-primary-600'
              : 'border-gray-300 bg-white',
            'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
            disabled && 'opacity-50 cursor-not-allowed bg-gray-100',
            error && !disabled && 'border-danger-500'
          )}
        >
          {checked && <span className="text-white text-xs font-bold flex items-center justify-center w-full h-full">✓</span>}
        </div>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </label>
      {error && (
        <p className="text-xs text-danger-600 mt-1">{error}</p>
      )}
    </div>
  )
}

/**
 * Radio Button Component
 */
export function Radio({
  label,
  checked = false,
  onChange,
  disabled = false,
  value,
  name,
  error,
  className,
}) {
  return (
    <label className={clsx('flex items-center cursor-pointer gap-2 mb-2', className)}>
      <input
        type="radio"
        checked={checked}
        onChange={() => onChange?.(value)}
        disabled={disabled}
        value={value}
        name={name}
        className="sr-only peer"
      />
      <div
        className={clsx(
          'w-5 h-5 border-2 rounded-full transition-all duration-200',
          checked
            ? 'bg-primary-600 border-primary-600'
            : 'border-gray-300 bg-white',
          'peer-focus:ring-2 peer-focus:ring-primary-500 peer-focus:ring-offset-2',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        {checked && (
          <div className="w-2 h-2 bg-white rounded-full m-1"></div>
        )}
      </div>
      {label && <span className="text-sm text-gray-700">{label}</span>}
    </label>
  )
}

/**
 * Radio Group Component - Multiple radio buttons grouped together
 */
export function RadioGroup({
  label,
  options = [],
  value,
  onChange,
  error,
  disabled = false,
  name,
  className,
}) {
  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label className="form-label">{label}</label>
      )}
      <fieldset disabled={disabled}>
        <div className="space-y-2">
          {options.map((option, index) => (
            <Radio
              key={index}
              label={option.label}
              value={option.value}
              checked={value === option.value}
              onChange={onChange}
              name={name}
              disabled={disabled}
            />
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="text-xs text-danger-600 mt-1">{error}</p>
      )}
    </div>
  )
}

/**
 * Checkbox Group Component - Multiple checkboxes grouped together
 */
export function CheckboxGroup({
  label,
  options = [],
  value = [],
  onChange,
  error,
  disabled = false,
  className,
}) {
  const handleChange = (itemValue, checked) => {
    if (checked) {
      onChange([...value, itemValue])
    } else {
      onChange(value.filter((v) => v !== itemValue))
    }
  }

  return (
    <div className={clsx('form-group', className)}>
      {label && (
        <label className="form-label">{label}</label>
      )}
      <fieldset disabled={disabled}>
        <div className="space-y-2">
          {options.map((option, index) => (
            <Checkbox
              key={index}
              label={option.label}
              checked={value.includes(option.value)}
              onChange={(checked) => handleChange(option.value, checked)}
              disabled={disabled}
              id={`checkbox-${index}`}
            />
          ))}
        </div>
      </fieldset>
      {error && (
        <p className="text-xs text-danger-600 mt-1">{error}</p>
      )}
    </div>
  )
}
