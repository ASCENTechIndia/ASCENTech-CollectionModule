import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const defaultData = {
  days: [],
  transactions: [],
};

export default function TransactionsPerDayChart() {
  const chartRef = useRef(null);
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [chartData, setChartData] = useState(defaultData);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get(
        "/collection-dashboard/daily-transactions",
      );
      if (res?.success && res?.data?.transactions?.length > 0) {
        const transactions = res.data.transactions;
        const days = transactions.map((item) =>
          item.transactionDate.substring(0, 2),
        );
        const values = transactions.map((item) => item.totalTransactions);
        setChartData({ days, transactions: values });
      } else {
        setChartData(defaultData);
      }
    } catch (error) {
      console.error(error);
      showError(error.message || "Failed to fetch daily transactions");
      setChartData(defaultData);
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
      grid: { left: 20, right: 20, top: 40, bottom: 30, containLabel: true },
      legend: {
        data: ["No. of Transactions"],
        top: 0,
        left: 0,
        icon: "circle",
        itemWidth: 8,
        itemHeight: 8,
        textStyle: { fontSize: 12, color: "#4b5563" },
      },
      tooltip: { trigger: "axis" },
      xAxis: {
        type: "category",
        data: chartData.days,
        boundaryGap: ["6px", "6px"],
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisTick: { show: false },
        axisLabel: { color: "#6b7280", fontSize: 11, interval: 0 },
      },
      yAxis: {
        type: "value",
        min: 0,

        splitLine: { lineStyle: { color: "#f1f3f7" } },
        axisLabel: { color: "#6b7280", fontSize: 11, margin: 8 },
      },
      series: [
        {
          name: "No. of Transactions",
          type: "line",
          data: chartData.transactions,
          smooth: false,
          symbol: "circle",
          symbolSize: 7,
          itemStyle: { color: "#2f6fed" },
          lineStyle: { color: "#2f6fed", width: 2 },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: "rgba(47,111,237,0.25)" },
              { offset: 1, color: "rgba(47,111,237,0.02)" },
            ]),
          },
          label: {
            show: true,
            position: "top",
            fontSize: 7,
            color: "#374151",
            fontWeight: 400,
          },
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
  }, [chartData]);

  return (
    <div className="panel-card">
      <div className="panel-title">TRANSACTIONS PER DAY (Till T-1)</div>
      <div className="panel-body-tight">
        <div ref={chartRef} style={{ width: "100%", height: "230px" }} />
      </div>
    </div>
  );
}
