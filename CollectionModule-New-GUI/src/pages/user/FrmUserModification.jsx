import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { Search } from 'lucide-react'
import apiClient from '../../services/apiClient'

const FrmUserModification = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      userId: '',
      userName: '',
      userCurrentStatus: '',
    },
  })
  const navigate = useNavigate()
  const webUserId = "test"

  const [userDetails, setUserDetails] = useState({})
  const [openModifyStatusModal, setOpenModifyStatusModal] = useState(false)
  const [newStatus, setNewStatus] = useState('')

  const handleSearch = async (userId) => {
    if (!userId) {
      alert('Enter User ID')
      return
    }
    try {
      const response = await apiClient.get(`/users/search-by-userid?userId=${userId}`)
      if (response?.success) {
        console.log("hearch res :", response)
        setUserDetails(response.data)
        setValue('userName', response.data.userName)
        setValue('userCurrentStatus', response.data.currentStatus)
      }
      else{
        setUserDetails("")
        setValue('userName', "")
        setValue('userCurrentStatus', "")
      }
    } catch (error) {
      console.error(error)
      alert(error?.response?.data?.message || error?.message || 'Failed to fetch user details')
    }
  }

  const handleModifyStatus = async () => {
    try {
      if (!newStatus.length) {
        alert('Please select the status')
        return
      }
      const payload = {
        userId: userDetails?.userId,
        newStatus,
        insBy: webUserId,
      }
      const response = await apiClient.post('/users/modify-status-submit', payload)
      console.log("response :", response)
      if (response.success && response.data.out_ErrorCode === -100) {
        alert(response.data.out_ErrorMsg || 'User status updated successfully')
        setOpenModifyStatusModal(false)
        setNewStatus('')
        handleSearch(userDetails?.userId)
      }
    } catch (error) {
      console.error(error)
      alert(error?.message || 'Failed to update user status')
    }
  }

  return (
    <div className="main-content">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">User Modification</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User Management</span>
          <span className="breadcrumb-item active">User Modification</span>
        </nav>
      </div>

      {/* Form Card */}
      <div className="card">
        <div className="card-body">
          <form>
            {/* User ID Search Section */}
            <div className="row g-3 align-items-end">
              <div className="col-md-8">
                <label className="form-label">
                  User ID <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className={`form-control ${errors.userId ? 'is-invalid' : ''}`}
                  placeholder="Enter User ID"
                  maxLength={20}
                  onInput={(e) => {
                    e.target.value = e.target.value.replace(/\D/g, '')
                  }}
                  {...register('userId', {
                    required: 'User ID is required',
                    validate: (value) => /^\d+$/.test(value) || 'User ID must contain only numbers',
                  })}
                />
                {errors.userId && <div className="invalid-feedback">{errors.userId.message}</div>}
              </div>
              <div className="col-md-4">
                <button
                  type="button"
                  className="btn btn-primary w-100"
                  onClick={handleSubmit((values) => handleSearch(values.userId))}
                >
                  <Search size={18} className="me-1" /> Search
                </button>
              </div>
            </div>

            {/* User Details (read‑only) */}
            <div className="row g-3 mt-3">
              <div className="col-md-6">
                <label className="form-label">User Name</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  {...register('userName')}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">User Current Status</label>
                <input
                  type="text"
                  className="form-control"
                  disabled
                  {...register('userCurrentStatus')}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="d-flex justify-content-center gap-3 mt-4">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (!userDetails?.userName || !userDetails?.currentStatus) {
                    alert('Username and User Current Status cannot be blank')
                    return
                  }
                  setOpenModifyStatusModal(true)
                }}
              >
                Modify Status
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  if (!userDetails?.userName || !userDetails?.currentStatus) {
                    alert('Username and User Current Status cannot be blank')
                    return
                  }
                  navigate('/FrmAccessofPages', {
                    state: { userID: userDetails?.userId },
                  })
                }}
              >
                Page Access
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/dashboard')}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Bootstrap Modal for Modify Status */}
      <div className={`modal fade ${openModifyStatusModal ? 'show d-block' : ''}`} tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} role="dialog">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modify Status</h5>
              <button type="button" className="btn-close" onClick={() => setOpenModifyStatusModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="row mb-3">
                <div className="col-6">
                  <strong>User Id:</strong> {userDetails?.userId}
                </div>
                <div className="col-6">
                  <strong>Current Status:</strong> {userDetails?.currentStatus}
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">New Status <span className="text-danger">*</span></label>
                <select
                  className="form-select"
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                >
                  <option value="">-- Select Status --</option>
                  <option value="A" disabled={userDetails?.currentStatus === 'Active'}>Active</option>
                  <option value="I" disabled={userDetails?.currentStatus === 'Inactive'}>Inactive</option>
                </select>
              </div>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-primary" onClick={handleModifyStatus}>
                Save
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setOpenModifyStatusModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FrmUserModification