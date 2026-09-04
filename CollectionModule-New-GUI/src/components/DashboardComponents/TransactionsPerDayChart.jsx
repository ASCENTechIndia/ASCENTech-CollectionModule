import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useNotification } from "../../context/NotificationContext";
import apiClient from "../../services/apiClient";

const defaultData = {
  days: [],
  transactions: [],
};

export default function TransactionsPerDayChart({
  showInLacs,
  fromDate,
  toDate,
}) {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  const { showError } = useNotification();

  const [chartData, setChartData] = useState(defaultData);
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
          `/collection-dashboard/daily-transactions?fromDate=${fromDate}&toDate=${toDate}`,
        );

        if (res?.success && res?.data?.transactions?.length > 0) {
          const transactions = res.data.transactions;

          const days = transactions.map((item) =>
            item.transactionDate.substring(0, 2),
          );

          const values = transactions.map(
            (item) => item.totalTransactions,
          );

          setChartData({
            days,
            transactions: values,
          });
        } else {
          setChartData(defaultData);
        }
      } catch (error) {
        console.error(error);

        showError(
          error.message || "Failed to fetch daily transactions",
        );

        setChartData(defaultData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fromDate, toDate]);

  // =========================
  // Format Number
  // =========================
  const formatNumber = (num) => {
    if (showInLacs) {
      const lakhs = num / 100000;
      return lakhs.toFixed(2) + " L";
    }

    return Number(num).toLocaleString();
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

    if (chartData.days.length === 0) {
      chart.clear();
      return;
    }

    const option = {
      grid: {
        left: 20,
        right: 20,
        top: 40,
        bottom: 30,
        containLabel: true,
      },

      legend: {
        data: ["No. of Transactions"],
        top: 0,
        left: 0,
        icon: "circle",
        itemWidth: 8,
        itemHeight: 8,
        textStyle: {
          fontSize: 12,
          color: "#4b5563",
        },
      },

      tooltip: {
        trigger: "axis",

        formatter: (params) => {
          const param = params[0];

          const date = param.name;
          const value = param.value;

          return `${date}<br/>Transactions: ${formatNumber(value)}`;
        },
      },

      xAxis: {
        type: "category",
        data: chartData.days,

        boundaryGap: ["6px", "6px"],

        axisLine: {
          lineStyle: {
            color: "#e5e7eb",
          },
        },

        axisTick: {
          show: false,
        },

        axisLabel: {
          color: "#6b7280",
          fontSize: 8,
          interval: 0,
        },
      },

      yAxis: {
        type: "value",
        min: 0,

        splitLine: {
          lineStyle: {
            color: "#f1f3f7",
          },
        },

        axisLabel: {
          color: "#6b7280",
          fontSize: 11,
          margin: 8,

          formatter: (value) => formatNumber(value),
        },
      },

      series: [
        {
          name: "No. of Transactions",
          type: "line",

          data: chartData.transactions,

          smooth: false,

          symbol: "circle",
          symbolSize: 7,

          itemStyle: {
            color: "#2f6fed",
          },

          lineStyle: {
            color: "#2f6fed",
            width: 2,
          },

          areaStyle: {
            color: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: "rgba(47,111,237,0.25)",
                },
                {
                  offset: 1,
                  color: "rgba(47,111,237,0.02)",
                },
              ],
            ),
          },

          label: {
            show: true,
            position: "top",
            fontSize: 7,
            color: "#374151",
            fontWeight: 400,

            formatter: (params) =>
              formatNumber(params.value),
          },
        },
      ],
    };

    chart.setOption(option);
  }, [chartData, showInLacs]);

  return (
    <div className="panel-card">
      <div className="panel-title">
        TRANSACTIONS PER DAY (Till T-1)
      </div>

      <div className="panel-body-tight" style={{
    position: "relative",
  }}>

        {/* Keep this DIV mounted all the time */}
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
              inset: 0,
              background: "rgba(255,255,255,0.7)",
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