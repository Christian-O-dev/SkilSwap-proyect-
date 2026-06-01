import api from './api.js'

export async function createRequest(payload) {
  const { data } = await api.post('/requests', payload)
  return data
}

export async function listRequests() {
  const { data } = await api.get('/requests')
  return data
}
