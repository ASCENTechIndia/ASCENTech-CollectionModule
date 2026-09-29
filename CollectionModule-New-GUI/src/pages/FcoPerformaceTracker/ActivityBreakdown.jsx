const getTone = (percent) => {
  if (percent >= 90) return "good";
  if (percent >= 75) return "warn";
  return "bad";
};

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

const ActivityBreakdown = ({ officers = [] }) => {
  return (
    <div className="fpt-card">
      <h2 className="fpt-card-title">Activity breakdown by officer</h2>

      <ul className="fpt-officer-list">
        {officers.map((o) => {
          const percent =
            o.percent ?? Math.round((o.visitsDone / o.visitTarget) * 100);
          const tone = getTone(percent);

          return (
            <li key={o.id} className="fpt-officer-row">
              <div className="fpt-avatar">{getInitials(o.name)}</div>

              <div className="fpt-officer-info">
                <span className="fpt-officer-name">{o.name}</span>
                <span className="fpt-officer-meta">
                  {o.visitsDone}/{o.visitTarget} visits · {o.ptps} PTPs
                </span>
              </div>

              <div className="fpt-track fpt-officer-track">
                <div
                  className={`fpt-fill fpt-fill-${tone}`}
                  style={{ width: `${Math.min(percent, 100)}%` }}
                />
              </div>

              <span className={`fpt-officer-percent fpt-text-${tone}`}>
                {percent}%
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
