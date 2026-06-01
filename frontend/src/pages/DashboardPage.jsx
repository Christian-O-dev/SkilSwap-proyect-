import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function DashboardPage() {
  const { token, user } = useAuth()

  return (
    <section className="page dashboard-page">
      <div className="hero-panel hero-panel--wide">
        <span className="eyebrow">SkillSwap</span>
        <h1>Base visual conectada al flujo real de intercambio de habilidades.</h1>
        <p className="lead">
          Registro, login, listado de habilidades y solicitudes ya quedan enlazados con la API
          para poder probar el MVP de principio a fin.
        </p>

        <div className="action-row">
          <Link to="/skills" className="button button--primary">
            Ver habilidades
          </Link>
          {!token ? (
            <Link to="/register" className="button button--soft">
              Crear cuenta
            </Link>
          ) : (
            <Link to="/login" className="button button--soft">
              Cambiar sesion
            </Link>
          )}
        </div>
      </div>

      <div className="dashboard-grid">
        <article className="card info-card">
          <span className="eyebrow">Sesion</span>
          <h2>{token ? 'Usuario activo' : 'Sin sesion'}</h2>
          <p className="muted">
            {token
              ? `Hola, ${user?.username ?? 'skillmate'}. Ya puedes navegar por la base de la app.`
              : 'Puedes explorar el layout base sin depender del backend.'}
          </p>
          <div className="key-value">
            <span>Estado</span>
            <strong>{token ? 'Activa' : 'Anonima'}</strong>
          </div>
        </article>

        <article className="card info-card">
          <span className="eyebrow">Flujo MVP</span>
          <h2>Ruta principal</h2>
          <ol className="step-list">
            <li>Registro</li>
            <li>Login</li>
            <li>Crear habilidad</li>
            <li>Ver habilidades</li>
            <li>Solicitar intercambio</li>
          </ol>
        </article>

        <article className="card info-card">
          <span className="eyebrow">Estado API</span>
          <h2>Conexion activa</h2>
          <p className="muted">
            El frontend ya habla con el backend real, asi que ahora podemos probar el flujo con
            datos de MySQL y tokens JWT.
          </p>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
