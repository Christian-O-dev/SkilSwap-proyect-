import { useEffect, useMemo, useState } from 'react'
import SkillCard from '../components/SkillCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { getApiErrorMessage } from '../services/api.js'
import { listExchanges, updateExchangeStatus } from '../services/exchangesService.js'
import { createRating } from '../services/ratingsService.js'
import { createRequest, listRequests, updateRequestStatus } from '../services/requestsService.js'
import { createSkill, deleteSkill, listSkills, updateSkill } from '../services/skillsService.js'

const emptyForm = {
  title: '',
  description: '',
  category: 'Frontend',
  level: 'Starter',
  format: 'Online',
}

const formatSkillDate = (value) => {
  if (!value) {
    return 'Fecha no disponible'
  }

  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Fecha no disponible'
  }

  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const normalizeSkill = (skill) => ({
  id: skill.id,
  title: skill.title,
  description: skill.description,
  owner: skill.username || 'SkillSwap user',
  category: skill.category || 'General',
  level: skill.level || 'Disponible',
  format: skill.format || 'Online',
  averageRating: Number(skill.average_rating || 0),
  ratingsCount: Number(skill.ratings_count || 0),
  user_id: skill.user_id,
  created_at: skill.created_at,
  createdAtLabel: formatSkillDate(skill.created_at),
})

const normalizeRequest = (request) => ({
  id: request.id,
  skill_id: request.skill_id,
  status: request.status,
  skill_title: request.skill_title || 'Habilidad',
  skill_owner: request.skill_owner || 'SkillSwap user',
  requester_id: request.requester_id,
  requester_username: request.requester_username || 'SkillSwap user',
  skill_owner_id: request.skill_owner_id,
  created_at: request.created_at,
  createdAtLabel: formatSkillDate(request.created_at),
})

const normalizeExchange = (exchange) => ({
  id: exchange.id,
  request_id: exchange.request_id,
  status: exchange.status,
  agreed_at: exchange.agreed_at,
  agreedAtLabel: formatSkillDate(exchange.agreed_at),
  skill_id: exchange.skill_id,
  skill_title: exchange.skill_title || 'Habilidad',
  skill_owner: exchange.skill_owner || 'SkillSwap user',
  skill_owner_id: exchange.skill_owner_id,
  requester_id: exchange.requester_id,
  requester_username: exchange.requester_username || 'SkillSwap user',
  request_status: exchange.request_status,
  my_rating: exchange.my_rating
    ? {
        id: exchange.my_rating.id,
        score: exchange.my_rating.score,
        comment: exchange.my_rating.comment || '',
      }
    : null,
})

const requestStatusLabel = {
  open: 'Abierta',
  accepted: 'Aceptada',
  rejected: 'Rechazada',
}

const exchangeStatusLabel = {
  pending: 'Pendiente',
  completed: 'Completado',
  cancelled: 'Cancelado',
}

function SkillsPage() {
  const { token, user } = useAuth()
  const [skills, setSkills] = useState([])
  const [requests, setRequests] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])
  const [exchanges, setExchanges] = useState([])
  const [newSkill, setNewSkill] = useState(emptyForm)
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [creatingSkill, setCreatingSkill] = useState(false)
  const [editingSkillId, setEditingSkillId] = useState(null)
  const [requestingSkillId, setRequestingSkillId] = useState(null)
  const [updatingRequestId, setUpdatingRequestId] = useState(null)
  const [updatingExchangeId, setUpdatingExchangeId] = useState(null)
  const [ratingExchangeId, setRatingExchangeId] = useState(null)
  const [deletingSkillId, setDeletingSkillId] = useState(null)
  const [notice, setNotice] = useState('')
  const [error, setError] = useState('')
  const [selectedSkill, setSelectedSkill] = useState(null)
  const [ratingForms, setRatingForms] = useState({})

  const filteredSkills = useMemo(() => {
    const normalizedQuery = searchText.trim().toLowerCase()

    if (!normalizedQuery) {
      return skills
    }

    return skills.filter((skill) =>
      [skill.title, skill.description, skill.owner, skill.category, skill.level, skill.format]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(normalizedQuery)),
    )
  }, [searchText, skills])

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      setLoading(true)
      setError('')

      try {
        const [skillsResponse, requestsResponse, exchangesResponse] = await Promise.all([
          listSkills(),
          token ? listRequests() : Promise.resolve({ requests: [], received_requests: [] }),
          token ? listExchanges() : Promise.resolve({ exchanges: [] }),
        ])

        if (!isMounted) {
          return
        }

        setSkills((skillsResponse.skills || []).map(normalizeSkill))
        setRequests((requestsResponse.requests || []).map(normalizeRequest))
        setReceivedRequests((requestsResponse.received_requests || []).map(normalizeRequest))
        setExchanges((exchangesResponse.exchanges || []).map(normalizeExchange))
      } catch (apiError) {
        if (!isMounted) {
          return
        }

        setError(getApiErrorMessage(apiError, 'No se pudieron cargar las habilidades'))
        setSkills([])
        setRequests([])
        setReceivedRequests([])
        setExchanges([])
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

  const handleRatingChange = (exchangeId, field, value) => {
    setRatingForms((current) => ({
      ...current,
      [exchangeId]: {
        score: current[exchangeId]?.score || '5',
        comment: current[exchangeId]?.comment || '',
        [field]: value,
      },
    }))
  }

  const resetSkillForm = () => {
    setNewSkill(emptyForm)
    setEditingSkillId(null)
  }

  const handleSubmitSkill = async (event) => {
    event.preventDefault()

    setCreatingSkill(true)
    setError('')
    setNotice('')

    try {
      const payload = {
        title: newSkill.title,
        description: newSkill.description,
        category: newSkill.category,
        level: newSkill.level,
        format: newSkill.format,
      }

      if (editingSkillId) {
        const response = await updateSkill(editingSkillId, payload)
        const updatedSkill = normalizeSkill({
          ...response.skill,
          username: response.skill?.username || user?.username || 'SkillSwap user',
        })

        setSkills((current) =>
          current.map((skill) => (skill.id === editingSkillId ? updatedSkill : skill)),
        )
        setNotice('Habilidad actualizada correctamente.')
      } else {
        const response = await createSkill(payload)
        const createdSkill = normalizeSkill({
          ...response.skill,
          username: user?.username || response.skill?.username || 'SkillSwap user',
        })

        setSkills((current) => [createdSkill, ...current])
        setNotice('Habilidad creada correctamente.')
      }

      resetSkillForm()
    } catch (apiError) {
      setError(
        getApiErrorMessage(
          apiError,
          editingSkillId ? 'No se pudo actualizar la habilidad' : 'No se pudo crear la habilidad',
        ),
      )
    } finally {
      setCreatingSkill(false)
    }
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

  const handleIncomingRequest = async (request, status) => {
    setUpdatingRequestId(request.id)
    setError('')
    setNotice('')

    try {
      const response = await updateRequestStatus(request.id, status)
      const updatedRequest = normalizeRequest(response.request)

      setReceivedRequests((current) =>
        current.map((currentRequest) => (currentRequest.id === request.id ? updatedRequest : currentRequest)),
      )
      setRequests((current) =>
        current.map((currentRequest) => (currentRequest.id === request.id ? updatedRequest : currentRequest)),
      )

      if (response.exchange) {
        const createdExchange = normalizeExchange(response.exchange)
        setExchanges((current) => [createdExchange, ...current.filter((item) => item.id !== createdExchange.id)])
      }

      setNotice(
        status === 'accepted'
          ? 'Solicitud aceptada y intercambio creado.'
          : 'Solicitud rechazada correctamente.',
      )
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo actualizar la solicitud'))
    } finally {
      setUpdatingRequestId(null)
    }
  }

  const handleExchangeStatus = async (exchange, status) => {
    setUpdatingExchangeId(exchange.id)
    setError('')
    setNotice('')

    try {
      const response = await updateExchangeStatus(exchange.id, status)
      const updatedExchange = normalizeExchange(response.exchange)

      setExchanges((current) =>
        current.map((currentExchange) =>
          currentExchange.id === exchange.id ? updatedExchange : currentExchange,
        ),
      )

      setNotice(
        status === 'completed'
          ? 'Intercambio marcado como completado.'
          : 'Intercambio cancelado correctamente.',
      )
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo actualizar el intercambio'))
    } finally {
      setUpdatingExchangeId(null)
    }
  }

  const handleCreateRating = async (exchange) => {
    const form = ratingForms[exchange.id] || { score: '5', comment: '' }

    setRatingExchangeId(exchange.id)
    setError('')
    setNotice('')

    try {
      const response = await createRating({
        exchange_id: exchange.id,
        score: Number(form.score),
        comment: form.comment,
      })

      const createdRating = response.rating
      const ratedUserId =
        exchange.requester_id === user?.id ? exchange.skill_owner_id : exchange.requester_id

      setExchanges((current) =>
        current.map((currentExchange) =>
          currentExchange.id === exchange.id
            ? {
                ...currentExchange,
                my_rating: {
                  id: createdRating.id,
                  score: createdRating.score,
                  comment: createdRating.comment || '',
                },
              }
            : currentExchange,
        ),
      )

      setSkills((current) =>
        current.map((skill) =>
          skill.user_id === ratedUserId
            ? {
                ...skill,
                ratingsCount: skill.ratingsCount + 1,
                averageRating:
                  (skill.averageRating * skill.ratingsCount + createdRating.score) /
                  (skill.ratingsCount + 1),
              }
            : skill,
        ),
      )

      setRatingForms((current) => {
        const next = { ...current }
        delete next[exchange.id]
        return next
      })

      setNotice('Valoración enviada correctamente.')
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo enviar la valoración'))
    } finally {
      setRatingExchangeId(null)
    }
  }

  const handleEditSkill = (skill) => {
    setError('')
    setNotice('')
    setSelectedSkill(null)
    setEditingSkillId(skill.id)
    setNewSkill({
      title: skill.title,
      description: skill.description,
      category: skill.category,
      level: skill.level,
      format: skill.format,
    })
  }

  const handleDeleteSkill = async (skill) => {
    const confirmed = window.confirm(`¿Quieres eliminar la habilidad "${skill.title}"?`)

    if (!confirmed) {
      return
    }

    setDeletingSkillId(skill.id)
    setError('')
    setNotice('')

    try {
      await deleteSkill(skill.id)
      setSkills((current) => current.filter((currentSkill) => currentSkill.id !== skill.id))

      if (editingSkillId === skill.id) {
        resetSkillForm()
      }

      if (selectedSkill?.id === skill.id) {
        setSelectedSkill(null)
      }

      setNotice('Habilidad eliminada correctamente.')
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo eliminar la habilidad'))
    } finally {
      setDeletingSkillId(null)
    }
  }

  return (
    <section className="page skills-page">
      <div className="section-head">
        <div>
          <span className="eyebrow">Habilidades</span>
          <h1>Descubre habilidades para aprender y compartir.</h1>
          <p className="lead">
            Explora publicaciones de la comunidad, comparte tu experiencia y encuentra tu próximo
            intercambio.
          </p>
        </div>

        <div className="stat-pill">
          <strong>{filteredSkills.length}</strong>
          <span>{searchText.trim() ? 'resultados' : 'habilidades visibles'}</span>
        </div>
      </div>

      <div className="card filter-card">
        <label className="field">
          <span>Buscar habilidades</span>
          <input
            type="search"
            name="search"
            placeholder="Busca por titulo, descripcion, categoria o formato"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
          />
        </label>
      </div>

      {loading ? <div className="card info-card">Cargando habilidades...</div> : null}
      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      <div className="skills-layout">
        <div className="skills-list">
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.id}
              skill={skill}
              onDelete={handleDeleteSkill}
              onEdit={handleEditSkill}
              onRequest={handleRequestSkill}
              disabled={
                Boolean(requestingSkillId) ||
                Boolean(deletingSkillId) ||
                (token && skill.user_id === user?.id)
              }
              isOwner={token && skill.user_id === user?.id}
              actionLabel={
                token && skill.user_id === user?.id
                  ? 'Es tu habilidad'
                  : requestingSkillId === skill.id
                    ? 'Enviando...'
                    : deletingSkillId === skill.id
                      ? 'Eliminando...'
                    : 'Solicitar intercambio'
              }
            />
          ))}
          {!loading && filteredSkills.length === 0 ? (
            <article className="card info-card">
              <span className="eyebrow">{searchText.trim() ? 'Sin resultados' : 'Sin datos'}</span>
              <h2>{searchText.trim() ? 'No hay coincidencias' : 'No hay habilidades cargadas'}</h2>
              <p className="muted">
                {searchText.trim()
                  ? 'Prueba con otra búsqueda para encontrar más habilidades.'
                  : 'Aún no hay publicaciones disponibles. Sé la primera persona en compartir una habilidad.'}
              </p>
            </article>
          ) : null}
        </div>

        <aside className="card composer-card">
          <span className="eyebrow">{editingSkillId ? 'Editar habilidad' : 'Nueva habilidad'}</span>
          <h2>{editingSkillId ? 'Actualizar una habilidad' : 'Crear una habilidad'}</h2>
          <p className="muted">Describe lo que puedes enseñar para que otras personas te encuentren.</p>

          <form className="form-stack" onSubmit={handleSubmitSkill}>
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
              {creatingSkill
                ? 'Guardando...'
                : editingSkillId
                  ? 'Guardar cambios'
                  : 'Agregar habilidad'}
            </button>

            {editingSkillId ? (
              <button type="button" className="button button--ghost" onClick={resetSkillForm}>
                Cancelar edición
              </button>
            ) : null}
          </form>

          {selectedSkill ? (
            <div className="request-box">
              <span className="eyebrow">Habilidad seleccionada</span>
              <strong>{selectedSkill.title}</strong>
              <p className="muted">Puedes solicitar este intercambio cuando quieras.</p>
            </div>
          ) : null}

          {token ? (
            <div className="request-box">
              <span className="eyebrow">Solicitudes enviadas</span>
              <strong>{requests.length} registradas</strong>
              <div className="request-list">
                {requests.slice(0, 4).map((request) => (
                  <article key={request.id} className="request-item">
                    <strong>{request.skill_title}</strong>
                    <span className="muted">
                      Para {request.skill_owner} · {requestStatusLabel[request.status] || request.status}
                    </span>
                    <span className="muted">{request.createdAtLabel}</span>
                  </article>
                ))}
                {!loading && requests.length === 0 ? (
                  <p className="muted">Todavia no has creado solicitudes.</p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="request-box">
              <span className="eyebrow">Solicitudes</span>
              <p className="muted">Inicia sesión para ver tus solicitudes y crear nuevos intercambios.</p>
            </div>
          )}

          {token ? (
            <div className="request-box">
              <span className="eyebrow">Solicitudes recibidas</span>
              <strong>{receivedRequests.length} recibidas</strong>
              <div className="request-list">
                {receivedRequests.slice(0, 4).map((request) => (
                  <article key={request.id} className="request-item">
                    <strong>{request.skill_title}</strong>
                    <span className="muted">
                      De {request.requester_username} · {requestStatusLabel[request.status] || request.status}
                    </span>
                    <span className="muted">{request.createdAtLabel}</span>

                    {request.status === 'open' ? (
                      <div className="inline-actions">
                        <button
                          type="button"
                          className="button button--soft"
                          disabled={updatingRequestId === request.id}
                          onClick={() => handleIncomingRequest(request, 'accepted')}
                        >
                          {updatingRequestId === request.id ? 'Guardando...' : 'Aceptar'}
                        </button>
                        <button
                          type="button"
                          className="button button--ghost"
                          disabled={updatingRequestId === request.id}
                          onClick={() => handleIncomingRequest(request, 'rejected')}
                        >
                          Rechazar
                        </button>
                      </div>
                    ) : null}
                  </article>
                ))}
                {!loading && receivedRequests.length === 0 ? (
                  <p className="muted">Todavia no has recibido solicitudes.</p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="request-box">
              <span className="eyebrow">Solicitudes recibidas</span>
              <p className="muted">Inicia sesión para gestionar solicitudes de tus habilidades.</p>
            </div>
          )}

          {token ? (
            <div className="request-box">
              <span className="eyebrow">Intercambios</span>
              <strong>{exchanges.length} activos o cerrados</strong>
              <div className="request-list">
                {exchanges.slice(0, 4).map((exchange) => (
                  <article key={exchange.id} className="request-item">
                    <strong>{exchange.skill_title}</strong>
                    <span className="muted">
                      {exchange.requester_id === user?.id
                        ? `Con ${exchange.skill_owner}`
                        : `Con ${exchange.requester_username}`} ·{' '}
                      {exchangeStatusLabel[exchange.status] || exchange.status}
                    </span>
                    <span className="muted">{exchange.agreedAtLabel}</span>

                    {exchange.status === 'pending' ? (
                      <div className="inline-actions">
                        <button
                          type="button"
                          className="button button--soft"
                          disabled={updatingExchangeId === exchange.id}
                          onClick={() => handleExchangeStatus(exchange, 'completed')}
                        >
                          {updatingExchangeId === exchange.id ? 'Guardando...' : 'Completar'}
                        </button>
                        <button
                          type="button"
                          className="button button--ghost"
                          disabled={updatingExchangeId === exchange.id}
                          onClick={() => handleExchangeStatus(exchange, 'cancelled')}
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : null}

                    {exchange.status === 'completed' && !exchange.my_rating ? (
                      <div className="rating-form">
                        <label className="field">
                          <span>Puntuación</span>
                          <select
                            value={ratingForms[exchange.id]?.score || '5'}
                            onChange={(event) =>
                              handleRatingChange(exchange.id, 'score', event.target.value)
                            }
                          >
                            <option value="5">5 - Excelente</option>
                            <option value="4">4 - Muy bien</option>
                            <option value="3">3 - Bien</option>
                            <option value="2">2 - Regular</option>
                            <option value="1">1 - Mejorable</option>
                          </select>
                        </label>

                        <label className="field">
                          <span>Comentario</span>
                          <textarea
                            rows="3"
                            placeholder="Cuenta brevemente como fue el intercambio"
                            value={ratingForms[exchange.id]?.comment || ''}
                            onChange={(event) =>
                              handleRatingChange(exchange.id, 'comment', event.target.value)
                            }
                          />
                        </label>

                        <button
                          type="button"
                          className="button button--soft"
                          disabled={ratingExchangeId === exchange.id}
                          onClick={() => handleCreateRating(exchange)}
                        >
                          {ratingExchangeId === exchange.id ? 'Enviando...' : 'Enviar valoración'}
                        </button>
                      </div>
                    ) : null}

                    {exchange.my_rating ? (
                      <div className="rating-summary">
                        <strong>Tu valoración: {exchange.my_rating.score}/5</strong>
                        {exchange.my_rating.comment ? (
                          <p className="muted">{exchange.my_rating.comment}</p>
                        ) : null}
                      </div>
                    ) : null}
                  </article>
                ))}
                {!loading && exchanges.length === 0 ? (
                  <p className="muted">Todavia no tienes intercambios.</p>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="request-box">
              <span className="eyebrow">Intercambios</span>
              <p className="muted">Inicia sesión para ver y gestionar tus intercambios.</p>
            </div>
          )}
        </aside>
      </div>
    </section>
  )
}

export default SkillsPage
