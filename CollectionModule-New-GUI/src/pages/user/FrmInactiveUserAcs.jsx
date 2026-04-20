import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from "../../context/useNotification";

const formatDateForApi = (value) => {
  if (!value) return ''
  const date = new Date(value)
  if (isNaN(date.getTime())) return ''
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const day = String(date.getDate()).padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (isNaN(date.getTime())) return ''
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}-${month}-${year}`
}

function FrmInactiveUserAcs() {
  const { user } = useAuth()
  const { showWarning, showError, showSuccess } = useNotification()
  const navigate = useNavigate()
  const today = new Date().toISOString().split('T')[0]

  // Form state
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userId, setUserId] = useState('')
  const [userDropdownId, setUserDropdownId] = useState('Inactive')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [error, setError] = useState('')

  // Table columns
  const columns = [
    { label: 'Unallocated Date', sortable: true },
    { label: 'Collection Associate ID', sortable: true },
    { label: 'Account Number', sortable: true },
  ]

  // Convert rows to array of arrays for ReusableDataGrid
  const tableRows = rows.map((item) => [
    item.date || '',
    item.collectionID || '',
    item.accountNumber || '',
  ])

  const handleSearch = async (event) => {
    event.preventDefault()
    setError('')
    setSearched(true)

    if (!startDate || !endDate) {
      showError('Start Date and End Date are required')
      setError('Start Date and End Date are required')
      return
    }

    const startDateFormatted = formatDateForApi(startDate)
    const endDateFormatted = formatDateForApi(endDate)
    const trimmedUserId = userId.trim()
    const userType = userDropdownId

    let url = `/inactive-user-accounts/search?startDate=${startDateFormatted}&endDate=${endDateFormatted}&userType=${userType}`
    if (trimmedUserId) url += `&userId=${trimmedUserId}`

    setLoading(true)
    try {
      const response = await apiClient.get(url)

      if (response.success && Array.isArray(response.data) && response.data.length > 0) {
        const formattedData = response.data.map((item) => ({
          date: formatDateToDDMMYYYY(item.UNALLOCATE_DATE),
          collectionID: item.VAR_BANKDATA_USERID,
          accountNumber: item.VAR_BANKDATA_CONTRACTNUM,
        }))
        setRows(formattedData)
        showSuccess(`Found ${formattedData.length} records`)
      } else if (response.success && response.data.length === 0) {
        setRows([])
        showWarning('No records found')
        setError('No records found')
      } else {
        setRows([])
        showError('Unexpected response format')
        setError('Unexpected response format')
      }
    } catch (err) {
      console.error(err)
      setRows([])
      showError(err?.message || 'Failed to fetch inactive user accounts')
      setError(err?.message || 'Failed to fetch inactive user accounts')
    } finally {
      setLoading(false)
    }
  }

  const handleUnallocateAll = async () => {
    // TODO: implement API call
    showWarning('Unallocate All Accounts feature not yet implemented')
  }

  return (
    <div className="main-content">
      <div className="page-header">
        <h1 className="page-title">Inactive User Accounts</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User Management</span>
          <span className="breadcrumb-item active">Inactive User Accounts</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-body">
          <div className="d-flex justify-content-center mb-4">
            <button type="button" className="btn btn-primary" onClick={handleUnallocateAll}>
              Unallocate All Accounts
            </button>
          </div>

          <p className="fw-semibold mb-3">Users Unallocated Accounts</p>

          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Select Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className={`form-control ${!startDate && searched ? 'is-invalid' : ''}`}
                  value={startDate}
                  max={today}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Select End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className={`form-control ${!endDate && searched ? 'is-invalid' : ''}`}
                  value={endDate}
                  max={today}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">User Id</label>
                <input
                  id="userId"
                  type="text"
                  className="form-control"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  placeholder="Enter User ID (optional)"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userType" className="form-label">Select User</label>
                <select
                  id="userType"
                  className="form-select"
                  value={userDropdownId}
                  onChange={(e) => setUserDropdownId(e.target.value)}
                >
                  <option value="">-- Select Option --</option>
                  <option value="All">All</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Close
              </button>
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

export default FrmInactiveUserAcs