import { Calendar, Monitor, Star, User } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

function SkillMeta({ icon: Icon, text }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm text-slate-600">
      <Icon size={15} aria-hidden="true" className="text-slate-400" />
      <span className="truncate">{text}</span>
    </div>
  )
}

function SkillCard({
  skill,
  onDelete,
  onEdit,
  onRequest,
  disabled = false,
  isOwner = false,
  requested = false,
  actionLabel = 'Solicitar intercambio',
}) {
  const ratingText =
    skill.ratingsCount > 0
      ? `${skill.averageRating.toFixed(1)}/5 · ${skill.ratingsCount} valoraciones`
      : 'Sin valoraciones'

  return (
    <Card className="overflow-hidden border-slate-200 bg-white text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Badge
            variant="outline"
            className="rounded-full border-cyan-200 bg-cyan-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-800"
          >
            {skill.category}
          </Badge>

          {skill.level ? (
            <Badge
              variant="outline"
              className="rounded-full border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-700"
            >
              {skill.level}
            </Badge>
          ) : null}
        </div>

        <div className="space-y-3">
          <CardTitle className="text-2xl leading-tight text-slate-900">{skill.title}</CardTitle>
          <p className="line-clamp-2 text-sm leading-6 text-slate-600">{skill.description}</p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-3 border-t border-slate-100 pt-6 md:grid-cols-2">
        <SkillMeta icon={User} text={skill.owner} />
        <SkillMeta icon={Monitor} text={skill.format} />
        <SkillMeta icon={Star} text={ratingText} />
        <SkillMeta icon={Calendar} text={skill.createdAtLabel} />
      </CardContent>

      <CardFooter
        className={cn(
          'gap-3 border-t border-slate-100 pt-6',
          isOwner ? 'flex flex-wrap' : 'flex-col',
        )}
      >
        {isOwner ? (
          <>
            <Button
              type="button"
              variant="outline"
              className="min-w-32 rounded-full"
              onClick={() => onEdit?.(skill)}
            >
              Editar
            </Button>
            <Button
              type="button"
              variant="destructive"
              className="min-w-32 rounded-full"
              onClick={() => onDelete?.(skill)}
              disabled={disabled}
            >
              Eliminar
            </Button>
          </>
        ) : (
          <Button
            type="button"
            variant={requested ? 'outline' : 'default'}
            className={cn(
              'w-full rounded-full',
              requested
                ? 'border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-50'
                : 'bg-slate-900 text-white hover:bg-slate-800',
            )}
            onClick={() => onRequest?.(skill)}
            disabled={disabled}
          >
            {actionLabel}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default SkillCard
