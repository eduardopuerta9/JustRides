const { Comment } = require('../models')

const GetComments = async (req, res) => {
  try {
    const comments = await Comment.findAll()
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const CreateComment = async (req, res) => {
  try {
    const comments = await Comment.create({
      ...req.body,
      postId: req.params.post_id
    })
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const UpdateComment = async (req, res) => {
  try {
    const comments = await Comment.update(
      { ...req.body },
      { where: { id: req.params.comment_id }, returning: true }
    )
    res.send(comments)
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
  DeleteComment
}
