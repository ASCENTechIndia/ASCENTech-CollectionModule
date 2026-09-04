import React, { useEffect, useState } from "react";
import { Users, User, ReceiptText, IndianRupee } from "lucide-react";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

// Default raw data
const defaultData = [
  {
    id: "lcos",
    label: "Total No. of LCOs",
    value: 0,
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
    value: 0,
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
    value: 0,
    sub: "Total transactions",
    icon: ReceiptText,
    bg: "#fff3e0",
    iconBg: "#ffe1b8",
    fg: "#f5a524",
    valueColor: "#f5a524",
  },
  {
    id: "collection",
    label: "Total Collection",
    value: 0,
    sub: "Across all payment modes",
    icon: IndianRupee,
    bg: "#f2ecfd",
    iconBg: "#e3d4fa",
    fg: "#8b5cf6",
    valueColor: "#7c3aed",
  },
];

export default function SummaryCards({
  showInLacs,
  fromDate,
  toDate,
  setBottomStatBarData,
}) {
  const { showError } = useNotification();
  const [summaryData, setSummaryData] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  const formatValue = (value, id) => {
    if (id === "collection") {
      if (showInLacs) {
        const lakhs = value / 100000;
        return lakhs.toFixed(2) + " L";
      }
      return Number(value).toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    }
    return Number(value).toLocaleString();
  };

  const fetchData = async () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    try {
      const res = await apiClient.get(
        `/collection-dashboard/summary?fromDate=${fromDate}&toDate=${toDate}`,
      );
      if (res?.success && Object.keys(res?.data?.summary).length > 0) {
        const data = res.data.summary;
        setSummaryData([
          { ...defaultData[0], value: Number(data.totalLcos || 0) },
          { ...defaultData[1], value: Number(data.totalCustomers || 0) },
          { ...defaultData[2], value: Number(data.totalTransactions || 0) },
          { ...defaultData[3], value: Number(data.totalCollection || 0) },
        ]);

        setBottomStatBarData((prev) => ({
          ...prev,
          avgCollectionPerTransaction: data.avgCollectionPerTransaction,
          avgCollectionPerCustomer: data.avgCollectionPerCustomer,
        }));
      } else {
        setSummaryData(defaultData);
        setBottomStatBarData((prev) => ({
          ...prev,
          avgCollectionPerTransaction: 0,
          avgCollectionPerCustomer: 0,
        }));
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch summary card values");
      setSummaryData(defaultData);
      setBottomStatBarData((prev) => ({
        ...prev,
        avgCollectionPerTransaction: 0,
        avgCollectionPerCustomer: 0,
      }));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) {
      fetchData();
    }
  }, [fromDate, toDate]);

  // Show loading spinner while fetching
  if (loading) {
    return (
      <div className="row g-3">
        <div className="col-12 text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="row g-3">
      {summaryData.map((card) => {
        const Icon = card.icon;
        const displayValue = formatValue(card.value, card.id);
        return (
          <div className="col-12 col-sm-6 col-xl-3 mt-4 px-1" key={card.id}>
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
                  {displayValue}
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
