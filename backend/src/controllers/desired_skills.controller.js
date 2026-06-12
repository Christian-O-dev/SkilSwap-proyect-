const { findDesiredSkillsByUserId, updateDesiredSkills } = require('../models/desired_skill.model')

const allowedCategories = ['Tecnología', 'Música', 'Arte y Diseño', 'Idiomas', 'Deportes', 'Oficios', 'Otros']

const getDesiredSkills = async (req, res, next) => {
  try {
    const desiredSkills = await findDesiredSkillsByUserId(req.user.id)
    return res.json({
      ok: true,
      desired_skills: desiredSkills.map(ds => ({ category: ds.category, title: ds.title }))
    })
  } catch (error) {
    return next(error)
  }
}

const updateDesiredSkillsHandler = async (req, res, next) => {
  try {
    const { skills } = req.body

    if (!Array.isArray(skills)) {
      return res.status(400).json({
        ok: false,
        message: 'Las habilidades deben ser un array de objetos',
      })
    }

    const updatedSkills = await updateDesiredSkills(req.user.id, skills)

    return res.json({
      ok: true,
      message: 'Preferencias actualizadas correctamente',
      desired_skills: updatedSkills.map(ds => ({ category: ds.category, title: ds.title }))
    })
  } catch (error) {
    return next(error)
  }
}

module.exports = {
  getDesiredSkills,
  updateDesiredSkills: updateDesiredSkillsHandler
}
