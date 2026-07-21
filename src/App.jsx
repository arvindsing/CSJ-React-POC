import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import SignInPage from './pages/SignInPage.jsx'
import ClaimsPage from './pages/ClaimsPage.jsx'
import ApiTestPage from './pages/ApiTestPage.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="signin" element={<SignInPage />} />
        <Route path="claims" element={<ClaimsPage />} />
        <Route path="api-test" element={<ApiTestPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  )
}

export default App