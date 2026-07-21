import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <section className="page-card">
      <h2>Page Not Found</h2>

      <div className="status-box error">
        <p>The requested page does not exist in the CSJ Azure PaaS POC application.</p>
        <Link className="primary-link" to="/">
          Return to Home
        </Link>
      </div>
    </section>
  )
}

export default ErrorPage