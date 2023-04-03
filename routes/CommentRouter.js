const router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')

router.get('/', controller.GetComments)
router.post('/addcomment/:post_id/:user_id', controller.CreateComment)
router.put(
  '/:comment_id/update',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateComment
)
router.delete(
  '/:comment_id/delete',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteComment
)
router.get('/:post_id/comments', controller.FindCommentById)
module.exports = router
