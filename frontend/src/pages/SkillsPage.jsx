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
    <section className="page skills-page">
      <PageHeader
        eyebrow="Habilidades"
        title="Catalogo publico de habilidades disponibles."
        description="Explora lo que otras personas pueden ensenar y solicita un intercambio cuando encuentres una buena opcion."
        stats={
          <div className="stat-pill">
            <strong>{filteredSkills.length}</strong>
            <span>{searchText.trim() ? 'resultados' : 'habilidades visibles'}</span>
          </div>
        }
      />

      <SkillSearchBar value={searchText} onChange={setSearchText} />

      {!token ? (
        <div className="request-box">
          <span className="eyebrow">Acceso</span>
          <p className="muted">Inicia sesion para solicitar intercambios.</p>
        </div>
      ) : null}

      {loading ? <LoadingSkeleton /> : null}
      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      <div className="skills-list">
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
                ? 'Prueba con otra busqueda para encontrar mas habilidades.'
                : 'Aun no hay publicaciones disponibles.'
            }
          />
        ) : null}
      </div>
    </section>
  )
}

export default SkillsPage
