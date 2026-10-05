// Colour by achievement: >= 90 green, 75-89 amber, below 75 red
const getTone = (percent) => {
  if (percent >= 90) return "good";
  if (percent >= 75) return "warn";
  return "bad";
};

// "Ramesh Kumar" -> "RK", single word / user id -> first 2 characters
const getInitials = (name = "") => {
  const words = String(name).split(" ").filter(Boolean);
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return words
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
};

const ActivityBreakdown = ({ officers = [] }) => {
  return (
    <div className="fpt-card" style={{ maxHeight: "400px", overflow: "auto" }}>
      <h2 className="fpt-card-title">Activity breakdown by officer</h2>

      <ul className="fpt-officer-list">
        {officers.map((o) => {
          const tone = getTone(o.percent);

          return (
            <li key={o.id} className="fpt-officer-row">
              <div className="fpt-avatar">{getInitials(o.name)}</div>

              <div className="fpt-officer-info">
                <span className="fpt-officer-name">{o.name}</span>
                <span className="fpt-officer-meta">
                  {o.visits}/{o.contracts} visits . {o.ptpCount} PTPs
                </span>
              </div>

              <div className="fpt-track fpt-officer-track">
                <div
                  className={`fpt-fill fpt-fill-${tone}`}
                  style={{ width: `${Math.min(o.percent, 100)}%` }}
                />
              </div>

              <span className={`fpt-officer-percent fpt-text-${tone}`}>
                {o.percent}%
              </span>
            </li>
          );
        })}

        {officers.length === 0 && (
          <li className="fpt-empty">No officer activity for this period.</li>
        )}
      </ul>
    </div>
  );
};

export default ActivityBreakdown;
