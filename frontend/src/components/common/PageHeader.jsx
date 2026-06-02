import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

function PageHeader({
  eyebrow,
  title,
  description,
  actions,
  stats,
  className,
}) {
  return (
    <Card className={cn('border-border/60 bg-card/95 shadow-sm', className)}>
      <CardHeader className="gap-4 md:flex md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          {eyebrow ? (
            <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-secondary-foreground">
              {eyebrow}
            </span>
          ) : null}
          <div className="space-y-2">
            <CardTitle className="text-3xl tracking-tight text-balance">{title}</CardTitle>
            {description ? (
              <p className="max-w-3xl text-sm leading-6 text-muted-foreground md:text-base">
                {description}
              </p>
            ) : null}
          </div>
        </div>

        {actions ? <div className="flex shrink-0 flex-wrap gap-3">{actions}</div> : null}
      </CardHeader>

      {stats ? (
        <CardContent className="flex flex-wrap gap-3 pt-0">
          {stats}
        </CardContent>
      ) : null}
    </Card>
  )
}

export default PageHeader
