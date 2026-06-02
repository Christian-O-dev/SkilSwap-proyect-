import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Handshake, Rocket, Users } from 'lucide-react'
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
    title: 'Publica una habilidad',
    description: 'Explica qué sabes hacer y cómo puedes ayudar a otra persona.',
  },
  {
    number: '02',
    title: 'Encuentra otra persona',
    description: 'Explora el catálogo y descubre perfiles con intereses compatibles.',
  },
  {
    number: '03',
    title: 'Solicita intercambio',
    description: 'Inicia el contacto desde la plataforma y organiza el aprendizaje mutuo.',
  },
  {
    number: '04',
    title: 'Aprende y valora',
    description: 'Completa el intercambio y deja una valoración para fortalecer la comunidad.',
  },
]

const benefits = [
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conecta con personas reales que quieren enseñar y aprender.',
  },
  {
    icon: Rocket,
    title: 'Aprendizaje práctico',
    description: 'Las habilidades se comparten con un objetivo útil y aplicado.',
  },
  {
    icon: Handshake,
    title: 'Sin pagos',
    description: 'El valor del intercambio está en el conocimiento, no en el dinero.',
  },
]

function DashboardPage() {
  const { token, user } = useAuth()

  return (
    <section className="space-y-6 pb-8">
      <Card className="overflow-hidden border-slate-200 bg-white shadow-sm">
        <CardContent className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
              SkillSwap final demo
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
                Intercambia habilidades técnicas sin pagar
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
                Aprende compartiendo lo que sabes. SkillSwap conecta personas que quieren
                enseñar una habilidad con otras que quieren aprenderla.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-blue-600 text-white hover:bg-blue-700">
                <Link to="/skills">
                  Ver habilidades
                  <ArrowRight size={16} aria-hidden="true" />
                </Link>
              </Button>

              {!token ? (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                >
                  <Link to="/register">Crear cuenta</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-slate-200 bg-white text-slate-900 hover:bg-slate-50"
                >
                  <Link to="/profile">Ver mi perfil</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="border-slate-200 bg-slate-50 shadow-sm">
              <CardHeader className="space-y-2">
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                  <BookOpen size={22} aria-hidden="true" />
                </div>
                <CardTitle className="text-slate-900">
                  {token ? `Bienvenido, ${user?.username ?? 'usuario'}` : 'Proyecto listo para explicar'}
                </CardTitle>
                <CardDescription className="text-slate-600">
                  En pocos segundos se entiende que la plataforma sirve para compartir y aprender
                  habilidades entre usuarios.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Modelo</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Intercambio entre personas</p>
                </CardContent>
              </Card>
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Propuesta</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">Aprender sin pagar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Cómo funciona</CardTitle>
            <CardDescription className="text-slate-600">
              El flujo principal del producto se entiende en cuatro pasos.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-700">
                  Paso {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-900">Beneficios</CardTitle>
            <CardDescription className="text-slate-600">
              La propuesta de valor queda clara para una presentación rápida.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition hover:border-blue-200 hover:bg-blue-50/40"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                </article>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default DashboardPage
