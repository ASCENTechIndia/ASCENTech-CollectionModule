import React, { useState } from 'react'

export const Tabs = ({
  tabs = [],
  defaultTab = null,
  variant = 'default',
  color = 'primary',
  orientation = 'horizontal',
  fullWidth = false,
  onChange = () => {},
  className = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    onChange(tabId)
  }

  const colorClasses = {
    primary: {
      default: 'border-blue-500 text-blue-600 bg-blue-50',
      underline: 'border-b-2 border-blue-500 text-blue-600',
      pill: 'bg-blue-100 text-blue-600',
      bordered: 'border border-blue-500 text-blue-600 bg-blue-50'
    },
    secondary: {
      default: 'border-purple-500 text-purple-600 bg-purple-50',
      underline: 'border-b-2 border-purple-500 text-purple-600',
      pill: 'bg-purple-100 text-purple-600',
      bordered: 'border border-purple-500 text-purple-600 bg-purple-50'
    },
    success: {
      default: 'border-green-500 text-green-600 bg-green-50',
      underline: 'border-b-2 border-green-500 text-green-600',
      pill: 'bg-green-100 text-green-600',
      bordered: 'border border-green-500 text-green-600 bg-green-50'
    },
    warning: {
      default: 'border-yellow-500 text-yellow-600 bg-yellow-50',
      underline: 'border-b-2 border-yellow-500 text-yellow-600',
      pill: 'bg-yellow-100 text-yellow-600',
      bordered: 'border border-yellow-500 text-yellow-600 bg-yellow-50'
    },
    danger: {
      default: 'border-red-500 text-red-600 bg-red-50',
      underline: 'border-b-2 border-red-500 text-red-600',
      pill: 'bg-red-100 text-red-600',
      bordered: 'border border-red-500 text-red-600 bg-red-50'
    }
  }

  const baseTabClasses = "px-4 py-2.5 font-medium rounded transition-all duration-200 relative flex items-center gap-2"
  const inactiveClasses = "text-gray-600 hover:text-gray-900"
  const activeColor = colorClasses[color]?.[variant] || colorClasses.primary.default

  const getTabClasses = (tabId) => {
    const isActive = activeTab === tabId
    if (variant === 'default') {
      return `${baseTabClasses} border-b-2 border-transparent ${isActive ? activeColor : inactiveClasses}`
    } else if (variant === 'underline') {
      return `${baseTabClasses} border-b-2 border-transparent ${isActive ? activeColor : inactiveClasses}`
    } else if (variant === 'pill') {
      return `${baseTabClasses} ${isActive ? activeColor : inactiveClasses}`
    } else if (variant === 'bordered') {
      return `${baseTabClasses} ${isActive ? activeColor : `border border-gray-300 ${inactiveClasses}`}`
    }
    return baseTabClasses
  }

  const containerClasses = 'border border-gray-200 rounded-lg overflow-hidden'
  const tabsHeaderClasses = 'flex gap-0 bg-gray-50 border-b border-gray-200'
  const contentClasses = 'p-4'

  return (
    <div className={`${containerClasses} ${className}`}>
      <div className={tabsHeaderClasses}>
        {tabs.map((tab, index) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            disabled={tab.disabled}
            className={`${getTabClasses(tab.id)} ${tab.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${fullWidth ? 'flex-1 text-center' : ''} ${index < tabs.length - 1 ? 'border-r border-gray-200' : ''}`}
            title={tab.tooltip || ''}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            <span>{tab.label}</span>
            {tab.badge && (
              <span className="ml-2 px-2 py-0.5 text-xs font-semibold bg-red-500 text-white rounded-full">
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className={contentClasses}>
        {tabs.map((tab) => (
          activeTab === tab.id && (
            <div key={`content-${tab.id}`} className="fade-in animation-fade">
              {typeof tab.content === 'string' ? (
                <p className="text-gray-700">{tab.content}</p>
              ) : (
                tab.content
              )}
            </div>
          )
        ))}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animation-fade { animation: fadeIn 0.3s ease-in-out; }
      `}</style>
    </div>
  )
}

export default Tabs
