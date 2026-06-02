import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function ErrorState({
  title = 'Ha ocurrido un problema',
  description = 'No se pudo completar la acción. Inténtalo de nuevo en unos segundos.',
  actionLabel = 'Reintentar',
  onRetry,
  className,
}) {
  return (
    <Card className={cn('border-red-200 bg-red-50/60 text-center shadow-sm', className)}>
      <CardHeader className="items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-red-100 text-red-600">
          <AlertTriangle size={26} aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl text-slate-900">{title}</CardTitle>
          <p className="max-w-md text-sm leading-6 text-slate-600">{description}</p>
        </div>
      </CardHeader>
      {onRetry ? (
        <CardContent className="flex justify-center pt-0">
          <Button type="button" variant="outline" className="rounded-full" onClick={onRetry}>
            {actionLabel}
          </Button>
        </CardContent>
      ) : null}
    </Card>
  )
}

export default ErrorState
