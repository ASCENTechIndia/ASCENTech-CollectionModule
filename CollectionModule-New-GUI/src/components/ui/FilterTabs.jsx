function FilterTabs({ tabs, activeValue, onChange }) {
  return (
    <div className="users-filter-tabs">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`users-filter-tab ${activeValue === tab.value ? 'active' : ''}`}
          type="button"
          onClick={() => onChange(tab.value)}
        >
          {tab.label} <span className="users-filter-count">{tab.count}</span>
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
