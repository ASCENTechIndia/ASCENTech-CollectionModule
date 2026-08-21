import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Dummy data — replace with API response later
const chartData = {
  days: ["14-Aug", "15-Aug", "16-Aug", "17-Aug", "18-Aug (T-1)"],
  transactions: [278, 312, 297, 365, 423],
};

export default function TransactionsPerDayChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      grid: { left: 40, right: 20, top: 40, bottom: 30 },
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
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisTick: { show: false },
        axisLabel: { color: "#6b7280", fontSize: 11, interval: 0 },
      },
      yAxis: {
        type: "value",
        min: 0,
        max: 500,
        interval: 100,
        splitLine: { lineStyle: { color: "#f1f3f7" } },
        axisLabel: { color: "#6b7280", fontSize: 11 },
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
            fontSize: 11,
            color: "#374151",
            fontWeight: 600,
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
  }, []);

  return (
    <div className="panel-card">
      <div className="panel-title">TRANSACTIONS PER DAY (Till T-1)</div>
      <div className="panel-body-tight">
        <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
      </div>
    </div>
  );
}
