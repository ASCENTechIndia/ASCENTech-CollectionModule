import React from 'react'
import { Scatter } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(LinearScale, PointElement, Title, Tooltip, Legend)

export const ScatterChart = ({ title = 'Scatter Chart', data = null, options = {} }) => {
  const defaultData = {
    datasets: [
      {
        label: 'High Performers',
        data: [
          { x: 12, y: 74 },
          { x: 18, y: 88 },
          { x: 25, y: 92 },
          { x: 31, y: 96 },
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
      },
      {
        label: 'Needs Attention',
        data: [
          { x: 5, y: 34 },
          { x: 9, y: 46 },
          { x: 14, y: 39 },
          { x: 16, y: 51 },
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
      },
    ],
  }

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: 'nearest',
      intersect: true,
    },
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const { x, y } = context.raw
            return `${context.dataset.label}: X=${x}, Y=${y}`
          },
        },
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Visit Count',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Collection Efficiency %',
        },
      },
    },
  }

  return <Scatter data={data || defaultData} options={{ ...defaultOptions, ...options }} />
}

export default ScatterChart