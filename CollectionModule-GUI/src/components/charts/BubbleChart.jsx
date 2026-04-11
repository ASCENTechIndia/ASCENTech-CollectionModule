import React from 'react'
import { Bubble } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(LinearScale, PointElement, Tooltip, Legend, Title)

export const BubbleChart = ({ title = 'Bubble Chart', data = null, options = {} }) => {
  const defaultData = {
    datasets: [
      {
        label: 'Product Category A',
        data: [
          { x: 10, y: 20, r: 15 },
          { x: 15, y: 25, r: 20 },
          { x: 20, y: 30, r: 25 },
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
      {
        label: 'Product Category B',
        data: [
          { x: 25, y: 35, r: 18 },
          { x: 30, y: 40, r: 22 },
          { x: 35, y: 45, r: 28 },
        ],
        backgroundColor: 'rgba(168, 85, 247, 0.6)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
      },
    ],
  }

  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'X Axis',
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Y Axis',
        },
      },
    },
  }

  return <Bubble data={data || defaultData} options={{ ...defaultOptions, ...options }} />
}

export default BubbleChart
