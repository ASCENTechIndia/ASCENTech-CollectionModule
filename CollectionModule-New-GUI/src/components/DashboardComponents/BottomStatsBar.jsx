import React, { useEffect, useState } from "react";
import { Users, Banknote, Receipt, Wallet } from "lucide-react";

const formatINR = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const defaultStats = [
  {
    id: "avg-collection-txn",
    label: "Average Collection",
    value: "0",
    sub: "Per Transaction",
    icon: Users,
    fg: "#2f6fed",
    bg: "#e7f0ff",
  },
  {
    id: "avg-collection-cust",
    label: "Average Collection",
    value: "0",
    sub: "Per Customer",
    icon: Users,
    fg: "#2f6fed",
    bg: "#e7f0ff",
  },
  {
    id: "cash-collection",
    label: "Cash Collection",
    value: "0",
    sub: "(0%)",
    icon: Banknote,
    fg: "#1fa34a",
    bg: "#e7f8ec",
  },
  {
    id: "digital-collection",
    label: "Digital Collection",
    value: "0",
    sub: "(0%)",
    icon: Receipt,
    fg: "#f5a524",
    bg: "#fff3e0",
  },
  {
    id: "cheque-collection",
    label: "Cheque Collection",
    value: "0",
    sub: "(0%)",
    icon: Wallet,
    fg: "#2f6fed",
    bg: "#f2ecfd",
  },
];

export default function BottomStatsBar({ showInLacs, bottomStatBarData }) {
  const [stats, setStats] = useState(defaultStats);

  useEffect(() => {
    if (!bottomStatBarData) {
      setStats(defaultStats);
      return;
    }

    const {
      avgCollectionPerTransaction = 0,
      avgCollectionPerCustomer = 0,
      cashCollection = 0,
      digitalCollection = 0,
      chequeCollection = 0,
    } = bottomStatBarData;

    const total = cashCollection + digitalCollection + chequeCollection;

    const updatedStats = [
      {
        ...defaultStats[0],
        value: String(avgCollectionPerTransaction),
      },
      {
        ...defaultStats[1],
        value: String(avgCollectionPerCustomer),
      },
      {
        ...defaultStats[2],
        value: String(cashCollection),
        sub: `(${total ? ((cashCollection / total) * 100).toFixed(2) : 0}%)`,
      },
      {
        ...defaultStats[3],
        value: String(digitalCollection),
        sub: `(${total ? ((digitalCollection / total) * 100).toFixed(2) : 0}%)`,
      },
      {
        ...defaultStats[4],
        value: String(chequeCollection),
        sub: `(${total ? ((chequeCollection / total) * 100).toFixed(2) : 0}%)`,
      },
    ];

    setStats(updatedStats);
  }, [bottomStatBarData]);

  const formatCollection = (amount) => {
    const num = Number(amount);
    if (showInLacs) {
      const lakhs = num / 100000;
      return lakhs.toFixed(2) + " L";
    }
    return `₹ ${formatINR(num)}`;
  };

  return (
    <div className="bottom-stats-bar">
      {!bottomStatBarData ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60px" }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="d-flex align-items-center justify-content-between">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <React.Fragment key={stat.id}>
                <div className="bottom-stat-item">
                  <div
                    className="icon-badge"
                    style={{ backgroundColor: stat.bg, color: stat.fg }}
                  >
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <div>
                    <div className="stat-label">{stat.label}</div>
                    <div className="stat-value" style={{ color: stat.fg }}>
                      {formatCollection(stat.value)}
                    </div>
                    <div className="stat-sub">{stat.sub}</div>
                  </div>
                </div>

                {idx < stats.length - 1 && (
                  <div
                    className="vr d-none d-md-block mx-2"
                    style={{
                      height: "40px",
                      alignSelf: "center",
                    }}
                  ></div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}
