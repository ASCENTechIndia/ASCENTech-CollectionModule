import React from "react";
import { Users, Banknote, Receipt, Wallet } from "lucide-react";

// Dummy data — replace with API response later
const bottomStats = [
  {
    id: "avg-collection-txn",
    label: "Average Collection",
    value: "\u20B9 305.80",
    sub: "Per Transaction",
    icon: Users,
    fg: "#2f6fed",
    bg: "#e7f0ff",
  },
  {
    id: "avg-collection-cust",
    label: "Average Collection",
    value: "\u20B9 320.18",
    sub: "Per Customer",
    icon: Users,
    fg: "#2f6fed",
    bg: "#e7f0ff",
  },
  {
    id: "cash-collection",
    label: "Cash Collection",
    value: "\u20B9 1,28,266.76",
    sub: "(99.16%)",
    icon: Banknote,
    fg: "#1fa34a",
    bg: "#e7f8ec",
  },
  {
    id: "digital-collection",
    label: "Digital Collection",
    value: "\u20B9 4,830.00",
    sub: "(3.73%) (DL Portal Online)",
    icon: Receipt,
    fg: "#f5a524",
    bg: "#fff3e0",
  },
  {
    id: "cheque-collection",
    label: "Cheque Collection",
    value: "\u20B9 1,084.99",
    sub: "(0.84%)",
    icon: Wallet,
    fg: "#8b5cf6",
    bg: "#f2ecfd",
  },
];

export default function BottomStatsBar() {
  return (
    <div className="bottom-stats-bar">
      <div className="d-flex justify-content-between">
        {bottomStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <React.Fragment key={stat.id}>
              <div className="bottom-stat-item">
                <div className="icon-badge" style={{ backgroundColor: stat.bg, color: stat.fg }}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-value" style={{ color: stat.fg }}>
                    {stat.value}
                  </div>
                  <div className="stat-sub">{stat.sub}</div>
                </div>
              </div>
              {idx < bottomStats.length - 1 && (
                <div className="vr d-none d-md-block mx-2" style={{ height: "40px" }}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
