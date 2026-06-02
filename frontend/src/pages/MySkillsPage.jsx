import { useState } from 'react'
import ConfirmDialog from '@/components/common/ConfirmDialog.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import SkillForm from '@/components/skills/SkillForm.jsx'
import { Button } from '@/components/ui/button'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function MySkillsPage() {
  const [deleteTarget, setDeleteTarget] = useState(null)
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

  const handleStartCreate = () => {
    resetSkillForm()

    if (typeof window !== 'undefined') {
      window.requestAnimationFrame(() => {
        document.getElementById('skill-form-panel')?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        })
      })
    }
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return
    }

    await handleDeleteSkill(deleteTarget)
    setDeleteTarget(null)
  }

  return (
    <section className="page skills-page">
      <PageHeader
        eyebrow="Mis habilidades"
        title="Gestiona lo que puedes ensenar."
        description="Desde aqui puedes crear, editar y eliminar tus habilidades publicadas."
        actions={
          <Button type="button" className="rounded-full" onClick={handleStartCreate}>
            Publicar habilidad
          </Button>
        }
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
              onDelete={setDeleteTarget}
              onEdit={handleEditSkill}
              isOwner
              disabled={Boolean(deletingSkillId)}
              actionLabel={deletingSkillId === skill.id ? 'Eliminando...' : 'Es tu habilidad'}
            />
          ))}
        </div>

        <aside id="skill-form-panel" className="card composer-card">
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

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null)
          }
        }}
        title="Eliminar habilidad"
        description="Esta accion no se puede deshacer."
        confirmLabel="Eliminar"
        loading={Boolean(deleteTarget) && deletingSkillId === deleteTarget?.id}
        onConfirm={handleConfirmDelete}
      />
    </section>
  )
}

export default MySkillsPage
