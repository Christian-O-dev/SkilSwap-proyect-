const { findMessagesByExchangeId } = require('../models/message.model')
const { findExchangeById } = require('../models/exchange.model')

const getMessages = async (req, res, next) => {
  try {
    const exchangeId = Number(req.params.exchange_id)
    if (Number.isNaN(exchangeId)) {
      return res.status(400).json({ ok: false, message: 'ID de intercambio inválido' })
    }

    const exchange = await findExchangeById(exchangeId)
    if (!exchange) {
      return res.status(404).json({ ok: false, message: 'Intercambio no encontrado' })
    }

    if (exchange.requester_id !== req.user.id && exchange.skill_owner_id !== req.user.id) {
      return res.status(403).json({ ok: false, message: 'No tienes acceso a estos mensajes' })
    }

    const messages = await findMessagesByExchangeId(exchangeId)

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
