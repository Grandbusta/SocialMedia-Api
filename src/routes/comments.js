const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const { createComment, editComment } = require('../controllers/comments')

router.post('/', userAuth, createComment)
router.patch('/:commentId', userAuth, editComment)

module.exports = router
