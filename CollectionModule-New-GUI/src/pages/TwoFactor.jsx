export default function TwoFactor() {
  return (
          <div className="fauth-card fauth-card-sm">
            <div className="fauth-card-head text-center">
              <span className="fauth-icon"><i className="bi bi-shield-check"></i></span>
              <h1 className="fauth-title">Two-factor authentication</h1>
              <p className="fauth-subtitle">Enter the 6-digit verification code from your authenticator app.</p>
            </div>

            <form className="fauth-form" noValidate>
              <div className="fauth-field">
                <label className="form-label visually-hidden" htmlFor="otp-1">One-time code</label>
                <div className="fauth-otp">
                  <input id="otp-1" type="text" className="form-control fauth-otp-input" maxLength={1} pattern="[0-9]" inputMode="numeric" required />
                  <input type="text" className="form-control fauth-otp-input" maxLength={1} pattern="[0-9]" inputMode="numeric" required />
                  <input type="text" className="form-control fauth-otp-input" maxLength={1} pattern="[0-9]" inputMode="numeric" required />
                  <span className="fauth-otp-gap">-</span>
                  <input type="text" className="form-control fauth-otp-input" maxLength={1} pattern="[0-9]" inputMode="numeric" required />
                  <input type="text" className="form-control fauth-otp-input" maxLength={1} pattern="[0-9]" inputMode="numeric" required />
                  <input type="text" className="form-control fauth-otp-input" maxLength={1} pattern="[0-9]" inputMode="numeric" required />
                </div>
              </div>

              <button type="submit" className="btn btn-primary w-100">Verify Code</button>
            </form>

            <p className="fauth-foot-text">Can&#39;t access your app? <a href="#" className="fauth-link">Use backup code</a></p>
          </div>
  );
}
