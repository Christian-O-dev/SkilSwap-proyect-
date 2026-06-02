import api from './api.js'

export async function listAdminUsers() {
  const { data } = await api.get('/admin/users')
  return data
}

export async function updateAdminUserBlock(userId, isBlocked) {
  const { data } = await api.patch(`/admin/users/${userId}/block`, {
    is_blocked: isBlocked,
  })
  return data
}

export async function listAdminSkills() {
  const { data } = await api.get('/admin/skills')
  return data
}

export async function deleteAdminSkill(skillId) {
  const { data } = await api.delete(`/admin/skills/${skillId}`)
  return data
}

export async function listAdminRequests() {
  const { data } = await api.get('/admin/requests')
  return data
}
