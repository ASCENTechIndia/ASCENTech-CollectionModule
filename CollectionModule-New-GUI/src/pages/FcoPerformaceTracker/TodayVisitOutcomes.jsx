const TodayVisitOutcomes = ({ outcomes = [] }) => {
  return (
    <div className="fpt-card" style={{ maxHeight: "400px", overflow: "auto" }}>
      <h2 className="fpt-card-title">Today&apos;s visit outcomes</h2>

      <ul className="fpt-outcome-list">
        {outcomes.map((item) => (
          <li key={item.id} className="fpt-outcome-row">
            <span className="fpt-outcome-label">{item.label}</span>

            <div className="fpt-track">
              <div
                className={`fpt-fill fpt-fill-${item.color}`}
                style={{ width: `${Math.min(item.percent, 100)}%` }}
              />
            </div>

            <span className="fpt-outcome-percent">{item.percent}%</span>
          </li>
        ))}

        {outcomes.length === 0 && (
          <li className="fpt-empty">No visit outcomes recorded today.</li>
        )}
      </ul>
    </div>
  );
};

export default TodayVisitOutcomes;
