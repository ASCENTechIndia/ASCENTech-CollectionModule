import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReusableGroupedDataGrid from '../../components/ReusableGroupedDataGrid'
import apiClient from '../../services/apiClient'

/**
 * SMA Summary Report Page
 * Features: Built-in searching, sorting, pagination, and CSV export
 */
function SMASummaryReport() {
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const formatNumber = (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 0 })
  const formatAmount = (value) =>
    Number(value || 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  const formatPercent = (value) => `${Number(value || 0).toFixed(2)}%`

  const headers = [
    {
      displayName: 'SUMMARY',
      children: [
        { displayName: 'SMA_STATUS', field: 'SMA_STATUS' },
        { displayName: 'FROM_SMA', field: 'FROM_SMA' },
      ],
    },
    {
      displayName: 'ALLOCATION DURING THE MONTH',
      children: [
        { displayName: 'ALLOCATED_CASES', field: 'ALLOCATED_CASES', render: formatNumber },
        { displayName: 'TOTAL_COLLECTABLE_AMT', field: 'TOTAL_COLLECTABLE_AMT', render: formatAmount },
      ],
    },
    {
      displayName: 'CF COLLECTED DURING THE MONTH',
      children: [
        { displayName: 'CF_COUNT', field: 'CF_COUNT', render: formatNumber },
        { displayName: 'CF_COLLECTED_AMT', field: 'CF_COLLECTED_AMT', render: formatAmount },
        { displayName: 'CF_COLLECTED_PERC', field: 'CF_COLLECTED_PERC', render: formatPercent },
      ],
    },
    {
      displayName: 'CP COLLECTED DURING THE MONTH',
      children: [
        { displayName: 'CP_COUNT', field: 'CP_COUNT', render: formatNumber },
        { displayName: 'CP_COLLECTED_AMT', field: 'CP_COLLECTED_AMT', render: formatAmount },
        { displayName: 'CP_COLLECTED_PERC', field: 'CP_COLLECTED_PERC', render: formatPercent },
      ],
    },
    {
      displayName: 'MOVED TO SMA2',
      children: [
        { displayName: 'MOVED_TO_SMA2', field: 'MOVED_TO_SMA2', render: formatNumber },
        { displayName: 'COLLECTED_TO_SMA2', field: 'COLLECTED_TO_SMA2', render: formatAmount },
      ],
    },
    {
      displayName: 'MOVED TO SMA1',
      children: [
        { displayName: 'MOVED_TO_SMA1', field: 'MOVED_TO_SMA1', render: formatNumber },
        { displayName: 'COLLECTED_TO_SMA1', field: 'COLLECTED_TO_SMA1', render: formatAmount },
      ],
    },
    {
      displayName: 'MOVED TO SMA0',
      children: [
        { displayName: 'MOVED_TO_SMA0', field: 'MOVED_TO_SMA0', render: formatNumber },
        { displayName: 'COLLECTED_TO_SMA0', field: 'COLLECTED_TO_SMA0', render: formatAmount },
      ],
    },
    {
      displayName: 'MOVED TO STANDARD ASSET',
      children: [
        { displayName: 'MOVED_TO_STANDARD_ASSET', field: 'MOVED_TO_STANDARD_ASSET', render: formatNumber },
        { displayName: 'COLLECTED_TO_STANDARD_ASSET', field: 'COLLECTED_TO_STANDARD_ASSET', render: formatAmount },
      ],
    },
    {
      displayName: 'SLIPPED TO NPA',
      children: [
        { displayName: 'MOVED_TO_NPA_UNPAID', field: 'MOVED_TO_NPA_UNPAID', render: formatNumber },
        { displayName: 'COLLECTED_TO_NPA_UNPAID', field: 'COLLECTED_TO_NPA_UNPAID', render: formatAmount },
      ],
    },
  ]

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await apiClient.get('/reports/smaSummary')
        setReportData(response.data || [])
      } catch (err) {
        console.error('Failed to fetch report:', err)
        setError('Failed to load report data')
      } finally {
        setLoading(false)
      }
    }

    void fetchReportData()
  }, [])

  return (
    <div className="main-content page-sma-summary-report">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">SMA Summary Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">SMA Summary</span>
        </nav>
      </div>

      {/* Error Message */}
      {error && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
          <button type="button" className="btn-close" onClick={() => setError(null)} />
        </div>
      )}

      {/* Data Grid Card */}
      <div className="card">
        <div className="card-body">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
              <p className="mt-2 text-muted">Loading report data...</p>
            </div>
          ) : (
            <ReusableGroupedDataGrid
              rows={reportData}
              headers={headers}
              pageSize={10}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SMASummaryReport