import { BellRing } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  PageHeaderSkeleton,
  TabsPageLoadingSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
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

  if (loading) {
    return (
      <section className="space-y-6">
        <PageHeaderSkeleton stats={2} />
        <TabsPageLoadingSkeleton count={3} />
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Solicitudes"
        title="Gestiona las solicitudes enviadas y recibidas."
        description="Consulta el estado de tus peticiones y responde las que llegan a tus habilidades."
        stats={
          <>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">{requests.length}</strong>
              <span className="text-sm text-slate-600">enviadas</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">
                {receivedRequests.length}
              </strong>
              <span className="text-sm text-slate-600">recibidas</span>
            </div>
          </>
        }
      />

      {error ? (
        <ErrorState
          title="No se pudieron cargar las solicitudes"
          description={error}
          actionLabel="Recargar página"
          onRetry={() => window.location.reload()}
        />
      ) : null}

      {notice ? (
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          {notice}
        </p>
      ) : null}

      {requests.length === 0 && receivedRequests.length === 0 ? (
        <EmptyState
          icon={BellRing}
          tone="info"
          title="No hay solicitudes disponibles"
          description="Cuando envíes o recibas solicitudes aparecerán aquí."
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
                emptyMessage="Todavía no has creado solicitudes."
              />
            </TabsContent>

            <TabsContent value="received">
              <RequestsList
                title="Solicitudes recibidas"
                requests={receivedRequests}
                type="received"
                loading={loading}
                emptyMessage="Todavía no has recibido solicitudes."
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
