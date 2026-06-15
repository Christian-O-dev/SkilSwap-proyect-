const { findMessagesByRequestId } = require('../models/message.model')
const { findRequestById } = require('../models/request.model')

const getMessages = async (req, res, next) => {
  try {
    const requestId = Number(req.params.request_id)
    if (Number.isNaN(requestId)) {
      return res.status(400).json({ ok: false, message: 'ID de solicitud inválido' })
    }

    const request = await findRequestById(requestId)
    if (!request) {
      return res.status(404).json({ ok: false, message: 'Solicitud no encontrada' })
    }

    if (request.requester_id !== req.user.id && request.skill_owner_id !== req.user.id) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a estos mensajes' })
    }

    const messages = await findMessagesByRequestId(requestId)

    return res.json({
      ok: true,
      messages
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getMessages
}
