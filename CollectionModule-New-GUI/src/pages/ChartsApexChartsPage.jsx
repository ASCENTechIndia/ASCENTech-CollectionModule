import { useMemo } from 'react'
import ReactApexChart from 'react-apexcharts'
import { Link } from 'react-router-dom'

function ChartCard({ title, children, subtitle }) {
  return (
    <div className="card h-100">
      <div className="card-header">
        <h5 className="card-title mb-1">{title}</h5>
        {subtitle ? <p className="card-subtitle mb-0">{subtitle}</p> : null}
      </div>
      <div className="card-body">{children}</div>
    </div>
  )
}

function ChartsApexChartsPage() {
  const colors = useMemo(() => ({
    accent: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
  }), [])

  const common = useMemo(() => ({
    chart: {
      fontFamily: 'inherit',
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    grid: {
      borderColor: 'rgba(148, 163, 184, 0.25)',
      strokeDashArray: 4,
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth' },
  }), [])

  return (
    <div className="main-content page-charts-apexcharts">
      <div className="page-header">
        <h1 className="page-title">ApexCharts</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Charts</span>
          <span className="breadcrumb-item active">ApexCharts</span>
        </nav>
      </div>

      <section className="section">
        <h5 className="section-title mb-3">Line Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Line Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'line', height: 280 }, colors: [colors.accent], xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] } }} series={[{ name: 'Sales', data: [30, 40, 35, 50, 49, 60, 70] }]} type="line" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Multi-Line Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'line', height: 280 }, colors: [colors.accent, colors.success, colors.warning], legend: { position: 'top', horizontalAlign: 'right' }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] } }} series={[{ name: 'Desktop', data: [45, 52, 38, 24, 33, 26, 21] }, { name: 'Mobile', data: [35, 41, 62, 42, 13, 18, 29] }, { name: 'Tablet', data: [87, 57, 74, 99, 75, 38, 62] }]} type="line" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Gradient Line Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'line', height: 280 }, colors: [colors.accent], fill: { type: 'gradient', gradient: { shade: 'dark', gradientToColors: [colors.success], shadeIntensity: 1, type: 'horizontal', opacityFrom: 1, opacityTo: 1, stops: [0, 100] } }, xaxis: { categories: Array.from({ length: 18 }, (_, i) => i + 1) } }} series={[{ name: 'Likes', data: [4, 3, 10, 9, 29, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 7, 5] }]} type="line" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Step Line Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'line', height: 280 }, colors: [colors.info], stroke: { width: 3, curve: 'stepline' }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] } }} series={[{ name: 'Step Series', data: [34, 44, 54, 21, 12, 43, 33] }]} type="line" height={280} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Area Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Area Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'area', height: 280 }, colors: [colors.accent], fill: { type: 'gradient', gradient: { opacityFrom: 0.45, opacityTo: 0.05 } }, xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] } }} series={[{ name: 'Visitors', data: [31, 40, 28, 51, 42, 109, 100] }]} type="area" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stacked Area Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'area', height: 280, stacked: true }, colors: [colors.accent, colors.success, colors.warning], fill: { type: 'gradient', gradient: { opacityFrom: 0.6, opacityTo: 0.1 } }, legend: { position: 'top', horizontalAlign: 'right' }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] } }} series={[{ name: 'South', data: [31, 40, 28, 51, 42, 109, 100, 120, 80, 95, 110, 85] }, { name: 'North', data: [11, 32, 45, 32, 34, 52, 41, 60, 55, 70, 65, 50] }, { name: 'Central', data: [15, 25, 35, 20, 28, 38, 30, 40, 38, 45, 42, 35] }]} type="area" height={280} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Bar Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Column Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'bar', height: 280 }, colors: [colors.accent], plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'] } }} series={[{ name: 'Sales', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] }]} type="bar" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Grouped Bar Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'bar', height: 280 }, colors: [colors.accent, colors.success], plotOptions: { bar: { borderRadius: 4, columnWidth: '50%' } }, xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] } }} series={[{ name: '2019', data: [44, 55, 41, 37] }, { name: '2020', data: [76, 85, 101, 98] }]} type="bar" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stacked Column Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'bar', stacked: true, height: 280 }, colors: [colors.accent, colors.success, colors.warning], plotOptions: { bar: { borderRadius: 4, columnWidth: '55%' } }, xaxis: { categories: ['Q1', 'Q2', 'Q3', 'Q4'] }, legend: { position: 'top', horizontalAlign: 'right' } }} series={[{ name: 'Product A', data: [44, 55, 41, 37] }, { name: 'Product B', data: [13, 23, 20, 8] }, { name: 'Product C', data: [11, 17, 15, 15] }]} type="bar" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Horizontal Bar Chart"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'bar', height: 280 }, colors: [colors.accent], plotOptions: { bar: { horizontal: true, borderRadius: 4 } }, xaxis: { categories: ['Brazil', 'Indonesia', 'USA', 'India', 'China'] } }} series={[{ name: 'Users', data: [18203, 23489, 29034, 104970, 131744] }]} type="bar" height={280} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Mixed, Pie, and Radial Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Line & Column Mixed"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'line', height: 280 }, colors: [colors.accent, colors.success], stroke: { width: [0, 3], curve: 'smooth' }, xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] } }} series={[{ name: 'Revenue', type: 'column', data: [44, 55, 41, 67, 22, 43] }, { name: 'Orders', type: 'line', data: [11, 17, 15, 15, 21, 14] }]} type="line" height={280} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Multiple Y-Axis"><ReactApexChart options={{ ...common, chart: { ...common.chart, type: 'line', height: 280 }, colors: [colors.accent, colors.warning], stroke: { width: [0, 3], curve: 'smooth' }, yaxis: [{ title: { text: 'Revenue ($)' } }, { opposite: true, title: { text: 'Orders' } }], xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'] } }} series={[{ name: 'Revenue', type: 'column', data: [4400, 5050, 4200, 5800, 4800, 6200] }, { name: 'Orders', type: 'line', data: [44, 55, 41, 67, 45, 72] }]} type="line" height={280} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Pie Chart"><ReactApexChart options={{ chart: { type: 'pie', height: 280 }, colors: [colors.accent, colors.success, colors.warning, colors.info], labels: ['Team A', 'Team B', 'Team C', 'Team D'] }} series={[44, 55, 13, 33]} type="pie" height={280} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Donut Chart"><ReactApexChart options={{ chart: { type: 'donut', height: 280 }, colors: [colors.accent, colors.success, colors.warning, colors.info], labels: ['Direct', 'Social', 'Search', 'Email'] }} series={[44, 55, 41, 17]} type="donut" height={280} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Radial Bar Chart"><ReactApexChart options={{ chart: { type: 'radialBar', height: 280 }, colors: [colors.success], plotOptions: { radialBar: { hollow: { size: '65%' } } }, labels: ['Completion'] }} series={[78]} type="radialBar" height={280} /></ChartCard></div>
        </div>
      </section>
    </div>
  )
}

export default ChartsApexChartsPage
