import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmLastLoginHistory() {
  const { showError, showWarning } = useNotification()
  const [userId, setUserId] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  const columns = [
    { label: 'User ID', sortable: true },
    { label: 'IP Address', sortable: true },
    { label: 'Login Date', sortable: true },
  ]

  const tableRows = useMemo(
    () => rows.map((item) => [item.userid, item.ipaddress, item.logdate]),
    [rows],
  )

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSearched(true)
    setError('')

    const trimmedUserId = userId.trim()
    if (!trimmedUserId) {
      const message = 'Enter User ID'
      setError(message)
      showError(message)
      return
    }

    if (!/^\d+$/.test(trimmedUserId)) {
      const message = 'User ID must contain numbers only'
      setError(message)
      showError(message)
      return
    }

    setLoading(true)
    try {
      const response = await apiClient.get('/admin/getLastLogin', {
        params: { userId: trimmedUserId },
      })

      const success = response?.success
      const data = Array.isArray(response?.data) ? response.data : []

      if (success && data.length > 0) {
        const mapped = data.map((item) => ({
          userid: String(item.USERID ?? item.userid ?? ''),
          ipaddress: String(item.IP_ADDRESS ?? item.ip_address ?? ''),
          logdate: String(item.LOG_DATE ?? item.log_date ?? ''),
        }))
        setRows(mapped)
      } else {
        setRows([])
        setError('No records found')
        showWarning('No data available')
      }
    } catch (apiError) {
      setRows([])
      const message = apiError?.message || 'Failed to fetch login history'
      setError(message)
      showError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-last-login-history">
      <div className="page-header">
        <h1 className="page-title">Web Users Login History</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">Admin</span>
          <span className="breadcrumb-item active">Last Login History</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Search</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label htmlFor="userId" className="form-label">
                  User ID <span className="text-danger">*</span>
                </label>
                <input
                  id="userId"
                  type="text"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value.replace(/\D/g, ''))}
                  className={`form-control ${!userId.trim() && searched ? 'is-invalid' : ''}`}
                  placeholder="Enter User ID"
                />
              </div>
              <div className="col-md-4 d-grid">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Searching...' : 'Search'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {error && (
        <div className="alert alert-danger" role="alert">
          <i className="bi bi-exclamation-triangle me-2" />
          {error}
        </div>
      )}

      {tableRows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <ReusableDataGrid rows={tableRows} columns={columns} pageSize={10} />
          </div>
        </div>
      )}
    </div>
  )
}

export default FrmLastLoginHistory
