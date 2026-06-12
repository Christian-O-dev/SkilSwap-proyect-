import api from './api'

export const getDesiredSkills = async () => {
  const { data } = await api.get('/desired-skills')
  return data
}

export const updateDesiredSkills = async (skills) => {
  const { data } = await api.put('/desired-skills', { skills })
  return data
}
