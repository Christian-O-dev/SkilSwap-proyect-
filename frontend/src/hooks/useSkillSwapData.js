import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { getApiErrorMessage } from '../services/api.js'
import { listExchanges, updateExchangeStatus } from '../services/exchangesService.js'
import { createRating } from '../services/ratingsService.js'
import { createRequest, listRequests, updateRequestStatus } from '../services/requestsService.js'
import { createSkill, deleteSkill, listSkills, updateSkill } from '../services/skillsService.js'

export const emptySkillForm = {
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

export function useSkillSwapData() {
  const { token, user } = useAuth()
  const [skills, setSkills] = useState([])
  const [requests, setRequests] = useState([])
  const [receivedRequests, setReceivedRequests] = useState([])
  const [exchanges, setExchanges] = useState([])
  const [newSkill, setNewSkill] = useState(emptySkillForm)
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

  const mySkills = useMemo(
    () => skills.filter((skill) => token && skill.user_id === user?.id),
    [skills, token, user?.id],
  )

  const requestedSkillIds = useMemo(
    () =>
      new Set(
        requests
          .filter((request) => request.status === 'open' || request.status === 'accepted')
          .map((request) => request.skill_id),
      ),
    [requests],
  )

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

        setError(getApiErrorMessage(apiError, 'No se pudieron cargar los datos'))
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
    setNewSkill(emptySkillForm)
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
      setError('Necesitas iniciar sesión para solicitar una habilidad')
      return
    }

    if (skill.user_id && user?.id && skill.user_id === user.id) {
      setError('No puedes solicitar tu propia habilidad')
      return
    }

    if (requestedSkillIds.has(skill.id)) {
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
      setError(getApiErrorMessage(apiError, 'No se pudo enviar la valoracion'))
    } finally {
      setRatingExchangeId(null)
    }
  }

  const handleEditSkill = (skill) => {
    setError('')
    setNotice('')
    setSelectedSkill(skill)
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

  return {
    token,
    user,
    skills,
    filteredSkills,
    mySkills,
    requestedSkillIds,
    requests,
    receivedRequests,
    exchanges,
    newSkill,
    searchText,
    loading,
    creatingSkill,
    editingSkillId,
    requestingSkillId,
    updatingRequestId,
    updatingExchangeId,
    ratingExchangeId,
    deletingSkillId,
    notice,
    error,
    selectedSkill,
    ratingForms,
    setSearchText,
    handleSkillChange,
    handleRatingChange,
    handleSubmitSkill,
    handleRequestSkill,
    handleIncomingRequest,
    handleExchangeStatus,
    handleCreateRating,
    handleEditSkill,
    handleDeleteSkill,
    resetSkillForm,
    setNotice,
    setError,
  }
}
