const router = require('express').Router()
const controller = require('../controllers/CommentController')
const middleware = require('../middleware')

router.get('/', controller.GetComments)
router.post(
  '/:post_id/addcomment',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateComment
)
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

module.exports = router
