import { useState } from 'react'
import { Link } from 'react-router-dom'

function AuthLoginPage() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <>
      <div className="fauth-card">
        <div className="fauth-card-head">
          <h1 className="fauth-title">Welcome back</h1>
          <p className="fauth-subtitle">Sign in to continue to your FlexAdmin workspace.</p>
        </div>

        <form className="fauth-form" onSubmit={(event) => event.preventDefault()}>
          <div className="fauth-field">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" required />
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
                placeholder="Enter your password"
                required
              />
              <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword((value) => !value)}>
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
          </div>

          <div className="fauth-row-between mb-3">
            <div className="form-check mb-0">
              <input className="form-check-input" type="checkbox" id="remember" name="remember" />
              <label className="form-check-label" htmlFor="remember">Remember me</label>
            </div>
            <a href="#" className="fauth-link" onClick={(event) => event.preventDefault()}>Use lock screen</a>
          </div>

          <button type="submit" className="btn btn-primary w-100">Sign In</button>

          <div className="fauth-divider"><span>or continue with</span></div>

          <div className="fauth-social">
            <button type="button" className="btn btn-outline-secondary"><i className="bi bi-google" /> Google</button>
            <button type="button" className="btn btn-outline-secondary"><i className="bi bi-github" /> GitHub</button>
          </div>
        </form>

        <p className="fauth-foot-text">Don't have an account? <a href="#" className="fauth-link" onClick={(event) => event.preventDefault()}>Create one</a></p>
      </div>
    </>
  )
}

export default AuthLoginPage
