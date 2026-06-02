import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

export function PageHeaderSkeleton({ stats = 3, className }) {
  return (
    <Card className={cn('border-slate-200 bg-white shadow-sm', className)}>
      <CardHeader className="gap-4 md:flex md:flex-row md:items-start md:justify-between">
        <div className="space-y-3">
          <Skeleton className="h-7 w-28 rounded-full bg-slate-200" />
          <div className="space-y-2">
            <Skeleton className="h-10 w-80 max-w-full bg-slate-200" />
            <Skeleton className="h-4 w-[32rem] max-w-full bg-slate-200" />
            <Skeleton className="h-4 w-[26rem] max-w-full bg-slate-200" />
          </div>
        </div>
        <Skeleton className="h-11 w-40 rounded-full bg-slate-200" />
      </CardHeader>
      <CardContent className="flex flex-wrap gap-3 pt-0">
        {Array.from({ length: stats }).map((_, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 shadow-sm"
          >
            <Skeleton className="h-8 w-16 bg-slate-200" />
            <Skeleton className="mt-2 h-4 w-24 bg-slate-200" />
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export function FilterBarSkeleton({ className }) {
  return (
    <Card className={cn('border-slate-200 bg-white shadow-sm', className)}>
      <CardContent className="grid gap-3 p-4 md:grid-cols-[minmax(0,1fr)_160px]">
        <Skeleton className="h-11 rounded-2xl bg-slate-200" />
        <Skeleton className="h-11 rounded-2xl bg-slate-200" />
      </CardContent>
    </Card>
  )
}

export function SkeletonCard({ className }) {
  return (
    <Card className={cn('border-slate-200 bg-white shadow-sm', className)}>
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <Skeleton className="h-6 w-28 rounded-full bg-slate-200" />
          <Skeleton className="h-6 w-20 rounded-full bg-slate-200" />
        </div>
        <Skeleton className="h-7 w-3/4 bg-slate-200" />
      </CardHeader>
      <CardContent className="space-y-3">
        <Skeleton className="h-4 w-full bg-slate-200" />
        <Skeleton className="h-4 w-[92%] bg-slate-200" />
        <Skeleton className="h-4 w-[68%] bg-slate-200" />
        <div className="flex flex-wrap gap-2 pt-3">
          <Skeleton className="h-9 w-28 rounded-full bg-slate-200" />
          <Skeleton className="h-9 w-24 rounded-full bg-slate-200" />
        </div>
      </CardContent>
    </Card>
  )
}

export function ListLoadingSkeleton({ count = 3, className }) {
  return (
    <div className={cn('grid gap-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  )
}

export function SplitPageLoadingSkeleton({ className }) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.8fr)]', className)}>
      <ListLoadingSkeleton count={3} />
      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="space-y-5 p-5 md:p-6">
          <Skeleton className="h-7 w-32 rounded-full bg-slate-200" />
          <Skeleton className="h-8 w-60 bg-slate-200" />
          <Skeleton className="h-4 w-full bg-slate-200" />
          <div className="grid gap-4 pt-2">
            <Skeleton className="h-11 rounded-2xl bg-slate-200" />
            <Skeleton className="h-32 rounded-2xl bg-slate-200" />
            <Skeleton className="h-11 rounded-2xl bg-slate-200" />
            <Skeleton className="h-11 rounded-2xl bg-slate-200" />
            <Skeleton className="h-11 rounded-full bg-slate-200" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function TabsPageLoadingSkeleton({ count = 3, className }) {
  return (
    <Card className={cn('border-slate-200 bg-slate-50/70 shadow-sm', className)}>
      <CardContent className="space-y-5 p-4 md:p-6">
        <div className="flex gap-2 rounded-2xl bg-white p-1">
          <Skeleton className="h-10 w-28 rounded-xl bg-slate-200" />
          <Skeleton className="h-10 w-32 rounded-xl bg-slate-200" />
          <Skeleton className="h-10 w-32 rounded-xl bg-slate-200" />
        </div>
        <ListLoadingSkeleton count={count} />
      </CardContent>
    </Card>
  )
}

export function ProfileLoadingSkeleton({ className }) {
  return (
    <div className={cn('grid gap-6 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)]', className)}>
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="grid gap-4 p-6">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-20 w-20 rounded-full bg-slate-200" />
            <Skeleton className="h-7 w-40 bg-slate-200" />
            <Skeleton className="h-4 w-52 bg-slate-200" />
            <Skeleton className="h-6 w-24 rounded-full bg-slate-200" />
          </div>
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <Skeleton className="h-4 w-24 bg-slate-200" />
              <Skeleton className="mt-3 h-6 w-20 bg-slate-200" />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-slate-200 bg-slate-50/70 shadow-sm">
        <CardContent className="grid gap-4 p-6">
          <Skeleton className="h-7 w-48 bg-slate-200" />
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <Skeleton className="h-5 w-40 bg-slate-200" />
              <Skeleton className="mt-3 h-4 w-56 bg-slate-200" />
            </div>
          ))}
          <Skeleton className="h-24 rounded-2xl bg-slate-200" />
        </CardContent>
      </Card>
    </div>
  )
}

export function AppBootSkeleton() {
  return (
    <div className="w-full max-w-5xl space-y-6">
      <Card className="border-slate-200 bg-white shadow-sm">
        <CardContent className="grid gap-6 p-6 md:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] md:p-8">
          <div className="space-y-4">
            <Skeleton className="h-7 w-32 rounded-full bg-slate-200" />
            <Skeleton className="h-12 w-[28rem] max-w-full bg-slate-200" />
            <Skeleton className="h-4 w-full bg-slate-200" />
            <Skeleton className="h-4 w-[85%] bg-slate-200" />
            <div className="flex gap-3 pt-2">
              <Skeleton className="h-11 w-40 rounded-full bg-slate-200" />
              <Skeleton className="h-11 w-36 rounded-full bg-slate-200" />
            </div>
          </div>
          <div className="grid gap-3">
            <Skeleton className="h-36 rounded-3xl bg-slate-200" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Skeleton className="h-24 rounded-2xl bg-slate-200" />
              <Skeleton className="h-24 rounded-2xl bg-slate-200" />
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-3xl bg-slate-200" />
        <Skeleton className="h-64 rounded-3xl bg-slate-200" />
      </div>
    </div>
  )
}

function LoadingSkeleton({ count = 3, className }) {
  return <ListLoadingSkeleton count={count} className={className} />
}

export default LoadingSkeleton
