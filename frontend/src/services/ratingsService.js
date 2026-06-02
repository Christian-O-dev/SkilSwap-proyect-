import api from './api.js'

export async function createRating(payload) {
  const { data } = await api.post('/ratings', payload)
  return data
}
