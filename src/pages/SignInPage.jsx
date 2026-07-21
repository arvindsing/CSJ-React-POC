import { useState } from 'react'
import {
  signInMockUser,
  signOutMockUser,
  getCurrentUser
} from '../services/authService.js'

function SignInPage() {
  const [user, setUser] = useState(getCurrentUser())

  function handleSignIn() {
    const signedInUser = signInMockUser()
    setUser(signedInUser)
  }

  function handleSignOut() {
    signOutMockUser()
    setUser(null)
  }

  return (
    <section className="page-card">
      <h2>Sign-In Page</h2>

      <p>
        This page validates the sign-in experience. The initial POC uses a mock sign-in flow. Later, this can be replaced with Okta or Microsoft Entra ID using OIDC.
      </p>

      {!user && (
        <button className="primary-button" onClick={handleSignIn}>
          Sign in as POC Test User
        </button>
      )}

      {user && (
        <div className="status-box success">
          <h3>Signed in successfully</h3>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>

          <button className="secondary-button" onClick={handleSignOut}>
            Sign out
          </button>
        </div>
      )}
    </section>
  )
}

export default SignInPage