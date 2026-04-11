import React from 'react'
import { Card } from '../../components/ui'
import BarChart from '../../components/charts/BarChart'
import LineChart from '../../components/charts/LineChart'
import PieChart from '../../components/charts/PieChart'
import DoughnutChart from '../../components/charts/DoughnutChart'
import RadarChart from '../../components/charts/RadarChart'
import PolarAreaChart from '../../components/charts/PolarAreaChart'
import BubbleChart from '../../components/charts/BubbleChart'

export const ChartsDemoPage = () => {
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
import PieChart from '../../components/charts/PieChart'`}
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

<LineChart title="Quarterly Revenue" data={customData} />`}
            </pre>
          </div>
        </div>
      </Card>
      </div>
    </div>
  )
}

export default ChartsDemoPage
