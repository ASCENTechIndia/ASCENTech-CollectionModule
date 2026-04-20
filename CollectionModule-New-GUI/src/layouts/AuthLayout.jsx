import { Link, Outlet } from 'react-router-dom'

function AuthLayout({ split = false, visual = null }) {
  return (
    <div className={`fauth ${split ? 'fauth-split' : 'fauth-centered'}`}>
      {split ? <aside className="fauth-visual">{visual}</aside> : null}

      <main className="fauth-main">
        <div className="fauth-main-inner">
          {!split ? (
            <Link to="/" className="fauth-logo fauth-logo-center">
              <img src="/assets/img/logo.webp" alt="FlexAdmin" />
              <span>FlexAdmin</span>
            </Link>
          ) : null}
          <Outlet />
          <footer className="footer-centered">
            <div className="footer-copyright">&copy; 2026 All Rights Reserved.</div>
          </footer>
        </div>
      </main>
    </div>
  )
}

export default AuthLayout
