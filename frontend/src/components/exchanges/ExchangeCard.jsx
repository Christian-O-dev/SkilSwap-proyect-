import StatusBadge from '@/components/common/StatusBadge.jsx'
import { Button } from '@/components/ui/button'
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
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <strong className="block text-base text-slate-900">{exchange.skill_title}</strong>
          <span className="block text-sm text-slate-600">
            {exchange.requester_id === currentUserId
              ? `Con ${exchange.skill_owner}`
              : `Con ${exchange.requester_username}`}
          </span>
        </div>

        <StatusBadge status={exchange.status} className="self-start" />
      </div>

      <p className="mt-3 text-sm text-slate-500">Fecha: {exchange.agreedAtLabel}</p>

      {exchange.status === 'pending' ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            className="rounded-full"
            disabled={isUpdating}
            onClick={() => onStatusChange(exchange, 'completed')}
          >
            {isUpdating ? 'Guardando...' : 'Completar'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-full"
            disabled={isUpdating}
            onClick={() => onStatusChange(exchange, 'cancelled')}
          >
            Cancelar
          </Button>
        </div>
      ) : null}

      {exchange.status === 'completed' && !exchange.my_rating ? (
        <div className="mt-5 border-t border-slate-100 pt-5">
          <RatingForm
            exchange={exchange}
            form={ratingForm}
            loading={isRating}
            onChange={onRatingChange}
            onSubmit={onCreateRating}
          />
        </div>
      ) : null}

      {exchange.my_rating ? (
        <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
          <strong className="text-emerald-900">Tu valoración: {exchange.my_rating.score}/5</strong>
          {exchange.my_rating.comment ? (
            <p className="mt-2 text-sm text-emerald-800">{exchange.my_rating.comment}</p>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}

export default ExchangeCard
