import React from 'react'
import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

export const LineChart = ({ title = 'Line Chart', data = null, options = {} }) => {
  const defaultData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Target',
        data: [70, 70, 70, 70, 70, 70],
        borderColor: 'rgba(34, 197, 94, 1)',
        borderDash: [5, 5],
        fill: false,
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
  }

  return <Line data={data || defaultData} options={{ ...defaultOptions, ...options }} />
}

export default LineChart
