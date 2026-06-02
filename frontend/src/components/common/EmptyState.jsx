import { Inbox } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  tone = 'default',
  className,
}) {
  const tones = {
    default: {
      card: 'border-dashed border-slate-200 bg-white',
      icon: 'bg-slate-100 text-slate-700',
      description: 'text-slate-600',
    },
    info: {
      card: 'border-dashed border-blue-200 bg-blue-50/50',
      icon: 'bg-blue-100 text-blue-700',
      description: 'text-slate-600',
    },
    warning: {
      card: 'border-dashed border-amber-200 bg-amber-50/50',
      icon: 'bg-amber-100 text-amber-700',
      description: 'text-slate-600',
    },
  }

  const palette = tones[tone] || tones.default

  return (
    <Card className={cn('text-center shadow-sm', palette.card, className)}>
      <CardHeader className="items-center gap-4">
        <div className={cn('flex size-14 items-center justify-center rounded-full', palette.icon)}>
          <Icon size={26} aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl text-slate-900">{title}</CardTitle>
          {description ? (
            <p className={cn('max-w-md text-sm leading-6', palette.description)}>{description}</p>
          ) : null}
        </div>
      </CardHeader>
      {action ? <CardContent className="flex justify-center pt-0">{action}</CardContent> : null}
    </Card>
  )
}

export default EmptyState
