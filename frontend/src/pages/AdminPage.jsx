import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { getApiErrorMessage } from '../services/api.js'
import {
  deleteAdminSkill,
  listAdminRequests,
  listAdminSkills,
  listAdminUsers,
  updateAdminUserBlock,
} from '../services/adminService.js'

const formatDate = (value) => {
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

function AdminPage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [users, setUsers] = useState([])
  const [skills, setSkills] = useState([])
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [busyUserId, setBusyUserId] = useState(null)
  const [busySkillId, setBusySkillId] = useState(null)
  const [error, setError] = useState('')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (user && user.role_id !== 1) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate, user])

  useEffect(() => {
    let isMounted = true

    const loadAdminData = async () => {
      setLoading(true)
      setError('')

      try {
        const [usersResponse, skillsResponse, requestsResponse] = await Promise.all([
          listAdminUsers(),
          listAdminSkills(),
          listAdminRequests(),
        ])

        if (!isMounted) {
          return
        }

        setUsers(usersResponse.users || [])
        setSkills(skillsResponse.skills || [])
        setRequests(requestsResponse.requests || [])
      } catch (apiError) {
        if (!isMounted) {
          return
        }

        setError(getApiErrorMessage(apiError, 'No se pudieron cargar los datos de administración'))
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    if (user?.role_id === 1) {
      loadAdminData()
    }

    return () => {
      isMounted = false
    }
  }, [user])

  const handleToggleBlock = async (targetUser) => {
    setBusyUserId(targetUser.id)
    setError('')
    setNotice('')

    try {
      const response = await updateAdminUserBlock(targetUser.id, !targetUser.is_blocked)
      setUsers((current) =>
        current.map((userItem) => (userItem.id === targetUser.id ? response.user : userItem)),
      )
      setNotice(response.message)
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo actualizar el usuario'))
    } finally {
      setBusyUserId(null)
    }
  }

  const handleDeleteSkill = async (skill) => {
    const confirmed = window.confirm(`¿Quieres eliminar la habilidad "${skill.title}"?`)

    if (!confirmed) {
      return
    }

    setBusySkillId(skill.id)
    setError('')
    setNotice('')

    try {
      const response = await deleteAdminSkill(skill.id)
      setSkills((current) => current.filter((currentSkill) => currentSkill.id !== skill.id))
      setNotice(response.message)
    } catch (apiError) {
      setError(getApiErrorMessage(apiError, 'No se pudo eliminar la habilidad'))
    } finally {
      setBusySkillId(null)
    }
  }

  if (user?.role_id !== 1) {
    return null
  }

  const blockedUsersCount = users.filter((targetUser) => targetUser.is_blocked).length
  const openRequestsCount = requests.filter((request) => request.status === 'open').length

  return (
    <section className="page admin-page">
      <div className="hero-panel admin-hero">
        <div className="admin-hero__copy">
          <span className="eyebrow">Administración</span>
          <h1>Panel de control de SkillSwap</h1>
          <p className="lead">
            Supervisa cuentas, modera publicaciones y revisa solicitudes desde una vista compacta
            pensada para manejar más volumen.
          </p>
        </div>

        <div className="admin-summary">
          <article className="admin-summary__item">
            <strong>{users.length}</strong>
            <span>usuarios</span>
          </article>
          <article className="admin-summary__item">
            <strong>{blockedUsersCount}</strong>
            <span>bloqueados</span>
          </article>
          <article className="admin-summary__item">
            <strong>{skills.length}</strong>
            <span>habilidades</span>
          </article>
          <article className="admin-summary__item">
            <strong>{openRequestsCount}</strong>
            <span>solicitudes abiertas</span>
          </article>
        </div>
      </div>

      {loading ? <div className="card info-card">Cargando panel de administración...</div> : null}
      {error ? <p className="notice notice--error">{error}</p> : null}
      {notice ? <p className="notice notice--success">{notice}</p> : null}

      <div className="admin-stack">
        <article className="card info-card admin-panel">
          <div className="admin-panel__head">
            <div>
              <span className="eyebrow">Usuarios</span>
              <h2>{users.length} cuentas registradas</h2>
            </div>
            <p className="muted">Lista compacta para revisar rol, actividad y acceso.</p>
          </div>

          <div className="admin-table">
            <div className="admin-table__head admin-table__row admin-table__row--users">
              <span>Usuario</span>
              <span>Rol</span>
              <span>Actividad</span>
              <span>Estado</span>
              <span>Alta</span>
              <span>Acción</span>
            </div>

            <div className="admin-table__body">
              {users.map((targetUser) => (
                <div key={targetUser.id} className="admin-table__row admin-table__row--users">
                  <div className="admin-cell">
                    <strong>{targetUser.username}</strong>
                    <span className="muted">{targetUser.email}</span>
                  </div>
                  <span>{targetUser.role_name}</span>
                  <span>
                    {targetUser.skills_count || 0} hab. / {targetUser.requests_count || 0} sol.
                  </span>
                  <span>
                    <span
                      className={
                        targetUser.is_blocked
                          ? 'admin-status admin-status--blocked'
                          : 'admin-status admin-status--active'
                      }
                    >
                      {targetUser.is_blocked ? 'Bloqueado' : 'Activo'}
                    </span>
                  </span>
                  <span>{formatDate(targetUser.created_at)}</span>
                  <div className="admin-actions">
                    {targetUser.role_id !== 1 ? (
                      <button
                        type="button"
                        className="button button--ghost"
                        disabled={busyUserId === targetUser.id}
                        onClick={() => handleToggleBlock(targetUser)}
                      >
                        {busyUserId === targetUser.id
                          ? 'Guardando...'
                          : targetUser.is_blocked
                            ? 'Desbloquear'
                            : 'Bloquear'}
                      </button>
                    ) : (
                      <span className="muted">Protegido</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="card info-card admin-panel">
          <div className="admin-panel__head">
            <div>
              <span className="eyebrow">Habilidades</span>
              <h2>{skills.length} publicaciones</h2>
            </div>
            <p className="muted">Moderación rápida para retirar contenido cuando sea necesario.</p>
          </div>

          <div className="admin-table">
            <div className="admin-table__head admin-table__row admin-table__row--skills">
              <span>Título</span>
              <span>Autor</span>
              <span>Categoría</span>
              <span>Nivel</span>
              <span>Fecha</span>
              <span>Acción</span>
            </div>

            <div className="admin-table__body">
              {skills.map((skill) => (
                <div key={skill.id} className="admin-table__row admin-table__row--skills">
                  <div className="admin-cell">
                    <strong>{skill.title}</strong>
                    <span className="muted">{skill.format}</span>
                  </div>
                  <span>{skill.username}</span>
                  <span>{skill.category}</span>
                  <span>{skill.level}</span>
                  <span>{formatDate(skill.created_at)}</span>
                  <div className="admin-actions">
                    <button
                      type="button"
                      className="button button--ghost"
                      disabled={busySkillId === skill.id}
                      onClick={() => handleDeleteSkill(skill)}
                    >
                      {busySkillId === skill.id ? 'Eliminando...' : 'Eliminar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="card info-card admin-panel">
          <div className="admin-panel__head">
            <div>
              <span className="eyebrow">Solicitudes</span>
              <h2>{requests.length} solicitudes registradas</h2>
            </div>
            <p className="muted">Seguimiento compacto del flujo entre solicitante y propietario.</p>
          </div>

          <div className="admin-table">
            <div className="admin-table__head admin-table__row admin-table__row--requests">
              <span>Habilidad</span>
              <span>Solicitante</span>
              <span>Propietario</span>
              <span>Estado</span>
              <span>Fecha</span>
            </div>

            <div className="admin-table__body">
              {requests.map((request) => (
                <div key={request.id} className="admin-table__row admin-table__row--requests">
                  <div className="admin-cell">
                    <strong>{request.skill_title}</strong>
                    <span className="muted">#{request.id}</span>
                  </div>
                  <span>{request.requester_username}</span>
                  <span>{request.skill_owner}</span>
                  <span>
                    <span className="admin-status admin-status--neutral">{request.status}</span>
                  </span>
                  <span>{formatDate(request.created_at)}</span>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default AdminPage
