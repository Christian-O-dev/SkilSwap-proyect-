import { useState } from 'react'
import ConfirmDialog from '@/components/common/ConfirmDialog.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import SkillForm from '@/components/skills/SkillForm.jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
    <section className="space-y-6">
      <PageHeader
        eyebrow="Mis habilidades"
        title="Gestiona lo que puedes enseñar."
        description="Desde aquí puedes crear, editar y eliminar tus habilidades publicadas."
        actions={
          <Button type="button" className="rounded-full" onClick={handleStartCreate}>
            Publicar habilidad
          </Button>
        }
      />

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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]">
        <div className="grid gap-4">
          {loading ? <LoadingSkeleton /> : null}
          {!loading && mySkills.length === 0 ? (
            <EmptyState
              title="Aún no has publicado habilidades"
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

        <Card id="skill-form-panel" className="border-slate-200 bg-slate-50/70 shadow-sm">
          <CardContent className="space-y-5 p-5 md:p-6">
            <div className="space-y-3">
              <span className="inline-flex items-center rounded-full bg-slate-200 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                {editingSkillId ? 'Editar habilidad' : 'Nueva habilidad'}
              </span>
              <div className="space-y-2">
                <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                  {editingSkillId ? 'Actualizar una habilidad' : 'Crear una habilidad'}
                </h2>
                <p className="text-sm leading-6 text-slate-600">
                  Describe lo que puedes enseñar para que otras personas te encuentren.
                </p>
              </div>
            </div>

            <SkillForm
              newSkill={newSkill}
              editingSkillId={editingSkillId}
              creatingSkill={creatingSkill}
              onChange={handleSkillChange}
              onSubmit={handleSubmitSkill}
              onCancel={resetSkillForm}
            />

            {selectedSkill ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-4">
                <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                  Edición activa
                </span>
                <strong className="mt-3 block text-slate-900">{selectedSkill.title}</strong>
                <p className="mt-1 text-sm text-slate-600">Estás actualizando esta habilidad.</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null)
          }
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

export default MySkillsPage
