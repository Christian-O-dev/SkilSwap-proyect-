import StatusBadge from '@/components/common/StatusBadge.jsx'

function RequestCard({
  request,
  type = 'sent',
  isUpdating = false,
  onAccept,
  onReject,
}) {
  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <strong className="block text-base text-slate-900">{request.skill_title}</strong>
          <span className="block text-sm text-slate-600">
            {type === 'received' ? `Solicita: ${request.requester_username}` : `Propietario: ${request.skill_owner}`}
          </span>
        </div>

        <StatusBadge status={request.status} className="self-start" />
      </div>

      <p className="mt-3 text-sm text-slate-500">Fecha: {request.createdAtLabel}</p>

      {type === 'received' && request.status === 'open' ? (
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="button button--soft"
            disabled={isUpdating}
            onClick={() => onAccept?.(request)}
          >
            {isUpdating ? 'Guardando...' : 'Aceptar'}
          </button>
          <button
            type="button"
            className="button button--ghost"
            disabled={isUpdating}
            onClick={() => onReject?.(request)}
          >
            Rechazar
          </button>
        </div>
      ) : null}
    </article>
  )
}

export default RequestCard
