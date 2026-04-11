import { clsx } from 'clsx'
import { useState } from 'react'

/**
 * Tabs Component - Accessible tabbed interface
 * @param {Array} props.tabs - Array of {label, icon?, content}
 * @param {number} props.defaultTab - Initial active tab index
 * @param {Function} props.onChange - Tab change handler
 */
export function Tabs({
  tabs = [],
  defaultTab = 0,
  onChange,
  className,
  contentClassName,
}) {
  const [activeTab, setActiveTab] = useState(defaultTab)

  const handleTabChange = (index) => {
    setActiveTab(index)
    onChange?.(index)
  }

  return (
    <div className={className}>
      <div
        role="tablist"
        className="border-b-2 border-gray-200 flex gap-0 overflow-x-auto md:overflow-x-visible"
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tab-content-${index}`}
            onClick={() => handleTabChange(index)}
            className={clsx(
              'px-3 sm:px-4 py-3 text-xs sm:text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap',
              'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 -mb-[2px]',
              activeTab === index
                ? 'border-primary-600 text-primary-600'
                : 'border-transparent text-gray-700 hover:text-primary-600 hover:border-gray-300'
            )}
          >
            {tab.icon && <span className="mr-1.5 md:mr-2">{tab.icon}</span>}
            {tab.label}
          </button>
        ))}
      </div>
      <div
        id={`tab-content-${activeTab}`}
        role="tabpanel"
        className={clsx('animate-fadeIn', contentClassName)}
      >
        {tabs[activeTab]?.content}
      </div>
    </div>
  )
}

/**
 * Accordion Component - Collapsible sections
 */
export function Accordion({
  items = [],
  allowMultiple = false,
  className,
}) {
  const [expandedItems, setExpandedItems] = useState([])

  const toggleItem = (index) => {
    if (allowMultiple) {
      setExpandedItems((prev) =>
        prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
      )
    } else {
      setExpandedItems((prev) =>
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div className={clsx('space-y-2', className)}>
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-sm"
        >
          <button
            onClick={() => toggleItem(index)}
            aria-expanded={expandedItems.includes(index)}
            className={clsx(
              'w-full px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between font-medium transition-all duration-200',
              expandedItems.includes(index)
                ? 'bg-primary-50 text-primary-700'
                : 'bg-white text-gray-900 hover:bg-gray-50'
            )}
          >
            <span className="flex items-center gap-2 sm:gap-3">
              {item.icon && <span className="text-lg">{item.icon}</span>}
              <span className="text-sm sm:text-base">{item.title}</span>
            </span>
            <span
              className={clsx(
                'transition-transform duration-300 text-gray-400',
                expandedItems.includes(index) ? 'rotate-180' : ''
              )}
            >
              ▼
            </span>
          </button>
          {expandedItems.includes(index) && (
            <div className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-50 border-t border-gray-200 animate-slideUp">
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

/**
 * Breadcrumb Component - Navigation hierarchy
 */
export function Breadcrumb({
  items = [],
  separator = '/',
  className,
}) {
  return (
    <nav aria-label="Breadcrumb" className={clsx('text-xs sm:text-sm', className)}>
      <ol className="flex items-center gap-1 sm:gap-2 flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center gap-1 sm:gap-2">
            {item.href ? (
              <a
                href={item.href}
                className="text-primary-600 hover:text-primary-700 font-medium transition-colors duration-150 truncate"
              >
                {item.label}
              </a>
            ) : (
              <span className="text-gray-700 font-medium truncate">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="text-gray-400">{separator}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

/**
 * Stepper Component - Multi-step progress indicator
 */
export function Stepper({
  steps = [],
  currentStep = 0,
  onStepChange,
  className,
}) {
  return (
    <div className={clsx('w-full', className)}>
      <div className="flex items-center justify-between overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-1 items-center last:flex-none"
          >
            <button
              onClick={() => index <= currentStep && onStepChange?.(index)}
              disabled={index > currentStep}
              className={clsx(
                'w-8 h-8 rounded-full flex items-center justify-center font-semibold transition-all duration-200',
                'text-xs sm:text-sm',
                'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
                index <= currentStep
                  ? 'bg-primary-600 text-white shadow-sm hover:shadow-md'
                  : 'bg-gray-300 text-gray-600 cursor-not-allowed',
                'flex-shrink-0'
              )}
              aria-label={`Step ${index + 1}: ${step.label}`}
              aria-current={index === currentStep ? 'step' : undefined}
            >
              {index < currentStep ? '✓' : index + 1}
            </button>
            <div className="ml-2 sm:ml-3 min-w-[80px] sm:min-w-[120px]">
              <p className="text-xs sm:text-sm font-medium text-gray-900">{step.label}</p>
              {step.description && (
                <p className="text-xs text-gray-500 hidden sm:block">{step.description}</p>
              )}
            </div>
            {index < steps.length - 1 && (
              <div className="flex-1 h-1 mx-1 sm:mx-2">
                <div
                  className={clsx(
                    'h-full transition-colors duration-300 rounded-full',
                    index < currentStep ? 'bg-primary-600' : 'bg-gray-300'
                  )}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/**
 * DropdownMenu Component - Accessible dropdown menu
 */
export function DropdownMenu({
  trigger,
  items = [],
  className,
  triggerClassName,
}) {
  const [isOpen, setIsOpen] = useState(false)

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false)
    }
  }

  return (
    <div className={clsx('relative inline-block', className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className={triggerClassName}
      >
        {trigger}
      </button>
      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <ul
            role="menu"
            className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-40 overflow-hidden animate-slideUp"
          >
            {items.map((item, index) => (
              <li key={index} role="none">
                <button
                  role="menuitem"
                  onClick={() => {
                    item.onClick?.()
                    setIsOpen(false)
                  }}
                  disabled={item.disabled}
                  className={clsx(
                    'w-full text-left px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm transition-all duration-150',
                    'border-b border-gray-200 last:border-0',
                    'focus:outline-none focus:bg-primary-50',
                    item.variant === 'danger'
                      ? 'text-danger-600 hover:bg-danger-50'
                      : 'text-gray-700 hover:bg-gray-100',
                    item.disabled && 'opacity-50 cursor-not-allowed'
                  )}
                >
                  {item.icon && <span className="mr-2">{item.icon}</span>}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}
