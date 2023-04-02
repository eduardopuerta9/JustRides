import Client from './api'

export const GetPosts = async () => {
  try {
    const res = await Client.get('/post')
    return res.data
  } catch (error) {
    throw error
  }
}
export const CreatePost = async (data) => {
  try {
    const res = await Client.post('/post/create', data)
    return res.data
  } catch (error) {
    throw error
  }
}
export const CreateComment = async (data) => {
  try {
    const res = await Client.post('comment/addcomment', data)
    return res.data
  } catch (error) {
    throw error
  }
}
