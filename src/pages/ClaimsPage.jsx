import { Link } from 'react-router-dom'
import { getCurrentUser } from '../services/authService.js'

function ClaimsPage() {
  const user = getCurrentUser()

  if (!user) {
    return (
      <section className="page-card">
        <h2>User Claims Page</h2>

        <div className="status-box warning">
          <p>No signed-in user was found.</p>
          <p>Please sign in first to view sample user claims.</p>
          <Link className="primary-link" to="/signin">
            Go to Sign-In Page
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page-card">
      <h2>User Claims Page</h2>

      <p>
        This page displays sample user claims. After real identity integration, this page can show claims from Okta or Microsoft Entra ID.
      </p>

      <div className="claims-panel">
        {Object.entries(user).map(([key, value]) => (
          <div className="claim-row" key={key}>
            <span className="claim-key">{key}</span>
            <span className="claim-value">{value}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ClaimsPage