import { Link } from 'react-router-dom'
import { BookOpen, Handshake, Star, User } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  PageHeaderSkeleton,
  ProfileLoadingSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function ProfileMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
          <Icon size={18} aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">{label}</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{value}</p>
        </div>
      </div>
    </div>
  )
}

function ProfilePage() {
  const { error, exchanges, loading, mySkills, requests, token, user } = useSkillSwapData()

  if (!token) {
    return (
      <section className="space-y-6">
        <EmptyState
          title="Necesitas iniciar sesión"
          description="Accede a tu cuenta para ver tu perfil y actividad."
          tone="warning"
          action={
            <Button asChild className="rounded-full">
              <Link to="/login">Ir al login</Link>
            </Button>
          }
        />
      </section>
    )
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <PageHeaderSkeleton stats={3} />
        <ProfileLoadingSkeleton />
      </section>
    )
  }

  if (error) {
    return (
      <section className="space-y-6">
        <ErrorState
          title="No se pudo cargar tu perfil"
          description={error}
          actionLabel="Recargar página"
          onRetry={() => window.location.reload()}
        />
      </section>
    )
  }

  const initials = (user?.username || 'SS').slice(0, 2).toUpperCase()
  const roleLabel = user?.role_name || (user?.role_id === 1 ? 'admin' : 'user')
  const averageRating =
    mySkills.length > 0 ? Math.max(...mySkills.map((skill) => skill.averageRating || 0)) : 0
  const ratingsCount =
    mySkills.length > 0 ? Math.max(...mySkills.map((skill) => skill.ratingsCount || 0)) : 0
  const ratedSkills = mySkills.filter((skill) => skill.ratingsCount > 0)

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Perfil"
        title={`Perfil de ${user?.username ?? 'usuario'}`}
        description="Consulta tu información principal, actividad dentro de SkillSwap y el resumen de valoraciones disponibles."
        stats={
          <>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">{mySkills.length}</strong>
              <span className="text-sm text-slate-600">habilidades</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">{requests.length}</strong>
              <span className="text-sm text-slate-600">solicitudes</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">{exchanges.length}</strong>
              <span className="text-sm text-slate-600">intercambios</span>
            </div>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]">
        <Card className="border-slate-200 bg-white shadow-sm">
          <CardHeader className="items-center text-center">
            <Avatar size="lg" className="size-20">
              <AvatarFallback className="bg-cyan-200 text-xl font-semibold text-slate-950">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <CardTitle className="text-2xl text-slate-900">{user?.username ?? 'usuario'}</CardTitle>
              <p className="text-sm text-slate-600">{user?.email || 'Email no disponible'}</p>
              <span className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                Rol: {roleLabel}
              </span>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3">
            <ProfileMetric icon={BookOpen} label="Habilidades" value={mySkills.length} />
            <ProfileMetric icon={Handshake} label="Solicitudes" value={requests.length} />
            <ProfileMetric icon={User} label="Intercambios" value={exchanges.length} />
            <ProfileMetric
              icon={Star}
              label="Valoración media"
              value={ratingsCount > 0 ? `${averageRating.toFixed(1)} / 5` : 'Sin valoraciones'}
            />
          </CardContent>
        </Card>

        <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-slate-900">
              <Star size={18} aria-hidden="true" />
              Valoraciones recibidas
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            {ratedSkills.length > 0 ? (
              ratedSkills.map((skill) => (
                <article
                  key={skill.id}
                  className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                >
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <strong className="block text-base text-slate-900">{skill.title}</strong>
                      <p className="mt-1 text-sm text-slate-600">
                        {skill.ratingsCount} valoraciones recibidas en esta habilidad
                      </p>
                    </div>
                    <div className="rounded-full bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
                      {skill.averageRating.toFixed(1)} / 5
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <EmptyState
                title="Aún no hay valoraciones visibles"
                description="Cuando completes intercambios y recibas valoraciones, aparecerá aquí su resumen."
                className="border-slate-200 bg-white shadow-sm"
                tone="warning"
              />
            )}

            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 p-4 text-sm text-slate-600">
              El backend actual expone media y conteo de valoraciones por usuario y por habilidad.
              En esta fase mostramos ese resumen real sin inventar comentarios que la API todavía no devuelve.
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild className="rounded-full">
                <Link to="/my-skills?tab=list">Ver mis habilidades</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full">
                <Link to="/exchanges">Ver intercambios</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

export default ProfilePage
