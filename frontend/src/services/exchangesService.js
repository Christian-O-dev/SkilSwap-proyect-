import api from './api.js'

export async function listExchanges() {
  const { data } = await api.get('/exchanges')
  return data
}

export async function updateExchangeStatus(exchangeId, status) {
  const { data } = await api.patch(`/exchanges/${exchangeId}/status`, { status })
  return data
}
