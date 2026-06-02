import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function SkeletonCard({ className }) {
  return (
    <Card className={cn('border-border/60 bg-card/90 shadow-sm', className)}>
      <CardHeader className="space-y-3">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-3/4" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[92%]" />
        <Skeleton className="h-4 w-[68%]" />
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-24" />
        </div>
      </CardContent>
    </Card>
  )
}

function LoadingSkeleton({ count = 3, className }) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 xl:grid-cols-3', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export default LoadingSkeleton
