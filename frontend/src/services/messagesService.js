import api from './api.js'

export const getMessagesByExchange = async (exchangeId) => {
  const { data } = await api.get(`/messages/${exchangeId}`)
  return data
}
