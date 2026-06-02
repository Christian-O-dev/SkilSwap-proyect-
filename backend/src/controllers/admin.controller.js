const { findAllRequests } = require('../models/request.model')
const { deleteSkill, findAllSkills, findSkillById } = require('../models/skill.model')
const { findUserById, listUsers, updateUserBlockedStatus } = require('../models/user.model')

const listAdminUsers = async (req, res, next) => {
  try {
    const users = await listUsers()

    return res.json({
      ok: true,
      users,
    })
  } catch (error) {
    return next(error)
  }
}

const toggleAdminUserBlock = async (req, res, next) => {
  try {
    const userId = Number(req.params.id)
    const { is_blocked: isBlockedFromBody, isBlocked } = req.body

    if (Number.isNaN(userId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del usuario no es valido',
      })
    }

    const user = await findUserById(userId)

    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'Usuario no encontrado',
      })
    }

    if (user.id === req.user.id) {
      return res.status(409).json({
        ok: false,
        message: 'No puedes bloquear tu propia cuenta de administrador',
      })
    }

    if (user.role_id === 1) {
      return res.status(409).json({
        ok: false,
        message: 'No puedes bloquear otra cuenta administradora',
      })
    }

    const normalizedBlocked = Boolean(isBlocked ?? isBlockedFromBody)
    const updatedUser = await updateUserBlockedStatus({
      id: userId,
      isBlocked: normalizedBlocked,
    })

    return res.json({
      ok: true,
      message: normalizedBlocked ? 'Usuario bloqueado correctamente' : 'Usuario desbloqueado correctamente',
      user: updatedUser,
    })
  } catch (error) {
    return next(error)
  }
}

const listAdminSkills = async (req, res, next) => {
  try {
    const skills = await findAllSkills()

    return res.json({
      ok: true,
      skills,
    })
  } catch (error) {
    return next(error)
  }
}

const deleteAdminSkill = async (req, res, next) => {
  try {
    const skillId = Number(req.params.id)

    if (Number.isNaN(skillId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id de la habilidad no es valido',
      })
    }

    const skill = await findSkillById(skillId)

    if (!skill) {
      return res.status(404).json({
        ok: false,
        message: 'Habilidad no encontrada',
      })
    }

    await deleteSkill(skillId)

    return res.json({
      ok: true,
      message: 'Habilidad eliminada correctamente',
    })
  } catch (error) {
    return next(error)
  }
}

const listAdminRequests = async (req, res, next) => {
  try {
    const requests = await findAllRequests()

    return res.json({
      ok: true,
      requests,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  deleteAdminSkill,
  listAdminRequests,
  listAdminSkills,
  listAdminUsers,
  toggleAdminUserBlock,
}
