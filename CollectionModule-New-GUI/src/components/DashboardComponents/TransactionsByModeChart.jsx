import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

// Dummy data — replace with API response later
const modeData = [
  { name: "DL PORTAL\n[Offline]", value: 7, percent: "1.65%", color: "#f5a524" },
  { name: "DL PORTAL\n[Online]", value: 13, percent: "3.07%", color: "#8b5cf6" },
  { name: "Offline", value: 85, percent: "20.09%", color: "#22b04c" },
  { name: "Renewal", value: 318, percent: "75.18%", color: "#2f6fed" },
];

export default function TransactionsByModeChart() {
  const chartRef = useRef(null);

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
            formatter: (params) =>
              `${modeData[params.dataIndex].value} (${modeData[params.dataIndex].percent})`,
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
  }, []);

  return (
    <div className="panel-card">
      <div className="panel-title">TRANSACTIONS BY TRANSACTION MODE</div>
      <div className="panel-body-tight">
        <div ref={chartRef} style={{ width: "100%", height: "300px" }} />
      </div>
    </div>
  );
}
