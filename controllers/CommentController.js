const { comment } = require('../models')

const GetComments = async (req, res) => {
  try {
    const comments = await comment.findAll()
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const CreateComment = async (req, res) => {
  try {
    let comments = await comment.create({ ...req.body })
    res.send(comments)
  } catch (error) {
    throw error
  }
}

const UpdateComment = async (req, res) => {
  try {
    const comments = await comment.update(
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
    await comment.destroy({ where: { id: req.params.comment_id } })
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
