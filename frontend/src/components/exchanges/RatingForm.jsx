function RatingForm({
  exchange,
  form,
  loading,
  onChange,
  onSubmit,
}) {
  return (
    <div className="rating-form">
      <label className="field">
        <span>Puntuacion</span>
        <select
          value={form?.score || '5'}
          onChange={(event) => onChange(exchange.id, 'score', event.target.value)}
        >
          <option value="5">5 - Excelente</option>
          <option value="4">4 - Muy bien</option>
          <option value="3">3 - Bien</option>
          <option value="2">2 - Regular</option>
          <option value="1">1 - Mejorable</option>
        </select>
      </label>

      <label className="field">
        <span>Comentario</span>
        <textarea
          rows="3"
          placeholder="Cuenta brevemente como fue el intercambio"
          value={form?.comment || ''}
          onChange={(event) => onChange(exchange.id, 'comment', event.target.value)}
        />
      </label>

      <button
        type="button"
        className="button button--soft"
        disabled={loading}
        onClick={() => onSubmit(exchange)}
      >
        {loading ? 'Enviando...' : 'Enviar valoracion'}
      </button>
    </div>
  )
}

export default RatingForm
