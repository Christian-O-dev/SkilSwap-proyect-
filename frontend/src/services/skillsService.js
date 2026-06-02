import api from './api.js'

export async function listSkills() {
  const { data } = await api.get('/skills')
  return data
}

export async function getSkillById(skillId) {
  const { data } = await api.get(`/skills/${skillId}`)
  return data
}

export async function createSkill(payload) {
  const { data } = await api.post('/skills', payload)
  return data
}

export async function updateSkill(skillId, payload) {
  const { data } = await api.put(`/skills/${skillId}`, payload)
  return data
}

export async function deleteSkill(skillId) {
  const { data } = await api.delete(`/skills/${skillId}`)
  return data
}
