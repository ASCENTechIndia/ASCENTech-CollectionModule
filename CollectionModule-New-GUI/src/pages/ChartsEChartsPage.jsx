import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
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

function useEChart(optionFactory) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return undefined
    const chart = echarts.init(ref.current)
    chart.setOption(optionFactory())
    const resize = () => chart.resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      chart.dispose()
    }
  }, [optionFactory])

  return ref
}

function ChartsEChartsPage() {
  const colors = {
    accent: '#3b82f6',
    success: '#22c55e',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4',
    border: 'rgba(148, 163, 184, 0.25)',
    muted: '#64748b',
  }

  const commonGrid = { left: '3%', right: '4%', bottom: '3%', containLabel: true }
  const axisStyle = { color: colors.muted }

  const basicLine = useEChart(() => ({
    tooltip: { trigger: 'axis' },
    grid: commonGrid,
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ name: 'Sales', type: 'line', data: [150, 230, 224, 218, 135, 147, 260], itemStyle: { color: colors.accent }, lineStyle: { width: 3 } }],
  }))
  const smoothLine = useEChart(() => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['Email', 'Direct', 'Search'], textStyle: axisStyle },
    grid: commonGrid,
    xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ name: 'Email', type: 'line', smooth: true, data: [120, 132, 101, 134, 90, 230, 210], itemStyle: { color: colors.accent } }, { name: 'Direct', type: 'line', smooth: true, data: [220, 182, 191, 234, 290, 330, 310], itemStyle: { color: colors.success } }, { name: 'Search', type: 'line', smooth: true, data: [150, 232, 201, 154, 190, 330, 410], itemStyle: { color: colors.warning } }],
  }))
  const stackedLine = useEChart(() => ({
    tooltip: { trigger: 'axis' },
    legend: { data: ['Email', 'Union Ads', 'Video Ads', 'Direct'], textStyle: axisStyle },
    grid: commonGrid,
    xAxis: { type: 'category', boundaryGap: false, data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ name: 'Email', type: 'line', stack: 'Total', data: [120, 132, 101, 134, 90, 230, 210], areaStyle: {}, itemStyle: { color: colors.accent } }, { name: 'Union Ads', type: 'line', stack: 'Total', data: [220, 182, 191, 234, 290, 330, 310], areaStyle: {}, itemStyle: { color: colors.success } }, { name: 'Video Ads', type: 'line', stack: 'Total', data: [150, 232, 201, 154, 190, 330, 410], areaStyle: {}, itemStyle: { color: colors.warning } }, { name: 'Direct', type: 'line', stack: 'Total', data: [320, 332, 301, 334, 390, 330, 320], areaStyle: {}, itemStyle: { color: colors.info } }],
  }))
  const gradientArea = useEChart(() => ({
    tooltip: { trigger: 'axis' },
    grid: commonGrid,
    xAxis: { type: 'category', boundaryGap: false, data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ name: 'Revenue', type: 'line', smooth: true, data: [820, 932, 901, 934, 1290, 1330, 1520], itemStyle: { color: colors.accent }, areaStyle: { color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{ offset: 0, color: colors.accent }, { offset: 1, color: 'rgba(59,130,246,0.05)' }]) } }],
  }))

  const basicBar = useEChart(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: commonGrid,
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ name: 'Sales', type: 'bar', data: [120, 200, 150, 80, 70, 110, 130], itemStyle: { color: colors.accent, borderRadius: [4, 4, 0, 0] } }],
  }))
  const horizontalBar = useEChart(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: commonGrid,
    xAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    yAxis: { type: 'category', data: ['Brazil', 'Indonesia', 'USA', 'India', 'China'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    series: [{ name: 'Users', type: 'bar', data: [18203, 23489, 29034, 104970, 131744], itemStyle: { color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{ offset: 0, color: colors.accent }, { offset: 1, color: colors.success }]), borderRadius: [0, 4, 4, 0] } }],
  }))
  const stackedBar = useEChart(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { textStyle: axisStyle },
    grid: commonGrid,
    xAxis: { type: 'category', data: ['Q1', 'Q2', 'Q3', 'Q4'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ name: 'Product A', type: 'bar', stack: 'total', data: [44, 55, 41, 37], itemStyle: { color: colors.accent } }, { name: 'Product B', type: 'bar', stack: 'total', data: [13, 23, 20, 8], itemStyle: { color: colors.success } }, { name: 'Product C', type: 'bar', stack: 'total', data: [11, 17, 15, 15], itemStyle: { color: colors.warning } }],
  }))
  const waterfall = useEChart(() => ({
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: commonGrid,
    xAxis: { type: 'category', data: ['Start', 'Revenue', 'Cost', 'Tax', 'Profit'], axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle },
    yAxis: { type: 'value', axisLine: { show: false }, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } }, axisLabel: axisStyle },
    series: [{ type: 'bar', data: [0, 100, -40, -15, 45], itemStyle: { color: colors.accent } }],
  }))

  const pie = useEChart(() => ({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: axisStyle },
    series: [{ type: 'pie', radius: '65%', data: [{ value: 44, name: 'Team A' }, { value: 55, name: 'Team B' }, { value: 13, name: 'Team C' }, { value: 33, name: 'Team D' }], label: { color: axisStyle.color }, itemStyle: { borderRadius: 6 } }],
  }))
  const doughnut = useEChart(() => ({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: axisStyle },
    series: [{ type: 'pie', radius: ['45%', '70%'], data: [{ value: 44, name: 'Direct' }, { value: 55, name: 'Social' }, { value: 41, name: 'Search' }, { value: 17, name: 'Email' }], label: { color: axisStyle.color }, itemStyle: { borderRadius: 6 } }],
  }))
  const rose = useEChart(() => ({
    tooltip: { trigger: 'item' },
    legend: { bottom: 0, textStyle: axisStyle },
    series: [{ type: 'pie', radius: [20, 120], roseType: 'area', data: [{ value: 40, name: 'Rose A' }, { value: 38, name: 'Rose B' }, { value: 32, name: 'Rose C' }, { value: 30, name: 'Rose D' }, { value: 28, name: 'Rose E' }, { value: 26, name: 'Rose F' }], label: { color: axisStyle.color } }],
  }))

  const scatter = useEChart(() => ({
    tooltip: { trigger: 'item' },
    grid: commonGrid,
    xAxis: { type: 'value', axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } } },
    series: [{ type: 'scatter', data: [[10, 8], [12, 15], [18, 12], [20, 18], [24, 10], [28, 20]], itemStyle: { color: colors.accent } }],
  }))
  const bubble = useEChart(() => ({
    tooltip: { trigger: 'item' },
    grid: commonGrid,
    xAxis: { type: 'value', axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } } },
    yAxis: { type: 'value', axisLine: { lineStyle: { color: colors.border } }, axisLabel: axisStyle, splitLine: { lineStyle: { color: colors.border, type: 'dashed' } } },
    series: [{ type: 'scatter', data: [[10, 20, 30], [15, 35, 45], [20, 10, 25], [25, 30, 50]], symbolSize: (data) => data[2], itemStyle: { color: colors.success } }],
  }))

  const radar = useEChart(() => ({
    tooltip: {},
    legend: { data: ['Budget', 'Spending'], textStyle: axisStyle },
    radar: { indicator: [{ name: 'Sales', max: 100 }, { name: 'Admin', max: 100 }, { name: 'IT', max: 100 }, { name: 'Support', max: 100 }, { name: 'Marketing', max: 100 }, { name: 'Development', max: 100 }] },
    series: [{ type: 'radar', data: [{ value: [65, 59, 90, 81, 56, 55], name: 'Budget', areaStyle: { color: 'rgba(59,130,246,0.16)' } }, { value: [28, 48, 40, 19, 96, 27], name: 'Spending', areaStyle: { color: 'rgba(34,197,94,0.16)' } }] }],
  }))
  const polar = useEChart(() => ({
    angleAxis: { type: 'category', data: ['A', 'B', 'C', 'D', 'E'], axisLabel: axisStyle },
    radiusAxis: {},
    polar: {},
    series: [{ type: 'bar', data: [120, 200, 150, 80, 70], coordinateSystem: 'polar', itemStyle: { color: colors.accent } }],
  }))

  const basicGauge = useEChart(() => ({
    series: [{ type: 'gauge', progress: { show: true, width: 12 }, detail: { valueAnimation: true, formatter: '{value}%' }, data: [{ value: 67, name: 'Score' }] }],
  }))
  const progressGauge = useEChart(() => ({
    series: [{ type: 'gauge', startAngle: 90, endAngle: -270, progress: { show: true, roundCap: true, width: 18 }, axisLine: { lineStyle: { width: 18 } }, detail: { formatter: '{value}%' }, data: [{ value: 82, name: 'Progress' }] }],
  }))
  const multiRingGauge = useEChart(() => ({
    series: [
      { type: 'gauge', radius: '70%', progress: { show: true, width: 10 }, data: [{ value: 78, name: 'CPU' }] },
      { type: 'gauge', radius: '55%', progress: { show: true, width: 10 }, data: [{ value: 56, name: 'RAM' }] },
      { type: 'gauge', radius: '40%', progress: { show: true, width: 10 }, data: [{ value: 91, name: 'Disk' }] },
    ],
  }))

  const heatmap = useEChart(() => ({
    tooltip: { position: 'top' },
    grid: commonGrid,
    xAxis: { type: 'category', data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], axisLabel: axisStyle },
    yAxis: { type: 'category', data: ['Morning', 'Afternoon', 'Evening'], axisLabel: axisStyle },
    visualMap: { min: 0, max: 30, calculable: true, orient: 'horizontal', left: 'center', bottom: '15' },
    series: [{ type: 'heatmap', data: [[0, 0, 10], [1, 0, 12], [2, 0, 20], [3, 0, 15], [4, 0, 18], [5, 0, 8], [6, 0, 5], [0, 1, 25], [1, 1, 22], [2, 1, 28], [3, 1, 21], [4, 1, 30], [5, 1, 16], [6, 1, 11], [0, 2, 14], [1, 2, 18], [2, 2, 20], [3, 2, 25], [4, 2, 17], [5, 2, 13], [6, 2, 9]] }],
  }))
  const funnel = useEChart(() => ({
    tooltip: { trigger: 'item' },
    series: [{ type: 'funnel', data: [{ value: 60, name: 'Visit' }, { value: 45, name: 'Inquiry' }, { value: 35, name: 'Quote' }, { value: 20, name: 'Negotiation' }, { value: 10, name: 'Closed' }] }],
  }))
  const treemap = useEChart(() => ({
    tooltip: { trigger: 'item' },
    series: [{ type: 'treemap', data: [{ name: 'Electronics', value: 60 }, { name: 'Audio', value: 20 }, { name: 'Wearables', value: 15 }, { name: 'Accessories', value: 5 }] }],
  }))
  const sunburst = useEChart(() => ({
    series: [{ type: 'sunburst', data: [{ name: 'Sales', children: [{ name: 'Online', value: 40 }, { name: 'Retail', value: 30 }, { name: 'Partners', value: 20 }] }] }],
  }))
  const mixed = useEChart(() => ({
    tooltip: { trigger: 'axis' },
    legend: { textStyle: axisStyle },
    grid: commonGrid,
    xAxis: { type: 'category', data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisLabel: axisStyle },
    yAxis: { type: 'value', axisLabel: axisStyle },
    series: [{ type: 'bar', name: 'Revenue', data: [120, 200, 150, 80, 70, 110], itemStyle: { color: colors.accent } }, { type: 'line', name: 'Orders', data: [40, 60, 55, 45, 65, 70], itemStyle: { color: colors.success } }],
  }))

  return (
    <div className="main-content page-charts-echarts">
      <div className="page-header">
        <h1 className="page-title">ECharts</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Charts</span>
          <span className="breadcrumb-item active">ECharts</span>
        </nav>
      </div>

      <section className="section">
        <h5 className="section-title mb-3">Line Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Line Chart"><div className="echart-container" ref={basicLine} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Smooth Line Chart"><div className="echart-container" ref={smoothLine} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stacked Line Chart"><div className="echart-container" ref={stackedLine} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Gradient Area Chart"><div className="echart-container" ref={gradientArea} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Bar Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Basic Bar Chart"><div className="echart-container" ref={basicBar} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Horizontal Bar Chart"><div className="echart-container" ref={horizontalBar} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Stacked Bar Chart"><div className="echart-container" ref={stackedBar} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Waterfall Chart"><div className="echart-container" ref={waterfall} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Pie &amp; Doughnut Charts</h5>
        <div className="row g-4">
          <div className="col-lg-4"><ChartCard title="Pie Chart"><div className="echart-container" ref={pie} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Doughnut Chart"><div className="echart-container" ref={doughnut} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Nightingale Rose Chart"><div className="echart-container" ref={rose} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Scatter &amp; Bubble Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Scatter Chart"><div className="echart-container" ref={scatter} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Bubble Chart"><div className="echart-container" ref={bubble} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Radar &amp; Polar Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Radar Chart"><div className="echart-container" ref={radar} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Polar Bar Chart"><div className="echart-container" ref={polar} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Gauge Charts</h5>
        <div className="row g-4">
          <div className="col-lg-4"><ChartCard title="Basic Gauge"><div className="echart-container" ref={basicGauge} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Progress Gauge"><div className="echart-container" ref={progressGauge} /></ChartCard></div>
          <div className="col-lg-4"><ChartCard title="Multi-Ring Gauge"><div className="echart-container" ref={multiRingGauge} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Advanced Charts</h5>
        <div className="row g-4">
          <div className="col-lg-6"><ChartCard title="Heatmap Chart"><div className="echart-container" ref={heatmap} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Funnel Chart"><div className="echart-container" ref={funnel} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Treemap Chart"><div className="echart-container" ref={treemap} /></ChartCard></div>
          <div className="col-lg-6"><ChartCard title="Sunburst Chart"><div className="echart-container" ref={sunburst} /></ChartCard></div>
        </div>
      </section>

      <section className="section">
        <h5 className="section-title mb-3">Mixed Charts</h5>
        <div className="row g-4">
          <div className="col-12"><ChartCard title="Sales Analytics - Mixed Chart"><div className="echart-container" style={{ height: 350 }} ref={mixed} /></ChartCard></div>
        </div>
      </section>
    </div>
  )
}

export default ChartsEChartsPage
