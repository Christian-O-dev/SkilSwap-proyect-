const {
  createRequest,
  findOpenRequestByRequesterAndSkill,
  findRequestById,
  findRequestableSkillById,
  findRequestsByRequesterId,
  findRequestsBySkillOwnerId,
  updateRequestStatus,
} = require('../models/request.model')
const { createExchange, findExchangeByRequestId } = require('../models/exchange.model')

const listRequests = async (req, res, next) => {
  try {
    const [requests, receivedRequests] = await Promise.all([
      findRequestsByRequesterId(req.user.id),
      findRequestsBySkillOwnerId(req.user.id),
    ])

    return res.json({
      ok: true,
      requests,
      received_requests: receivedRequests,
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

    const existingOpenRequest = await findOpenRequestByRequesterAndSkill({
      requesterId: req.user.id,
      skillId: normalizedSkillId,
    })

    if (existingOpenRequest) {
      return res.status(409).json({
        ok: false,
        message: 'Ya tienes una solicitud abierta para esta habilidad',
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

const updateRequestStatusHandler = async (req, res, next) => {
  try {
    const requestId = Number(req.params.id)
    const { status } = req.body

    if (Number.isNaN(requestId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id de la solicitud no es valido',
      })
    }

    if (!['accepted', 'rejected'].includes(status)) {
      return res.status(400).json({
        ok: false,
        message: 'El estado de la solicitud no es valido',
      })
    }

    const request = await findRequestById(requestId)

    if (!request) {
      return res.status(404).json({
        ok: false,
        message: 'Solicitud no encontrada',
      })
    }

    if (request.skill_owner_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        message: 'No puedes gestionar una solicitud de otra habilidad',
      })
    }

    if (request.status !== 'open') {
      return res.status(409).json({
        ok: false,
        message: 'Esta solicitud ya fue gestionada',
      })
    }

    const updatedRequest = await updateRequestStatus({
      id: requestId,
      status,
    })

    let exchange = null

    if (status === 'accepted') {
      const existingExchange = await findExchangeByRequestId(requestId)
      exchange = existingExchange || (await createExchange({ requestId }))
    }

    return res.json({
      ok: true,
      message:
        status === 'accepted'
          ? 'Solicitud aceptada correctamente'
          : 'Solicitud rechazada correctamente',
      request: updatedRequest,
      exchange,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createRequest: createRequestHandler,
  listRequests,
  updateRequestStatus: updateRequestStatusHandler,
}
