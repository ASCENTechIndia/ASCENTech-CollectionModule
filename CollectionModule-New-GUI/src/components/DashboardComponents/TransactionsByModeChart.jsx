import React, { useEffect, useRef, useState } from "react";
import * as echarts from "echarts";
import { useNotification } from "../../context/NotificationContext";
import { useLoader } from "../../context/LoaderContext";
import apiClient from "../../services/apiClient";

const COLORS = [
  "#ef476f", // pinkish red
  "#06d6a0", // mint green
  "#f4a261", // warm orange
  "#118ab2", // teal blue
  "#00b4d8", // bright cyan
  "#9b5de5", // violet
  "#7209b7", // deep purple
  "#f94144", // coral red
  "#ffd166", // sunflower yellow
  "#e76f51", // burnt orange
];

export default function TransactionsByModeChart({ showInLacs }) {
  const chartRef = useRef(null);
  const { showError } = useNotification();
  const { setLoader } = useLoader();
  const [modeData, setModeData] = useState([]);

  const fetchData = async () => {
    try {
      setLoader(true);
      const res = await apiClient.get("/collection-dashboard/transaction-mode");
      if (res?.success && res?.data?.transactionModes?.length > 0) {
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

  // Chart rendering effect
  useEffect(() => {
    if (!chartRef.current || modeData.length === 0) return;

    const chartInstance = echarts.init(chartRef.current);

    const option = {
      grid: { left: 90, right: 90, top: 15, bottom: 35 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "shadow" },
        formatter: (params) => {
          const param = params[0];
          const value = param.value;
          const name = param.name;
          const mode = modeData.find((d) => d.name === name);
          const percent = mode?.percent ?? 0;
          return `
            <strong>${name}</strong><br/>
            Collection: ${formatCollection(value)}<br/>
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
              const percent = modeData[params.dataIndex]?.percent ?? 0;
              return `${percent.toFixed(2)}%`;
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
  }, [modeData, showInLacs]);

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
