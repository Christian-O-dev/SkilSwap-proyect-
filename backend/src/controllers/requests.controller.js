const {
  createRequest,
  findRequestableSkillById,
  findRequestsByRequesterId,
} = require('../models/request.model')

const listRequests = async (req, res, next) => {
  try {
    const requests = await findRequestsByRequesterId(req.user.id)

    return res.json({
      ok: true,
      requests,
    })
  } catch (error) {
    return next(error)
  }
}

const createRequestHandler = async (req, res, next) => {
  try {
    const { skill_id: skillIdFromBody, skillId } = req.body
    const normalizedSkillId = Number(skillId ?? skillIdFromBody)

    if (Number.isNaN(normalizedSkillId)) {
      return res.status(400).json({
        ok: false,
        message: 'El skill_id es obligatorio y debe ser valido',
      })
    }

    const skill = await findRequestableSkillById(normalizedSkillId)

    if (!skill) {
      return res.status(404).json({
        ok: false,
        message: 'La habilidad solicitada no existe',
      })
    }

    if (skill.user_id === req.user.id) {
      return res.status(403).json({
        ok: false,
        message: 'No puedes solicitar tu propia habilidad',
      })
    }

    const request = await createRequest({
      requesterId: req.user.id,
      skillId: normalizedSkillId,
    })

    return res.status(201).json({
      ok: true,
      message: 'Solicitud creada correctamente',
      request,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createRequest: createRequestHandler,
  listRequests,
}
