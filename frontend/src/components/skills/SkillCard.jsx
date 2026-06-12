import { Calendar, Monitor, Star, User, MapPin } from 'lucide-react'
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
import SkillIcon from './SkillIcon'

function SkillMeta({ icon: Icon, text }) {
  return (
    <div className="flex items-center gap-2 text-sm text-slate-600 overflow-hidden">
      <Icon size={15} aria-hidden="true" className="text-slate-400 shrink-0" />
      <span className="truncate leading-none" title={text}>{text}</span>
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
      ? `${skill.averageRating.toFixed(1)} (${skill.ratingsCount})`
      : 'Sin valoraciones'

  return (
    <Card className="flex flex-col overflow-hidden border-slate-200 bg-white text-slate-900 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <CardHeader className="space-y-3 p-4 relative">
        {skill.matchPercentage !== null && skill.matchPercentage > 0 ? (
          <div className="absolute top-3 right-3 z-10">
            <Badge
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em] border-0 shadow-sm",
                skill.matchPercentage === 100 
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-400 text-white hover:from-emerald-600 hover:to-emerald-500" 
                  : "bg-gradient-to-r from-amber-500 to-orange-400 text-white hover:from-amber-600 hover:to-orange-500"
              )}
              title={skill.matchPercentage === 100 ? "Match Perfecto: Queréis aprender lo que el otro enseña." : "Te interesa aprender esta habilidad."}
            >
              {skill.matchPercentage === 100 ? '🔥 100% Match' : '✨ Te interesa'}
            </Badge>
          </div>
        ) : null}

        <div className="flex min-h-[24px] w-full items-start pr-28">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              variant="outline"
              className="rounded-full border-cyan-200 bg-cyan-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-cyan-800"
            >
              {skill.category}
            </Badge>

            {skill.level ? (
              <Badge
                variant="outline"
                className="rounded-full border-slate-200 bg-slate-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-700"
              >
                {skill.level}
              </Badge>
            ) : null}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <SkillIcon name={skill.title} category={skill.category} size={16} />
            </div>
            <CardTitle className="text-lg leading-tight text-slate-900 line-clamp-1" title={skill.title}>{skill.title}</CardTitle>
          </div>
          <p className="line-clamp-2 min-h-[40px] text-xs leading-5 text-slate-600">{skill.description}</p>
        </div>
      </CardHeader>

      <CardContent className="grid gap-2 border-t border-slate-100 p-4 py-3 sm:grid-cols-2 mt-auto">
        <SkillMeta icon={User} text={skill.owner} />
        <SkillMeta icon={Monitor} text={skill.format} />
        <SkillMeta icon={Star} text={ratingText} />
        <SkillMeta icon={Calendar} text={skill.createdAtLabel} />
        {skill.format === 'Presencial' && skill.location ? (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(skill.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex transition-opacity hover:opacity-70 col-span-2 sm:col-span-1"
            title="Ver en Google Maps"
          >
            <SkillMeta icon={MapPin} text={skill.location} />
          </a>
        ) : (
          <div aria-hidden="true" className="h-5" />
        )}
      </CardContent>

      <CardFooter
        className={cn(
          'gap-2 border-t border-slate-100 p-4 pt-3',
          isOwner ? 'flex flex-wrap' : 'flex-col',
        )}
      >
        {isOwner ? (
          <div className="flex w-full gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="flex-1 rounded-full text-xs"
              onClick={() => onEdit?.(skill)}
            >
              Editar
            </Button>
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="flex-1 rounded-full text-xs"
              onClick={() => onDelete?.(skill)}
              disabled={disabled}
            >
              Eliminar
            </Button>
          </div>
        ) : (
          <Button
            type="button"
            size="sm"
            variant={requested ? 'outline' : 'default'}
            className={cn(
              'w-full rounded-full text-xs',
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
