import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNotification } from '../../context/useNotification'
import apiClient from '../../services/apiClient'

function FrmChangePassword() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { showSuccess, showError } = useNotification()
  const userIdPattern = /^\d+$/
  const newPasswordPattern = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/

  const userId = user?.userId || user?.userid || ''

  const [username, setUsername] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [usernameDisabled, setUsernameDisabled] = useState(true)
  const [userInfoLoading, setUserInfoLoading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (!userId) return

    const fetchUserInfo = async () => {
      setUserInfoLoading(true)
      try {
        const res = await apiClient.get('/password/desgidandusertype', {
          params: { userId },
        })

        const rows = Array.isArray(res?.data) ? res.data : []
        const first = rows[0] || {}
        const desgId = Number(first.NUM_USERMST_DESGID)
        const userType = Number(first.NUM_USERMST_USERTYPE)

        if (desgId === 1 && userType === 3) {
          setUsernameDisabled(false)
          setUsername('')
        } else {
          setUsername(String(userId))
          setUsernameDisabled(true)
        }
      } catch (apiError) {
        showError(apiError?.message || 'Failed to fetch user info')
      } finally {
        setUserInfoLoading(false)
      }
    }

    fetchUserInfo()
  }, [userId, showError])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitted(true)

    if (!username.trim() || !oldPassword || !newPassword || !confirmPassword) {
      showError('All fields are required')
      return
    }

    if (!userIdPattern.test(username.trim())) {
      showError('User ID must contain numbers only')
      return
    }

    if (!newPasswordPattern.test(newPassword)) {
      showError('New Password must be at least 8 characters and include letters and numbers')
      return
    }

    if (newPassword !== confirmPassword) {
      showError('Passwords do not match')
      return
    }

    setSubmitting(true)
    try {
      const res = await apiClient.post('/password/changePassword', {
        userId: username.trim(),
        oldPassword,
        newPassword,
      })

      const success = res?.success
      const data = res?.data || {}
      if (success && Number(data.out_ErrorCode) === 9999) {
        showSuccess(data.out_ErrorMsg || 'Password changed successfully')
        setOldPassword('')
        setNewPassword('')
        setConfirmPassword('')
        setSubmitted(false)
      } else {
        showError(data.out_ErrorMsg || 'Something went wrong')
      }
    } catch (apiError) {
      showError(apiError?.message || 'Failed to change password. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="main-content page-change-password">
      <div className="page-header">
        <h1 className="page-title">Change Password</h1>
        <nav className="breadcrumb">
          <Link to="/" className="breadcrumb-item">Home</Link>
          <span className="breadcrumb-item">User</span>
          <span className="breadcrumb-item active">Change Password</span>
        </nav>
      </div>

      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="username" className="form-label">User Name <span className="text-danger">*</span></label>
                <input
                  id="username"
                  type="text"
                  className={`form-control ${submitted && (!username.trim() || !userIdPattern.test(username.trim())) ? 'is-invalid' : ''}`}
                  disabled={usernameDisabled}
                  value={username}
                  onChange={(event) => setUsername(event.target.value.replace(/\D/g, ''))}
                  placeholder={userInfoLoading ? 'Loading...' : 'Enter User Name'}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={20}
                />
                {submitted && !username.trim() && <div className="invalid-feedback">User ID is required.</div>}
                {submitted && username.trim() && !userIdPattern.test(username.trim()) && (
                  <div className="invalid-feedback">User ID must contain numbers only.</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="oldPassword" className="form-label">Old Password <span className="text-danger">*</span></label>
                <input
                  id="oldPassword"
                  type="password"
                  className="form-control"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  placeholder="Enter Old Password"
                />
              </div>

              <div className="col-md-6">
                <label htmlFor="newPassword" className="form-label">New Password <span className="text-danger">*</span></label>
                <input
                  id="newPassword"
                  type="password"
                  className={`form-control ${submitted && (!newPassword || !newPasswordPattern.test(newPassword)) ? 'is-invalid' : ''}`}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="Enter New Password"
                />
                {submitted && !newPassword && <div className="invalid-feedback">New Password is required.</div>}
                {submitted && newPassword && !newPasswordPattern.test(newPassword) && (
                  <div className="invalid-feedback">Must be 8+ chars with letters and numbers.</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password <span className="text-danger">*</span></label>
                <input
                  id="confirmPassword"
                  type="password"
                  className={`form-control ${submitted && (!confirmPassword || confirmPassword !== newPassword) ? 'is-invalid' : ''}`}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Re-enter New Password"
                />
                {submitted && !confirmPassword && <div className="invalid-feedback">Confirm Password is required.</div>}
                {submitted && confirmPassword && confirmPassword !== newPassword && (
                  <div className="invalid-feedback">Passwords do not match.</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-center gap-3 mt-4">
              <button type="submit" className="btn btn-primary" disabled={submitting || userInfoLoading}>
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default FrmChangePassword
