import StatusBadge from '@/components/common/StatusBadge.jsx'
import RatingForm from './RatingForm.jsx'

function ExchangeCard({
  exchange,
  currentUserId,
  ratingForm,
  isUpdating,
  isRating,
  onStatusChange,
  onRatingChange,
  onCreateRating,
}) {
  return (
    <article className="request-item">
      <strong>{exchange.skill_title}</strong>
      <span className="muted">
        {exchange.requester_id === currentUserId
          ? `Con ${exchange.skill_owner}`
          : `Con ${exchange.requester_username}`}
      </span>
      <div className="inline-actions">
        <StatusBadge status={exchange.status} />
        <span className="muted">{exchange.agreedAtLabel}</span>
      </div>

      {exchange.status === 'pending' ? (
        <div className="inline-actions">
          <button
            type="button"
            className="button button--soft"
            disabled={isUpdating}
            onClick={() => onStatusChange(exchange, 'completed')}
          >
            {isUpdating ? 'Guardando...' : 'Completar'}
          </button>
          <button
            type="button"
            className="button button--ghost"
            disabled={isUpdating}
            onClick={() => onStatusChange(exchange, 'cancelled')}
          >
            Cancelar
          </button>
        </div>
      ) : null}

      {exchange.status === 'completed' && !exchange.my_rating ? (
        <RatingForm
          exchange={exchange}
          form={ratingForm}
          loading={isRating}
          onChange={onRatingChange}
          onSubmit={onCreateRating}
        />
      ) : null}

      {exchange.my_rating ? (
        <div className="rating-summary">
          <strong>Tu valoracion: {exchange.my_rating.score}/5</strong>
          {exchange.my_rating.comment ? <p className="muted">{exchange.my_rating.comment}</p> : null}
        </div>
      ) : null}
    </article>
  )
}

export default ExchangeCard
