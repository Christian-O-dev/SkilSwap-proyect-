const {
  createSkill,
  deleteSkill,
  findAllSkills,
  findSkillById,
  updateSkill,
} = require('../models/skill.model')
const { pool } = require('../config/db')

const allowedCategories = ['Tecnología', 'Música', 'Arte y Diseño', 'Idiomas', 'Deportes', 'Oficios', 'Otros']
const allowedLevels = ['Starter', 'Intermediate', 'Advanced']
const allowedFormats = ['Online', 'Presencial']

const parseSkillId = (value) => {
  const skillId = Number(value)
  return Number.isInteger(skillId) ? skillId : Number.NaN
}

const validateSkillPayload = ({ title, category, level, format, location }) => {
  if (!title?.trim()) {
    return 'El titulo es obligatorio'
  }

  if (format === 'Presencial' && (!location || !location.trim())) {
    return 'La ubicación es obligatoria para clases presenciales'
  }

  if (!allowedLevels.includes(level)) {
    return 'El nivel no es valido'
  }

  if (!allowedFormats.includes(format)) {
    return 'El formato no es valido'
  }

  return null
}

// --- Utilidades para Fuzzy Matching ---
function removeAccents(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
}

function levenshteinDistance(a, b) {
  const matrix = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          Math.min(matrix[i][j - 1] + 1, // insertion
                   matrix[i - 1][j] + 1) // deletion
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

const synonyms = {
  'english': 'ingles',
  'spanish': 'espanol',
  'french': 'frances',
  'german': 'aleman',
  'japanese': 'japones',
  'chinese': 'chino',
  'italian': 'italiano',
  'cybersecurity': 'ciberseguridad',
  'graphic design': 'diseno grafico',
  'video editing': 'edicion de video',
  '3d animation': 'animacion 3d',
  'drawing': 'dibujo',
  'painting': 'pintura',
  'photography': 'fotografia',
  'guitar': 'guitarra',
  'singing': 'canto',
  'drums': 'bateria',
  'music production': 'produccion musical',
  'violin': 'violin',
  'tennis': 'tenis',
  'padel': 'padel',
  'swimming': 'natacion',
  'chess': 'ajedrez',
  'carpentry': 'carpinteria',
  'electricity': 'electricidad',
  'plumbing': 'fontaneria',
  'cooking': 'cocina',
  'sewing': 'costura',
  'public speaking': 'oratoria',
  'personal finance': 'finanzas personales',
  'project management': 'gestion de proyectos',
  'programming': 'programacion',
  'develop': 'programacion',
  'development': 'programacion',
};

function normalizeSkill(str) {
  if (!str) return '';
  let norm = removeAccents(str);
  if (synonyms[norm]) {
    norm = synonyms[norm];
  } else {
    for (const [en, es] of Object.entries(synonyms)) {
      if (es === norm) {
        norm = es;
        break;
      }
    }
  }
  return norm;
}

function isSimilarMatch(str1, str2) {
  if (!str1 && !str2) return true;
  if (!str1 || !str2) return false;
  
  const n1 = normalizeSkill(str1);
  const n2 = normalizeSkill(str2);
  
  if (n1 === n2) return true;
  if (n1.includes(n2) || n2.includes(n1)) return true;
  
  const dist = levenshteinDistance(n1, n2);
  const maxLength = Math.max(n1.length, n2.length);
  const similarity = (maxLength - dist) / maxLength;
  
  return similarity >= 0.7; // 70% de similitud permite errores ortográficos
}

const listSkills = async (req, res, next) => {
  try {
    const skills = await findAllSkills()

    let userDesiredSkills = []
    let userOfferedSkills = []
    let allDesiredSkills = []

    if (req.user) {
      const [ds] = await pool.execute('SELECT category, title FROM desired_skills WHERE user_id = ?', [req.user.id])
      userDesiredSkills = ds

      userOfferedSkills = skills.filter(s => s.user_id === req.user.id).map(s => ({ category: s.category, title: s.title }))

      const [allDs] = await pool.execute('SELECT user_id, category, title FROM desired_skills WHERE user_id != ?', [req.user.id])
      allDesiredSkills = allDs
    }

    const enhancedSkills = skills.map(skill => {
      let matchPercentage = null

      if (req.user && skill.user_id !== req.user.id) {
        matchPercentage = 0
        
        // Match 1: ¿La habilidad que se ofrece es algo que YO deseo aprender?
        const matchesMyDesire = userDesiredSkills.some(d => 
          isSimilarMatch(d.category, skill.category) && 
          (!d.title || isSimilarMatch(d.title, skill.title))
        )
        
        // Match 2: ¿El dueño de esta habilidad desea aprender algo de lo que YO ofrezco?
        const ownerDesiredSkills = allDesiredSkills.filter(d => d.user_id === skill.user_id)
        
        const ownerWantsWhatIOffer = userOfferedSkills.some(offered => 
          ownerDesiredSkills.some(d => 
            isSimilarMatch(d.category, offered.category) && 
            (!d.title || isSimilarMatch(d.title, offered.title))
          )
        )

        if (matchesMyDesire && ownerWantsWhatIOffer) {
          matchPercentage = 100 
        } else if (matchesMyDesire || ownerWantsWhatIOffer) {
          matchPercentage = 50 
        }
      }

      return {
        ...skill,
        matchPercentage
      }
    })

    return res.json({
      ok: true,
      skills: enhancedSkills,
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
    const { title, description, category, level, format, location } = req.body

    const validationError = validateSkillPayload({ title, category, level, format, location })

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
      location: format === 'Presencial' ? location.trim() : null,
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

    const { title, description, category, level, format, location } = req.body
    const validationError = validateSkillPayload({ title, category, level, format, location })

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
      location: format === 'Presencial' ? location.trim() : null,
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
