import { MessageSquareQuote, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const ratingOptions = [
  { value: '5', label: '5 · Excelente', hint: 'Intercambio muy útil y bien llevado.' },
  { value: '4', label: '4 · Muy bien', hint: 'Buena experiencia, con pequeños detalles a mejorar.' },
  { value: '3', label: '3 · Bien', hint: 'Cumplió lo esperado.' },
  { value: '2', label: '2 · Regular', hint: 'Hubo varias cosas que podrían mejorar.' },
  { value: '1', label: '1 · Mejorable', hint: 'La experiencia no salió como esperabas.' },
]

function RatingForm({
  exchange,
  form,
  loading,
  onChange,
  onSubmit,
}) {
  const currentScore = form?.score || '5'
  const selectedOption =
    ratingOptions.find((option) => option.value === currentScore) || ratingOptions[0]

  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 md:p-5">
      <div className="mb-5 space-y-2">
        <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">
          <Star size={14} aria-hidden="true" />
          Valorar intercambio
        </div>
        <h4 className="text-lg font-semibold text-slate-900">Comparte cómo fue la experiencia</h4>
        <p className="text-sm leading-6 text-slate-600">
          Tu valoración ayuda a reforzar la confianza dentro de la comunidad.
        </p>
      </div>

      <div className="grid gap-5">
        <div className="grid gap-3">
          <Label htmlFor={`rating-score-${exchange.id}`} className="text-slate-800">
            Puntuación
          </Label>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <select
              id={`rating-score-${exchange.id}`}
              value={currentScore}
              onChange={(event) => onChange(exchange.id, 'score', event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            >
              {ratingOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="mt-3 text-sm text-slate-600">{selectedOption.hint}</p>
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor={`rating-comment-${exchange.id}`} className="text-slate-800">
            Comentario
          </Label>
          <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
            <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
              <MessageSquareQuote size={14} aria-hidden="true" />
              Opinión breve
            </div>
            <Textarea
              id={`rating-comment-${exchange.id}`}
              rows={4}
              placeholder="Cuenta brevemente cómo fue el intercambio y qué destacarías."
              value={form?.comment || ''}
              onChange={(event) => onChange(exchange.id, 'comment', event.target.value)}
              className="min-h-28 rounded-xl border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 placeholder:text-slate-400 focus-visible:border-blue-500 focus-visible:ring-blue-100"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-500">
            Puedes enviar solo la puntuación o añadir un comentario para dar más contexto.
          </p>
          <Button
            type="button"
            className="rounded-full bg-blue-600 text-white hover:bg-blue-700"
            disabled={loading}
            onClick={() => onSubmit(exchange)}
          >
            {loading ? 'Enviando...' : 'Enviar valoración'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default RatingForm
