import EmptyState from '@/components/common/EmptyState.jsx'
import RequestCard from './RequestCard.jsx'

function RequestsList({
  title,
  requests,
  type,
  loading,
  emptyMessage,
  updatingRequestId,
  onAccept,
  onReject,
}) {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <strong className="text-lg text-slate-900">{title}</strong>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {requests.length}
        </span>
      </div>
      <div className="grid gap-4">
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
            className="border-slate-200 bg-white shadow-sm"
          />
        ) : null}
      </div>
    </section>
  )
}

export default RequestsList
