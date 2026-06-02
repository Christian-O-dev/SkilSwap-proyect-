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
    description: 'Explica que sabes hacer y como puedes ayudar a otra persona.',
  },
  {
    number: '02',
    title: 'Encuentra otra persona',
    description: 'Explora el catalogo y descubre perfiles con intereses compatibles.',
  },
  {
    number: '03',
    title: 'Solicita intercambio',
    description: 'Inicia el contacto desde la plataforma y organiza el aprendizaje mutuo.',
  },
  {
    number: '04',
    title: 'Aprende y valora',
    description: 'Completa el intercambio y deja una valoracion para fortalecer la comunidad.',
  },
]

const benefits = [
  {
    icon: Users,
    title: 'Comunidad',
    description: 'Conecta con personas reales que quieren ensenar y aprender.',
  },
  {
    icon: Rocket,
    title: 'Aprendizaje practico',
    description: 'Las habilidades se comparten con un objetivo util y aplicado.',
  },
  {
    icon: Handshake,
    title: 'Sin pagos',
    description: 'El valor del intercambio esta en el conocimiento, no en el dinero.',
  },
]

function DashboardPage() {
  const { token, user } = useAuth()

  return (
    <section className="space-y-6 pb-8">
      <Card className="overflow-hidden border-white/10 bg-slate-950/70 shadow-2xl shadow-cyan-950/20">
        <CardContent className="grid gap-8 px-6 py-8 md:px-10 md:py-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
              SkillSwap final demo
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white md:text-5xl">
                Intercambia habilidades tecnicas sin pagar
              </h1>
              <p className="max-w-2xl text-base leading-7 text-slate-300 md:text-lg">
                Aprende compartiendo lo que sabes. SkillSwap conecta personas que quieren
                ensenar una habilidad con otras que quieren aprenderla.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-cyan-300 text-slate-950 hover:bg-cyan-200">
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
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link to="/register">Crear cuenta</Link>
                </Button>
              ) : (
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-full border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  <Link to="/profile">Ver mi perfil</Link>
                </Button>
              )}
            </div>
          </div>

          <div className="grid gap-4">
            <Card className="border-white/10 bg-white/6 backdrop-blur">
              <CardHeader className="space-y-2">
                <div className="inline-flex size-12 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                  <BookOpen size={22} aria-hidden="true" />
                </div>
                <CardTitle className="text-white">
                  {token ? `Bienvenido, ${user?.username ?? 'usuario'}` : 'Proyecto listo para explicar'}
                </CardTitle>
                <CardDescription className="text-slate-300">
                  En pocos segundos se entiende que la plataforma sirve para compartir y aprender
                  habilidades entre usuarios.
                </CardDescription>
              </CardHeader>
            </Card>

            <div className="grid gap-3 sm:grid-cols-2">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Modelo</p>
                  <p className="mt-2 text-lg font-semibold text-white">Intercambio entre personas</p>
                </CardContent>
              </Card>
              <Card className="border-white/10 bg-white/5">
                <CardContent className="px-6 py-5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Propuesta</p>
                  <p className="mt-2 text-lg font-semibold text-white">Aprender sin pagar</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
        <Card className="border-white/10 bg-slate-950/55">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Como funciona</CardTitle>
            <CardDescription className="text-slate-300">
              El flujo principal del producto se entiende en cuatro pasos.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {steps.map((step) => (
              <article
                key={step.number}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/25 hover:bg-white/7"
              >
                <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200">
                  Paso {step.number}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-300">{step.description}</p>
              </article>
            ))}
          </CardContent>
        </Card>

        <Card className="border-white/10 bg-slate-950/55">
          <CardHeader>
            <CardTitle className="text-2xl text-white">Beneficios</CardTitle>
            <CardDescription className="text-slate-300">
              La propuesta de valor queda clara para una presentacion rapida.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {benefits.map((benefit) => {
              const Icon = benefit.icon

              return (
                <article
                  key={benefit.title}
                  className="rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/25 hover:bg-white/7"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/15 text-cyan-200">
                      <Icon size={20} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.description}</p>
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
