import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
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

function RptDaywisedata() {
  const { showError, showSuccess } = useNotification()
  const today = new Date().toISOString().split('T')[0]
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [accountNo, setAccountNo] = useState('')
  const [smaType, setSmaType] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [rows, setRows] = useState([])
  const [searched, setSearched] = useState(false)

  const columns = [
    { label: 'Contract Upload Date', sortable: true },
    { label: 'Account Type', sortable: true },
    {
      label: 'EMI Amount',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    {
      label: 'DIFF IN INT CREDIT',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    {
      label: 'CAP UNPD INT',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    {
      label: 'COLLECTABLE AMOUNT',
      sortable: true,
      render: (value) => Number(value || 0).toLocaleString(undefined, { maximumFractionDigits: 2 }),
    },
    { label: 'SMA Type', sortable: true },
  ]

  const tableRows = useMemo(
    () =>
      rows.map((item) => [
        item.uploadDate || '',
        item.accountType || '',
        item.emiAmount || 0,
        item.diffInt || 0,
        item.capUnpd || 0,
        item.collectable || 0,
        item.sma || '',
      ]),
    [rows]
  )

  const handleSearch = async (event) => {
    event.preventDefault()
    setSearched(true)
    setError('')

    if (!startDate || !endDate) {
      showError('Start Date and End Date are required')
      setError('Start Date and End Date are required')
      return
    }

    const params = {
      startDate: formatDateForApi(startDate),
      endDate: formatDateForApi(endDate),
    }

    if (accountNo.trim()) {
      params.userId = accountNo.trim()
    }

    if (smaType) {
      params.smaType = smaType
    }

    const queryParams = new URLSearchParams(params)

    setLoading(true)
    try {
      const response = await apiClient.get(`/reports/dailyUploadedReport?${queryParams.toString()}`)
      const success = response?.success
      const data = Array.isArray(response?.data) ? response.data : []

      if (!success || !data.length) {
        setRows([])
        showError('No Data Found')
        setError('No Data Found')
        return
      }

      const formatted = data.map((item) => ({
        uploadDate: item.CONTRACTUPLOADDATE || '',
        accountNumber: item.CONTRACTNUMBER || '',
        accountType: item.ACCOUNTTYPE || '',
        emiAmount: item.EMI || 0,
        diffInt: item.DIFF_IN_INT_CREDIT || 0,
        capUnpd: item.CAP_UNPD_INT || 0,
        collectable: item.COLLECTABLEAMOUNT || 0,
        sma: item.VAR_BANKDATA_DPDBUCKET || '',
      }))

      setRows(formatted)
      showSuccess(`Found ${formatted.length} records`)
    } catch (apiError) {
      setRows([])
      showError(apiError.message || 'API Error')
      setError(apiError.message || 'API Error')
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setStartDate('')
    setEndDate('')
    setAccountNo('')
    setSmaType('')
    setRows([])
    setError('')
    setSearched(false)
  }

  return (
    <div className="main-content page-daywise-data-report">
      <div className="page-header">
        <h1 className="page-title">Daily Uploaded Data Report</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Daily Uploaded Data</span>
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
                  Select Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  max={today}
                  className={`form-control ${!startDate && searched ? 'is-invalid' : ''}`}
                  value={startDate}
                  onChange={(event) => setStartDate(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  Select End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  max={today}
                  className={`form-control ${!endDate && searched ? 'is-invalid' : ''}`}
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="accountNo" className="form-label">
                  Account Number
                </label>
                <input
                  id="accountNo"
                  type="text"
                  className="form-control"
                  value={accountNo}
                  onChange={(event) => setAccountNo(event.target.value)}
                  placeholder="Enter account number (optional)"
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
                  <option value="">--Select Option--</option>
                  <option value="SMA0">SMA0</option>
                  <option value="SMA1">SMA1</option>
                  <option value="SMA2">SMA2</option>
                </select>
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Searching...' : 'Search'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={handleClose}>
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

      {rows.length > 0 && (
        <div className="card">
          <div className="card-body">
            <p className="text-muted mb-3">No Of Allocations: {rows.length}</p>
            <ReusableDataGrid rows={tableRows} columns={columns} pageSize={10} />
          </div>
        </div>
      )}
    </div>
  )
}

export default RptDaywisedata