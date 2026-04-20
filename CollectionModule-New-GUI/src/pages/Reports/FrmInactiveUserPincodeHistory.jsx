import { Link, useNavigate } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
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

function FrmInactiveUserPincodeHistory() {
  const navigate = useNavigate()
  const { showError, showSuccess, showWarning } = useNotification()
  const {
    register,
    handleSubmit: handleFormSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      userId: '',
    },
  })
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [userId, setUserId] = useState('')
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    { label: 'Inactive Date', sortable: true },
    { label: 'User ID', sortable: true },
    { label: 'Pincode', sortable: true },
  ]

  const tableRows = useMemo(
    () =>
      rows.map((item) => [
        item.inactiveDate || '',
        item.userId || '',
        item.pincode || '',
      ]),
    [rows]
  )

  const handleSearch = async () => {

    const params = {
      startDate: formatDateForApi(startDate),
      endDate: formatDateForApi(endDate),
      userId: userId.trim(),
    }

    const queryParams = new URLSearchParams(params)

    setLoading(true)
    try {
      const response = await apiClient.get(`/reports/inactiveuserPincodeHistory?${queryParams.toString()}`)
      const success = response?.success
      const data = Array.isArray(response?.data) ? response.data : []

      if (!success || !data.length) {
        setRows([])
        showWarning('No data found')
        return
      }

      const formattedData = data.map((item) => ({
        inactiveDate: item.INACTIVE_DATE || '',
        userId: item.VAR_USER_USERID || '',
        pincode: item.VAR_USER_PINCODE || '',
      }))

      setRows(formattedData)
      showSuccess(`Found ${formattedData.length} records`)
    } catch (apiError) {
      setRows([])
      showError(apiError.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-inactive-user-pincode-history">
      <div className="page-header">
        <h1 className="page-title">Inactive User Pincode History</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">
            Home
          </Link>
          <span className="breadcrumb-item">Reports</span>
          <span className="breadcrumb-item active">Inactive User Pincode History</span>
        </nav>
      </div>

      <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title mb-0">Search Filters</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleFormSubmit(handleSearch)}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="startDate" className="form-label">
                  Start Date <span className="text-danger">*</span>
                </label>
                <input
                  id="startDate"
                  type="date"
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                  value={startDate}
                  {...register('startDate', {
                    required: 'Start Date is required',
                    onChange: (event) => setStartDate(event.target.value),
                  })}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="endDate" className="form-label">
                  End Date <span className="text-danger">*</span>
                </label>
                <input
                  id="endDate"
                  type="date"
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                  value={endDate}
                  {...register('endDate', {
                    required: 'End Date is required',
                    onChange: (event) => setEndDate(event.target.value),
                  })}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
              </div>

              <div className="col-md-6">
                <label htmlFor="userId" className="form-label">
                  User ID
                </label>
                <input
                  id="userId"
                  type="text"
                  className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                  value={userId}
                  placeholder="Enter User ID (optional)"
                  inputMode="numeric"
                  maxLength={20}
                  {...register('userId', {
                    validate: (value) => !value || /^\d+$/.test(value) || 'User ID must contain numbers only',
                    onChange: (event) => setUserId(event.target.value.replace(/\D/g, '')),
                  })}
                />
                {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
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

export default FrmInactiveUserPincodeHistory