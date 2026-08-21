import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Dummy data — replace with API response later
const paymentModeData = [
  { name: "Cash", value: 128266.76, percent: "99.16%", color: "#2f6fed" },
  { name: "Cheque", value: 1084.99, percent: "0.84%", color: "#22b04c" },
];

const totalCollection = "\u20B9 1,29,351.75";

const formatINR = (num) =>
  "\u20B9" +
  num.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CollectionByPaymentModeChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: ["68%", "88%"],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: paymentModeData.map((d) => ({
            name: d.name,
            value: d.value,
            itemStyle: { color: d.color },
          })),
        },
      ],
    };

    chartInstance.setOption(option);

    const handleResize = () => chartInstance.resize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chartInstance.dispose();
    };
  }, []);

  return (
    <div className="panel-card">
      <div className="panel-title">COLLECTION BY PAYMENT MODE</div>
      <div className="panel-body-tight">
        <div className="d-flex align-items-center flex-wrap">
          <div style={{ position: "relative", width: "220px", height: "220px" }}>
            <div ref={chartRef} style={{ width: "100%", height: "100%" }} />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <div style={{ fontWeight: 700, fontSize: "1.05rem" }}>
                {totalCollection}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                Total Collection
              </div>
            </div>
          </div>

          <div className="ms-3 flex-grow-1">
            {paymentModeData.map((d) => (
              <div key={d.name} className="d-flex align-items-start mb-3">
                <span
                  className="state-dot mt-1"
                  style={{ backgroundColor: d.color }}
                ></span>
                <div>
                  <div className="fw-semibold">{d.name}</div>
                  <div style={{ fontSize: "0.85rem" }}>
                    {formatINR(d.value)}{" "}
                    <span className="text-muted">({d.percent})</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
