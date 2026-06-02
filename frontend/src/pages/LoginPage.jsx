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
        <span className="eyebrow">Bienvenido</span>
        <h1>Accede a tu cuenta y sigue aprendiendo con la comunidad.</h1>
        <p>
          Entra para gestionar tus habilidades, descubrir nuevos perfiles y solicitar
          intercambios.
        </p>

        <ul className="bullet-list">
          <li>Publica lo que sabes.</li>
          <li>Encuentra personas con intereses afines.</li>
          <li>Organiza tus intercambios en un solo lugar.</li>
        </ul>
      </div>

      <div className="card auth-card">
        <span className="eyebrow">Login</span>
        <h2>Iniciar sesion</h2>
        <p className="muted">Usa tu email y contraseña para entrar en SkillSwap.</p>

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
