import { Link, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>CSJ Azure PaaS POC</h1>
        <p>Sample React application for Azure Government architecture validation</p>
      </header>

      <nav className="app-nav">
        <Link to="/">Home</Link>
        <Link to="/signin">Sign In</Link>
        <Link to="/claims">User Claims</Link>
        <Link to="/api-test">API Test</Link>
      </nav>

      <main className="app-main">
        <Outlet />
      </main>

      <footer className="app-footer">
        <span>
          POC flow: React front end → identity provider → API or edge endpoint → service layer → backend or mock API
        </span>
      </footer>
    </div>
  )
}

export default Layout