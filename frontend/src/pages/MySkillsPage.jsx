import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { PlusCircle, Wrench } from 'lucide-react'
import ConfirmDialog from '@/components/common/ConfirmDialog.jsx'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  PageHeaderSkeleton,
  SplitPageLoadingSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import SkillCard from '@/components/skills/SkillCard.jsx'
import SkillForm from '@/components/skills/SkillForm.jsx'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function MySkillsPage() {
  const [searchParams] = useSearchParams()
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') === 'list' ? 'list' : 'create')
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

  useEffect(() => {
    if (editingSkillId) {
      setActiveTab('create')
    }
  }, [editingSkillId])

  useEffect(() => {
    setActiveTab(searchParams.get('tab') === 'list' ? 'list' : 'create')
  }, [searchParams])

  const handleStartCreate = () => {
    resetSkillForm()
    setActiveTab('create')
  }

  const handleEditAndOpenForm = (skill) => {
    handleEditSkill(skill)
    setActiveTab('create')
  }

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return
    await handleDeleteSkill(deleteTarget)
    setDeleteTarget(null)
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <PageHeaderSkeleton stats={0} />
        <SplitPageLoadingSkeleton />
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Mis habilidades"
        title="Gestiona lo que puedes enseñar."
        description="Ahora tienes el formulario y tu listado separados para trabajar con más orden."
      />

      {error ? (
        <ErrorState
          title="No se pudo cargar tu espacio de habilidades"
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

      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-5">
            <TabsList variant="line" className="w-full justify-start gap-2 rounded-2xl bg-white p-1">
              <TabsTrigger value="create" className="rounded-xl px-4 py-2">
                Agregar habilidad
              </TabsTrigger>
              <TabsTrigger value="list" className="rounded-xl px-4 py-2">
                Mis habilidades
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card id="skill-form-panel" className="border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-5 p-5 md:p-6">
                  <div className="space-y-3">
                    <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-700">
                      {editingSkillId ? 'Editar habilidad' : 'Nueva habilidad'}
                    </span>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                        {editingSkillId ? 'Actualizar una habilidad' : 'Crear una habilidad'}
                      </h2>
                      <p className="text-sm leading-6 text-slate-600">
                        Completa solo este formulario para publicar o actualizar una habilidad.
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
                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4">
                      <span className="inline-flex items-center rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                        Edición activa
                      </span>
                      <strong className="mt-3 block text-slate-900">{selectedSkill.title}</strong>
                      <p className="mt-1 text-sm text-slate-600">Estás actualizando esta habilidad.</p>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="list">
              <div className="grid gap-4">
                {mySkills.length === 0 ? (
                  <EmptyState
                    icon={Wrench}
                    tone="info"
                    title="Aún no has publicado habilidades"
                    description="Cuando publiques tu primera habilidad aparecerá aquí."
                    action={
                      <Button type="button" className="rounded-full" onClick={handleStartCreate}>
                        <PlusCircle size={16} aria-hidden="true" />
                        Ir a agregar habilidad
                      </Button>
                    }
                  />
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

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

export default MySkillsPage
