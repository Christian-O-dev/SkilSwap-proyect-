const {
  findExchangeById,
  findExchangesByUserId,
  updateExchangeStatus,
} = require('../models/exchange.model')
const { findRatingByExchangeAndUser } = require('../models/rating.model')
const { findUserById } = require('../models/user.model')
const { sendEmail } = require('../services/email.service')

const allowedStatuses = ['completed', 'cancelled']

const listExchanges = async (req, res, next) => {
  try {
    const exchanges = await findExchangesByUserId(req.user.id)
    const exchangesWithRatings = await Promise.all(
      exchanges.map(async (exchange) => {
        const myRating = await findRatingByExchangeAndUser({
          exchangeId: exchange.id,
          ratedBy: req.user.id,
        })

        return {
          ...exchange,
          my_rating: myRating,
        }
      }),
    )

    return res.json({
      ok: true,
      exchanges: exchangesWithRatings,
    })
  } catch (error) {
    return next(error)
  }
}

const updateExchangeStatusHandler = async (req, res, next) => {
  try {
    const exchangeId = Number(req.params.id)
    const { status } = req.body

    if (Number.isNaN(exchangeId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id del intercambio no es valido',
      })
    }

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        ok: false,
        message: 'El estado del intercambio no es valido',
      })
    }

    const exchange = await findExchangeById(exchangeId)

    if (!exchange) {
      return res.status(404).json({
        ok: false,
        message: 'Intercambio no encontrado',
      })
    }

    const canManage =
      exchange.requester_id === req.user.id || exchange.skill_owner_id === req.user.id

    if (!canManage) {
      return res.status(403).json({
        ok: false,
        message: 'No puedes modificar este intercambio',
      })
    }

    if (exchange.status !== 'pending') {
      return res.status(409).json({
        ok: false,
        message: 'Este intercambio ya no se puede modificar',
      })
    }

    const updatedExchange = await updateExchangeStatus({
      id: exchangeId,
      status,
    })

    const otherUserId = exchange.requester_id === req.user.id ? exchange.skill_owner_id : exchange.requester_id
    const otherUser = await findUserById(otherUserId)

    if (otherUser && otherUser.email) {
      const statusText = status === 'completed' ? 'completado' : 'cancelado'
      sendEmail(
        otherUser.email,
        `El intercambio ha sido ${statusText}`,
        `Hola ${otherUser.username}, tu intercambio para la habilidad ${exchange.skill_title} ha sido ${statusText} por ${req.user.username}.`,
        `<h3>Actualización de tu intercambio</h3><p>Hola ${otherUser.username}, tu intercambio para la habilidad <b>${exchange.skill_title}</b> ha sido <b>${statusText}</b> por <b>${req.user.username}</b>.</p>`
      )
    }

    return res.json({
      ok: true,
      message:
        status === 'completed'
          ? 'Intercambio marcado como completado'
          : 'Intercambio cancelado correctamente',
      exchange: updatedExchange,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  listExchanges,
  updateExchangeStatus: updateExchangeStatusHandler,
}
