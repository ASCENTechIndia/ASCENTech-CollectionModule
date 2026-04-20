import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import apiClient from '../../services/apiClient'
import { useNotification } from '../../context/useNotification'

function FrmResetPassword() {
  const navigate = useNavigate()
  const { showSuccess, showError, showWarning } = useNotification()
  const userIdPattern = /^\d+$/

  const [userId, setUserId] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSearched(true)

    const trimmedUserId = userId.trim()
    if (!trimmedUserId) {
      showWarning('Please enter a User ID.')
      return
    }

    if (!userIdPattern.test(trimmedUserId)) {
      showError('User ID must contain numbers only')
      return
    }

    setLoading(true)
    setNewPassword('')

    try {
      const response = await apiClient.post('/password/resetPassword', { userId: trimmedUserId })
      const success = response?.success
      const data = response?.data || {}

      if (success && data?.success) {
        setNewPassword(String(data.Password || ''))
        showSuccess(data.message || 'Password reset successfully')
        setUserId('')
        setSearched(false)
      } else {
        showError(data?.message || response?.message || 'Reset failed')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="main-content page-reset-password">
      <div className="page-header">
        <h1 className="page-title">Reset Password</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">Reset Password</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label d-flex align-items-center gap-2">
                <input type="radio" name="resetType" value="loginPassword" defaultChecked />
                <span>Login Password</span>
              </label>
            </div>

            <div className="mb-3">
              <label htmlFor="resetUserId" className="form-label">
                User ID <span className="text-danger">*</span>
              </label>
              <input
                id="resetUserId"
                type="text"
                value={userId}
                onChange={(event) => setUserId(event.target.value.replace(/\D/g, ''))}
                placeholder="Enter User ID"
                className={`form-control ${searched && (!userId.trim() || !userIdPattern.test(userId.trim())) ? 'is-invalid' : ''}`}
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={20}
              />
              {searched && !userId.trim() && <div className="invalid-feedback">User ID is required.</div>}
              {searched && userId.trim() && !userIdPattern.test(userId.trim()) && (
                <div className="invalid-feedback">User ID must contain numbers only.</div>
              )}
            </div>

            {newPassword && (
              <div className="mb-3">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input id="newPassword" type="text" className="form-control" value={newPassword} readOnly />
              </div>
            )}

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? 'Resetting...' : 'Reset'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmResetPassword
