import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
      setFeedback('Cuenta creada y sesión iniciada.')
      navigate('/dashboard')
    } catch (err) {
      setError(err?.message || 'No se pudo crear la cuenta.')
    }
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-6 p-6 md:p-8">
          <span className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
            Nueva cuenta
          </span>
          <div className="space-y-3">
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-900">
              Crea tu perfil y empieza a compartir lo que sabes.
            </h1>
            <p className="max-w-xl text-base leading-7 text-slate-600">
              Únete a una comunidad donde cada habilidad puede abrir una nueva oportunidad de aprender.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <article className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
              <strong className="block text-lg text-slate-900">Comparte</strong>
              <span className="mt-1 block text-sm text-slate-600">lo que dominas</span>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
              <strong className="block text-lg text-slate-900">Descubre</strong>
              <span className="mt-1 block text-sm text-slate-600">nuevas habilidades</span>
            </article>
            <article className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-slate-700">
              <strong className="block text-lg text-slate-900">Conecta</strong>
              <span className="mt-1 block text-sm text-slate-600">con otras personas</span>
            </article>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-5 p-6 md:p-7">
          <div className="space-y-3">
            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
              Registro
            </span>
            <div className="space-y-2">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Crear cuenta</h2>
              <p className="text-sm leading-6 text-slate-600">
                Completa los campos para unirte a SkillSwap.
              </p>
            </div>
          </div>

          <form className="grid gap-4" onSubmit={handleSubmit}>
            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-800">Nombre de usuario</span>
              <input
                type="text"
                name="username"
                autoComplete="username"
                placeholder="skillswap_user"
                value={formData.username}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-800">Correo electrónico</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-medium text-slate-800">Contraseña</span>
              <input
                type="password"
                name="password"
                autoComplete="new-password"
                placeholder="******"
                value={formData.password}
                onChange={handleChange}
                required
                className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <Button type="submit" className="rounded-full">
              Crear cuenta
            </Button>
          </form>

          {feedback ? (
            <p className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {feedback}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <p className="text-sm text-slate-600">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="font-medium text-blue-700 hover:text-blue-800">
              Ir al login
            </Link>
          </p>
        </CardContent>
      </Card>
    </section>
  )
}

export default RegisterPage
