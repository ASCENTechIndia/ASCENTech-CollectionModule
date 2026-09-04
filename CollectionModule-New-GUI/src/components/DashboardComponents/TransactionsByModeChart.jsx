import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

const COLORS = [
  "#ef476f",
  "#06d6a0",
  "#f4a261",
  "#118ab2",
  "#00b4d8",
  "#9b5de5",
  "#7209b7",
  "#f94144",
  "#ffd166",
  "#e76f51",
];

export default function TransactionsByModeChart({
  showInLacs,
  fromDate,
  toDate,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const { showError } = useNotification();

  const [modeData, setModeData] = useState([]);
  const [loading, setLoading] = useState(false);

  // =========================
  // Fetch Data
  // =========================
  useEffect(() => {
    if (!fromDate || !toDate) return;

    const fetchData = async () => {
      setLoading(true);

      try {
        const res = await apiClient.get(
          `/collection-dashboard/transaction-mode?fromDate=${fromDate}&toDate=${toDate}`,
        );

        if (
          res?.success &&
          res?.data?.transactionModes?.length > 0
        ) {
          const modes = res.data.transactionModes.filter(
            (item) => item.transactionMode !== "Total",
          );

          const mapped = modes.map((item, index) => ({
            name: item.transactionMode,
            value: Number(item.totalCollection) || 0,
            percent: Number(item.transactionPercentage) || 0,
            color: COLORS[index % COLORS.length],
          }));

          setModeData(mapped);
        } else {
          setModeData([]);
        }
      } catch (error) {
        console.error(error);

        showError(
          error.message ||
            "Failed to fetch transaction mode data",
        );

        setModeData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  // =========================
  // Format INR
  // =========================
  const formatINR = (num) =>
    Number(num).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatCollection = (amount) => {
    if (showInLacs) {
      const lakhs = amount / 100000;
      return lakhs.toFixed(2) + " L";
    }

    return `₹ ${formatINR(amount)}`;
  };

  // =========================
  // Initialize ECharts ONCE
  // =========================
  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    chartInstanceRef.current = chart;

    const handleResize = () => {
      chart.resize();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
        chartInstanceRef.current = null;
      }
    };
  }, []);

  // =========================
  // Update Chart
  // =========================
  useEffect(() => {
    const chart = chartInstanceRef.current;

    if (!chart) return;

    // No data
    if (modeData.length === 0) {
      chart.clear();
      return;
    }

    const option = {
      grid: {
        left: 90,
        right: 90,
        top: 15,
        bottom: 35,
      },

      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },

        formatter: (params) => {
          const param = params[0];

          const value = param.value;
          const name = param.name;

          return `
            <strong>${name}</strong><br/>
            Collection: ${formatCollection(value)}
          `;
        },
      },

      xAxis: {
        type: "value",
        min: 0,

        name: "Collection Amount",
        nameLocation: "middle",
        nameGap: 28,

        nameTextStyle: {
          color: "#6b7280",
          fontSize: 11,
        },

        splitLine: {
          lineStyle: {
            color: "#f1f3f7",
          },
        },

        axisLabel: {
          color: "#6b7280",
          fontSize: 10,
          margin: 10,
          rotate: 0,

          formatter: (value) => {
            if (value >= 10000000) {
              return `₹${(value / 10000000).toFixed(1)}Cr`;
            }

            if (value >= 100000) {
              return `₹${(value / 100000).toFixed(1)}L`;
            }

            if (value >= 1000) {
              return `₹${(value / 1000).toFixed(0)}K`;
            }

            return `₹${value}`;
          },
        },

        splitNumber: 5,
      },

      yAxis: {
        type: "category",

        data: modeData.map((d) => d.name),

        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },

        axisTick: {
          show: false,
        },

        axisLabel: {
          color: "#374151",
          fontSize: 11,
        },
      },

      series: [
        {
          type: "bar",

          data: modeData.map((d) => ({
            value: d.value,

            itemStyle: {
              color: d.color,
            },
          })),

          barWidth: 20,
          barCategoryGap: "40%",

          label: {
            show: true,
            position: "right",

            formatter: (params) => {
              const percent =
                modeData[params.dataIndex]?.percent ?? 0;

              return `${percent.toFixed(2)}%`;
            },

            color: "#374151",
            fontSize: 9,
            fontWeight: 500,
          },
        },
      ],
    };

    chart.setOption(option, true);
  }, [modeData, showInLacs]);

  return (
    <div className="panel-card">
      <div className="panel-title text-uppercase">
        Digital Transactions Breakup
      </div>

      <div
        className="panel-body-tight"
        style={{
          position: "relative",
        }}
      >
        {/* ECharts container ALWAYS remains mounted */}
        <div
          ref={chartRef}
          style={{
            width: "100%",
            height: "230px",
          }}
        />

        {/* Loading overlay */}
        {loading && (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "rgba(255, 255, 255, 0.7)",
              zIndex: 10,
            }}
          >
            <div
              className="spinner-border text-primary"
              role="status"
            >
              <span className="visually-hidden">
                Loading...
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}