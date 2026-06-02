function SkillSearchBar({ value, onChange }) {
  return (
    <div className="card filter-card">
      <label className="field">
        <span>Buscar habilidades</span>
        <input
          type="search"
          name="search"
          placeholder="Busca por titulo, descripcion, categoria o formato"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    </div>
  )
}

export default SkillSearchBar
