import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { PlusCircle, Wrench, GraduationCap, Save } from 'lucide-react'
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
import { CATEGORIES, PREDEFINED_SKILLS } from '@/lib/skillsMap'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function MySkillsPage() {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const onboardingStep = searchParams.get('onboarding')

  const [deleteTarget, setDeleteTarget] = useState(null)
  const [activeTab, setActiveTab] = useState(
    onboardingStep === 'step1' ? 'create' : onboardingStep === 'step2' ? 'desires' : searchParams.get('tab') === 'list' ? 'list' : 'create'
  )
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
    updatingDesiredSkills,
    desiredSkills,
    handleUpdateDesiredSkills,
    handleDeleteSkill,
    handleEditSkill,
    handleSkillChange,
    handleSubmitSkill,
    resetSkillForm,
  } = useSkillSwapData()

  const [localDesired, setLocalDesired] = useState(desiredSkills || [])

  useEffect(() => {
    setLocalDesired(desiredSkills || [])
  }, [desiredSkills])

  const toggleDesired = (cat) => {
    setLocalDesired((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    )
  }

  const handleOnboardingSubmitSkill = async (event) => {
    const success = await handleSubmitSkill(event)
    if (success && onboardingStep === 'step1') {
      setSearchParams({ onboarding: 'step2' })
      setActiveTab('desires')
    }
  }

  const saveDesired = async () => {
    const success = await handleUpdateDesiredSkills(localDesired)
    if (success && onboardingStep === 'step2') {
      navigate('/dashboard?onboarding=complete')
    }
  }

  useEffect(() => {
    if (editingSkillId) {
      setActiveTab('create')
    }
  }, [editingSkillId])

  useEffect(() => {
    if (onboardingStep === 'step1') {
      setActiveTab('create')
    } else if (onboardingStep === 'step2') {
      setActiveTab('desires')
    } else {
      setActiveTab(searchParams.get('tab') === 'list' ? 'list' : 'create')
    }
  }, [searchParams, onboardingStep])

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
        eyebrow="Tus habilidades"
        title="Gestiona lo que ofreces y lo que buscas."
        description="Añade, edita o elimina las habilidades que puedes enseñar a la comunidad, y configura tus preferencias de aprendizaje."
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
              <TabsTrigger value="desires" className="rounded-xl px-4 py-2">
                Quiero aprender
              </TabsTrigger>
            </TabsList>

            <TabsContent value="create">
              <Card id="skill-form-panel" className="border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-5 p-5 md:p-6">
                  {onboardingStep === 'step1' && (
                    <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 mb-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wider mb-1">Paso 1 de 2: ¡Bienvenido!</h3>
                        <p className="text-blue-700 text-sm">Para empezar, publica tu primera habilidad. Si prefieres, puedes hacerlo más tarde.</p>
                      </div>
                      <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-800 underline whitespace-nowrap ml-4">Omitir por ahora</Link>
                    </div>
                  )}

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
                    onSubmit={onboardingStep === 'step1' ? handleOnboardingSubmitSkill : handleSubmitSkill}
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

            <TabsContent value="desires">
              <Card className="border-slate-200 bg-white shadow-sm">
                <CardContent className="space-y-6 p-5 md:p-6">
                  {onboardingStep === 'step2' && (
                    <div className="rounded-2xl bg-blue-50 border border-blue-200 p-4 mb-4 flex justify-between items-center">
                      <div>
                        <h3 className="text-blue-800 font-semibold text-sm uppercase tracking-wider mb-1">Paso 2 de 2: ¡Casi terminamos!</h3>
                        <p className="text-blue-700 text-sm">Ahora cuéntanos qué te gustaría aprender a cambio para conectarte con las personas adecuadas.</p>
                      </div>
                      <Link to="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-800 underline whitespace-nowrap ml-4">Omitir por ahora</Link>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                      ¿Qué te gustaría aprender?
                    </h2>
                    <p className="text-sm leading-6 text-slate-600">
                      Selecciona o escribe las categorías y temas que te interesan. Nuestro sistema de coincidencias inteligentes usará esto para calcular tu <strong>% de Match</strong> con otras personas.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {CATEGORIES.map((cat) => {
                      const isSelected = localDesired.some(d => d.category === cat)
                      return (
                        <button
                          key={cat}
                          onClick={() => {
                            if (isSelected) {
                              setLocalDesired(prev => prev.filter(d => d.category !== cat))
                            } else {
                              setLocalDesired(prev => [...prev, { category: cat, title: null }])
                            }
                          }}
                          className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all ${
                            isSelected
                              ? 'bg-cyan-600 text-white shadow-md hover:bg-cyan-700'
                              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    })}
                    {/* Render custom categories that are not in CATEGORIES array */}
                    {[...new Set(localDesired.map(d => d.category))].filter(cat => !CATEGORIES.includes(cat)).map(cat => (
                      <button
                        key={cat}
                        onClick={() => {
                          setLocalDesired(prev => prev.filter(d => d.category !== cat))
                        }}
                        className="rounded-full px-5 py-2.5 text-sm font-medium transition-all bg-cyan-600 text-white shadow-md hover:bg-cyan-700"
                      >
                        {cat} ✕
                      </button>
                    ))}
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Nueva categoría..."
                        className="rounded-full border border-slate-200 px-4 py-2 text-sm outline-none focus:border-cyan-400"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && e.target.value.trim() !== '') {
                            const newCat = e.target.value.trim()
                            if (!localDesired.some(d => d.category === newCat)) {
                              setLocalDesired(prev => [...prev, { category: newCat, title: null }])
                            }
                            e.target.value = ''
                          }
                        }}
                      />
                      <span className="text-[10px] text-slate-400 hidden sm:inline">Presiona Enter</span>
                    </div>
                  </div>

                  {[...new Set(localDesired.map(d => d.category))].map(cat => (
                    <div key={`spec-${cat}`} className="mt-4 p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                      <h3 className="font-medium text-slate-800 mb-3 text-sm">Temas de {cat} (Opcional)</h3>
                      <div className="flex flex-wrap gap-2">
                        <button
                           onClick={() => {
                             setLocalDesired(prev => [...prev.filter(d => d.category !== cat), { category: cat, title: null }])
                           }}
                           className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                             localDesired.some(d => d.category === cat && d.title === null)
                               ? 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                               : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                           }`}
                        >
                          Cualquier tema
                        </button>
                        {PREDEFINED_SKILLS[cat]?.map(skill => {
                          const isSelected = localDesired.some(d => d.category === cat && d.title === skill)
                          return (
                            <button
                              key={skill}
                              onClick={() => {
                                setLocalDesired(prev => {
                                  let next = prev.filter(d => !(d.category === cat && d.title === null))
                                  if (isSelected) {
                                    next = next.filter(d => !(d.category === cat && d.title === skill))
                                    if (!next.some(d => d.category === cat)) {
                                       next.push({ category: cat, title: null })
                                    }
                                  } else {
                                    next.push({ category: cat, title: skill })
                                  }
                                  return next
                                })
                              }}
                              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                                isSelected
                                  ? 'bg-cyan-100 text-cyan-800 border border-cyan-200'
                                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                              }`}
                            >
                              {skill}
                            </button>
                          )
                        })}

                        <div className="flex items-center gap-2 mt-1">
                          <input
                            type="text"
                            placeholder="Añadir otro tema..."
                            className="rounded-full border border-slate-200 px-3 py-1 text-xs outline-none focus:border-cyan-400"
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' && e.target.value.trim() !== '') {
                                const newTitle = e.target.value.trim()
                                setLocalDesired(prev => {
                                  let next = prev.filter(d => !(d.category === cat && d.title === null))
                                  if (!next.some(d => d.category === cat && d.title === newTitle)) {
                                    next.push({ category: cat, title: newTitle })
                                  }
                                  return next
                                })
                                e.target.value = ''
                              }
                            }}
                          />
                          <span className="text-[10px] text-slate-400">Presiona Enter</span>
                        </div>
                      </div>
                      
                      {/* Mostrar los custom titles de esta categoría si no están en PREDEFINED_SKILLS */}
                      {localDesired.filter(d => d.category === cat && d.title !== null && !(PREDEFINED_SKILLS[cat] || []).includes(d.title)).length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-100">
                          {localDesired.filter(d => d.category === cat && d.title !== null && !(PREDEFINED_SKILLS[cat] || []).includes(d.title)).map(d => (
                            <button
                              key={`custom-${d.title}`}
                              onClick={() => {
                                setLocalDesired(prev => prev.filter(item => !(item.category === cat && item.title === d.title)))
                              }}
                              className="rounded-full px-4 py-1.5 text-xs font-medium transition-all bg-cyan-100 text-cyan-800 border border-cyan-200"
                            >
                              {d.title} ✕
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-slate-100">
                    <Button
                      onClick={saveDesired}
                      disabled={updatingDesiredSkills}
                      className="rounded-full"
                    >
                      {updatingDesiredSkills ? 'Guardando...' : (
                        <>
                          <Save size={16} className="mr-2" />
                          Guardar preferencias
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
