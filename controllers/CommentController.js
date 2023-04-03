const { Comment } = require('../models')

const GetComments = async (req, res) => {
  try {
    const comment = await Comment.findAll()
    res.send(comment)
  } catch (error) {
    throw error
  }
}
const FindCommentById = async (req, res) => {
  try {
    const postId = req.params.post_id
    // const userId = req.params.user_id
    const post = await Comment.findOne({
      where: { id: postId }

      // include: [{ model: User, where: { userId: user_id } }]
    })
    res.send(post)
  } catch (error) {}
}

const CreateComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      postId: req.params.post_id,
      userId: req.params.user_id
    })
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const UpdateComment = async (req, res) => {
  try {
    const comment = await Comment.update(
      { ...req.body },
      { where: { id: req.params.comment_id }, returning: true }
    )
    res.send(comment)
  } catch (error) {
    throw error
  }
}

const DeleteComment = async (req, res) => {
  try {
    await Comment.destroy({ where: { id: req.params.comment_id } })
    res.send({
      msg: 'comment Deleted',
      payload: req.params.comment_id,
      status: 'Ok'
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetComments,
  CreateComment,
  UpdateComment,
  DeleteComment,
  FindCommentById
}
