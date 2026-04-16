import React from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export const StackedBarChart = ({ title = 'Stacked Bar Chart', data = null, options = {} }) => {
  const defaultData = {
    labels: ['North', 'South', 'East', 'West', 'Central'],
    datasets: [
      {
        label: 'Resolved Cases',
        data: [65, 52, 74, 49, 58],
        backgroundColor: 'rgba(34, 197, 94, 0.75)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Pending Cases',
        data: [25, 31, 20, 34, 27],
        backgroundColor: 'rgba(249, 115, 22, 0.75)',
        borderColor: 'rgba(249, 115, 22, 1)',
        borderWidth: 1,
      },
      {
        label: 'Escalated Cases',
        data: [10, 17, 6, 11, 15],
        backgroundColor: 'rgba(239, 68, 68, 0.75)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  }

  const defaultOptions = {
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
      title: {
        display: true,
        text: title,
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItems) => {
            const total = tooltipItems.reduce((sum, item) => sum + item.raw, 0)
            return `Total: ${total}`
          },
        },
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
      },
    },
  }

  return <Bar data={data || defaultData} options={{ ...defaultOptions, ...options }} />
}

export default StackedBarChart