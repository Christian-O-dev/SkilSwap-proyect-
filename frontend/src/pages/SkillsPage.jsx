import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import SkillSearchBar from '@/components/skills/SkillSearchBar.jsx'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function SkillsPage() {
  const {
    error,
    filteredSkills,
    loading,
    notice,
    requestingSkillId,
    searchText,
    token,
    user,
    handleRequestSkill,
    setSearchText,
  } = useSkillSwapData()

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

      {loading ? <LoadingSkeleton /> : null}
      {error ? (
        <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </p>
      ) : null}
      {notice ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </p>
      ) : null}

      <div className="grid gap-4">
        {filteredSkills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onRequest={handleRequestSkill}
            disabled={Boolean(requestingSkillId) || (token && skill.user_id === user?.id)}
            isOwner={false}
            actionLabel={
              token && skill.user_id === user?.id
                ? 'Es tu habilidad'
                : requestingSkillId === skill.id
                  ? 'Enviando...'
                  : 'Solicitar intercambio'
            }
          />
        ))}

        {!loading && filteredSkills.length === 0 ? (
          <EmptyState
            title={searchText.trim() ? 'No hay coincidencias' : 'No hay habilidades cargadas'}
            description={
              searchText.trim()
                ? 'Prueba con otra búsqueda para encontrar más habilidades.'
                : 'Aún no hay publicaciones disponibles.'
            }
          />
        ) : null}
      </div>
    </section>
  )
}

export default SkillsPage
