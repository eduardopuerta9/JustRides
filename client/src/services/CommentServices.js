import Client from './api'

export const GetComments = async () => {
  try {
    const res = await Client.get('/api/comment')
    return res.data
  } catch (error) {
    throw error
  }
}
export const CreatePost = async (data) => {
  try {
    const res = await Client.post('api/post', data)
    return res.data
  } catch (error) {
    throw error
  }
}
