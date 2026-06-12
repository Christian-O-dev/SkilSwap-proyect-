import { useState, useEffect } from 'react'
import { MapPin, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CATEGORIES, PREDEFINED_SKILLS } from '@/lib/skillsMap'

function SkillForm({
  newSkill,
  editingSkillId,
  creatingSkill,
  onChange,
  onSubmit,
  onCancel,
}) {
  const [isManualTitle, setIsManualTitle] = useState(false)
  const [locationQuery, setLocationQuery] = useState(newSkill.location || '')
  const [locationSuggestions, setLocationSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [userCoords, setUserCoords] = useState(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => setUserCoords({ lat: position.coords.latitude, lon: position.coords.longitude }),
        (error) => console.error('Geolocalización denegada o no disponible', error)
      )
    }
  }, [])

  const handleGetCurrentLocation = () => {
    if (!('geolocation' in navigator)) return
    setIsGettingLocation(true)
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude: lat, longitude: lon } = position.coords
          setUserCoords({ lat, lon })
          
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`)
          const data = await res.json()
          
          if (data && data.display_name) {
            setLocationQuery(data.display_name)
            onChange({ target: { name: 'location', value: data.display_name } })
          }
        } catch (e) {
          console.error('Error en reverse geocoding:', e)
        } finally {
          setIsGettingLocation(false)
        }
      },
      (error) => {
        console.error(error)
        setIsGettingLocation(false)
      }
    )
  }

  useEffect(() => {
    setLocationQuery(newSkill.location || '')
  }, [newSkill.location])

  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (showSuggestions && locationQuery && locationQuery.length > 2) {
        try {
          let url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationQuery)}&limit=5&addressdetails=1`
          if (userCoords) {
            url += `&lat=${userCoords.lat}&lon=${userCoords.lon}`
          }
          const res = await fetch(url)
          const data = await res.json()
          setLocationSuggestions(data)
        } catch (e) {
          console.error('Error fetching location:', e)
        }
      } else {
        setLocationSuggestions([])
      }
    }, 600)
    return () => clearTimeout(delayDebounceFn)
  }, [locationQuery, showSuggestions])

  // Sincronizar estado local si estamos editando y el título no está en la lista predefinida
  useEffect(() => {
    if (newSkill.category && newSkill.title) {
      const predefined = PREDEFINED_SKILLS[newSkill.category] || []
      if (!predefined.includes(newSkill.title)) {
        setIsManualTitle(true)
      } else {
        setIsManualTitle(false)
      }
    }
  }, [newSkill.category, newSkill.title, editingSkillId])

  const handleCategoryChange = (e) => {
    const newCategory = e.target.value
    // Resetear título al cambiar categoría
    const predefined = PREDEFINED_SKILLS[newCategory] || []
    onChange({ target: { name: 'category', value: newCategory } })
    onChange({ target: { name: 'title', value: predefined[0] || '' } })
    setIsManualTitle(false)
  }

  const handleTitleSelectChange = (e) => {
    if (e.target.value === 'manual') {
      setIsManualTitle(true)
      onChange({ target: { name: 'title', value: '' } })
    } else {
      setIsManualTitle(false)
      onChange(e)
    }
  }

  const currentPredefinedSkills = PREDEFINED_SKILLS[newSkill.category] || []

  return (
    <form className="grid gap-4" onSubmit={onSubmit}>
      <div className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Categoría</span>
        {newSkill.category && !CATEGORIES.includes(newSkill.category) && newSkill.category !== '' ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="category"
              placeholder="Ej. Finanzas"
              value={newSkill.category}
              onChange={handleCategoryChange}
              required
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
            />
            <button
              type="button"
              onClick={() => {
                onChange({ target: { name: 'category', value: CATEGORIES[0] } })
                onChange({ target: { name: 'title', value: PREDEFINED_SKILLS[CATEGORIES[0]][0] } })
                setIsManualTitle(false)
              }}
              className="self-start text-sm text-cyan-600 hover:underline"
            >
              Volver a la lista predefinida
            </button>
          </div>
        ) : (
          <select
            name="category"
            value={newSkill.category || CATEGORIES[0]}
            onChange={(e) => {
              if (e.target.value === 'manual') {
                onChange({ target: { name: 'category', value: 'Nueva Categoría' } })
                onChange({ target: { name: 'title', value: '' } })
                setIsManualTitle(true)
              } else {
                handleCategoryChange(e)
              }
            }}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
            <option value="manual">Otro (Añadir manualmente)</option>
          </select>
        )}
      </div>

      <div className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Habilidad a enseñar</span>
        {!isManualTitle ? (
          <select
            name="title"
            value={newSkill.title}
            onChange={handleTitleSelectChange}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
          >
            {currentPredefinedSkills.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
            <option value="manual">Otro (Añadir manualmente)</option>
          </select>
        ) : (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              placeholder="Ej. Programación en C++"
              value={newSkill.title}
              onChange={onChange}
              required
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
            />
            {currentPredefinedSkills.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setIsManualTitle(false)
                  onChange({ target: { name: 'title', value: currentPredefinedSkills[0] } })
                }}
                className="self-start text-sm text-cyan-600 hover:underline"
              >
                Volver a la lista predefinida
              </button>
            )}
          </div>
        )}
      </div>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Descripción</span>
        <textarea
          name="description"
          rows="4"
          placeholder="Explica qué ofreces y cómo lo enseñas."
          value={newSkill.description}
          onChange={onChange}
          required
          className="min-h-32 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        />
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Nivel</span>
        <select
          name="level"
          value={newSkill.level}
          onChange={onChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        >
          <option value="Starter">Starter</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
      </label>

      <label className="grid gap-2">
        <span className="text-sm font-medium text-slate-800">Formato</span>
        <select
          name="format"
          value={newSkill.format}
          onChange={onChange}
          className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
        >
          <option value="Online">Online</option>
          <option value="Presencial">Presencial</option>
        </select>
      </label>

      {newSkill.format === 'Presencial' && (
        <label className="grid gap-2 relative">
          <span className="text-sm font-medium text-slate-800">Ubicación real</span>
          <div className="relative flex items-center">
            <input
              type="text"
              name="location"
              placeholder="Empieza a escribir una dirección o ciudad..."
              value={locationQuery}
              onChange={(e) => {
                setLocationQuery(e.target.value)
                onChange({ target: { name: 'location', value: e.target.value } })
                setShowSuggestions(true)
              }}
              onBlur={() => {
                setTimeout(() => setShowSuggestions(false), 200)
              }}
              required
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-slate-900 outline-none transition focus:border-cyan-300 focus:ring-4 focus:ring-cyan-100"
              autoComplete="off"
            />
            <button
              type="button"
              onClick={handleGetCurrentLocation}
              disabled={isGettingLocation}
              className="absolute right-4 text-slate-400 hover:text-cyan-600 transition disabled:opacity-50"
              title="Usar mi ubicación actual"
            >
              {isGettingLocation ? <Loader2 className="animate-spin" size={20} /> : <MapPin size={20} />}
            </button>
          </div>
          {showSuggestions && locationSuggestions.length > 0 && (
            <ul className="absolute top-[82px] z-10 w-full rounded-2xl border border-slate-200 bg-white shadow-xl overflow-hidden max-h-60 overflow-y-auto">
              {locationSuggestions.map((s) => (
                <li key={s.place_id} className="border-b border-slate-100 last:border-0">
                  <button
                    type="button"
                    className="w-full text-left px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition"
                    onClick={() => {
                      const name = s.display_name
                      setLocationQuery(name)
                      onChange({ target: { name: 'location', value: name } })
                      setShowSuggestions(false)
                      setLocationSuggestions([])
                    }}
                  >
                    {s.display_name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </label>
      )}

      <Button type="submit" className="rounded-full">
        {creatingSkill ? 'Guardando...' : editingSkillId ? 'Guardar cambios' : 'Agregar habilidad'}
      </Button>

      {editingSkillId ? (
        <Button type="button" variant="outline" className="rounded-full" onClick={onCancel}>
          Cancelar edición
        </Button>
      ) : null}
    </form>
  )
}

export default SkillForm
