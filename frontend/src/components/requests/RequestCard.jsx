import { useState } from 'react'
import StatusBadge from '@/components/common/StatusBadge.jsx'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'
import ChatBox from '@/components/chat/ChatBox.jsx'

function RequestCard({
  request,
  type = 'sent',
  isUpdating = false,
  onAccept,
  onReject,
}) {
  const [showChat, setShowChat] = useState(false)

  return (
    <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <strong className="block text-base text-slate-900">{request.skill_title}</strong>
          <span className="block text-sm text-slate-600">
            {type === 'received'
              ? `Solicita: ${request.requester_username}`
              : `Propietario: ${request.skill_owner}`}
          </span>
        </div>

        <StatusBadge status={request.status} className="self-start" />
      </div>

      <p className="mt-3 text-sm text-slate-500">Fecha: {request.createdAtLabel}</p>

      <div className="mt-4 flex flex-wrap gap-3">
        {type === 'received' && request.status === 'open' ? (
          <>
            <Button
              type="button"
              variant="secondary"
              className="rounded-full"
              disabled={isUpdating}
              onClick={() => onAccept?.(request)}
            >
              {isUpdating ? 'Guardando...' : 'Aceptar'}
            </Button>
            <Button
              type="button"
              variant="outline"
              className="rounded-full"
              disabled={isUpdating}
              onClick={() => onReject?.(request)}
            >
              Rechazar
            </Button>
          </>
        ) : null}

        <Button
          type="button"
          variant={showChat ? 'secondary' : 'default'}
          className="rounded-full"
          onClick={() => setShowChat(!showChat)}
        >
          <MessageCircle size={16} className="mr-2" />
          {showChat ? 'Ocultar Chat' : 'Abrir Chat'}
        </Button>
      </div>

      {showChat ? (
        <div className="mt-5 pt-5 border-t border-slate-100">
          <ChatBox requestId={request.id} />
        </div>
      ) : null}
    </article>
  )
}

export default RequestCard
