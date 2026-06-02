import { Button } from '@/components/ui/button'

function SkillForm({
  newSkill,
  editingSkillId,
  creatingSkill,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Título</span>
        <input
          type="text"
          name="title"
          placeholder="Ej. React para principiantes"
          value={newSkill.title}
          onChange={onChange}
          required
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Descripción</span>
        <textarea
          name="description"
          rows="4"
          placeholder="Explica qué ofreces y cómo lo enseñas."
          value={newSkill.description}
          onChange={onChange}
          required
          className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Categoría</span>
        <select
          name="category"
          value={newSkill.category}
          onChange={onChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        >
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
          <option value="Data">Data</option>
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Nivel</span>
        <select
          name="level"
          value={newSkill.level}
          onChange={onChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        >
          <option value="Starter">Starter</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Formato</span>
        <select
          name="format"
          value={newSkill.format}
          onChange={onChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        >
          <option value="Online">Online</option>
          <option value="Presencial">Presencial</option>
        </select>
      </label>

      <Button type="submit" className="rounded-full">
        {creatingSkill ? 'Guardando...' : editingSkillId ? 'Guardar cambios' : 'Agregar habilidad'}
      </Button>

      {editingSkillId ? (
        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
          Cancelar edición
        </Button>
      ) : null}
    </form>
  )
}

export default SkillForm
