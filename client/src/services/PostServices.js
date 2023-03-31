import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/api/post')
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
