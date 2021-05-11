const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const {
  createNewPost,
  deletePost,
  updatePost,
} = require('../controllers/posts')

router.post('/', userAuth, createNewPost)
router.patch('/:postId', userAuth, updatePost)
router.delete('/:postId', userAuth, deletePost)

module.exports = router
