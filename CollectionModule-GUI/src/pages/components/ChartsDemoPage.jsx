import React from 'react'
import { Card } from '../../components/ui'
import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'
import PieChart from '../../components/charts/PieChart'
import DoughnutChart from '../../components/charts/DoughnutChart'
import RadarChart from '../../components/charts/RadarChart'
import PolarAreaChart from '../../components/charts/PolarAreaChart'
import BubbleChart from '../../components/charts/BubbleChart'
import StackedBarChart from '../../components/charts/StackedBarChart'
import ScatterChart from '../../components/charts/ScatterChart'
import MixedChart from '../../components/charts/MixedChart'

export const ChartsDemoPage = () => {
  const dailyLabels = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
  ]

  const dailyValues = [
    1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ]

  const totalActiveDays = dailyValues.filter((v) => v > 0).length
  const noActivityDays = dailyValues.length - totalActiveDays
  const cumulativeVisits = dailyValues.reduce((acc, val, index) => {
    const prev = index === 0 ? 0 : acc[index - 1]
    acc.push(prev + val)
    return acc
  }, [])

  const dailyLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Visit Count',
        data: dailyValues,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  }

  const dailyBarData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Visits',
        data: dailyValues,
        backgroundColor: dailyValues.map((value) =>
          value > 0 ? 'rgba(16, 185, 129, 0.75)' : 'rgba(148, 163, 184, 0.35)'
        ),
        borderColor: dailyValues.map((value) =>
          value > 0 ? 'rgba(16, 185, 129, 1)' : 'rgba(148, 163, 184, 0.6)'
        ),
        borderWidth: 1,
      },
    ],
  }

  const dailyDonutData = {
    labels: ['Active Days', 'No Activity Days'],
    datasets: [
      {
        label: 'Day Distribution',
        data: [totalActiveDays, noActivityDays],
        backgroundColor: ['rgba(59, 130, 246, 0.8)', 'rgba(203, 213, 225, 0.8)'],
        borderColor: ['rgba(59, 130, 246, 1)', 'rgba(148, 163, 184, 1)'],
        borderWidth: 2,
      },
    ],
  }

  const dailyMixedData = {
    labels: dailyLabels,
    datasets: [
      {
        type: 'bar',
        label: 'Daily Visits',
        data: dailyValues,
        backgroundColor: 'rgba(99, 102, 241, 0.45)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        yAxisID: 'y',
      },
      {
        type: 'line',
        label: 'Cumulative Visits',
        data: cumulativeVisits,
        borderColor: 'rgba(234, 88, 12, 1)',
        backgroundColor: 'rgba(234, 88, 12, 0.12)',
        borderWidth: 2,
        pointRadius: 3,
        pointHoverRadius: 5,
        tension: 0.3,
        yAxisID: 'y1',
      },
    ],
  }

  const commonXAxisConfig = {
    ticks: {
      autoSkip: true,
      maxTicksLimit: 15,
    },
    grid: {
      display: false,
    },
  }

  const lineAndBarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  const mixedOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        ticks: { precision: 0 },
        title: {
          display: true,
          text: 'Daily Visits',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        grid: {
          drawOnChartArea: false,
        },
        ticks: { precision: 0 },
        title: {
          display: true,
          text: 'Cumulative Visits',
        },
      },
    },
  }

  const stepLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Visit (Step)',
        data: dailyValues,
        borderColor: 'rgba(37, 99, 235, 1)',
        backgroundColor: 'rgba(37, 99, 235, 0.12)',
        fill: true,
        pointRadius: 3,
        pointHoverRadius: 6,
        stepped: true,
      },
    ],
  }

  const cumulativeLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Running Total',
        data: cumulativeVisits,
        borderColor: 'rgba(14, 165, 233, 1)',
        backgroundColor: 'rgba(14, 165, 233, 0.16)',
        fill: true,
        tension: 0.2,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  }

  const eventDotData = {
    datasets: [
      {
        label: 'Activity Events',
        data: dailyValues
          .map((value, idx) => (value > 0 ? { x: idx + 1, y: 1 } : null))
          .filter(Boolean),
        backgroundColor: 'rgba(22, 163, 74, 0.9)',
        pointRadius: 7,
        pointHoverRadius: 10,
      },
    ],
  }

  const eventDotOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Activity found on day ${context.raw.x}`,
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        max: 31,
        ticks: {
          stepSize: 2,
        },
        title: {
          display: true,
          text: 'Day of Month',
        },
      },
      y: {
        beginAtZero: true,
        max: 2,
        ticks: {
          callback: () => '',
        },
        grid: {
          drawBorder: false,
        },
      },
    },
  }

  const weeklyTotals = dailyValues.reduce((acc, value, idx) => {
    const weekIndex = Math.floor(idx / 7)
    acc[weekIndex] = (acc[weekIndex] || 0) + value
    return acc
  }, [])

  const weeklyLabels = weeklyTotals.map((_, idx) => `Week ${idx + 1}`)

  const weeklyBarData = {
    labels: weeklyLabels,
    datasets: [
      {
        label: 'Visits per Week',
        data: weeklyTotals,
        backgroundColor: 'rgba(139, 92, 246, 0.65)',
        borderColor: 'rgba(139, 92, 246, 1)',
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  }

  const movingAverageValues = dailyValues.map((_, index, arr) => {
    const start = Math.max(0, index - 6)
    const window = arr.slice(start, index + 1)
    const avg = window.reduce((sum, val) => sum + val, 0) / window.length
    return Number(avg.toFixed(2))
  })

  const targetValues = dailyValues.map(() => 0.3)

  const multiLineTrendData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Actual Visits',
        data: dailyValues,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.18)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
      },
      {
        label: '7-Day Moving Avg',
        data: movingAverageValues,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.08)',
        fill: false,
        tension: 0.3,
        pointRadius: 2,
      },
      {
        label: 'Target Line',
        data: targetValues,
        borderColor: 'rgba(234, 88, 12, 1)',
        borderDash: [6, 6],
        fill: false,
        tension: 0,
        pointRadius: 0,
      },
    ],
  }

  const multiLineOptions = {
    ...lineAndBarOptions,
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1.2,
      },
    },
  }

  const activeDayIndices = dailyValues
    .map((value, idx) => (value > 0 ? idx + 1 : null))
    .filter(Boolean)

  const horizontalActiveData = {
    labels: activeDayIndices.map((day) => `Day ${day}`),
    datasets: [
      {
        label: 'Visit Count',
        data: activeDayIndices.map(() => 1),
        backgroundColor: ['rgba(14, 165, 233, 0.75)', 'rgba(37, 99, 235, 0.75)'],
        borderColor: ['rgba(14, 165, 233, 1)', 'rgba(37, 99, 235, 1)'],
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  }

  const horizontalActiveOptions = {
    responsive: true,
    maintainAspectRatio: true,
    indexAxis: 'y',
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  const weeklyComposition = dailyValues.reduce((acc, value, idx) => {
    const weekIndex = Math.floor(idx / 7)
    if (!acc[weekIndex]) {
      acc[weekIndex] = { active: 0, total: 0 }
    }
    acc[weekIndex].active += value > 0 ? 1 : 0
    acc[weekIndex].total += 1
    return acc
  }, [])

  const weeklyStackedData = {
    labels: weeklyComposition.map((_, idx) => `Week ${idx + 1}`),
    datasets: [
      {
        label: 'Active Days',
        data: weeklyComposition.map((w) => w.active),
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Inactive Days',
        data: weeklyComposition.map((w) => w.total - w.active),
        backgroundColor: 'rgba(203, 213, 225, 0.9)',
        borderColor: 'rgba(148, 163, 184, 1)',
        borderWidth: 1,
      },
    ],
  }

  const weeklyStackedOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: {
          precision: 0,
        },
      },
    },
  }

  // Advanced Line Chart Variations
  
  // Smooth spline chart with high tension
  const smoothSplineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Smooth Trend (Spline)',
        data: dailyValues,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
        fill: true,
        tension: 0.5, // Higher tension for smooth curves
        pointRadius: 2,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
      },
    ],
  }

  // Confidence band with upper/lower bounds
  const confidenceBandData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Upper Bound (90%)',
        data: movingAverageValues.map((val) => val + 0.2),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Actual Value',
        data: movingAverageValues,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.15)',
        fill: '-1',
        tension: 0.3,
        pointRadius: 2,
        pointHoverRadius: 5,
      },
      {
        label: 'Lower Bound (90%)',
        data: movingAverageValues.map((val) => Math.max(0, val - 0.15)),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  const confidenceBandOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 0 || context.datasetIndex === 2) {
              return context.dataset.label
            }
            return `${context.dataset.label}: ${context.raw.toFixed(2)}`
          },
        },
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1,
      },
    },
  }

  // Dual-axis line chart
  const dualAxisLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Visits (Left Axis)',
        data: dailyValues,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.15)',
        fill: true,
        tension: 0.35,
        yAxisID: 'y',
        pointRadius: 3,
      },
      {
        label: 'Efficiency % (Right Axis)',
        data: movingAverageValues.map((val) => val * 50), // Scaled 0-50%
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.3,
        yAxisID: 'y1',
        pointRadius: 3,
        borderDash: [4, 4],
      },
    ],
  }

  const dualAxisLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Daily Visits',
        },
        grid: {
          color: 'rgba(59, 130, 246, 0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Efficiency %',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  // Minimal sparkline style
  const sparklineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Quick Trend',
        data: movingAverageValues,
        borderColor: 'rgba(14, 165, 233, 1)',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 8,
        borderWidth: 2,
      },
    ],
  }

  const sparklineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  }

  // Step area chart with emphasis on transitions
  const stepAreaData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Step Changes',
        data: dailyValues,
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'rgba(251, 146, 60, 0.25)',
        fill: true,
        stepped: 'middle',
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(251, 146, 60, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  }

  const stepAreaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Multi-smooth lines with labels
  const multiSmoothedData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Conservative (0.2 tension)',
        data: dailyValues,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: false,
        tension: 0.2,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Medium (0.4 tension)',
        data: dailyValues,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: false,
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Smooth (0.6 tension)',
        data: dailyValues,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        fill: false,
        tension: 0.6,
        pointRadius: 2,
        borderWidth: 2,
      },
    ],
  }

  const multiSmoothedOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Gradient fill multi-band line
  const gradientBandData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Peak Values',
        data: dailyValues.map((v) => v + 0.3),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Primary Line',
        data: dailyValues,
        borderColor: 'rgba(236, 72, 153, 1)',
        backgroundColor: 'rgba(236, 72, 153, 0.2)',
        fill: '-1',
        tension: 0.35,
        pointRadius: 3,
        borderWidth: 2,
      },
      {
        label: 'Base Values',
        data: dailyValues.map((v) => Math.max(0, v - 0.2)),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  const gradientBandOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1.5,
      },
    },
  }

  // Advanced Bar Chart Variations

  // Grouped bars - multiple categories side by side
  const groupedBarData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'Completed Cases',
        data: [5, 8, 3, 9, 6],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Pending Cases',
        data: [3, 4, 6, 2, 5],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: 'Rejected Cases',
        data: [1, 2, 1, 3, 1],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const groupedBarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Diverging/Negative-Positive bars
  const divergingBarData = {
    labels: ['Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E'],
    datasets: [
      {
        label: 'Positive Performance',
        data: [4, 6, 2, 5, 3],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
        borderRadius: [6, 0, 0, 6],
      },
      {
        label: 'Negative Performance',
        data: [-2, -1, -4, -1, -2],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
        borderRadius: [0, 6, 6, 0],
      },
    ],
  }

  const divergingBarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // 100% Stacked (Normalized)
  const normalizedStackedData = {
    labels: ['Region A', 'Region B', 'Region C', 'Region D'],
    datasets: [
      {
        label: 'Completed (%)',
        data: [60, 55, 70, 65],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'In Progress (%)',
        data: [30, 35, 20, 25],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pending (%)',
        data: [10, 10, 10, 10],
        backgroundColor: 'rgba(251, 146, 60, 0.8)',
        borderColor: 'rgba(251, 146, 60, 1)',
        borderWidth: 1,
      },
    ],
  }

  const normalizedStackedOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: { stacked: true, grid: { display: false } },
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  // Bullet bars (Target vs Actual comparison)
  const bulletBarData = {
    labels: ['Q1 Target', 'Q2 Target', 'Q3 Target', 'Q4 Target'],
    datasets: [
      {
        label: 'Poor Range',
        data: [40, 40, 40, 40],
        backgroundColor: 'rgba(229, 231, 235, 0.5)',
        borderColor: 'rgba(107, 114, 128, 0)',
      },
      {
        label: 'Satisfactory Range',
        data: [20, 20, 20, 20],
        backgroundColor: 'rgba(191, 219, 254, 0.7)',
        borderColor: 'rgba(107, 114, 128, 0)',
      },
      {
        label: 'Good Range',
        data: [20, 20, 20, 20],
        backgroundColor: 'rgba(134, 239, 172, 0.7)',
        borderColor: 'rgba(107, 114, 128, 0)',
      },
      {
        label: 'Actual Performance',
        data: [65, 72, 58, 80],
        backgroundColor: 'rgba(30, 30, 30, 0.9)',
        borderColor: 'rgba(0, 0, 0, 1)',
        borderWidth: 2,
        barPercentage: 0.5,
      },
    ],
  }

  const bulletBarOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { precision: 0 },
      },
    },
  }

  // Value-based gradient coloring
  const gradientColorData = {
    labels: dailyLabels.slice(0, 14), // First 2 weeks
    datasets: [
      {
        label: 'Performance Score',
        data: [78, 82, 45, 65, 90, 52, 88, 71, 95, 62, 80, 55, 92, 68],
        backgroundColor: [
          'rgba(239, 68, 68, 0.8)', // Red for <50
          'rgba(59, 130, 246, 0.8)', // Blue for 50-70
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)', // Green for >80
          'rgba(251, 146, 60, 0.8)', // Orange for 50-70
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(59, 130, 246, 0.8)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.1)',
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  }

  const gradientColorOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${context.raw}`,
          afterLabel: (context) => {
            const value = context.raw
            if (value < 50) return 'Level: Low'
            if (value < 70) return 'Level: Medium'
            return 'Level: High'
          },
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        max: 100,
        ticks: { precision: 0 },
      },
    },
  }

  // Waterfall chart (cumulative effect)
  const waterfallLabels = ['Start', 'Completed', 'Pending', 'Rejected', 'End']
  const waterfallData = {
    labels: waterfallLabels,
    datasets: [
      {
        label: 'Waterfall Flow',
        data: [50, 30, -10, -5, null],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(34, 197, 94, 0.8)',
          'rgba(251, 146, 60, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(107, 114, 128, 0.8)',
        ],
        borderColor: 'rgba(0, 0, 0, 0.2)',
        borderWidth: 1,
        borderRadius: 4,
      },
    ],
  }

  const waterfallOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Horizontal stacked bars (full width)
  const horizontalStackedData = {
    labels: ['Agent A', 'Agent B', 'Agent C', 'Agent D', 'Agent E'],
    datasets: [
      {
        label: 'New Cases',
        data: [12, 8, 15, 6, 10],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
      {
        label: 'Assigned Cases',
        data: [10, 14, 8, 12, 9],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1,
      },
      {
        label: 'Completed Cases',
        data: [8, 10, 12, 9, 11],
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
    ],
  }

  const horizontalStackedOptions = {
    indexAxis: 'y',
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: {
        stacked: true,
        beginAtZero: true,
      },
      y: {
        stacked: true,
        grid: { display: false },
      },
    },
  }

  // Rounded bars with gradient effect
  const roundedBarsData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Cases Handled',
        data: [12, 19, 8, 14, 22, 16, 10],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.6)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(59, 130, 246, 0.9)',
          'rgba(59, 130, 246, 0.7)',
          'rgba(59, 130, 246, 0.6)',
        ],
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 12,
        hoverBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
    ],
  }

  const roundedBarsOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        titleFont: { size: 14 },
        bodyFont: { size: 13 },
        callbacks: {
          label: (context) => `Cases: ${context.raw}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Advanced Area Chart Variations

  // Stacked area chart
  const stackedAreaData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Active Agents',
        data: [3, 2, 3, 2, 4, 2, 3, 2, 3, 2, 3, 2, 4, 3, 2, 3, 2, 3, 2, 4, 3, 2, 3, 2, 3, 2, 3, 4, 3, 2],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.4)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      },
      {
        label: 'Pending Cases',
        data: [2, 3, 2, 3, 1, 3, 2, 3, 2, 3, 2, 3, 1, 2, 3, 2, 3, 2, 3, 1, 2, 3, 2, 3, 2, 3, 2, 1, 2, 3],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      },
      {
        label: 'Cases Waiting',
        data: [1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 1],
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'rgba(251, 146, 60, 0.4)',
        fill: true,
        tension: 0.35,
        pointRadius: 0,
      },
    ],
  }

  const stackedAreaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Smooth area with gradient
  const smoothAreaData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Weekly Performance',
        data: movingAverageValues,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.25)',
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  }

  const smoothAreaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1,
      },
    },
  }

  // Range area (upper/lower bounds)
  const rangeAreaData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Upper Bound',
        data: dailyValues.map((v) => v + 0.3),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
      },
      {
        label: 'Expected Range',
        data: dailyValues,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.2)',
        fill: '-1',
        tension: 0.35,
        pointRadius: 2,
        borderWidth: 2,
      },
      {
        label: 'Lower Bound',
        data: dailyValues.map((v) => Math.max(0, v - 0.25)),
        borderColor: 'transparent',
        backgroundColor: 'transparent',
        pointRadius: 0,
        fill: false,
      },
    ],
  }

  const rangeAreaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 0 || context.datasetIndex === 2) {
              return ''
            }
            return `Value: ${context.raw.toFixed(2)}`
          },
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1.2,
      },
    },
  }

  // Stream graph style area
  const streamGraphData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5'],
    datasets: [
      {
        label: 'North Region',
        data: [45, 52, 48, 61, 55],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'South Region',
        data: [38, 42, 50, 45, 52],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'East Region',
        data: [32, 38, 42, 48, 46],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.6)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
      {
        label: 'West Region',
        data: [28, 35, 38, 42, 50],
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'rgba(251, 146, 60, 0.6)',
        fill: true,
        tension: 0.4,
        pointRadius: 3,
      },
    ],
  }

  const streamGraphOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        stacked: true,
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Percentage area (normalized)
  const percentageAreaData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'High Priority (%)',
        data: [30, 28, 35, 32, 38, 30, 35, 28, 40, 32, 35, 30, 38, 28, 35, 32, 38, 30, 35, 28, 40, 32, 35, 30, 38, 28, 35, 32, 38, 30],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.6)',
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: 'Medium Priority (%)',
        data: [45, 48, 42, 45, 40, 48, 42, 48, 35, 45, 42, 48, 40, 48, 42, 45, 40, 48, 42, 48, 35, 45, 42, 48, 40, 48, 42, 45, 40, 48],
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'rgba(251, 146, 60, 0.6)',
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: 'Low Priority (%)',
        data: [25, 24, 23, 23, 22, 22, 23, 24, 25, 23, 23, 22, 22, 24, 23, 23, 22, 22, 23, 24, 25, 23, 23, 22, 22, 24, 23, 23, 22, 22],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.6)',
        fill: true,
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  }

  const percentageAreaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}%`,
        },
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        stacked: true,
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  // Step area chart (cumulative)
  const stepCumulativeData = {
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
    datasets: [
      {
        label: 'Cases Completed',
        data: [5, 12, 18, 25, 28, 35, 40],
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        fill: true,
        stepped: 'middle',
        tension: 0,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        borderWidth: 3,
      },
    ],
  }

  const stepCumulativeOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Overlaid areas with transparency
  const overlaidAreasData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Target',
        data: [50, 50, 50, 50, 50, 50, 50],
        borderColor: 'rgba(107, 114, 128, 1)',
        backgroundColor: 'transparent',
        fill: false,
        borderDash: [5, 5],
        tension: 0,
        pointRadius: 0,
        borderWidth: 2,
      },
      {
        label: 'Actual Performance',
        data: [45, 52, 48, 62, 58, 55, 60],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  }

  const overlaidAreasOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: { grid: { display: true, color: 'rgba(200, 200, 200, 0.1)' } },
      y: {
        beginAtZero: true,
        max: 80,
        ticks: { precision: 0 },
      },
    },
  }

  // Pyramid area (funnel-like)
  const pyramidAreaData = {
    labels: ['Awareness', 'Interest', 'Consideration', 'Decision', 'Purchase'],
    datasets: [
      {
        label: 'Customer Journey',
        data: [1000, 800, 600, 400, 250],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        fill: true,
        tension: 0.2,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
      },
    ],
  }

  const pyramidAreaOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Count: ${context.raw}`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Single-Line Chart Variations

  // Bold line with large points
  const boldLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Daily Visits (Bold Style)',
        data: dailyValues,
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.05)',
        fill: true,
        tension: 0.2,
        borderWidth: 4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 3,
      },
    ],
  }

  const boldLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(239, 68, 68, 0.9)',
        padding: 12,
        cornerRadius: 8,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Thin minimal line
  const minimalistLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Trend',
        data: movingAverageValues,
        borderColor: 'rgba(100, 116, 139, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  }

  const minimalistLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(51, 65, 85, 0.95)',
        padding: 8,
        titleFont: { size: 12 },
        bodyFont: { size: 11 },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: true, maxTicksLimit: 10 },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.1)' },
      },
    },
  }

  // Dashed line style
  const dashedLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Projected Trend',
        data: movingAverageValues,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.4,
        borderWidth: 2,
        borderDash: [8, 4],
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(99, 102, 241, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  }

  const dashedLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Projected: ${context.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1,
      },
    },
  }

  // Gradient-colored line
  const gradientLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Performance Score',
        data: [0.2, 0.3, 0.15, 0.25, 0.35, 0.2, 0.4, 0.28, 0.45, 0.32, 0.38, 0.22, 0.42, 0.3, 0.35, 0.25, 0.4, 0.2, 0.38, 0.28, 0.45, 0.32, 0.4, 0.22, 0.38, 0.2, 0.35, 0.25, 0.42, 0.3],
        borderColor: 'rgba(14, 165, 233, 1)',
        backgroundColor: 'rgba(14, 165, 233, 0.2)',
        fill: true,
        tension: 0.4,
        borderWidth: 3,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: [
          'rgba(239, 68, 68, 1)', 'rgba(251, 146, 60, 1)', 'rgba(239, 68, 68, 1)', 'rgba(251, 146, 60, 1)', 'rgba(34, 197, 94, 1)',
          'rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)', 'rgba(59, 130, 246, 1)', 'rgba(34, 197, 94, 1)', 'rgba(251, 146, 60, 1)',
          'rgba(34, 197, 94, 1)', 'rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)', 'rgba(59, 130, 246, 1)', 'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)', 'rgba(34, 197, 94, 1)', 'rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)', 'rgba(59, 130, 246, 1)',
          'rgba(34, 197, 94, 1)', 'rgba(251, 146, 60, 1)', 'rgba(34, 197, 94, 1)', 'rgba(239, 68, 68, 1)', 'rgba(34, 197, 94, 1)',
          'rgba(251, 146, 60, 1)', 'rgba(34, 197, 94, 1)', 'rgba(59, 130, 246, 1)', 'rgba(34, 197, 94, 1)', 'rgba(251, 146, 60, 1)',
        ],
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  }

  const gradientLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Score: ${(context.raw * 100).toFixed(0)}%`,
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        max: 0.6,
        ticks: {
          callback: (value) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  }

  // Line with shadow effect
  const shadowLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Smooth Performance',
        data: movingAverageValues,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.3)',
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 6,
        shadowColor: 'rgba(0, 0, 0, 0.2)',
      },
    ],
  }

  const shadowLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(34, 197, 94, 0.95)',
        padding: 12,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1,
      },
    },
  }

  // Sparkline-style with no axis labels
  const sparklineStyleData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Sparkline',
        data: movingAverageValues,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.15)',
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  }

  const sparklineStyleOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        beginAtZero: true,
      },
    },
  }

  // Categorical milestone line
  const milestoneLineData = {
    labels: ['Day 1', 'Day 5', 'Day 10', 'Day 15', 'Day 20', 'Day 25', 'Day 30'],
    datasets: [
      {
        label: 'Milestone Progress',
        data: [10, 25, 45, 60, 75, 90, 100],
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'rgba(251, 146, 60, 0.2)',
        fill: true,
        tension: 0.3,
        borderWidth: 3,
        pointRadius: 7,
        pointHoverRadius: 10,
        pointBackgroundColor: 'rgba(251, 146, 60, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 3,
      },
    ],
  }

  const milestoneLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(251, 146, 60, 0.9)',
        padding: 12,
        callbacks: {
          label: (context) => `Progress: ${context.raw}%`,
        },
      },
    },
    scales: {
      x: { grid: { display: false } },
      y: {
        beginAtZero: true,
        max: 120,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  }

  // Smooth area with light fill
  const lightAreaLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Soft Trend',
        data: movingAverageValues,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        fill: true,
        tension: 0.45,
        borderWidth: 2.5,
        pointRadius: 2,
        pointHoverRadius: 5,
        pointBackgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
    ],
  }

  const lightAreaLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(51, 65, 85, 0.9)',
        padding: 10,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        suggestedMax: 1,
        grid: { color: 'rgba(200, 200, 200, 0.08)' },
      },
    },
  }

  // Dotted point line
  const dottedPointLineData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Data Points',
        data: dailyValues,
        borderColor: 'rgba(30, 41, 59, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.1,
        borderWidth: 1,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: 'rgba(14, 165, 233, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
        pointStyle: 'circle',
      },
    ],
  }

  const dottedPointLineOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Value: ${context.raw}`,
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  const recoveryTrendLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const recoveryTrendValues = [0.77, 0.82, 0.79, 0.9, 0.94, 0.99]

  const recoveryTrendData = {
    labels: recoveryTrendLabels,
    datasets: [
      {
        label: 'Recovery %',
        data: recoveryTrendValues,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.12)',
        fill: false,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  }

  const recoveryTrendOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `Recovery %: ${(context.raw * 100).toFixed(0)}`,
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(148, 163, 184, 0.15)',
        },
      },
      y: {
        beginAtZero: false,
        min: 0.7,
        max: 1,
        ticks: {
          callback: (value) => `${(value * 100).toFixed(0)}%`,
        },
      },
    },
  }

  // Assigned Cases vs Recovery Charts (Line Charts Only)

  // Assigned Cases and Recovery base data
  const assignedCases = [25, 28, 22, 30, 26, 24, 32, 28, 35, 30, 28, 26, 34, 29, 31, 27, 33, 25, 36, 28, 30, 26, 32, 28, 35, 29, 34, 27, 38, 31]
  const recoveryAmount = [15, 18, 14, 22, 18, 16, 24, 19, 26, 22, 20, 18, 26, 21, 24, 19, 26, 17, 28, 20, 22, 18, 25, 20, 27, 22, 26, 19, 30, 24]
  const recoveryRate = assignedCases.map((cases, idx) => 
    ((recoveryAmount[idx] / cases) * 100).toFixed(1)
  )

  // Simple dual-line: Assigned vs Recovery
  const assignedVsRecoveryData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Assigned Cases',
        data: assignedCases,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
      },
      {
        label: 'Recovery Amount',
        data: recoveryAmount,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.1)',
        fill: true,
        tension: 0.35,
        borderWidth: 2.5,
        pointRadius: 3,
        pointHoverRadius: 6,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
      },
    ],
  }

  const assignedVsRecoveryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Smooth dual-line with higher tension
  const smoothAssignedVsRecoveryData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Assigned Cases (Smooth)',
        data: assignedCases,
        borderColor: 'rgba(99, 102, 241, 1)',
        backgroundColor: 'rgba(99, 102, 241, 0.15)',
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 2,
        pointHoverRadius: 6,
      },
      {
        label: 'Recovery Amount (Smooth)',
        data: recoveryAmount,
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
        fill: true,
        tension: 0.5,
        borderWidth: 3,
        pointRadius: 2,
        pointHoverRadius: 6,
      },
    ],
  }

  const smoothAssignedVsRecoveryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      filler: {
        propagate: true,
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Dual-axis: Assigned Cases (left) vs Recovery Rate % (right)
  const dualAxisAssignedRecoveryData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Assigned Cases',
        data: assignedCases,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.35,
        yAxisID: 'y',
        borderWidth: 2.5,
        pointRadius: 3,
      },
      {
        label: 'Recovery Rate %',
        data: recoveryRate,
        borderColor: 'rgba(251, 146, 60, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        yAxisID: 'y1',
        borderWidth: 2.5,
        borderDash: [5, 5],
        pointRadius: 3,
      },
    ],
  }

  const dualAxisAssignedRecoveryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            if (context.datasetIndex === 0) {
              return `${context.dataset.label}: ${context.raw}`
            }
            return `${context.dataset.label}: ${context.raw}%`
          },
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        beginAtZero: true,
        title: {
          display: true,
          text: 'Assigned Cases',
        },
        grid: {
          color: 'rgba(59, 130, 246, 0.1)',
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        beginAtZero: true,
        max: 100,
        title: {
          display: true,
          text: 'Recovery Rate %',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  // Bold comparison lines
  const boldAssignedVsRecoveryData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Assigned Cases',
        data: assignedCases,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.08)',
        fill: true,
        tension: 0.3,
        borderWidth: 4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(59, 130, 246, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
      {
        label: 'Recovery Amount',
        data: recoveryAmount,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        fill: true,
        tension: 0.3,
        borderWidth: 4,
        pointRadius: 4,
        pointHoverRadius: 7,
        pointBackgroundColor: 'rgba(34, 197, 94, 1)',
        pointBorderColor: 'white',
        pointBorderWidth: 2,
      },
    ],
  }

  const boldAssignedVsRecoveryOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 12,
        callbacks: {
          label: (context) => `${context.dataset.label}: ${context.raw}`,
        },
      },
    },
    scales: {
      x: commonXAxisConfig,
      y: {
        beginAtZero: true,
        ticks: { precision: 0 },
      },
    },
  }

  // Minimal comparison (no fill, thin lines)
  const minimalComparisonData = {
    labels: dailyLabels,
    datasets: [
      {
        label: 'Assigned Cases',
        data: assignedCases,
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
      {
        label: 'Recovery Amount',
        data: recoveryAmount,
        borderColor: 'rgba(34, 197, 94, 1)',
        backgroundColor: 'transparent',
        fill: false,
        tension: 0.35,
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  }

  const minimalComparisonOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        backgroundColor: 'rgba(51, 65, 85, 0.95)',
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { autoSkip: true, maxTicksLimit: 10 },
      },
      y: {
        beginAtZero: true,
        grid: { color: 'rgba(200, 200, 200, 0.1)' },
      },
    },
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-900">Chart Types Demo</h1>
        </div>

      {/* Bar Chart */}
      <Card title="Bar Chart" subtitle="Ideal for comparing quantities across categories">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <BarChart title="Sales & Revenue Comparison" />
          </div>
        </div>
      </Card>

      {/* Line Chart */}
      <Card title="Line Chart" subtitle="Perfect for showing trends over time">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <LineChart title="Performance Trend" />
          </div>
        </div>
      </Card>

      {/* Pie Chart */}
      <Card title="Pie Chart" subtitle="Shows proportion of parts to a whole">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <PieChart title="Market Share Distribution" />
          </div>
        </div>
      </Card>

      {/* Doughnut Chart */}
      <Card title="Doughnut Chart" subtitle="Similar to pie chart with a hole in the middle">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <DoughnutChart title="Project Status Overview" />
          </div>
        </div>
      </Card>

      {/* Radar Chart */}
      <Card title="Radar Chart" subtitle="Displays multivariate data on axes">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <RadarChart title="Product Comparison" />
          </div>
        </div>
      </Card>

      {/* Polar Area Chart */}
      <Card title="Polar Area Chart" subtitle="Combines aspects of pie and radar charts">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <PolarAreaChart title="Regional Sales Data" />
          </div>
        </div>
      </Card>

      {/* Bubble Chart */}
      <Card title="Bubble Chart" subtitle="Shows relationships between three variables">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <BubbleChart title="Product Performance Analysis" />
          </div>
        </div>
      </Card>

      {/* Stacked Bar Chart */}
      <Card title="Stacked Bar Chart" subtitle="Compares totals and composition in each category">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <StackedBarChart title="Case Status by Region" />
          </div>
        </div>
      </Card>

      {/* Scatter Chart */}
      <Card title="Scatter Chart" subtitle="Highlights clusters and outliers across two numeric dimensions">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <ScatterChart title="Visit vs Collection Efficiency" />
          </div>
        </div>
      </Card>

      {/* Single Line Chart */}
      <Card title="Single Line Chart" subtitle="A clean one-line trend chart like the recovery example you showed">
        <div className="p-4">
          <div style={{ height: '400px', position: 'relative' }}>
            <LineChart
              title="Recovery Trend"
              data={recoveryTrendData}
              options={recoveryTrendOptions}
            />
          </div>
        </div>
      </Card>

      {/* Daily Data Chart Showcase */}
      <Card title="Daily Visits (Your API Data)" subtitle="Attractive, interactive, and responsive views for day-wise values (1-30)">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Interactive Area Trend"
                  data={dailyLineData}
                  options={lineAndBarOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Daily Activity Bars"
                  data={dailyBarData}
                  options={lineAndBarOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <MixedChart
                  title="Daily vs Cumulative (Combo)"
                  data={dailyMixedData}
                  options={mixedOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <DoughnutChart
                  title="Active vs Inactive Days"
                  data={dailyDonutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    cutout: '68%',
                    plugins: {
                      legend: { position: 'bottom' },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Sparse Data Specialized Charts */}
      <Card title="Best Fit Charts for Sparse Daily Data" subtitle="Purpose-built chart types for mostly 0/1 day-wise series">
        <div className="p-4 space-y-6">
          <div className="rounded-lg border border-gray-200 p-4 bg-white">
            <p className="text-sm text-gray-700 mb-3 font-medium">Calendar Heatmap (Day-wise Activity Map)</p>
            <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-2">
              {dailyLabels.map((day, index) => {
                const value = dailyValues[index]
                const isActive = value > 0
                return (
                  <div
                    key={day}
                    title={`Day ${day}: ${value}`}
                    className={`h-12 rounded-md border flex items-center justify-center text-xs font-semibold transition-transform hover:scale-105 ${
                      isActive
                        ? 'bg-green-500 text-white border-green-600 shadow-sm'
                        : 'bg-slate-100 text-slate-500 border-slate-200'
                    }`}
                  >
                    {day}
                  </div>
                )
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Step Line (Discrete Day Changes)"
                  data={stepLineData}
                  options={lineAndBarOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Cumulative Progress Trend"
                  data={cumulativeLineData}
                  options={lineAndBarOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <ScatterChart
                  title="Event Dot Plot (Only Active Days)"
                  data={eventDotData}
                  options={eventDotOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Weekly Aggregate"
                  data={weeklyBarData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      legend: { position: 'top' },
                    },
                    scales: {
                      y: {
                        beginAtZero: true,
                        ticks: { precision: 0 },
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* More Line & Bar Variations */}
      <Card title="More Line & Bar Variations" subtitle="Additional interactive line/bar styles suitable for your day-wise data">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Multi-Line Trend (Actual vs Moving Avg vs Target)"
                  data={multiLineTrendData}
                  options={multiLineOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Horizontal Ranking (Active Days)"
                  data={horizontalActiveData}
                  options={horizontalActiveOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Weekly Active vs Inactive (Stacked)"
                  data={weeklyStackedData}
                  options={weeklyStackedOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Moving Average Focus"
                  data={{
                    labels: dailyLabels,
                    datasets: [
                      {
                        label: '7-Day Moving Avg',
                        data: movingAverageValues,
                        borderColor: 'rgba(139, 92, 246, 1)',
                        backgroundColor: 'rgba(139, 92, 246, 0.18)',
                        fill: true,
                        tension: 0.35,
                        pointRadius: 2,
                        pointHoverRadius: 5,
                      },
                    ],
                  }}
                  options={lineAndBarOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Line Chart Variations */}
      <Card title="Advanced Line Chart Variations" subtitle="Specialized line chart styles for different use cases">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Smooth Spline (High Tension)"
                  data={smoothSplineData}
                  options={lineAndBarOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Confidence Band (90%)"
                  data={confidenceBandData}
                  options={confidenceBandOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Dual-Axis Lines"
                  data={dualAxisLineData}
                  options={dualAxisLineOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Minimal Sparkline (No Axes)"
                  data={sparklineData}
                  options={sparklineOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Step Area with Emphasis"
                  data={stepAreaData}
                  options={stepAreaOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Tension Comparison (0.2, 0.4, 0.6)"
                  data={multiSmoothedData}
                  options={multiSmoothedOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Gradient Fill Band"
                  data={gradientBandData}
                  options={gradientBandOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Bar Chart Variations */}
      <Card title="Advanced Bar Chart Variations" subtitle="Specialized bar chart styles for different use cases">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Grouped Bars (Multiple Categories)"
                  data={groupedBarData}
                  options={groupedBarOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Diverging/Negative-Positive Bars"
                  data={divergingBarData}
                  options={divergingBarOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="100% Stacked (Normalized)"
                  data={normalizedStackedData}
                  options={normalizedStackedOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Bullet Bars (Target vs Actual)"
                  data={bulletBarData}
                  options={bulletBarOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Value-Based Gradient Coloring"
                  data={gradientColorData}
                  options={gradientColorOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Waterfall Chart"
                  data={waterfallData}
                  options={waterfallOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Horizontal Stacked Bars"
                  data={horizontalStackedData}
                  options={horizontalStackedOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <BarChart
                  title="Rounded Bars with Gradient Opacity"
                  data={roundedBarsData}
                  options={roundedBarsOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Advanced Area Chart Variations */}
      <Card title="Advanced Area Chart Variations" subtitle="Specialized area chart styles for different use cases">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Stacked Area (Multiple Series)"
                  data={stackedAreaData}
                  options={stackedAreaOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Smooth Area with Gradient"
                  data={smoothAreaData}
                  options={smoothAreaOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Range Area (Upper/Lower Bounds)"
                  data={rangeAreaData}
                  options={rangeAreaOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Stream Graph (Regional Flow)"
                  data={streamGraphData}
                  options={streamGraphOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Percentage Area (100% Normalized)"
                  data={percentageAreaData}
                  options={percentageAreaOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Step Area (Cumulative)"
                  data={stepCumulativeData}
                  options={stepCumulativeOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Overlaid Areas with Target"
                  data={overlaidAreasData}
                  options={overlaidAreasOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Pyramid Area (Funnel)"
                  data={pyramidAreaData}
                  options={pyramidAreaOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Single-Line Chart Variations */}
      <Card title="Single-Line Chart Variations" subtitle="Different styles and approaches for single-line visualizations">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Bold Line with Large Points"
                  data={boldLineData}
                  options={boldLineOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Minimalist Line (Thin & Clean)"
                  data={minimalistLineData}
                  options={minimalistLineOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Dashed Line (Projected)"
                  data={dashedLineData}
                  options={dashedLineOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Gradient-Colored Points"
                  data={gradientLineData}
                  options={gradientLineOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Shadow Effect Line"
                  data={shadowLineData}
                  options={shadowLineOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Sparkline Style (No Axes)"
                  data={sparklineStyleData}
                  options={sparklineStyleOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Milestone Progress Line"
                  data={milestoneLineData}
                  options={milestoneLineOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Light Area Fill"
                  data={lightAreaLineData}
                  options={lightAreaLineOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Dotted Point Line (Discrete Values)"
                  data={dottedPointLineData}
                  options={dottedPointLineOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Assigned Cases vs Recovery Line Charts */}
      <Card title="Assigned Cases vs Recovery (Line Charts)" subtitle="Compare assigned cases with recovery metrics using various line styles">
        <div className="p-4 space-y-6">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Assigned vs Recovery (Filled)"
                  data={assignedVsRecoveryData}
                  options={assignedVsRecoveryOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Smooth Assigned vs Recovery"
                  data={smoothAssignedVsRecoveryData}
                  options={smoothAssignedVsRecoveryOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Dual-Axis: Cases (Left) vs Recovery % (Right)"
                  data={dualAxisAssignedRecoveryData}
                  options={dualAxisAssignedRecoveryOptions}
                />
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Bold Comparison Lines"
                  data={boldAssignedVsRecoveryData}
                  options={boldAssignedVsRecoveryOptions}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <div className="rounded-lg border border-gray-200 p-3 bg-white">
              <div style={{ height: '360px', position: 'relative' }}>
                <LineChart
                  title="Minimal Comparison (Clean Lines)"
                  data={minimalComparisonData}
                  options={minimalComparisonOptions}
                />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Chart Types Overview */}
      <Card title="Chart Types Reference" subtitle="Quick guide to choosing the right chart">
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 flex flex-col">
              <h3 className="font-semibold text-blue-900 mb-2">Bar Chart</h3>
              <p className="text-sm text-blue-800">Use for comparing values across categories. Works well with many categories.</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200 flex flex-col">
              <h3 className="font-semibold text-purple-900 mb-2">Line Chart</h3>
              <p className="text-sm text-purple-800">Perfect for time-series data and trends. Shows change over time clearly.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg border border-green-200 flex flex-col">
              <h3 className="font-semibold text-green-900 mb-2">Pie Chart</h3>
              <p className="text-sm text-green-800">Shows percentages or proportions. Best with 2-5 slices for clarity.</p>
            </div>
            <div className="p-4 bg-pink-50 rounded-lg border border-pink-200 flex flex-col">
              <h3 className="font-semibold text-pink-900 mb-2">Doughnut Chart</h3>
              <p className="text-sm text-pink-800">Similar to pie with a hole in center. Can display center label.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg border border-orange-200 flex flex-col">
              <h3 className="font-semibold text-orange-900 mb-2">Radar Chart</h3>
              <p className="text-sm text-orange-800">Compare multiple variables. Good for showing strengths and weaknesses.</p>
            </div>
            <div className="p-4 bg-red-50 rounded-lg border border-red-200 flex flex-col">
              <h3 className="font-semibold text-red-900 mb-2">Polar Area Chart</h3>
              <p className="text-sm text-red-800">Angular distribution of data. Combines pie and radar characteristics.</p>
            </div>
            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200 flex flex-col lg:col-span-3">
              <h3 className="font-semibold text-indigo-900 mb-2">Bubble Chart</h3>
              <p className="text-sm text-indigo-800">Shows relationships between three numeric variables using x, y, and size.</p>
            </div>
            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200 flex flex-col">
              <h3 className="font-semibold text-emerald-900 mb-2">Stacked Bar Chart</h3>
              <p className="text-sm text-emerald-800">Best for understanding totals plus category breakdown in each bar.</p>
            </div>
            <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200 flex flex-col">
              <h3 className="font-semibold text-cyan-900 mb-2">Scatter Chart</h3>
              <p className="text-sm text-cyan-800">Useful for finding clusters, relationships, and outliers between two variables.</p>
            </div>
            <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 flex flex-col">
              <h3 className="font-semibold text-amber-900 mb-2">Mixed Combo Chart</h3>
              <p className="text-sm text-amber-800">Combines bars and lines to compare volume and rate in one view.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Implementation Guide */}
      <Card title="Usage Examples" subtitle="How to use charts in your components">
        <div className="p-4 space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Import Charts</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'
import PieChart from '../../components/charts/PieChart'
import MixedChart from '../../components/charts/MixedChart'`}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Basic Usage</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`<div style={{ height: '400px', position: 'relative' }}>
  <BarChart title="My Chart Title" />
</div>`}
            </pre>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Custom Data & Options</h3>
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
{`const customData = {
  labels: ['Q1', 'Q2', 'Q3', 'Q4'],
  datasets: [{
    label: 'Revenue',
    data: [1000, 1500, 1200, 2000],
    backgroundColor: 'rgba(59, 130, 246, 0.7)'
  }]
}

<LineChart title="Quarterly Revenue" data={customData} />
<MixedChart title="Cases vs Recovery" />`}
            </pre>
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}

export default ChartsDemoPage
