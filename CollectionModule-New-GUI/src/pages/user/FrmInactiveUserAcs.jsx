import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import apiClient from '../../services/authService'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/NotificationContext'
import ReusableGroupedDataGrid from '../../components/ReusableGroupedDataGrid'

const FrmInactiveUserAcs = () => {
  const { user } = useAuth()
  const { showWarning, showError, showSuccess } = useNotification()
  const today = new Date().toISOString().split('T')[0]
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startDate: '',
      endDate: '',
      userId: '',
      userDropdownId: 'Inactive',
    },
  })

  const tableHeader = [
    { displayName: 'Unallocated Date', field: 'date' },
    { displayName: 'Collection Associate ID', field: 'collectionID' },
    { displayName: 'Account Number', field: 'accountNumber' },
  ]

  const [tableData, setTableData] = useState([])
  const [showTable, setShowTable] = useState(false)

  function formatDate(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const month = months[date.getMonth()]
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  function formatDateToDDMMYYYY(dateString) {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()
    return `${day}-${month}-${year}`
  }

  const onSearch = async (values) => {
    try {
      const payload = {
        startDate: values.startDate ? formatDate(values.startDate) : '',
        endDate: values.endDate ? formatDate(values.endDate) : '',
        userType: values.userDropdownId,
      }
      const url = `/inactive-user-accounts/search?startDate=${payload.startDate}&endDate=${payload.endDate}&userType=${payload.userType}${values.userId.trim().length > 0 ? `&userId=${values.userId}` : ''}`

      const response = await apiClient.get(url)

      if (response.data.success && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const formattedTableData = response.data.data.map((item) => ({
          date: formatDateToDDMMYYYY(item.UNALLOCATE_DATE),
          collectionID: item.VAR_BANKDATA_USERID,
          accountNumber: item.VAR_BANKDATA_CONTRACTNUM,
        }))
        setTableData(formattedTableData)
        setShowTable(true)
      }
      if (response.data.success && response.data.data.length === 0) {
        showWarning('No records found')
        setShowTable(false)
        setTableData([])
      }
    } catch (error) {
      console.error(error)
      showError(error?.response?.data?.message || error?.message || 'Failed to fetch inactive user accounts')
    }
  }

  // Placeholder for the "Unallocate All Accounts" button action
  const handleUnallocateAll = async () => {
    // TODO: implement API call
    showWarning('Unallocate All Accounts feature not yet implemented')
  }

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Inactive User Accounts</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User Management</span>
          <span className="breadcrumb-item active">Inactive User Accounts</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          {/* Unallocate All Accounts button - centered */}
          <div className="d-flex justify-content-center mb-4">
            <button type="button" className="btn btn-primary" onClick={handleUnallocateAll}>
              Unallocate All Accounts
            </button>
          </div>

          <p className="fw-semibold mb-3">Users Unallocated Accounts</p>

          <form onSubmit={handleSubmit(onSearch)}>
            <div className="row g-3">
              {/* Start Date */}
              <div className="col-md-6">
                <label className="form-label">Select Start Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.startDate ? 'is-invalid' : ''}`}
                  max={today}
                  {...register('startDate', {
                    required: 'Start Date is required',
                    validate: (value) => !value || value <= today || 'Future dates are not allowed',
                  })}
                />
                {errors.startDate && <div className="invalid-feedback">{errors.startDate.message}</div>}
              </div>

              {/* End Date */}
              <div className="col-md-6">
                <label className="form-label">Select End Date</label>
                <input
                  type="date"
                  className={`form-control ${errors.endDate ? 'is-invalid' : ''}`}
                  max={today}
                  {...register('endDate', {
                    required: 'End Date is required',
                    validate: (value) => !value || value <= today || 'Future dates are not allowed',
                  })}
                />
                {errors.endDate && <div className="invalid-feedback">{errors.endDate.message}</div>}
              </div>

              {/* User ID (optional) */}
              <div className="col-md-6">
                <label className="form-label">User Id</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter User ID"
                  {...register('userId')}
                />
              </div>

              {/* User Type Dropdown */}
              <div className="col-md-6">
                <label className="form-label">Select User</label>
                <select
                  className={`form-select ${errors.userDropdownId ? 'is-invalid' : ''}`}
                  {...register('userDropdownId', { required: 'User Type is required' })}
                >
                  <option value="">-- Select Option --</option>
                  <option value="All">All</option>
                  <option value="Inactive">Inactive</option>
                </select>
                {errors.userDropdownId && <div className="invalid-feedback">{errors.userDropdownId.message}</div>}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary">
                Search
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/dashboard')}>
                Close
              </button>
            </div>

            {/* Table */}
            {showTable && (
              <div className="mt-4">
                <ReusableGroupedDataGrid
                  title="Users Unallocated Accounts"
                  headers={tableHeader}
                  rows={tableData}
                />
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmInactiveUserAcs