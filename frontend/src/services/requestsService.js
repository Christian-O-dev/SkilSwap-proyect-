import api from './api.js'

export async function createRequest(payload) {
  const { data } = await api.post('/requests', payload)
  return data
}

export async function listRequests() {
  const { data } = await api.get('/requests')
  return data
}

export async function updateRequestStatus(requestId, status) {
  const { data } = await api.patch(`/requests/${requestId}/status`, { status })
  return data
}
