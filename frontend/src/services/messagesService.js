import api from './api.js'

export const getMessagesByRequest = async (requestId) => {
  const { data } = await api.get(`/messages/${requestId}`)
  return data
}
