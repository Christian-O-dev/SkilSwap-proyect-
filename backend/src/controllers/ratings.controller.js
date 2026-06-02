const { findExchangeById } = require('../models/exchange.model')
const { createRating, findRatingByExchangeAndUser } = require('../models/rating.model')

const createRatingHandler = async (req, res, next) => {
  try {
    const { exchange_id: exchangeIdFromBody, exchangeId, score, comment } = req.body
    const normalizedExchangeId = Number(exchangeId ?? exchangeIdFromBody)
    const normalizedScore = Number(score)

    if (Number.isNaN(normalizedExchangeId)) {
      return res.status(400).json({
        ok: false,
        message: 'El exchange_id es obligatorio y debe ser valido',
      })
    }

    if (!Number.isInteger(normalizedScore) || normalizedScore < 1 || normalizedScore > 5) {
      return res.status(400).json({
        ok: false,
        message: 'La puntuacion debe ser un numero entero entre 1 y 5',
      })
    }

    const exchange = await findExchangeById(normalizedExchangeId)

    if (!exchange) {
      return res.status(404).json({
        ok: false,
        message: 'Intercambio no encontrado',
      })
    }

    if (exchange.status !== 'completed') {
      return res.status(409).json({
        ok: false,
        message: 'Solo puedes valorar intercambios completados',
      })
    }

    const isRequester = exchange.requester_id === req.user.id
    const isOwner = exchange.skill_owner_id === req.user.id

    if (!isRequester && !isOwner) {
      return res.status(403).json({
        ok: false,
        message: 'No puedes valorar un intercambio en el que no participas',
      })
    }

    const existingRating = await findRatingByExchangeAndUser({
      exchangeId: normalizedExchangeId,
      ratedBy: req.user.id,
    })

    if (existingRating) {
      return res.status(409).json({
        ok: false,
        message: 'Ya has valorado este intercambio',
      })
    }

    const ratedTo = isRequester ? exchange.skill_owner_id : exchange.requester_id

    if (ratedTo === req.user.id) {
      return res.status(409).json({
        ok: false,
        message: 'No puedes valorarte a ti mismo',
      })
    }

    const rating = await createRating({
      exchangeId: normalizedExchangeId,
      ratedBy: req.user.id,
      ratedTo,
      score: normalizedScore,
      comment,
    })

    return res.status(201).json({
      ok: true,
      message: 'Valoracion creada correctamente',
      rating,
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  createRating: createRatingHandler,
}
