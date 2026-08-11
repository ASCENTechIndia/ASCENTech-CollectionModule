import { useState } from 'react'
import { Link, useSearchParams, useNavigate } from 'react-router-dom'
import authService from '../services/authService'

function AuthResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const userId = searchParams.get('userId')
  const token = searchParams.get('token')

  const handleSubmit = async (event) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const password = String(form.get('password') || '')
    const confirmPassword = String(form.get('confirmPassword') || '')

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      setIsSubmitted(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setIsSubmitted(false)
      return
    }

    setError('')
    setIsLoading(true)
    setIsSubmitted(false)

    try {
      await authService.resetPasswordWithToken(userId, token, password)
      setIsSubmitted(true)
      setTimeout(() => {
        navigate('/auth/login')
      }, 3000)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!token || !userId) {
    return (
      <div className="fauth-card fauth-card-sm">
        <div className="fauth-card-head text-center">
          <span className="fauth-icon text-danger"><i className="bi bi-x-circle" /></span>
          <h1 className="fauth-title">Invalid Link</h1>
          <p className="fauth-subtitle">The password reset link is invalid or missing information.</p>
        </div>
        <p className="fauth-foot-text mt-4 text-center"><Link to="/auth/forgot-password" className="fauth-link">Request a new link</Link></p>
      </div>
    )
  }

  return (
    <div className="fauth-card fauth-card-sm">
      <div className="fauth-card-head text-center">
        <span className="fauth-icon"><i className="bi bi-shield-lock" /></span>
        <h1 className="fauth-title">Set new password</h1>
        <p className="fauth-subtitle">Choose a strong password you have not used before.</p>
      </div>

      <form className="fauth-form" onSubmit={handleSubmit}>
        <div className="fauth-field">
          <label htmlFor="password" className="form-label">New password</label>
          <div className="input-group">
            <input
              type={showPassword ? 'text' : 'password'}
              className="form-control"
              id="password"
              name="password"
              placeholder="New password"
              required
            />
            <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword((value) => !value)}>
              <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>
        </div>

        <div className="fauth-field">
          <label htmlFor="confirmPassword" className="form-label">Confirm password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              className="form-control"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm password"
              required
            />
            <button className="btn btn-outline-secondary" type="button" onClick={() => setShowConfirmPassword((value) => !value)}>
              <i className={`bi ${showConfirmPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
            </button>
          </div>
        </div>

        {error ? <div className="alert alert-danger mb-3">{error}</div> : null}
        {isSubmitted ? <div className="alert alert-success mb-3">Password reset request submitted successfully. Redirecting to login...</div> : null}

        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      <p className="fauth-foot-text"><Link to="/auth/login" className="fauth-link"><i className="bi bi-arrow-left" /> Back to login</Link></p>
    </div>
  )
}

export default AuthResetPasswordPage
