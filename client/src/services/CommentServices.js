import Client from './api'

export const GetComments = async () => {
  try {
    const res = await Client.get('/api/comment')
    return res.data
  } catch (error) {}
}
