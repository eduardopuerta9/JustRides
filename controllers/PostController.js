const { post } = require('../models')

const GetPosts = async (req, res) => {
  try {
    const Posts = await post.findAll()
    res.send(Posts)
  } catch (error) {
    throw error
  }
}

const CreatePost = async (req, res) => {
  try {
    const Post = await post.create({ ...req.body })
    res.send(Post)
  } catch (error) {
    throw error
  }
}

const UpdatePost = async (req, res) => {
  try {
    const Post = await post.update(
      { ...req.body },
      { where: { id: req.params.post_id }, returning: true }
    )
    res.send(Post)
  } catch (error) {
    throw error
  }
}

const DeletePost = async (req, res) => {
  try {
    await post.destroy({ where: { id: req.params.post_id } })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost
}
