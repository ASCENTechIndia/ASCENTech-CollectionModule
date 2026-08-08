import React, { useState } from "react";
import { Plus, PlayCircle, Pencil } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AllocationRulesTab = () => {
  const navigate = useNavigate();
  const [rules] = useState([
    {
      id: 1,
      conditionParts: [
        { text: "If ", bold: false },
        { text: "days_past_due < 30", bold: true },
        { text: " and ", bold: false },
        { text: "balance > £500", bold: true },
      ],
      route: "Route to: in-house early-stage team",
      isFallback: false,
    },
    {
      id: 2,
      conditionParts: [
        { text: "If ", bold: false },
        { text: "days_past_due 30-90", bold: true },
        { text: " and ", bold: false },
        { text: "propensity_score > 0.6", bold: true },
      ],
      route: "Route to: high-propensity queue, skilled agents only",
      isFallback: false,
    },
    {
      id: 3,
      conditionParts: [
        { text: "If ", bold: false },
        { text: "days_past_due > 90", bold: true },
      ],
      route: "Route to: external agency panel (round-robin by placement rate)",
      isFallback: false,
    },
    {
      id: 4,
      conditionParts: [{ text: "Fallback: all unmatched cases", bold: true }],
      route: "Route to: general pool, weighted by agent capacity",
      isFallback: true,
    },
  ]);

  return (
    <div className="art-wrap">
      <h6 className="art-title">Rule set: standard consumer debt</h6>

      <div className="d-flex flex-column gap-2 mb-3">
        {rules.map((rule) => (
          <div
            className={`art-rule-row ${rule.isFallback ? "art-fallback" : ""}`}
            key={rule.id}
          >
            <span className="art-rule-badge">{rule.id}</span>

            <div className="art-rule-body">
              <div className="art-rule-condition">
                {rule.conditionParts.map((part, idx) =>
                  part.bold ? (
                    <code key={idx} className="art-rule-code">
                      {part.text}
                    </code>
                  ) : (
                    <span key={idx}>{part.text}</span>
                  ),
                )}
              </div>
              <div className="art-rule-route">{rule.route}</div>
            </div>

            <button className="art-edit-btn" title="Edit rule">
              <Pencil size={15} />
            </button>
          </div>
        ))}
      </div>

      <div className="d-flex gap-2">
        <button
          className="btn btn-primary btn-sm"
          onClick={() => navigate("/allocation/add-allocation-rules")}
        >
          <Plus className="inline mr-2" size={16} /> Add rule
        </button>
        <button className="btn btn-primary btn-sm">
          <PlayCircle className="inline mr-2" size={16} /> Test rule set
        </button>
      </div>
    </div>
  );
};

export default AllocationRulesTab;
