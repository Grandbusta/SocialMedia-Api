const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const { createComment } = require('../controllers/comments')

router.post('/', userAuth, createComment)

module.exports = router
