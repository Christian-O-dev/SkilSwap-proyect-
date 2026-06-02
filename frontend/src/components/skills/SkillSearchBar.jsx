import { Search, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

function SkillSearchBar({ value, onChange, onClear }) {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardContent className="space-y-4 p-4 md:p-5">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          <SlidersHorizontal size={14} aria-hidden="true" />
          Búsqueda de habilidades
        </div>

        <div className="flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="search"
              name="search"
              placeholder="Busca por título, descripción, categoría, nivel o formato"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>

          <Button
            type="button"
            variant="outline"
            className="h-12 rounded-2xl border-slate-200 bg-white px-4"
            onClick={onClear}
            disabled={!value.trim()}
          >
            <X size={16} aria-hidden="true" />
            Limpiar
          </Button>
        </div>

        <p className="text-sm text-slate-500">
          Usa palabras clave como <span className="font-medium text-slate-700">React</span>,{' '}
          <span className="font-medium text-slate-700">Backend</span> o{' '}
          <span className="font-medium text-slate-700">Presencial</span>.
        </p>
      </CardContent>
    </Card>
  )
}

export default SkillSearchBar
