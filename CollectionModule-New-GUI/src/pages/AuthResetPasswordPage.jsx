import { useState } from 'react'
import { Link } from 'react-router-dom'

function AuthResetPasswordPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event) => {
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
    setIsSubmitted(true)
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
        {isSubmitted ? <div className="alert alert-success mb-3">Password reset request submitted successfully.</div> : null}

        <button type="submit" className="btn btn-primary w-100">Reset Password</button>
      </form>

      <p className="fauth-foot-text"><Link to="/auth/login" className="fauth-link"><i className="bi bi-arrow-left" /> Back to login</Link></p>
    </div>
  )
}

export default AuthResetPasswordPage
