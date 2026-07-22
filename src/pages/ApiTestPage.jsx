import { useState } from 'react'

function ApiTestPage() {
  const [loading, setLoading] = useState(false)
  const [apiResult, setApiResult] = useState(null)
  const [error, setError] = useState(null)

  // const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '/mock-api-response.json'
  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'https://app-sj311react-api-poc-test.azurewebsites.net';

  async function callApi() {
    setLoading(true)
    setApiResult(null)
    setError(null)

    try {
      const response = await fetch(`${apiBaseUrl}/api/311-ticket/preview`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-correlation-id': crypto.randomUUID(),
        },
        body: JSON.stringify({
          requestType: 'Service Request',
          description: 'Streetlight outage near test location',
          submittedBy: 'ResidentTestUser',
        }),
      })

      if (!response.ok) {
        throw new Error(`API call failed with status ${response.status}`)
      }

      const data = await response.json()
      setApiResult(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="page-card">
      <h2>API Test Page</h2>

      <p>
        This page validates that the React front end can call an API endpoint. The initial version calls a local mock API response. Later, this can point to API Management or the application service layer.
      </p>

      <div className="config-box">
        <strong>Current API endpoint:</strong>
        <code>{apiBaseUrl}</code>
      </div>

      <button className="primary-button" onClick={callApi} disabled={loading}>
        {loading ? 'Calling API...' : 'Test API Call'}
      </button>

      {apiResult && (
        <div className="status-box success">
          <h3>API call successful</h3>
          <pre>{JSON.stringify(apiResult, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div className="status-box error">
          <h3>API call failed</h3>
          <p>{error}</p>
        </div>
      )}
    </section>
  )
}

export default ApiTestPage
