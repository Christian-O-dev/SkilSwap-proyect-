import { NavLink, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function Navbar() {
  const { token, user, signOut } = useAuth()

  return (
    <header className="topbar">
      <div className="topbar__brand">
        <Link to="/" className="brand-mark">
          <span className="brand-mark__dot" aria-hidden="true" />
          <span>SkillSwap</span>
        </Link>
      </div>

      <nav className="topbar__nav" aria-label="Principal">
        <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
          Inicio
        </NavLink>
        <NavLink
          to="/skills"
          className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
        >
          Habilidades
        </NavLink>
        {!token ? (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
            >
              Login
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}
            >
              Registro
            </NavLink>
          </>
        ) : null}
      </nav>

      <div className="topbar__status">
        {token ? (
          <>
            <span className="user-chip">
              <span className="user-chip__label">Sesion</span>
              <strong>{user?.username ?? 'usuario'}</strong>
            </span>
            <button type="button" className="button button--ghost" onClick={signOut}>
              Salir
            </button>
          </>
        ) : (
          <span className="status-note">Comparte y descubre habilidades</span>
        )}
      </div>
    </header>
  )
}

export default Navbar
