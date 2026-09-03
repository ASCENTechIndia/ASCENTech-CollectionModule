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

export default function TransactionsByModeChart() {
  const chartRef = useRef(null);
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [modeData, setModeData] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);

      const res = await apiClient.get("/collection-dashboard/transaction-mode");

      if (res?.success && res?.data?.transactionModes?.length > 0) {
        // Skip Total row
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

      showError(error.message || "Failed to fetch transaction mode data");

      setModeData([]);
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

    const total = modeData.reduce((acc, curr) => acc + curr.value, 0);

    const option = {
      grid: { left: 90, right: 90, top: 15, bottom: 35 },
      tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
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

        // Control number of ticks
        splitNumber: 5,
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
          barCategoryGap: "40%",
          label: {
            show: true,
            position: "right",
            formatter: (params) => {
              const value = params.value;
              const percent = modeData[params.dataIndex]?.percent ?? 0;
              return `${value} (${percent.toFixed(2)}%)`;
            },
            color: "#374151",
            fontSize: 9,
            fontWeight: 500,
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
  }, [modeData]);

  return (
    <div className="panel-card">
      <div className="panel-title text-uppercase">
        Digital Transactions Breakup
      </div>
      <div className="panel-body-tight">
        <div ref={chartRef} style={{ width: "100%", height: "230px" }} />
      </div>
    </div>
  );
}
