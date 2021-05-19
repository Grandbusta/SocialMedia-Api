const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const upload = require('../utils/imageUpload')
const {
  createNewPost,
  deletePost,
  updatePost,
  getSinglePost,
} = require('../controllers/posts')

router.post('/', userAuth, upload.single('postImg'), createNewPost)
router.patch('/:postId', userAuth, updatePost)
router.delete('/:postId', userAuth, deletePost)
router.get('/:postId', getSinglePost)

module.exports = router
