import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Chart from 'chart.js/auto'

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

function useChart(setup) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const context = canvasRef.current?.getContext('2d')
    if (!context) return undefined

    const chart = setup(context)
    return () => chart?.destroy?.()
  }, [setup])

  return canvasRef
}

function ChartsChartJsPage() {
  const commonColors = {
    accent: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    info: '#06b6d4',
    danger: '#ef4444',
  }

  const line1 = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Sales', data: [30, 40, 35, 50, 49, 60, 70], borderColor: commonColors.accent, tension: 0.4, fill: false }] },
    options: { responsive: true, plugins: { legend: { display: false } } },
  }))
  const line2 = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], datasets: [{ label: 'Desktop', data: [45, 52, 38, 24, 33, 26, 21], borderColor: commonColors.accent }, { label: 'Mobile', data: [35, 41, 62, 42, 13, 18, 29], borderColor: commonColors.success }, { label: 'Tablet', data: [87, 57, 74, 99, 75, 38, 62], borderColor: commonColors.warning }] },
    options: { responsive: true },
  }))
  const interpolation = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'], datasets: [{ label: 'Cubic', data: [20, 35, 25, 45, 30, 55, 40, 60, 50, 70], borderColor: commonColors.accent, tension: 0.4 }, { label: 'Linear', data: [15, 30, 20, 40, 25, 50, 35, 55, 45, 65], borderColor: commonColors.success, tension: 0 }] },
    options: { responsive: true },
  }))
  const stepped = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'], datasets: [{ label: 'Before', data: [5, 10, 15, 10, 20, 15, 25], borderColor: commonColors.accent, stepped: 'before' }, { label: 'After', data: [10, 15, 20, 25, 20, 30, 35], borderColor: commonColors.success, stepped: 'after' }] },
    options: { responsive: true },
  }))

  const area1 = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'Visitors', data: [31, 40, 28, 51, 42, 109, 100], borderColor: commonColors.accent, backgroundColor: 'rgba(59,130,246,.2)', fill: true, tension: 0.4 }] },
    options: { responsive: true },
  }))
  const area2 = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], datasets: [{ label: 'Organic', data: [31, 40, 28, 51, 42, 49, 60, 55, 70, 65, 75, 80], borderColor: commonColors.accent, backgroundColor: 'rgba(59,130,246,.18)', fill: true, tension: 0.4 }, { label: 'Paid', data: [11, 32, 45, 32, 34, 52, 41, 60, 55, 70, 65, 50], borderColor: commonColors.success, backgroundColor: 'rgba(34,197,94,.18)', fill: true, tension: 0.4 }, { label: 'Direct', data: [15, 25, 35, 20, 28, 38, 30, 40, 38, 45, 42, 35], borderColor: commonColors.warning, backgroundColor: 'rgba(245,158,11,.18)', fill: true, tension: 0.4 }] },
    options: { responsive: true },
  }))

  const bar1 = useChart((context) => new Chart(context, {
    type: 'bar',
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ label: 'Sales', data: [12, 19, 15, 25, 22, 30], backgroundColor: commonColors.accent }] },
    options: { responsive: true },
  }))
  const bar2 = useChart((context) => new Chart(context, {
    type: 'bar',
    data: { labels: ['Brazil', 'Indonesia', 'USA', 'India', 'China'], datasets: [{ label: 'Users', data: [18203, 23489, 29034, 104970, 131744], backgroundColor: [commonColors.accent, commonColors.success, commonColors.warning, commonColors.info, commonColors.danger] }] },
    options: { responsive: true, indexAxis: 'y' },
  }))
  const bar3 = useChart((context) => new Chart(context, {
    type: 'bar',
    data: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], datasets: [{ label: 'Product A', data: [44, 55, 41, 37], backgroundColor: commonColors.accent }, { label: 'Product B', data: [13, 23, 20, 8], backgroundColor: commonColors.success }, { label: 'Product C', data: [11, 17, 15, 15], backgroundColor: commonColors.warning }] },
    options: { responsive: true, scales: { x: { stacked: true }, y: { stacked: true } } },
  }))
  const bar4 = useChart((context) => new Chart(context, {
    type: 'bar',
    data: { labels: ['Q1', 'Q2', 'Q3', 'Q4'], datasets: [{ label: '2019', data: [44, 55, 41, 37], backgroundColor: commonColors.accent }, { label: '2020', data: [76, 85, 101, 98], backgroundColor: commonColors.success }] },
    options: { responsive: true },
  }))

  const pie = useChart((context) => new Chart(context, {
    type: 'pie',
    data: { labels: ['Team A', 'Team B', 'Team C', 'Team D'], datasets: [{ data: [44, 55, 13, 33], backgroundColor: [commonColors.accent, commonColors.success, commonColors.warning, commonColors.info] }] },
    options: { responsive: true },
  }))
  const doughnut = useChart((context) => new Chart(context, {
    type: 'doughnut',
    data: { labels: ['Direct', 'Social', 'Search', 'Email'], datasets: [{ data: [44, 55, 41, 17], backgroundColor: [commonColors.accent, commonColors.success, commonColors.warning, commonColors.info] }] },
    options: { responsive: true },
  }))
  const doughnutCenter = useChart((context) => new Chart(context, {
    type: 'doughnut',
    data: { labels: ['Complete', 'Remaining'], datasets: [{ data: [75, 25], backgroundColor: [commonColors.success, 'rgba(148,163,184,.2)'], borderWidth: 0 }] },
    options: { responsive: true, cutout: '75%' },
  }))

  const radar = useChart((context) => new Chart(context, {
    type: 'radar',
    data: { labels: ['Design', 'Development', 'Marketing', 'Sales', 'Support', 'Management'], datasets: [{ label: 'Current', data: [65, 59, 90, 81, 56, 55], backgroundColor: 'rgba(59,130,246,.2)', borderColor: commonColors.accent }, { label: 'Previous', data: [28, 48, 40, 19, 96, 27], backgroundColor: 'rgba(34,197,94,.2)', borderColor: commonColors.success }] },
    options: { responsive: true },
  }))
  const polar = useChart((context) => new Chart(context, {
    type: 'polarArea',
    data: { labels: ['Red', 'Green', 'Yellow', 'Grey', 'Blue'], datasets: [{ data: [11, 16, 7, 3, 14], backgroundColor: [commonColors.danger, commonColors.success, commonColors.warning, 'rgba(148,163,184,.6)', commonColors.accent] }] },
    options: { responsive: true },
  }))
  const scatter = useChart((context) => new Chart(context, {
    type: 'scatter',
    data: { datasets: [{ label: 'Scatter', data: [{ x: -10, y: 0 }, { x: 0, y: 10 }, { x: 5, y: 5 }, { x: 15, y: 15 }, { x: 18, y: 8 }, { x: 25, y: 18 }], backgroundColor: commonColors.accent }] },
    options: { responsive: true },
  }))
  const bubble = useChart((context) => new Chart(context, {
    type: 'bubble',
    data: { datasets: [{ label: 'Bubble', data: [{ x: 20, y: 30, r: 15 }, { x: 40, y: 10, r: 10 }, { x: 15, y: 50, r: 25 }], backgroundColor: commonColors.success }] },
    options: { responsive: true },
  }))
  const mixed = useChart((context) => new Chart(context, {
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ type: 'bar', label: 'Revenue', data: [65, 59, 80, 81, 56, 55], backgroundColor: commonColors.accent }, { type: 'line', label: 'Orders', data: [28, 48, 40, 19, 86, 27], borderColor: commonColors.success }] },
    options: { responsive: true },
  }))
  const multiAxis = useChart((context) => new Chart(context, {
    data: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], datasets: [{ type: 'bar', label: 'Revenue', data: [65, 59, 80, 81, 56, 55], yAxisID: 'y', backgroundColor: commonColors.accent }, { type: 'line', label: 'Conversion', data: [28, 48, 40, 19, 86, 27], yAxisID: 'y1', borderColor: commonColors.success }] },
    options: { responsive: true, scales: { y: { position: 'left' }, y1: { position: 'right', grid: { drawOnChartArea: false } } } },
  }))
  const interactive = useChart((context) => new Chart(context, {
    type: 'line',
    data: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], datasets: [{ label: 'This Week', data: [120, 190, 130, 170, 140, 210, 180], borderColor: commonColors.accent }, { label: 'Last Week', data: [90, 120, 110, 150, 135, 160, 145], borderColor: commonColors.success }] },
    options: { responsive: true },
  }))

  return (
    <div className="main-content page-charts-chartjs">
      <div className="page-header">
        <h1 className="page-title">Chart.js</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Charts</span>
          <span className="breadcrumb-item active">Chart.js</span>
        </nav>
      </div>

      <section className="section">
        <h5 className="section-title mb-3">Line Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Line Chart"><canvas ref={line1} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Multi-Line Chart"><canvas ref={line2} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Interpolation Modes"><canvas ref={interpolation} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stepped Line Chart"><canvas ref={stepped} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Area Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Area Chart"><canvas ref={area1} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stacked Area Chart"><canvas ref={area2} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Bar Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Vertical Bar Chart"><canvas ref={bar1} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Horizontal Bar Chart"><canvas ref={bar2} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stacked Bar Chart"><canvas ref={bar3} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Grouped Bar Chart"><canvas ref={bar4} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Pie &amp; Doughnut Charts</h5>
        <div className="row g-4">
          <div className="col-lg-4"><ChartCard title="Pie Chart"><canvas ref={pie} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Doughnut Chart"><canvas ref={doughnut} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Doughnut with Center Text"><div className="position-relative"><canvas ref={doughnutCenter} /><div className="chart-center-text"><div className="chart-center-value">75%</div><div className="chart-center-label">Complete</div></div></div></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Other Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Radar Chart"><canvas ref={radar} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Polar Area Chart"><canvas ref={polar} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Scatter Chart"><canvas ref={scatter} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Bubble Chart"><canvas ref={bubble} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Mixed Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Line &amp; Bar Mixed"><canvas ref={mixed} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Multi-Axis Chart"><canvas ref={multiAxis} /></ChartCard></div>
          <div className="col-12"><ChartCard title="Sales Performance"><canvas ref={interactive} height={100} /></ChartCard></div>
        </div>
      </section>
    </div>
  )
}

export default ChartsChartJsPage
