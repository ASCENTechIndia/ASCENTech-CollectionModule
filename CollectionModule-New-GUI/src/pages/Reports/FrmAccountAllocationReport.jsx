import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/useNotification'

const formatDateForApi = (value) => {
  if (!value) return ''

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''

  const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const day = String(date.getDate()).padStart(2, '0')
  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${day}-${month}-${year}`
}

function FrmAccountAllocationReport() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showError, showSuccess } = useNotification()
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userId, setUserId] = useState('')
  const [smaType, setSmaType] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [searched, setSearched] = useState(false)

  const columns = [
    { label: 'Collection Associate ID', sortable: true },
    { label: 'Zone', sortable: true },
    { label: 'Region', sortable: true },
    { label: 'Branch', sortable: true },
    { label: 'Allocation Date', sortable: true },
    { label: 'Contract Number', sortable: true },
    { label: 'Disposition Date', sortable: true },
    { label: 'SMA Type', sortable: true },
  ]

  const tableRows = useMemo(
    () =>
      rows.map((item) => [
        item.collectionAssosId || '',
        item.zone || '',
        item.region || '',
        item.branch || '',
        item.allocationDate || '',
        item.contractNo || '',
        item.dispositionDate || '',
        item.smaType || '',
      ]),
    [rows]
  )

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

    const brid = user?.brid || ''
    const branchName = user?.branchName || ''

    const queryParams = new URLSearchParams({
      startDate: startDateFormatted,
      endDate: endDateFormatted,
      userId: trimmedUserId,
      smaType,
      brid,
      branchName,
    })

    setLoading(true)
    try {
      const response = await apiClient.get(`/reports/AccAllocationReport?${queryParams.toString()}`)
      const success = response?.success
      const apiData = Array.isArray(response?.data) ? response.data : []

      if (!success || !apiData.length) {
        setRows([])
        showError('No data found')
        setError('No data found')
        return
      }

      const formattedData = apiData.map((item) => ({
        collectionAssosId: item.ASSIGNEDFOS || '',
        zone: '',
        region: '',
        branch: item.VAR_BANKDATA_BRANCH || '',
        allocationDate: item.CONTRACTALLOCATIONDATE || '',
        contractNo: item.CONTRACTNUMBER || '',
        dispositionDate: item.TRANSDAT || '',
        smaType: '',
      }))

      setRows(formattedData)
      showSuccess(`Found ${formattedData.length} records`)
    } catch (apiError) {
      setRows([])
      showError(apiError.message || 'Something went wrong while fetching report data')
      setError(apiError.message || 'Something went wrong while fetching report data')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-account-allocation-report">
      <div className="page-header">
        <h1 className="page-title">Account Allocation Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Account Allocation</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Search Filters</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSearch}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className={`form-control ${!startDate && searched ? 'is-invalid' : ''}`}
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className={`form-control ${!endDate && searched ? 'is-invalid' : ''}`}
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  className="form-control"
                  value={userId}
                  onChange={(event) => setUserId(event.target.value)}
                  placeholder="Enter User ID (optional)"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="smaType" className="form-label">
                  SMA Type
                </label>
                <select
                  id="smaType"
                  className="form-select"
                  value={smaType}
                  onChange={(event) => setSmaType(event.target.value)}
                >
                  <option value="">Select SMA Type (optional)</option>
                  <option value="SMA1">SMA1</option>
                  <option value="SMA2">SMA2</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
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

export default FrmAccountAllocationReport