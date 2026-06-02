import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function DashboardPage() {
  const { token, user } = useAuth()

  return (
    <section className="page dashboard-page">
      <div className="hero-panel hero-panel--wide">
        <span className="eyebrow">SkillSwap</span>
        <h1>Aprende, enseña y conecta con personas que comparten tus intereses.</h1>
        <p className="lead">
          Publica lo que sabes, descubre nuevas habilidades y crea intercambios con la comunidad.
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
          <span className="eyebrow">Perfil</span>
          <h2>{token ? 'Bienvenido de nuevo' : 'Únete a la comunidad'}</h2>
          <p className="muted">
            {token
              ? `Hola, ${user?.username ?? 'skillmate'}. Explora habilidades y conecta con nuevas personas.`
              : 'Crea tu cuenta para compartir conocimientos y empezar a intercambiar habilidades.'}
          </p>
          <div className="key-value">
            <span>Cuenta</span>
            <strong>{token ? 'Activa' : 'Invitado'}</strong>
          </div>
        </article>

        <article className="card info-card">
          <span className="eyebrow">Comparte</span>
          <h2>Publica tus habilidades</h2>
          <p className="muted">
            Crea publicaciones claras sobre lo que puedes enseñar y encuentra personas interesadas.
          </p>
        </article>

        <article className="card info-card">
          <span className="eyebrow">Conecta</span>
          <h2>Solicita intercambios</h2>
          <p className="muted">
            Descubre nuevas oportunidades para aprender y empieza conversaciones con otros usuarios.
          </p>
        </article>
      </div>
    </section>
  )
}

export default DashboardPage
