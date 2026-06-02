function SkillCard({
  skill,
  onDelete,
  onEdit,
  onRequest,
  disabled = false,
  isOwner = false,
  actionLabel = 'Solicitar intercambio',
}) {
  return (
    <article className="skill-card">
      <div className="skill-card__head">
        <div>
          <span className="skill-card__eyebrow">{skill.category}</span>
          <h3>{skill.title}</h3>
        </div>
        {skill.level ? <span className="skill-card__badge">{skill.level}</span> : null}
      </div>

      <p className="skill-card__body">{skill.description}</p>

      <div className="skill-card__meta">
        <span>{skill.owner}</span>
        <span>{skill.format}</span>
        <span>
          {skill.ratingsCount > 0
            ? `${skill.averageRating.toFixed(1)}/5 · ${skill.ratingsCount} valoraciones`
            : 'Sin valoraciones'}
        </span>
        <span>{skill.createdAtLabel}</span>
      </div>

      <div className="skill-card__actions">
        {isOwner ? (
          <>
            <button type="button" className="button button--soft" onClick={() => onEdit(skill)}>
              Editar
            </button>
            <button type="button" className="button button--ghost" onClick={() => onDelete(skill)}>
              Eliminar
            </button>
          </>
        ) : (
          <button
            type="button"
            className="button button--soft"
            onClick={() => onRequest(skill)}
            disabled={disabled}
          >
            {actionLabel}
          </button>
        )}
      </div>
    </article>
  )
}

export default SkillCard
