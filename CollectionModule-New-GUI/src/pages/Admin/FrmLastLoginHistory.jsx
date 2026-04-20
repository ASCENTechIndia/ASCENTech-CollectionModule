import { Link } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import ReusableDataGrid from '../../components/ReusableDataGrid'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmLastLoginHistory() {
  const { showError, showWarning } = useNotification()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      userId: '',
    },
  })
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)

  const columns = [
    { label: 'User ID', sortable: true },
    { label: 'IP Address', sortable: true },
    { label: 'Login Date', sortable: true },
  ]

  const tableRows = useMemo(
    () => rows.map((item) => [item.userid, item.ipaddress, item.logdate]),
    [rows],
  )

  const onSubmit = async (values) => {
    const trimmedUserId = String(values.userId || '').trim()

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
        showWarning('No data available')
      }
    } catch (apiError) {
      setRows([])
      const message = apiError?.message || 'Failed to fetch login history'
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label htmlFor="userId" className="form-label">
                  User ID <span className="text-danger">*</span>
                </label>
                <input
                  id="userId"
                  type="text"
                  className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                  placeholder="Enter User ID"
                  maxLength={20}
                  inputMode="numeric"
                  value={userId}
                  {...register('userId', {
                    required: 'Enter User ID',
                    pattern: {
                      value: /^\d+$/,
                      message: 'User ID must contain numbers only',
                    },
                    onChange: (event) => setUserId(event.target.value.replace(/\D/g, '')),
                  })}
                />
                {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
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
