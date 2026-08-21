import React from "react";
import { Users, User, Receipt, IndianRupee } from "lucide-react";

const summaryData = [
  {
    id: "lcos",
    label: "Total No. of LCOs",
    value: "24",
    sub: "Active LCOs in report",
    icon: Users,
    bg: "#e7f0ff",
    iconBg: "#cfe0ff",
    fg: "#2f6fed",
    valueColor: "#2f6fed",
  },
  {
    id: "customers",
    label: "Total No. of Customers",
    value: "404",
    sub: "Unique customers",
    icon: User,
    bg: "#e7f8ec",
    iconBg: "#ccefd7",
    fg: "#1fa34a",
    valueColor: "#1fa34a",
  },
  {
    id: "transactions",
    label: "No. of Transactions (T-1)",
    value: "423",
    sub: "Total transactions",
    icon: Receipt,
    bg: "#fff3e0",
    iconBg: "#ffe1b8",
    fg: "#f5a524",
    valueColor: "#f5a524",
  },
  {
    id: "collection",
    label: "Total Collection",
    value: "\u20B9 1,29,351.75",
    sub: "Across all payment modes",
    icon: IndianRupee,
    bg: "#f2ecfd",
    iconBg: "#e3d4fa",
    fg: "#8b5cf6",
    valueColor: "#7c3aed",
  },
];

export default function SummaryCards() {
  return (
    <div className="row g-3">
      {summaryData.map((card) => {
        const Icon = card.icon;
        return (
          <div className="col-12 col-sm-6 col-xl-3 mt-3 px-1" key={card.id}>
            <div
              className="summary-card"
              style={{
                backgroundColor: card.bg,
                border: `2px solid ${card.iconBg}`,
              }}
            >
              <div
                className="icon-badge"
                style={{
                  backgroundColor: card.iconBg,
                  color: card.fg,
                  border: `2px solid ${card.iconBg}`,
                }}
              >
                <Icon size={30} strokeWidth={2} />
              </div>
              <div className="card-div">
                <div className="summary-label">{card.label}</div>
                <div
                  className="summary-value"
                  style={{ color: card.valueColor }}
                >
                  {card.value}
                </div>
                <div className="summary-sub">{card.sub}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
