import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

const formatINR = (num) =>
  "₹" +
  Number(num).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export default function CollectionByPaymentModeChart({
  showInLacs,
  fromDate,
  toDate,
  setBottomStatBarData,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);
  const { showError } = useNotification();

  const [totalCollection, setTotalCollection] = useState(0);
  const [allPaymentModes, setAllPaymentModes] = useState([]);
  const [hiddenModes, setHiddenModes] = useState([]);
  const [loading, setLoading] = useState(false);

  const visibleModes = allPaymentModes.filter(
    (mode) => !hiddenModes.includes(mode.name),
  );

  const formattedTotal = formatCollection(totalCollection);

  const fetchData = async () => {
    if (!fromDate || !toDate) return;
    setLoading(true);
    let bottomStatData = {
      cashCollection: 0,
      digitalCollection: 0,
      chequeCollection: 0,
    };
    try {
      const res = await apiClient.get(
        `/collection-dashboard/payment-mode?fromDate=${fromDate}&toDate=${toDate}`,
      );

      if (res?.success && res?.data?.paymentModes?.length > 0) {
        const paymentModes = res.data.paymentModes;

        const totalData = paymentModes.find(
          (item) => item.paymentMode === "Total",
        );
        setTotalCollection(Number(totalData?.totalCollection) || 0);

        const modes = paymentModes.filter(
          (item) => item.paymentMode !== "Total",
        );

        const fixedColors = {
          Cash: "#22b04c",
          Digital: "#f5a524",
          Cheque: "#2f6fed",
        };

        const fallbackPalette = [
          "#2f6fed",
          "#8b5cf6",
          "#dc3545",
          "#20c997",
          "#6f42c1",
          "#fd7e14",
          "#e83e8c",
          "#17a2b8",
        ];

        let fallbackIndex = 0;

        const mapped = modes.map((item) => {
          const mode = item.paymentMode;
          let color = fixedColors[mode];
          if (!color) {
            color = fallbackPalette[fallbackIndex % fallbackPalette.length];
            fallbackIndex++;
          }
          if (mode === "Cash") {
            bottomStatData.cashCollection = item.totalCollection;
          } else if (mode === "Cheque") {
            bottomStatData.chequeCollection = item.totalCollection;
          } else if (mode === "Digital") {
            bottomStatData.digitalCollection = item.totalCollection;
          }
          return {
            name: mode,
            value: Number(item.totalCollection) || 0,
            percent: Number(item.collectionPercentage) || 0,
            color: color,
          };
        });

        setBottomStatBarData((prev) => ({ ...prev, ...bottomStatData }));
        setAllPaymentModes(mapped);
        setHiddenModes([]);
      } else {
        setAllPaymentModes([]);
        setTotalCollection(0);
        setHiddenModes([]);
        setBottomStatBarData((prev) => ({ ...prev, ...bottomStatData }));
      }
    } catch (error) {
      console.error(error);
      setBottomStatBarData((prev) => ({ ...prev, ...bottomStatData }));
      showError(error.message || "Failed to fetch payment mode data");
      setAllPaymentModes([]);
      setTotalCollection(0);
      setHiddenModes([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (fromDate && toDate) fetchData();
  }, [fromDate, toDate]);

  useEffect(() => {
    if (!chartRef.current || loading || visibleModes.length === 0) return;

    if (chartInstanceRef.current) {
      chartInstanceRef.current.dispose();
      chartInstanceRef.current = null;
    }

    const chartInstance = echarts.init(chartRef.current);
    chartInstanceRef.current = chartInstance;

    const option = {
      tooltip: { trigger: "item" },
      series: [
        {
          type: "pie",
          radius: ["58%", "88%"],
          avoidLabelOverlap: false,
          label: { show: false },
          labelLine: { show: false },
          data: visibleModes.map((d) => ({
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
      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, [visibleModes, showInLacs, loading]);

  const toggleMode = (name) => {
    setHiddenModes((prev) =>
      prev.includes(name)
        ? prev.filter((item) => item !== name)
        : [...prev, name],
    );
  };

  function formatCollection(amount) {
    if (showInLacs) {
      const lakhs = amount / 100000;
      return lakhs.toFixed(2) + " L";
    }
    return formatINR(amount);
  }

  return (
    <div className="panel-card">
      <div className="panel-title">COLLECTION BY PAYMENT MODE</div>
      <div className="panel-body-tight">
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "230px", width: "100%" }}
          >
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center">
            <div
              style={{
                position: "relative",
                width: "220px",
                height: "230px",
              }}
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

            <div className="flex-grow-1">
              <div className="overflow-auto" style={{ height: "200px" }}>
                {allPaymentModes.map((d) => {
                  const isHidden = hiddenModes.includes(d.name);
                  return (
                    <div
                      key={d.name}
                      className={`d-flex align-items-start mb-2 payment-mode-div px-2 ${
                        isHidden ? "hidden-mode" : ""
                      }`}
                      onClick={() => toggleMode(d.name)}
                      style={{ cursor: "pointer" }}
                    >
                      <span
                        className="state-dot mt-1"
                        style={{
                          backgroundColor: isHidden ? "#ccc" : d.color,
                        }}
                      ></span>
                      <div>
                        <div
                          className="fw-semibold"
                          style={{
                            textDecoration: isHidden ? "line-through" : "none",
                            color: isHidden ? "#9ca3af" : "inherit",
                            fontSize: "12px",
                          }}
                        >
                          {d.name}
                        </div>
                        <div style={{ fontSize: "11px" }}>
                          {formatCollection(d.value)}{" "}
                          <span className="text-muted">
                            ({d.percent.toFixed(2)}%)
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
