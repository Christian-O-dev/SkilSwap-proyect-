import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { Compass, Search, Sparkles, BookOpen } from 'lucide-react'
import ConfirmDialog from '@/components/common/ConfirmDialog.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  FilterBarSkeleton,
  ListLoadingSkeleton,
  PageHeaderSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent } from '@/components/ui/card'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function SkillsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'mine' ? 'mine' : 'explore')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const {
    error,
    filteredSkills,
    loading,
    notice,
    requestingSkillId,
    requestedSkillIds,
    searchText,
    token,
    user,
    mySkills,
    handleRequestSkill,
    setSearchText,
    handleDeleteSkill,
    handleEditSkill,
    deletingSkillId,
  } = useSkillSwapData()

  useEffect(() => {
    const query = searchParams.get('q') || ''
    if (query !== searchText) {
      setSearchText(query)
    }
  }, [searchParams, searchText, setSearchText])

  useEffect(() => {
    if (searchParams.get('tab') === 'mine') {
      setActiveTab('mine')
    }
  }, [searchParams])

  const handleSearchChange = (value) => {
    setSearchText(value)
    if (value.trim()) {
      setSearchParams({ q: value })
      return
    }
    setSearchParams({})
  }

  const handleClearSearch = () => {
    setSearchText('')
    setSearchParams({})
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    await handleDeleteSkill(deleteTarget)
    setDeleteTarget(null)
  }

  const handleEditAndOpenForm = (skill) => {
    handleEditSkill(skill)
    navigate('/my-skills')
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <PageHeaderSkeleton stats={1} />
        <FilterBarSkeleton />
        <ListLoadingSkeleton count={4} />
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Habilidades"
        title="Catálogo de habilidades"
        description="Explora lo que otras personas pueden enseñar o gestiona tus propias habilidades."
        stats={
          activeTab === 'explore' ? (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">{filteredSkills.length}</strong>
              <span className="text-sm text-slate-600">
                {searchText.trim() ? 'resultados' : 'habilidades visibles'}
              </span>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">{mySkills?.length || 0}</strong>
              <span className="text-sm text-slate-600">
                habilidades publicadas
              </span>
            </div>
          )
        }
      />

      {error ? (
        <ErrorState
          title="No se pudo cargar el catálogo"
          description={error}
          actionLabel="Recargar página"
          onRetry={() => window.location.reload()}
        />
      ) : null}

      {notice ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </p>
      ) : null}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-5">
        <TabsList variant="line" className="w-full justify-start gap-2 rounded-2xl bg-white p-1 mb-6 shadow-sm border border-slate-200">
          <TabsTrigger value="explore" className="rounded-xl px-4 py-2">
            Explorar catálogo
          </TabsTrigger>
          {token && (
            <TabsTrigger value="mine" className="rounded-xl px-4 py-2">
              Mis Habilidades
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="explore">
          {!token ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-4 shadow-sm mb-6">
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                Acceso
              </span>
              <p className="mt-3 text-sm text-slate-600">Inicia sesión para solicitar intercambios.</p>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredSkills.map((skill) => {
              const isOwnerSkill = token && skill.user_id === user?.id
              const alreadyRequested = requestedSkillIds.has(skill.id)

              return (
                <SkillCard
                  key={skill.id}
                  skill={skill}
                  onRequest={handleRequestSkill}
                  disabled={Boolean(requestingSkillId) || isOwnerSkill || alreadyRequested}
                  isOwner={false}
                  requested={alreadyRequested}
                  actionLabel={
                    isOwnerSkill
                      ? 'Es tu habilidad'
                      : alreadyRequested
                        ? 'Solicitud enviada'
                        : requestingSkillId === skill.id
                          ? 'Enviando...'
                          : 'Enviar solicitud'
                  }
                />
              )
            })}

            {filteredSkills.length === 0 ? (
              <div className="col-span-full">
                <EmptyState
                  icon={searchText.trim() ? Search : Sparkles}
                  tone={searchText.trim() ? 'warning' : 'info'}
                  title={searchText.trim() ? 'No hay coincidencias' : 'No hay habilidades cargadas'}
                  description={
                    searchText.trim()
                      ? 'Prueba con otra búsqueda para encontrar más habilidades.'
                      : 'Aún no hay publicaciones disponibles.'
                  }
                  action={
                    searchText.trim() ? (
                      <Button type="button" variant="outline" className="rounded-full" onClick={handleClearSearch}>
                        Limpiar búsqueda
                      </Button>
                    ) : (
                      <Button type="button" variant="outline" className="rounded-full">
                        <Compass size={16} aria-hidden="true" />
                        Vuelve más tarde
                      </Button>
                    )
                  }
                />
              </div>
            ) : null}
          </div>
        </TabsContent>

        {token && (
          <TabsContent value="mine">
            <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
              <CardContent className="p-4 md:p-6">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {mySkills?.length === 0 ? (
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

                  {mySkills?.map((skill) => (
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
        )}
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

export default SkillsPage
