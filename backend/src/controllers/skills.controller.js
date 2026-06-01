const { createSkill, findAllSkills, findSkillById } = require('../models/skill.model')

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
    const { title, description } = req.body

    if (!title) {
      return res.status(400).json({
        ok: false,
        message: 'El titulo es obligatorio',
      })
    }

    const skill = await createSkill({
      userId: req.user.id,
      title,
      description,
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

module.exports = {
  createSkill: createSkillHandler,
  getSkill,
  listSkills,
}
