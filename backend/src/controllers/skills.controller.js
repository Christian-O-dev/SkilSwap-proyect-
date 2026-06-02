const {
  createSkill,
  deleteSkill,
  findAllSkills,
  findSkillById,
  updateSkill,
} = require('../models/skill.model')

const allowedCategories = ['Frontend', 'Backend', 'Design', 'Data']
const allowedLevels = ['Starter', 'Intermediate', 'Advanced']
const allowedFormats = ['Online', 'Presencial']

const parseSkillId = (value) => {
  const skillId = Number(value)
  return Number.isInteger(skillId) ? skillId : Number.NaN
}

const validateSkillPayload = ({ title, category, level, format }) => {
  if (!title?.trim()) {
    return 'El titulo es obligatorio'
  }

  if (!allowedCategories.includes(category)) {
    return 'La categoria no es valida'
  }

  if (!allowedLevels.includes(level)) {
    return 'El nivel no es valido'
  }

  if (!allowedFormats.includes(format)) {
    return 'El formato no es valido'
  }

  return null
}

const listSkills = async (req, res, next) => {
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

const getSkill = async (req, res, next) => {
  try {
    const skillId = parseSkillId(req.params.id)

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

    return res.json({
      ok: true,
      skill,
    })
  } catch (error) {
    return next(error)
  }
}

const createSkillHandler = async (req, res, next) => {
  try {
    const { title, description, category, level, format } = req.body

    const validationError = validateSkillPayload({ title, category, level, format })

    if (validationError) {
      return res.status(400).json({
        ok: false,
        message: validationError,
      })
    }

    const skill = await createSkill({
      userId: req.user.id,
      title: title.trim(),
      description,
      category,
      level,
      format,
    })

    return res.status(201).json({
      ok: true,
      message: 'Habilidad creada correctamente',
      skill,
    })
  } catch (error) {
    return next(error)
  }
}

const updateSkillHandler = async (req, res, next) => {
  try {
    const skillId = parseSkillId(req.params.id)

    if (Number.isNaN(skillId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id de la habilidad no es valido',
      })
    }

    const existingSkill = await findSkillById(skillId)

    if (!existingSkill) {
      return res.status(404).json({
        ok: false,
        message: 'Habilidad no encontrada',
      })
    }

    if (existingSkill.user_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        message: 'No puedes editar una habilidad que no es tuya',
      })
    }

    const { title, description, category, level, format } = req.body
    const validationError = validateSkillPayload({ title, category, level, format })

    if (validationError) {
      return res.status(400).json({
        ok: false,
        message: validationError,
      })
    }

    const skill = await updateSkill({
      id: skillId,
      title: title.trim(),
      description,
      category,
      level,
      format,
    })

    return res.json({
      ok: true,
      message: 'Habilidad actualizada correctamente',
      skill,
    })
  } catch (error) {
    return next(error)
  }
}

const deleteSkillHandler = async (req, res, next) => {
  try {
    const skillId = parseSkillId(req.params.id)

    if (Number.isNaN(skillId)) {
      return res.status(400).json({
        ok: false,
        message: 'El id de la habilidad no es valido',
      })
    }

    const existingSkill = await findSkillById(skillId)

    if (!existingSkill) {
      return res.status(404).json({
        ok: false,
        message: 'Habilidad no encontrada',
      })
    }

    if (existingSkill.user_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        message: 'No puedes eliminar una habilidad que no es tuya',
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

module.exports = {
  createSkill: createSkillHandler,
  deleteSkill: deleteSkillHandler,
  getSkill,
  listSkills,
  updateSkill: updateSkillHandler,
}
