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
        <span className="eyebrow">Nueva cuenta</span>
        <h1>Crea tu perfil y empieza a compartir lo que sabes.</h1>
        <p>
          Únete a una comunidad donde cada habilidad puede abrir una nueva oportunidad de aprender.
        </p>

        <div className="stat-strip">
          <article>
            <strong>Comparte</strong>
            <span>lo que dominas</span>
          </article>
          <article>
            <strong>Descubre</strong>
            <span>nuevas habilidades</span>
          </article>
          <article>
            <strong>Conecta</strong>
            <span>con otras personas</span>
          </article>
        </div>
      </div>

      <div className="card auth-card">
        <span className="eyebrow">Registro</span>
        <h2>Crear cuenta</h2>
        <p className="muted">Completa los campos para unirte a SkillSwap.</p>

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
