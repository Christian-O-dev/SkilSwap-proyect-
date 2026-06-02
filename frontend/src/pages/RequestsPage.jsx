import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import RequestsList from '@/components/requests/RequestsList.jsx'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
        stats={
          <>
            <div className="stat-pill">
              <strong>{requests.length}</strong>
              <span>enviadas</span>
            </div>
            <div className="stat-pill">
              <strong>{receivedRequests.length}</strong>
              <span>recibidas</span>
            </div>
          </>
        }
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

      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="p-4 md:p-6">
          <Tabs defaultValue="sent" className="gap-5">
            <TabsList variant="line" className="w-full justify-start gap-2 rounded-2xl bg-white p-1">
              <TabsTrigger value="sent" className="rounded-xl px-4 py-2">
                Enviadas
              </TabsTrigger>
              <TabsTrigger value="received" className="rounded-xl px-4 py-2">
                Recibidas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sent">
              <RequestsList
                title="Solicitudes enviadas"
                requests={requests}
                type="sent"
                loading={loading}
                emptyMessage="Todavia no has creado solicitudes."
              />
            </TabsContent>

            <TabsContent value="received">
              <RequestsList
                title="Solicitudes recibidas"
                requests={receivedRequests}
                type="received"
                loading={loading}
                emptyMessage="Todavia no has recibido solicitudes."
                updatingRequestId={updatingRequestId}
                onAccept={(request) => handleIncomingRequest(request, 'accepted')}
                onReject={(request) => handleIncomingRequest(request, 'rejected')}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

export default RequestsPage
