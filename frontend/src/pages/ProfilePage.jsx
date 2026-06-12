import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BookOpen, Handshake, Star, User } from 'lucide-react'
import ConfirmDialog from '@/components/common/ConfirmDialog.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  PageHeaderSkeleton,
  ProfileLoadingSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
  const navigate = useNavigate()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const { error, exchanges, loading, mySkills, requests, token, user, handleDeleteSkill, handleEditSkill, deletingSkillId } = useSkillSwapData()

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

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    await handleDeleteSkill(deleteTarget)
    setDeleteTarget(null)
  }

  const handleEditAndOpenForm = (skill) => {
    handleEditSkill(skill)
    navigate('/my-skills')
  }

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

      <Tabs defaultValue="info" className="gap-5">
        <TabsList variant="line" className="w-full justify-start gap-2 rounded-2xl bg-white p-1 mb-6 shadow-sm border border-slate-200">
          <TabsTrigger value="info" className="rounded-xl px-4 py-2">
            Mi Información
          </TabsTrigger>
          <TabsTrigger value="skills" className="rounded-xl px-4 py-2">
            Mis Habilidades
          </TabsTrigger>
        </TabsList>

        <TabsContent value="info">
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

                <div className="flex flex-wrap gap-3">
                  <Button asChild variant="outline" className="rounded-full">
                    <Link to="/exchanges">Ver intercambios</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="skills">
          <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
            <CardContent className="p-4 md:p-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mySkills.length === 0 ? (
                  <div className="col-span-full">
                    <EmptyState
                      icon={BookOpen}
                      tone="info"
                      title="Aún no has publicado habilidades"
                      description="Ve a publicar para crear tu primera habilidad."
                      action={
                        <Button type="button" className="rounded-full" onClick={() => navigate('/my-skills')}>
                          Ir a publicar
                        </Button>
                      }
                    />
                  </div>
                ) : null}

                {mySkills.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    skill={skill}
                    onDelete={setDeleteTarget}
                    onEdit={handleEditAndOpenForm}
                    isOwner
                    disabled={Boolean(deletingSkillId)}
                    actionLabel={deletingSkillId === skill.id ? 'Eliminando...' : 'Es tu habilidad'}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) setDeleteTarget(null)
        }}
        title="Eliminar habilidad"
        description="Esta acción no se puede deshacer."
        confirmLabel="Eliminar"
        loading={Boolean(deleteTarget) && deletingSkillId === deleteTarget?.id}
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}

export default ProfilePage
