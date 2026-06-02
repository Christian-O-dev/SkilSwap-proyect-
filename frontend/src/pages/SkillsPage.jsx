import { Compass, Search, Sparkles } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  FilterBarSkeleton,
  ListLoadingSkeleton,
  PageHeaderSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import SkillSearchBar from '@/components/skills/SkillSearchBar.jsx'
import { Button } from '@/components/ui/button'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function SkillsPage() {
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
    handleRequestSkill,
    setSearchText,
  } = useSkillSwapData()

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
        title="Catálogo público de habilidades disponibles."
        description="Explora lo que otras personas pueden enseñar y solicita un intercambio cuando encuentres una buena opción."
        stats={
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
            <strong className="block text-2xl font-semibold text-slate-900">{filteredSkills.length}</strong>
            <span className="text-sm text-slate-600">
              {searchText.trim() ? 'resultados' : 'habilidades visibles'}
            </span>
          </div>
        }
      />

      <SkillSearchBar value={searchText} onChange={setSearchText} />

      {!token ? (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/90 p-4 shadow-sm">
          <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
            Acceso
          </span>
          <p className="mt-3 text-sm text-slate-600">Inicia sesión para solicitar intercambios.</p>
        </div>
      ) : null}

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

      <div className="grid gap-4">
        {filteredSkills.map((skill) => (
          (() => {
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
          })()
        ))}

        {filteredSkills.length === 0 ? (
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
                <Button type="button" variant="outline" className="rounded-full" onClick={() => setSearchText('')}>
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
        ) : null}
      </div>
    </section>
  )
}

export default SkillsPage
