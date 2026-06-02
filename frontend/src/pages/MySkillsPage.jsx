import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import SkillForm from '@/components/skills/SkillForm.jsx'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function MySkillsPage() {
  const {
    creatingSkill,
    deletingSkillId,
    editingSkillId,
    error,
    loading,
    mySkills,
    newSkill,
    notice,
    selectedSkill,
    handleDeleteSkill,
    handleEditSkill,
    handleSkillChange,
    handleSubmitSkill,
    resetSkillForm,
  } = useSkillSwapData()

  return (
    <section className="page skills-page">
      <PageHeader
        eyebrow="Mis habilidades"
        title="Gestiona lo que puedes ensenar."
        description="Desde aqui puedes crear, editar y eliminar tus habilidades publicadas."
      />

      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      <div className="skills-layout">
        <div className="skills-list">
          {loading ? <LoadingSkeleton /> : null}
          {!loading && mySkills.length === 0 ? (
            <EmptyState
              title="Aun no has publicado habilidades"
              description="Crea tu primera habilidad para empezar a recibir solicitudes."
            />
          ) : null}
          {mySkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onDelete={handleDeleteSkill}
              onEdit={handleEditSkill}
              isOwner
              disabled={Boolean(deletingSkillId)}
              actionLabel={deletingSkillId === skill.id ? 'Eliminando...' : 'Es tu habilidad'}
            />
          ))}
        </div>

        <aside className="card composer-card">
          <span className="eyebrow">{editingSkillId ? 'Editar habilidad' : 'Nueva habilidad'}</span>
          <h2>{editingSkillId ? 'Actualizar una habilidad' : 'Crear una habilidad'}</h2>
          <p className="muted">Describe lo que puedes ensenar para que otras personas te encuentren.</p>

          <SkillForm
            newSkill={newSkill}
            editingSkillId={editingSkillId}
            creatingSkill={creatingSkill}
            onChange={handleSkillChange}
            onSubmit={handleSubmitSkill}
            onCancel={resetSkillForm}
          />

          {selectedSkill ? (
            <div className="request-box">
              <span className="eyebrow">Edicion activa</span>
              <strong>{selectedSkill.title}</strong>
              <p className="muted">Estas actualizando esta habilidad.</p>
            </div>
          ) : null}
        </aside>
      </div>
    </section>
  )
}

export default MySkillsPage
