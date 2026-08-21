import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const modeData = [
  { name: "DL PORTAL\n[Offline]", value: 7, color: "#f5a524" },
  { name: "DL PORTAL\n[Online]", value: 13, color: "#8b5cf6" },
  { name: "Offline", value: 85, color: "#22b04c" },
  { name: "Renewal", value: 318, color: "#2f6fed" },
];

export default function TransactionsByModeChart() {
  const chartRef = useRef(null);

  const total = modeData.reduce((acc, curr) => acc + curr.value, 0);

  useEffect(() => {
    const chartInstance = echarts.init(chartRef.current);

    const option = {
      grid: { left: 90, right: 90, top: 15, bottom: 35 },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
      xAxis: {
        type: "value",
        min: 0,
        max: 350,
        interval: 50,
        name: "No. of Transactions",
        nameLocation: "middle",
        nameGap: 25,
        nameTextStyle: { color: "#6b7280", fontSize: 11 },
        splitLine: { lineStyle: { color: "#f1f3f7" } },
        axisLabel: { color: "#6b7280", fontSize: 11 },
      },
      yAxis: {
        type: "category",
        data: modeData.map((d) => d.name),
        axisLine: { lineStyle: { color: "#e5e7eb" } },
        axisTick: { show: false },
        axisLabel: { color: "#374151", fontSize: 11 },
      },
      series: [
        {
          type: "bar",
          data: modeData.map((d) => ({
            value: d.value,
            itemStyle: { color: d.color },
          })),
          barWidth: 20,
          label: {
            show: true,
            position: "right",
            formatter: (params) => {
              const value = params.value;
              const percent = ((value / total) * 100).toFixed(2);
              return `${value} (${percent}%)`;
            },
            color: "#374151",
            fontSize: 11,
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
  }, [total]);

  return (
    <div className="panel-card">
      <div className="panel-title">TRANSACTIONS BY TRANSACTION MODE</div>
      <div className="panel-body-tight">
        <div ref={chartRef} style={{ width: "100%", height: "230px" }} />
      </div>
    </div>
  );
}
