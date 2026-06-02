import { Link } from 'react-router-dom'
import EmptyState from '@/components/common/EmptyState.jsx'
import PageHeader from '@/components/common/PageHeader.jsx'
import { useSkillSwapData } from '@/hooks/useSkillSwapData.js'

function ProfilePage() {
  const { exchanges, mySkills, requests, token, user } = useSkillSwapData()

  if (!token) {
    return (
      <section className="page">
        <EmptyState
          title="Necesitas iniciar sesion"
          description="Accede a tu cuenta para ver tu perfil y actividad."
          action={
            <Link to="/login" className="button button--primary">
              Ir al login
            </Link>
          }
        />
      </section>
    )
  }

  return (
    <section className="page">
      <PageHeader
        eyebrow="Perfil"
        title={`Hola, ${user?.username ?? 'usuario'}`}
        description="Aqui tienes un resumen rapido de tu actividad dentro de SkillSwap."
        stats={
          <>
            <div className="stat-pill">
              <strong>{mySkills.length}</strong>
              <span>habilidades publicadas</span>
            </div>
            <div className="stat-pill">
              <strong>{requests.length}</strong>
              <span>solicitudes enviadas</span>
            </div>
            <div className="stat-pill">
              <strong>{exchanges.length}</strong>
              <span>intercambios registrados</span>
            </div>
          </>
        }
      />
    </section>
  )
}

export default ProfilePage
