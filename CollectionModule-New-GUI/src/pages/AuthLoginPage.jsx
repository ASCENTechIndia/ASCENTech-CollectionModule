import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useNotification } from '../context/useNotification'

function AuthLoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  const { login } = useAuth()
  const { showError, showSuccess } = useNotification()

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (!userId.trim() || !password) {
      showError('User ID and Password are required')
      return
    }

    setSubmitting(true)
    try {
      await login({ userId: userId.trim(), password })
      showSuccess('Login successful')
      navigate('/')
    } catch (error) {
      showError(error?.message || 'Login failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <div className="fauth-card">
        <div className="fauth-card-head">
          <h1 className="fauth-title">Collection Module Login</h1>
          <p className="fauth-subtitle">Sign in to continue to your collection dashboard.</p>
        </div>

        <form className="fauth-form" onSubmit={handleSubmit}>
          <div className="fauth-field">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              id="userId"
              name="userId"
              placeholder="Enter Collection User ID"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              required
            />
          </div>

          <div className="fauth-field">
            <div className="fauth-row-between">
              <label htmlFor="password" className="form-label">Password</label>
              <Link to="/auth/forgot-password" className="fauth-link">Forgot password?</Link>
            </div>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Collection password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword((value) => !value)}>
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>


       <button 
  type="submit" 
  className="btn btn-primary w-100 mt-3" 
  disabled={submitting}
>
  {submitting ? 'Signing in...' : 'Sign In'}
</button>
        </form>
      </div>
    </>
  )
}

export default AuthLoginPage
