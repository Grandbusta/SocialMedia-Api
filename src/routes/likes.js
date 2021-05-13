const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const { like } = require('../controllers/likes')

router.post('/', userAuth, like)

module.exports = router
