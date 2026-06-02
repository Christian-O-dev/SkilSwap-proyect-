import EmptyState from '@/components/common/EmptyState.jsx'
import LoadingSkeleton from '@/components/common/LoadingSkeleton.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import ExchangeCard from '@/components/exchanges/ExchangeCard.jsx'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function ExchangesPage() {
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

  return (
    <section className="page skills-page">
      <PageHeader
        eyebrow="Intercambios"
        title="Sigue tus intercambios activos, completados y cancelados."
        description="Desde aqui puedes cerrar un intercambio pendiente o valorar uno ya completado."
      />

      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      {loading ? <LoadingSkeleton /> : null}

      {!loading && exchanges.length === 0 ? (
        <EmptyState
          title="Todavia no tienes intercambios"
          description="Cuando una solicitud sea aceptada, el intercambio aparecera en esta pagina."
        />
      ) : null}

      <div className="skills-list">
        {exchanges.map((exchange) => (
          <ExchangeCard
            key={exchange.id}
            exchange={exchange}
            currentUserId={user?.id}
            ratingForm={ratingForms[exchange.id]}
            isUpdating={updatingExchangeId === exchange.id}
            isRating={ratingExchangeId === exchange.id}
            onStatusChange={handleExchangeStatus}
            onRatingChange={handleRatingChange}
            onCreateRating={handleCreateRating}
          />
        ))}
      </div>
    </section>
  )
}

export default ExchangesPage
