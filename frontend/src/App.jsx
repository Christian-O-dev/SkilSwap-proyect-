import { Navigate, Route, Routes } from 'react-router-dom'
import { AppBootSkeleton } from './components/common/LoadingSkeleton.jsx'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContext.jsx'
import AdminPage from './pages/AdminPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ExchangesPage from './pages/ExchangesPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import MySkillsPage from './pages/MySkillsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import RequestsPage from './pages/RequestsPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'

function App() {
  const { token, loading, user } = useAuth()
  const protectedMySkillsView = token ? <MySkillsPage /> : <Navigate to="/login" replace />
  const protectedRequestsView = token ? <RequestsPage /> : <Navigate to="/login" replace />
  const protectedExchangesView = token ? <ExchangesPage /> : <Navigate to="/login" replace />
  const protectedProfileView = token ? <ProfilePage /> : <Navigate to="/login" replace />

  if (loading) {
    return (
      <div className="app-shell">
        <div className="app-background" aria-hidden="true" />
        <main className="app-loading">
          <AppBootSkeleton />
        </main>
      </div>
    )
  }

  return (
    <div className="app-shell">
      <div className="app-background" aria-hidden="true" />
      <Navbar />
      <main className="app-main">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={token ? <Navigate to="/dashboard" replace /> : <LoginPage />} />
          <Route
            path="/register"
            element={token ? <Navigate to="/my-skills?onboarding=step1" replace /> : <RegisterPage />}
          />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/my-skills" element={protectedMySkillsView} />
          <Route path="/requests" element={protectedRequestsView} />
          <Route path="/exchanges" element={protectedExchangesView} />
          <Route path="/profile" element={protectedProfileView} />
          <Route
            path="/admin"
            element={token && user?.role_id === 1 ? <AdminPage /> : <Navigate to="/dashboard" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
