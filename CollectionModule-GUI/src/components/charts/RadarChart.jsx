import React from 'react'
import { Radar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  RadarController,
  RadialLinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Title,
} from 'chart.js'

ChartJS.register(RadarController, RadialLinearScale, PointElement, LineElement, Tooltip, Legend, Title)

export const RadarChart = ({ title = 'Radar Chart', data = null, options = {} }) => {
  const defaultData = {
    labels: ['Speed', 'Reliability', 'Cost', 'Quality', 'Performance', 'Support'],
    datasets: [
      {
        label: 'Product A',
        data: [65, 80, 70, 75, 80, 70],
        borderColor: 'rgba(59, 130, 246, 1)',
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderWidth: 2,
      },
      {
        label: 'Product B',
        data: [70, 75, 80, 65, 75, 85],
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
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
  }

  return <Radar data={data || defaultData} options={{ ...defaultOptions, ...options }} />
}

export default RadarChart
