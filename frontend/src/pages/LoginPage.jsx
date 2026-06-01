import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function LoginPage() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setFeedback('')

    try {
      await signIn(formData)
      setFeedback('Sesion iniciada con exito.')
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'No se pudo iniciar sesion.')
    }
  }

  return (
    <section className="page page--split">
      <div className="hero-panel">
        <span className="eyebrow">Acceso rapido</span>
        <h1>Entra y sigue el flujo del MVP sin perder contexto.</h1>
        <p>
          Esta pantalla ya inicia sesion contra la API real y guarda el token para seguir
          navegando por la app.
        </p>

        <ul className="bullet-list">
          <li>Sesiones guardadas en localStorage.</li>
          <li>Formulario listo para conectar con la API.</li>
          <li>Navegacion directa hacia dashboard y habilidades.</li>
        </ul>
      </div>

      <div className="card auth-card">
        <span className="eyebrow">Login</span>
        <h2>Iniciar sesion</h2>
        <p className="muted">Usa tu email y password para entrar en la experiencia base.</p>

        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Email</span>
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="tu@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <input
              type="password"
              name="password"
              autoComplete="current-password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="button button--primary">
            Entrar
          </button>
        </form>

        {feedback ? <p className="notice notice--success">{feedback}</p> : null}
        {error ? <p className="notice notice--error">{error}</p> : null}

        <p className="auth-card__footer">
          No tienes cuenta? <Link to="/register">Crear cuenta</Link>
        </p>
      </div>
    </section>
  )
}

export default LoginPage
