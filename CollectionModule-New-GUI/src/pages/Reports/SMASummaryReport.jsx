import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReusableDataGrid from '../../components/ReusableDataGrid'

/**
 * SMA Summary Report Page
 * Features: Built-in searching, sorting, pagination, and CSV export
 */
function SMASummaryReport() {
  const [reportData, setReportData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Column definitions
  const columns = [
    { label: 'SMA ID', sortable: true, className: 'fw-medium' },
    { label: 'Name', sortable: true },
    { label: 'Territory', sortable: true },
    {
      label: 'Target',
      sortable: true,
      render: (value) => `$${parseFloat(value || 0).toFixed(2)}`,
    },
    {
      label: 'Achieved',
      sortable: true,
      render: (value) => `$${parseFloat(value || 0).toFixed(2)}`,
    },
    {
      label: 'Performance %',
      sortable: true,
      render: (value) => {
        const percentage = parseFloat(value || 0)
        const badgeClass =
          percentage >= 100 ? 'badge-soft-success' : percentage >= 80 ? 'badge-soft-info' : 'badge-soft-warning'
        return <span className={`badge ${badgeClass}`}>{percentage.toFixed(1)}%</span>
      },
    },
    {
      label: 'Status',
      sortable: true,
      render: (value) => {
        const statusClass =
          value === 'Active'
            ? 'badge-soft-success'
            : value === 'Pending'
              ? 'badge-soft-warning'
              : 'badge-soft-danger'
        return <span className={`badge ${statusClass}`}>{value}</span>
      },
    },
    {
      label: 'Last Updated',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      label: 'Actions',
      sortable: false,
      render: () => (
        <div className="table-actions">
          <button className="btn btn-icon btn-sm btn-light" type="button" title="View">
            <i className="bi bi-eye" />
          </button>
          <button className="btn btn-icon btn-sm btn-light" type="button" title="Edit">
            <i className="bi bi-pencil" />
          </button>
          <button className="btn btn-icon btn-sm btn-light" type="button" title="Download">
            <i className="bi bi-download" />
          </button>
        </div>
      ),
    },
  ]

  useEffect(() => {
    const fetchReportData = async () => {
      setLoading(true)
      setError(null)
      try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
        const token = localStorage.getItem('token')

        const response = await fetch(`${API_BASE_URL}/reports/sma-summary`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...(token && { Authorization: `Bearer ${token}` }),
          },
        })

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }

        const data = await response.json()
        setReportData(data.rows || [])
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
            <ReusableDataGrid
              rows={reportData}
              columns={columns}
              pageSize={10}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default SMASummaryReport
