import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const COLORS = [
  "#2f6fed",
  "#22b04c",
  "#f5a524",
  "#8b5cf6",
  "#dc3545",
  "#20c997",
  "#6f42c1",
  "#fd7e14",
  "#e83e8c",
  "#17a2b8",
];

const formatINR = (num) =>
  "₹" +
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CollectionByPaymentModeChart() {
  const chartRef = useRef(null);
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [paymentModes, setPaymentModes] = useState([]);
  const [totalCollection, setTotalCollection] = useState(0);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get("/collection-dashboard/payment-mode");
      if (res?.success && res?.data?.paymentModes?.length > 0) {
        const modes = res.data.paymentModes;
        const mapped = modes.map((item, index) => ({
          name: item.paymentMode,
          value: item.totalCollection,
          percent: item.collectionPercentage,
          color: COLORS[index % COLORS.length],
        }));
        setPaymentModes(mapped);
        const total = mapped.reduce((sum, d) => sum + d.value, 0);
        setTotalCollection(total);
      } else {
        setPaymentModes([]);
        setTotalCollection(0);
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch payment mode data");
      setPaymentModes([]);
      setTotalCollection(0);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: ["58%", "88%"],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: paymentModes.map((d) => ({
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
  }, [paymentModes]);

  const total = paymentModes.reduce((acc, curr) => acc + curr.value, 0);
  const formattedTotal = formatINR(total);

  return (
    <div className="panel-card">
      <div className="panel-title">COLLECTION BY PAYMENT MODE</div>
      <div className="panel-body-tight">
        <div className="d-flex align-items-center flex-wrap">
          <div
            style={{ position: "relative", width: "220px", height: "230px" }}
          >
            <div ref={chartRef} style={{ width: "100%", height: "230px" }} />
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
                {formattedTotal}
              </div>
              <div style={{ fontSize: "0.75rem", color: "#6b7280" }}>
                Total Collection
              </div>
            </div>
          </div>

          <div className="ms-3 flex-grow-1">
            {paymentModes.map((d) => (
              <div key={d.name} className="d-flex align-items-start mb-3">
                <span
                  className="state-dot mt-1"
                  style={{ backgroundColor: d.color }}
                ></span>
                <div>
                  <div className="fw-semibold">{d.name}</div>
                  <div style={{ fontSize: "0.85rem" }}>
                    {formatINR(d.value)}{" "}
                    <span className="text-muted">
                      ({d.percent.toFixed(2)}%)
                    </span>
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
