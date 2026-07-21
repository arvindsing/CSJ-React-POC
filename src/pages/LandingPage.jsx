function LandingPage() {
  return (
    <section className="page-card">
      <h2>CSJ Azure PaaS POC</h2>

      <p className="subtitle">
        Sample React application for Azure Government architecture validation
      </p>

      <p>
        This sample application is used to validate the proposed Azure PaaS architecture pattern in Azure Government before applying the pattern to the production application.
      </p>

      <div className="info-grid">
        <div>
          <h3>POC Purpose</h3>
          <p>
            Validate React front-end hosting, identity integration, API access, monitoring, and security controls.
          </p>
        </div>

        <div>
          <h3>Target Flow</h3>
          <p>
            React front end → identity provider → API or edge entry point → application service layer → backend or mock API.
          </p>
        </div>

        <div>
          <h3>Current Phase</h3>
          <p>
            Local sample application setup before connecting real identity, API gateway, service layer, and Azure deployment.
          </p>
        </div>
      </div>
    </section>
  )
}

export default LandingPage