import { Inbox } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function EmptyState({
  icon: Icon = Inbox,
  title,
  description,
  action,
  className,
}) {
  return (
    <Card className={cn('border-dashed border-border/70 bg-card/80 text-center shadow-sm', className)}>
      <CardHeader className="items-center gap-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
          <Icon size={26} aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {description ? (
            <p className="max-w-md text-sm leading-6 text-muted-foreground">{description}</p>
          ) : null}
        </div>
      </CardHeader>
      {action ? <CardContent className="flex justify-center pt-0">{action}</CardContent> : null}
    </Card>
  )
}

export default EmptyState
