import { Check, X, ArrowUpRight } from "lucide-react";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();

// 115000 -> ₹115K
const formatAmount = (value = 0) =>
  value >= 1000
    ? `₹${Math.round(value / 1000)}K`
    : `₹${Number(value).toLocaleString("en-IN")}`;

const PRIORITY_CLASS = { High: "high", Med: "med", Low: "low" };

/**
 * items: [{ id, customerName, accountNo, officer, dpd, bucket, dueLabel,
 *           note, amount, status: "pending" | "kept" | "broken",
 *           priority: "High" | "Med" | "Low" }]
 */
const PtpList = ({ items = [], onMarkKept, onMarkBroken, onEscalate }) => {
  return (
    <div className="ptp-card">
      <ul className="ptp-list">
        {items.map((item) => {
          const meta = [
            item.officer,
            `DPD ${item.dpd}`,
            `Bucket ${item.bucket}`,
            item.dueLabel,
            item.note,
          ]
            .filter(Boolean)
            .join(" · ");

          return (
            <li key={item.id} className="ptp-item">
              <div className="ptp-avatar">{getInitials(item.officer)}</div>

              <div className="ptp-item-main">
                <div className="ptp-item-head">
                  <span className="ptp-item-name">{item.customerName}</span>
                  <span className="ptp-item-acc">{item.accountNo}</span>
                </div>
                <p className="ptp-item-meta">{meta}</p>
                <div className="ptp-badges">
                  <span className={`ptp-badge ptp-status-${item.status}`}>
                    {item.status}
                  </span>
                  <span
                    className={`ptp-badge ptp-priority-${PRIORITY_CLASS[item.priority] || "med"}`}
                  >
                    {item.priority}
                  </span>
                </div>
              </div>

              <div className="ptp-item-side">
                <span className="ptp-item-amount">
                  {formatAmount(item.amount)}
                </span>

                {item.status === "pending" && (
                  <div className="ptp-actions">
                    <button
                      type="button"
                      className="ptp-btn"
                      onClick={() => onMarkKept(item.id)}
                    >
                      <Check size={14} /> Mark kept
                    </button>
                    <button
                      type="button"
                      className="ptp-btn"
                      onClick={() => onMarkBroken(item.id)}
                    >
                      <X size={14} /> Mark broken
                    </button>
                  </div>
                )}

                {item.status === "broken" && (
                  <div className="ptp-actions">
                    <button
                      type="button"
                      className="ptp-btn"
                      onClick={() => onEscalate(item.id)}
                    >
                      Escalate <ArrowUpRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            </li>
          );
        })}

        {items.length === 0 && (
          <li className="ptp-empty">No PTPs found for this view.</li>
        )}
      </ul>
    </div>
  );
};

export default PtpList;
