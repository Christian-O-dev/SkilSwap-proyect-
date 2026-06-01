import { useEffect, useMemo, useState } from 'react'
import SkillCard from '../components/SkillCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getApiErrorMessage } from '../services/api.js'
import { createRequest, listRequests } from '../services/requestsService.js'
import { createSkill, listSkills } from '../services/skillsService.js'

const emptyForm = {
  title: '',
  description: '',
  category: 'Frontend',
  level: 'Starter',
  format: 'Online',
}

const normalizeSkill = (skill) => ({
  id: skill.id,
  title: skill.title,
  description: skill.description,
  owner: skill.username || 'SkillSwap user',
  category: skill.category || 'General',
  level: skill.level || 'Disponible',
  format: skill.format || 'Online',
  user_id: skill.user_id,
  created_at: skill.created_at,
})

const normalizeRequest = (request) => ({
  id: request.id,
  skill_id: request.skill_id,
  status: request.status,
  skill_title: request.skill_title || 'Habilidad',
  skill_owner: request.skill_owner || 'SkillSwap user',
  created_at: request.created_at,
})

function SkillsPage() {
  const { token, user } = useAuth()
  const [skills, setSkills] = useState([])
  const [requests, setRequests] = useState([])
  const [newSkill, setNewSkill] = useState(emptyForm)
  const [loading, setLoading] = useState(true)
  const [creatingSkill, setCreatingSkill] = useState(false)
  const [requestingSkillId, setRequestingSkillId] = useState(null)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [selectedSkill, setSelectedSkill] = useState(null)

  const skillCount = useMemo(() => skills.length, [skills])

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setLoading(true)
      setError('')

      try {
        const [skillsResponse, requestsResponse] = await Promise.all([
          listSkills(),
          token ? listRequests() : Promise.resolve({ requests: [] }),
        ])

        if (!isMounted) {
          return
        }

        setSkills((skillsResponse.skills || []).map(normalizeSkill))
        setRequests((requestsResponse.requests || []).map(normalizeRequest))
      } catch (apiError) {
        if (!isMounted) {
          return
        }

        setError(getApiErrorMessage(apiError, 'No se pudieron cargar las habilidades'))
        setSkills([])
        setRequests([])
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [token])

  const handleSkillChange = (event) => {
    const { name, value } = event.target
    setNewSkill((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleCreateSkill = (event) => {
    const submitSkill = async () => {
      setCreatingSkill(true)
      setError('')
      setNotice('')

      try {
        const response = await createSkill({
          title: newSkill.title,
          description: newSkill.description,
          category: newSkill.category,
          level: newSkill.level,
          format: newSkill.format,
        })

        const createdSkill = normalizeSkill({
          ...response.skill,
          category: newSkill.category,
          level: newSkill.level,
          format: newSkill.format,
          username: user?.username || response.skill?.username || 'SkillSwap user',
        })

        setSkills((current) => [createdSkill, ...current])
        setNewSkill(emptyForm)
        setNotice('Habilidad creada correctamente.')
      } catch (apiError) {
        setError(getApiErrorMessage(apiError, 'No se pudo crear la habilidad'))
      } finally {
        setCreatingSkill(false)
      }
    }

    event.preventDefault()
    submitSkill()
  }

  const handleRequestSkill = async (skill) => {
    setSelectedSkill(skill)
    setError('')
    setNotice('')

    if (!token) {
      setError('Necesitas iniciar sesion para solicitar una habilidad')
      return
    }

    if (skill.user_id && user?.id && skill.user_id === user.id) {
      setError('No puedes solicitar tu propia habilidad')
      return
    }

    setRequestingSkillId(skill.id)

    try {
      const response = await createRequest({ skill_id: skill.id })
      const createdRequest = normalizeRequest(response.request)
      setRequests((current) => [createdRequest, ...current])
      setNotice('Solicitud creada correctamente.')
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo crear la solicitud'))
    } finally {
      setRequestingSkillId(null)
    }
  }

  return (
    <section className="page skills-page">
      <div className="section-head">
        <div>
          <span className="eyebrow">Habilidades</span>
          <h1>Listado de habilidades conectado a la API.</h1>
          <p className="lead">
            Aqui ya se cargan las habilidades desde el backend y tambien puedes crear nuevas
            publicaciones y solicitudes.
          </p>
        </div>

        <div className="stat-pill">
          <strong>{skillCount}</strong>
          <span>habilidades visibles</span>
        </div>
      </div>

      {loading ? <div className="card info-card">Cargando habilidades...</div> : null}
      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      <div className="skills-layout">
        <div className="skills-list">
          {skills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onRequest={handleRequestSkill}
              disabled={Boolean(requestingSkillId) || (token && skill.user_id === user?.id)}
              actionLabel={
                token && skill.user_id === user?.id
                  ? 'Es tu habilidad'
                  : requestingSkillId === skill.id
                    ? 'Enviando...'
                    : 'Solicitar intercambio'
              }
            />
          ))}
          {!loading && skills.length === 0 ? (
            <article className="card info-card">
              <span className="eyebrow">Sin datos</span>
              <h2>No hay habilidades cargadas</h2>
              <p className="muted">
                Cuando la API responda, aqui apareceran las habilidades publicadas desde MySQL.
              </p>
            </article>
          ) : null}
        </div>

        <aside className="card composer-card">
          <span className="eyebrow">Nueva habilidad</span>
          <h2>Crear una habilidad</h2>
          <p className="muted">
            Este formulario guarda la habilidad en MySQL a traves de la API.
          </p>

          <form className="form-stack" onSubmit={handleCreateSkill}>
            <label className="field">
              <span>Titulo</span>
              <input
                type="text"
                name="title"
                placeholder="Ej. React para principiantes"
                value={newSkill.title}
                onChange={handleSkillChange}
                required
              />
            </label>

            <label className="field">
              <span>Descripcion</span>
              <textarea
                name="description"
                rows="4"
                placeholder="Explica que ofreces y como lo ensenas."
                value={newSkill.description}
                onChange={handleSkillChange}
                required
              />
            </label>

            <label className="field">
              <span>Categoria</span>
              <select name="category" value={newSkill.category} onChange={handleSkillChange}>
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Design">Design</option>
                <option value="Data">Data</option>
              </select>
            </label>

            <label className="field">
              <span>Nivel</span>
              <select name="level" value={newSkill.level} onChange={handleSkillChange}>
                <option value="Starter">Starter</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </label>

            <label className="field">
              <span>Formato</span>
              <select name="format" value={newSkill.format} onChange={handleSkillChange}>
                <option value="Online">Online</option>
                <option value="Presencial">Presencial</option>
              </select>
            </label>

            <button type="submit" className="button button--primary">
              {creatingSkill ? 'Guardando...' : 'Agregar habilidad'}
            </button>
          </form>

          {selectedSkill ? (
            <div className="request-box">
              <span className="eyebrow">Solicitud preparada</span>
              <strong>{selectedSkill.title}</strong>
              <p className="muted">
                La tarjeta seleccionada puede enviarse como solicitud real desde esta pantalla.
              </p>
            </div>
          ) : null}

          {token ? (
            <div className="request-box">
              <span className="eyebrow">Mis solicitudes</span>
              <strong>{requests.length} registradas</strong>
              <ul className="bullet-list">
                {requests.slice(0, 3).map((request) => (
                  <li key={request.id}>
                    {request.skill_title} - {request.status}
                  </li>
                ))}
                {!loading && requests.length === 0 ? <li>Todavia no has creado solicitudes.</li> : null}
              </ul>
            </div>
          ) : (
            <div className="request-box">
              <span className="eyebrow">Solicitudes</span>
              <p className="muted">Inicia sesion para listar y crear solicitudes desde la API.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export default SkillsPage
