import StatusBadge from '@/components/common/StatusBadge.jsx'
import { CheckCircle2, MessageSquareQuote, Star } from 'lucide-react'
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
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-700">
                <CheckCircle2 size={14} aria-hidden="true" />
                Valoración enviada
              </div>
              <div className="flex items-center gap-2 text-emerald-900">
                <Star size={16} aria-hidden="true" className="fill-current text-amber-500" />
                <strong className="text-base">Tu puntuación: {exchange.my_rating.score}/5</strong>
              </div>
            </div>

            <div className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              {exchange.my_rating.score === 5
                ? 'Excelente'
                : exchange.my_rating.score === 4
                  ? 'Muy bien'
                  : exchange.my_rating.score === 3
                    ? 'Bien'
                    : exchange.my_rating.score === 2
                      ? 'Regular'
                      : 'Mejorable'}
            </div>
          </div>

          {exchange.my_rating.comment ? (
            <div className="mt-4 rounded-2xl border border-emerald-100 bg-white/80 p-4">
              <div className="mb-2 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                <MessageSquareQuote size={14} aria-hidden="true" />
                Tu comentario
              </div>
              <p className="text-sm leading-6 text-slate-700">{exchange.my_rating.comment}</p>
            </div>
          ) : (
            <p className="mt-4 text-sm text-emerald-800">
              Has enviado la puntuación sin comentario adicional.
            </p>
          )}
        </div>
      ) : null}
    </article>
  )
}

export default ExchangeCard
