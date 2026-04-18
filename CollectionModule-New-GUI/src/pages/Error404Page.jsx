import { Link, useNavigate } from 'react-router-dom'

function Error404Page() {
  const navigate = useNavigate()

  return (
    <div className="fx-error-page fx-error-404">
      <div className="fx-error-bg-shape shape-a" />
      <div className="fx-error-bg-shape shape-b" />

      <div className="fx-error-card">
        <Link to="/" className="fx-error-logo" aria-label="Back to home">
          <img src="/assets/img/logo.webp" alt="FlexAdmin" />
        </Link>
        <span className="fx-error-kicker">Error 404</span>
        <h1 className="fx-error-code">404</h1>
        <h2 className="fx-error-title">We couldn&apos;t find that page</h2>
        <p className="fx-error-text">The link may be outdated or the page may have moved. Try navigating from your workspace home.</p>
        <div className="fx-error-actions">
          <Link to="/" className="btn btn-primary">
            <i className="bi bi-house me-1" /> Back Home
          </Link>
          <button type="button" className="btn btn-outline-secondary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-1" /> Go Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default Error404Page
