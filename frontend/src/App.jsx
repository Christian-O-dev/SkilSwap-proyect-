import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import { useAuth } from './context/AuthContext.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import SkillsPage from './pages/SkillsPage.jsx'

function App() {
  const { token, loading } = useAuth()

  if (loading) {
    return (
      <div className="app-shell">
        <div className="app-background" aria-hidden="true" />
        <main className="app-loading">
          <div className="loading-card">
            <span className="eyebrow">SkillSwap</span>
            <h1>Cargando experiencia inicial</h1>
            <p>Preparando la interfaz base y restaurando la sesion local.</p>
          </div>
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
            element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage />}
          />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
