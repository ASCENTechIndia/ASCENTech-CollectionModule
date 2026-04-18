function InsightCards({ items }) {
  return (
    <div className="users-insight-row mb-3">
      {items.map((item) => (
        <div className={`users-insight ${item.className}`} key={item.label}>
          <span className="users-insight-icon">
            <i className={item.icon} />
          </span>
          <span className="users-insight-label">{item.label}</span>
          <span className="users-insight-value">{item.value}</span>
          <span className="users-insight-meta">{item.meta}</span>
        </div>
      ))}
    </div>
  )
}

export default InsightCards
