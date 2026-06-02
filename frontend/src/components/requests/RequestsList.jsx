import EmptyState from '@/components/common/EmptyState.jsx'
import RequestCard from './RequestCard.jsx'

function RequestsList({
  title,
  eyebrow,
  requests,
  type,
  loading,
  emptyMessage,
  updatingRequestId,
  onAccept,
  onReject,
}) {
  return (
    <section className="request-box">
      <span className="eyebrow">{eyebrow}</span>
      <strong>{title}</strong>
      <div className="request-list">
        {requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            type={type}
            isUpdating={updatingRequestId === request.id}
            onAccept={onAccept}
            onReject={onReject}
          />
        ))}
        {!loading && requests.length === 0 ? (
          <EmptyState
            title="Sin solicitudes"
            description={emptyMessage}
            className="border-0 bg-transparent shadow-none"
          />
        ) : null}
      </div>
    </section>
  )
}

export default RequestsList
