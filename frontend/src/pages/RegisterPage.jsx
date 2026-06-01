import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function RegisterPage() {
  const navigate = useNavigate()
  const { signUp } = useAuth()
  const [formData, setFormData] = useState({ username: '', email: '', password: '' })
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
    setFeedback('')
    setError('')

    try {
      await signUp(formData)
      setFeedback('Cuenta creada y sesion iniciada.')
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'No se pudo crear la cuenta.')
    }
  }

  return (
    <section className="page page--split">
      <div className="hero-panel hero-panel--accent">
        <span className="eyebrow">Nuevo usuario</span>
        <h1>Prepara una cuenta base para probar el flujo completo.</h1>
        <p>
          El registro crea usuarios reales en el backend y deja la sesion lista para seguir con el
          recorrido.
        </p>

        <div className="stat-strip">
          <article>
            <strong>4</strong>
            <span>pantallas base</span>
          </article>
          <article>
            <strong>1</strong>
            <span>router central</span>
          </article>
          <article>
            <strong>1</strong>
            <span>contexto de sesion</span>
          </article>
        </div>
      </div>

      <div className="card auth-card">
        <span className="eyebrow">Registro</span>
        <h2>Crear cuenta</h2>
        <p className="muted">Completa los campos para crear una sesion local de prueba.</p>

        <form className="form-stack" onSubmit={handleSubmit}>
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              name="username"
              autoComplete="username"
              placeholder="skillswap_user"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </label>

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
              autoComplete="new-password"
              placeholder="******"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>

          <button type="submit" className="button button--primary">
            Crear cuenta
          </button>
        </form>

        {feedback ? <p className="notice notice--success">{feedback}</p> : null}
        {error ? <p className="notice notice--error">{error}</p> : null}

        <p className="auth-card__footer">
          Ya tienes cuenta? <Link to="/login">Ir al login</Link>
        </p>
      </div>
    </section>
  )
}

export default RegisterPage
