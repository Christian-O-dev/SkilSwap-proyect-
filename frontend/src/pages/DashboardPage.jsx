import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Search, Send } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const steps = [
  {
    number: '01',
    title: 'Crear habilidad',
    description: 'Publica lo que sabes hacer para que otras personas puedan encontrarte.',
    icon: BookOpen,
  },
  {
    number: '02',
    title: 'Buscar habilidad para aprender',
    description: 'Explora el catálogo y encuentra una habilidad que quieras aprender.',
    icon: Search,
  },
  {
    number: '03',
    title: 'Solicitar intercambio',
    description: 'Envía la solicitud y empieza a organizar el aprendizaje con la otra persona.',
    icon: Send,
  },
]

function DashboardPage() {
  const { token } = useAuth()
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')

  const handleSubmitSearch = (event) => {
    event.preventDefault()
    const query = searchValue.trim()
    navigate(query ? `/skills?q=${encodeURIComponent(query)}` : '/skills')
  }

  return (
    <section className="space-y-6 pb-8">
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardContent className="space-y-8 px-6 py-8 md:px-10 md:py-10">
          <div className="space-y-4">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              SkillSwap
            </div>

            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Intercambia tus habilidades técnicas de forma simple
              </h1>
              <p className="max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
                Publica lo que sabes, busca algo nuevo para aprender y solicita el intercambio
                desde la plataforma.
              </p>
            </div>

            <form onSubmit={handleSubmitSearch} className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
              <div className="relative">
                <Search
                  size={18}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="search"
                  placeholder="Busca una habilidad para aprender desde aquí"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
                  className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                />
              </div>
              <Button type="submit" className="h-12 rounded-2xl bg-blue-600 px-5 text-white hover:bg-blue-700">
                Buscar
              </Button>
            </form>

            <div className="flex flex-wrap gap-3">
              {!token ? (
                <Button asChild size="lg" className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
                  <Link to="/register">Registro</Link>
                </Button>
              ) : null}
              <Button
                asChild
                size="lg"
                variant="outline"
                className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
              >
                <Link to="/skills">
                  Ver habilidades
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-2xl text-slate-900">Cómo funciona</CardTitle>
          <CardDescription className="text-slate-600">
            El flujo principal queda resumido en tres pasos.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 lg:grid-cols-3">
          {steps.map((step) => {
            const Icon = step.icon

            return (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="inline-flex size-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                    Paso {step.number}
                  </span>
                </div>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </article>
            )
          })}
        </CardContent>
      </Card>
    </section>
  )
}

export default DashboardPage
