import { useState } from 'react'
import { Repeat2 } from 'lucide-react'
import EmptyState from '@/components/common/EmptyState.jsx'
import ErrorState from '@/components/common/ErrorState.jsx'
import {
  PageHeaderSkeleton,
  TabsPageLoadingSkeleton,
} from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import ExchangeCard from '@/components/exchanges/ExchangeCard.jsx'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function ExchangesPage() {
  const [activeTab, setActiveTab] = useState('active')
  const {
    exchanges,
    error,
    loading,
    notice,
    ratingExchangeId,
    ratingForms,
    updatingExchangeId,
    user,
    handleCreateRating,
    handleExchangeStatus,
    handleRatingChange,
  } = useSkillSwapData()

  const activeExchanges = exchanges.filter((exchange) => exchange.status === 'pending')
  const completedExchanges = exchanges.filter((exchange) => exchange.status === 'completed')
  const cancelledExchanges = exchanges.filter((exchange) => exchange.status === 'cancelled')

  const handleExchangeTabStatus = async (exchange, status) => {
    await handleExchangeStatus(exchange, status)

    if (status === 'completed') {
      setActiveTab('completed')
      return
    }

    if (status === 'cancelled') {
      setActiveTab('cancelled')
    }
  }

  if (loading) {
    return (
      <section className="space-y-6">
        <PageHeaderSkeleton stats={3} />
        <TabsPageLoadingSkeleton count={3} />
      </section>
    )
  }

  return (
    <section className="space-y-6">
      <PageHeader
        eyebrow="Intercambios"
        title="Sigue tus intercambios activos, completados y cancelados."
        description="Desde aquí puedes cerrar un intercambio pendiente o valorar uno ya completado."
        stats={
          <>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">
                {activeExchanges.length}
              </strong>
              <span className="text-sm text-slate-600">activos</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">
                {completedExchanges.length}
              </strong>
              <span className="text-sm text-slate-600">completados</span>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
              <strong className="block text-2xl font-semibold text-slate-900">
                {cancelledExchanges.length}
              </strong>
              <span className="text-sm text-slate-600">cancelados</span>
            </div>
          </>
        }
      />

      {error ? (
        <ErrorState
          title="No se pudieron cargar los intercambios"
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

      {exchanges.length === 0 ? (
        <EmptyState
          icon={Repeat2}
          tone="info"
          title="Todavía no tienes intercambios"
          description="Cuando una solicitud sea aceptada, el intercambio aparecerá en esta página."
        />
      ) : null}

      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="p-4 md:p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="gap-5">
            <TabsList variant="line" className="w-full justify-start gap-2 rounded-2xl bg-white p-1">
              <TabsTrigger value="active" className="rounded-xl px-4 py-2">
                Activos
              </TabsTrigger>
              <TabsTrigger value="completed" className="rounded-xl px-4 py-2">
                Completados
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="rounded-xl px-4 py-2">
                Cancelados
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active">
              <div className="grid gap-4">
                {activeExchanges.map((exchange) => (
                  <ExchangeCard
                    key={exchange.id}
                    exchange={exchange}
                    currentUserId={user?.id}
                    ratingForm={ratingForms[exchange.id]}
                    isUpdating={updatingExchangeId === exchange.id}
                    isRating={ratingExchangeId === exchange.id}
                    onStatusChange={handleExchangeTabStatus}
                    onRatingChange={handleRatingChange}
                    onCreateRating={handleCreateRating}
                  />
                ))}
                {activeExchanges.length === 0 ? (
                  <EmptyState
                    title="No hay intercambios activos"
                    description="Cuando una solicitud sea aceptada, aparecerá aquí como intercambio pendiente."
                    className="border-slate-200 bg-white shadow-sm"
                    tone="warning"
                  />
                ) : null}
              </div>
            </TabsContent>

            <TabsContent value="completed">
              <div className="grid gap-4">
                {completedExchanges.map((exchange) => (
                  <ExchangeCard
                    key={exchange.id}
                    exchange={exchange}
                    currentUserId={user?.id}
                    ratingForm={ratingForms[exchange.id]}
                    isUpdating={updatingExchangeId === exchange.id}
                    isRating={ratingExchangeId === exchange.id}
                    onStatusChange={handleExchangeTabStatus}
                    onRatingChange={handleRatingChange}
                    onCreateRating={handleCreateRating}
                  />
                ))}
                {completedExchanges.length === 0 ? (
                  <EmptyState
                    title="No hay intercambios completados"
                    description="Los intercambios finalizados aparecerán aquí para que puedas revisarlos y valorarlos."
                    className="border-slate-200 bg-white shadow-sm"
                    tone="warning"
                  />
                ) : null}
              </div>
            </TabsContent>

            <TabsContent value="cancelled">
              <div className="grid gap-4">
                {cancelledExchanges.map((exchange) => (
                  <ExchangeCard
                    key={exchange.id}
                    exchange={exchange}
                    currentUserId={user?.id}
                    ratingForm={ratingForms[exchange.id]}
                    isUpdating={updatingExchangeId === exchange.id}
                    isRating={ratingExchangeId === exchange.id}
                    onStatusChange={handleExchangeTabStatus}
                    onRatingChange={handleRatingChange}
                    onCreateRating={handleCreateRating}
                  />
                ))}
                {cancelledExchanges.length === 0 ? (
                  <EmptyState
                    title="No hay intercambios cancelados"
                    description="Si un intercambio se cancela, quedará registrado en esta pestaña."
                    className="border-slate-200 bg-white shadow-sm"
                    tone="warning"
                  />
                ) : null}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  )
}

export default ExchangesPage
