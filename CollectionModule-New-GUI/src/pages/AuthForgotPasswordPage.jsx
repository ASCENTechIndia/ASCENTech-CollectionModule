import { useState } from 'react'
import { Link } from 'react-router-dom'

function AuthForgotPasswordPage() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  return (
    <div className="fauth-card fauth-card-sm">
      <div className="fauth-card-head text-center">
        <span className="fauth-icon"><i className="bi bi-key" /></span>
        <h1 className="fauth-title">Forgot password?</h1>
        <p className="fauth-subtitle">Enter your account email and we will send you a reset link.</p>
      </div>

      <form
        className="fauth-form"
        onSubmit={(event) => {
          event.preventDefault()
          setIsSubmitted(true)
        }}
      >
        <div className="fauth-field">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required />
        </div>

        <button type="submit" className="btn btn-primary w-100">Send Reset Link</button>
      </form>

      {isSubmitted ? <div className="alert alert-success mt-3 mb-0">Reset link request submitted successfully.</div> : null}

      <p className="fauth-foot-text"><Link to="/auth/login" className="fauth-link"><i className="bi bi-arrow-left" /> Back to login</Link></p>
    </div>
  )
}

export default AuthForgotPasswordPage
