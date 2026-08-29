import React, { useEffect, useState } from "react";
import { Users, Banknote, Receipt, Wallet } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const formatINR = (num) =>
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const defaultStats = [
  {
    id: "avg-collection-txn",
    label: "Average Collection",
    value: "₹ 0",
    sub: "Per Transaction",
    icon: Users,
    fg: "#2f6fed",
    bg: "#e7f0ff",
  },
  {
    id: "avg-collection-cust",
    label: "Average Collection",
    value: "₹ 0",
    sub: "Per Customer",
    icon: Users,
    fg: "#2f6fed",
    bg: "#e7f0ff",
  },
  {
    id: "cash-collection",
    label: "Cash Collection",
    value: "₹ -",
    sub: "(0%)",
    icon: Banknote,
    fg: "#1fa34a",
    bg: "#e7f8ec",
  },
  {
    id: "digital-collection",
    label: "Digital Collection",
    value: "₹ 0",
    sub: "(0%)",
    icon: Receipt,
    fg: "#f5a524",
    bg: "#fff3e0",
  },
  {
    id: "cheque-collection",
    label: "Cheque Collection",
    value: "₹ 0",
    sub: "(0%)",
    icon: Wallet,
    fg: "#2986cc",
    bg: "#f2ecfd",
  },
];

export default function BottomStatsBar() {
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [stats, setStats] = useState(defaultStats);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get("/collection-dashboard/collection-count");
      if (res?.success && res?.data?.collectionCount) {
        const data = res.data.collectionCount;

        const updatedStats = [
          {
            ...defaultStats[0],
            value: `₹ ${formatINR(data.avgCollectionPerTransaction || 0)}`,
          },
          {
            ...defaultStats[1],
            value: `₹ ${formatINR(data.avgCollectionPerCustomer || 0)}`,
          },
          {
            ...defaultStats[2],
            value: `₹ ${formatINR(data.cashCollection?.cashCollection || 0)}`,
            sub: `(${(data.cashCollection?.cashCollectionPercentage || 0).toFixed(2)}%)`,
          },
          {
            ...defaultStats[3],
            value: `₹ ${formatINR(data.digitalCollection?.digitalCollection || 0)}`,
            sub: `(${(data.digitalCollection?.digitalCollectionPercentage || 0).toFixed(2)}%)`,
          },
          {
            ...defaultStats[4],
            value: `₹ ${formatINR(data.chequeCollection?.chequeCollection || 0)}`,
            sub: `(${(data.chequeCollection?.chequeCollectionPercentage || 0).toFixed(2)}%)`,
          },
        ];
        setStats(updatedStats);
      } else {
        setStats(defaultStats);
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch collection counts");
      setStats(defaultStats);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="bottom-stats-bar">
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
                    {stat.value}
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
    </div>
  );
}
