import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const statusMap = {
  open: {
    label: 'Abierta',
    className:
      'border-blue-200 bg-blue-100 text-blue-800 hover:bg-blue-100 dark:border-blue-900/60 dark:bg-blue-950/60 dark:text-blue-200',
  },
  accepted: {
    label: 'Aceptada',
    className:
      'border-emerald-200 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200',
  },
  rejected: {
    label: 'Rechazada',
    className:
      'border-rose-200 bg-rose-100 text-rose-800 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/60 dark:text-rose-200',
  },
  pending: {
    label: 'Pendiente',
    className:
      'border-amber-200 bg-amber-100 text-amber-800 hover:bg-amber-100 dark:border-amber-900/60 dark:bg-amber-950/60 dark:text-amber-200',
  },
  completed: {
    label: 'Completado',
    className:
      'border-emerald-200 bg-emerald-100 text-emerald-800 hover:bg-emerald-100 dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:text-emerald-200',
  },
  cancelled: {
    label: 'Cancelado',
    className:
      'border-slate-300 bg-slate-200 text-slate-800 hover:bg-slate-200 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200',
  },
}

function StatusBadge({ status, className }) {
  const normalizedStatus = typeof status === 'string' ? status.toLowerCase() : ''
  const config = statusMap[normalizedStatus] || {
    label: status || 'Sin estado',
    className:
      'border-slate-300 bg-slate-100 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200',
  }

  return (
    <Badge
      variant="outline"
      className={cn('font-semibold tracking-wide', config.className, className)}
    >
      {config.label}
    </Badge>
  )
}

export default StatusBadge
