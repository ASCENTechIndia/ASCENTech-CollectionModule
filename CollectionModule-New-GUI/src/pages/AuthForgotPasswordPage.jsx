import { useState } from 'react'
import { Link } from 'react-router-dom'
import authService from '../services/authService'

function AuthForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  return (
    <div className="fauth-card fauth-card-sm">
      <div className="fauth-card-head text-center">
        <span className="fauth-icon"><i className="bi bi-key" /></span>
        <h1 className="fauth-title">Forgot password?</h1>
        <p className="fauth-subtitle">Enter your account email and we will send you a reset link.</p>
      </div>

      <form
        className="fauth-form"
        onSubmit={async (event) => {
          event.preventDefault()
          setIsLoading(true)
          setError('')
          const form = new FormData(event.currentTarget)
          const email = String(form.get('email') || '')
          
          try {
            await authService.forgotPassword(email)
            setIsSubmitted(true)
          } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.')
          } finally {
            setIsLoading(false)
          }
        }}
      >
        <div className="fauth-field">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required disabled={isLoading} />
        </div>

        {error ? <div className="alert alert-danger mb-3">{error}</div> : null}

        <button type="submit" className="btn btn-primary w-100" disabled={isLoading}>
          {isLoading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {isSubmitted ? <div className="alert alert-success mt-3 mb-0">Reset link request submitted successfully.</div> : null}

      <p className="fauth-foot-text"><Link to="/auth/login" className="fauth-link"><i className="bi bi-arrow-left" /> Back to login</Link></p>
    </div>
  )
}

export default AuthForgotPasswordPage
