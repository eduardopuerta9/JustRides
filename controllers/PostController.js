const { Post, User } = require('../models')

const GetPosts = async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.send(posts)
  } catch (error) {
    throw error
  }
}

const CreatePost = async (req, res) => {
  console.log(res.locals)
  try {
    const post = await Post.create({
      ...req.body,
      userId: req.params.user_id
    })
    res.send(post)
  } catch (error) {
    throw error
  }
}
const FindPostById = async (req, res) => {
  try {
    const postId = req.params.post_id
    // const userId = req.params.user_id
    const post = await Post.findOne({
      where: { id: postId }

      // include: [{ model: User, where: { userId: user_id } }]
    })
    res.send(post)
  } catch (error) {}
}

const UpdatePost = async (req, res) => {
  try {
    const post = await Post.update(
      { ...req.body },
      { where: { id: req.params.post_id }, returning: true }
    )
    res.send(post)
  } catch (error) {
    throw error
  }
}

const DeletePost = async (req, res) => {
  try {
    await Post.destroy({ where: { id: req.params.post_id } })
    res.send({ msg: 'Post Deleted', payload: req.params.post_id, status: 'Ok' })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetPosts,
  CreatePost,
  UpdatePost,
  DeletePost,
  FindPostById
}
