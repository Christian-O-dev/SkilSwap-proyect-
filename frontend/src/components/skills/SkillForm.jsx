function SkillForm({
  newSkill,
  editingSkillId,
  creatingSkill,
  onChange,
  onSubmit,
  onCancel,
}) {
  return (
    <form className="form-stack" onSubmit={onSubmit}>
      <label className="field">
        <span>Titulo</span>
        <input
          type="text"
          name="title"
          placeholder="Ej. React para principiantes"
          value={newSkill.title}
          onChange={onChange}
          required
        />
      </label>

      <label className="field">
        <span>Descripcion</span>
        <textarea
          name="description"
          rows="4"
          placeholder="Explica que ofreces y como lo ensenas."
          value={newSkill.description}
          onChange={onChange}
          required
        />
      </label>

      <label className="field">
        <span>Categoria</span>
        <select name="category" value={newSkill.category} onChange={onChange}>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="Design">Design</option>
          <option value="Data">Data</option>
        </select>
      </label>

      <label className="field">
        <span>Nivel</span>
        <select name="level" value={newSkill.level} onChange={onChange}>
          <option value="Starter">Starter</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>

      <label className="field">
        <span>Formato</span>
        <select name="format" value={newSkill.format} onChange={onChange}>
          <option value="Online">Online</option>
          <option value="Presencial">Presencial</option>
        </select>
      </label>

      <button type="submit" className="button button--primary">
        {creatingSkill ? 'Guardando...' : editingSkillId ? 'Guardar cambios' : 'Agregar habilidad'}
      </button>

      {editingSkillId ? (
        <button type="button" className="button button--ghost" onClick={onCancel}>
          Cancelar edicion
        </button>
      ) : null}
    </form>
  )
}

export default SkillForm
