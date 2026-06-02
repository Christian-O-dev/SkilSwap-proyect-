import StatusBadge from '@/components/common/StatusBadge.jsx'

function RequestCard({
  request,
  type = 'sent',
  isUpdating = false,
  onAccept,
  onReject,
}) {
  return (
    <article className="request-item">
      <strong>{request.skill_title}</strong>
      <span className="muted">
        {type === 'received' ? `De ${request.requester_username}` : `Para ${request.skill_owner}`}
      </span>
      <div className="inline-actions">
        <StatusBadge status={request.status} />
        <span className="muted">{request.createdAtLabel}</span>
      </div>

      {type === 'received' && request.status === 'open' ? (
        <div className="inline-actions">
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
