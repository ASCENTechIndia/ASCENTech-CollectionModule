/**
 * cards: [{ id, label, value, subText, tone }]
 * tone (colour of the big value): "default" | "danger" | "warn" | "critical"
 */
const PtpSummaryCards = ({ cards = [] }) => {
  return (
    <div className="ptp-summary-grid">
      {cards.map((card) => (
        <div key={card.id} className="ptp-summary-card border">
          <span className="ptp-summary-label">{card.label}</span>
          <span
            className={`ptp-summary-value ptp-tone-${card.tone || "default"}`}
          >
            {card.value}
          </span>
          {card.subText && (
            <span className="ptp-summary-sub">{card.subText}</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default PtpSummaryCards;
