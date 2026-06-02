import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import RequestsList from '@/components/requests/RequestsList.jsx'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function RequestsPage() {
  const {
    error,
    loading,
    notice,
    receivedRequests,
    requests,
    updatingRequestId,
    handleIncomingRequest,
  } = useSkillSwapData()

  return (
    <section className="page skills-page">
      <PageHeader
        eyebrow="Solicitudes"
        title="Gestiona las solicitudes enviadas y recibidas."
        description="Consulta el estado de tus peticiones y responde las que llegan a tus habilidades."
      />

      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      {loading ? <LoadingSkeleton /> : null}

      {!loading && requests.length === 0 && receivedRequests.length === 0 ? (
        <EmptyState
          title="No hay solicitudes disponibles"
          description="Cuando envies o recibas solicitudes apareceran aqui."
        />
      ) : null}

      <div className="page--split">
        <RequestsList
          eyebrow="Enviadas"
          title={`${requests.length} registradas`}
          requests={requests}
          type="sent"
          loading={loading}
          emptyMessage="Todavia no has creado solicitudes."
        />

        <RequestsList
          eyebrow="Recibidas"
          title={`${receivedRequests.length} recibidas`}
          requests={receivedRequests}
          type="received"
          loading={loading}
          emptyMessage="Todavia no has recibido solicitudes."
          updatingRequestId={updatingRequestId}
          onAccept={(request) => handleIncomingRequest(request, 'accepted')}
          onReject={(request) => handleIncomingRequest(request, 'rejected')}
        />
      </div>
    </section>
  )
}

export default RequestsPage
