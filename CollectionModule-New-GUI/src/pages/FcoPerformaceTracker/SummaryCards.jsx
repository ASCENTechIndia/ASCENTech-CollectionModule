import { TrendingUp } from "lucide-react";

// subText and trend are optional
const SummaryCard = ({ label, value, subText, trend, trendTone = "up" }) => (
  <div className="fpt-summary-card border">
    <span className="fpt-summary-label">{label}</span>
    <span className="fpt-summary-value">{value}</span>
    {subText && <span className="fpt-summary-sub">{subText}</span>}
    {trend && (
      <span className={`fpt-summary-trend fpt-trend-${trendTone}`}>
        <TrendingUp size={12} /> {trend}
      </span>
    )}
  </div>
);

const SummaryCards = ({ cards = [] }) => {
  return (
    <div className="fpt-summary-grid">
      {cards.map((card) => (
        <SummaryCard key={card.id} {...card} />
      ))}
    </div>
  );
};

export default SummaryCards;