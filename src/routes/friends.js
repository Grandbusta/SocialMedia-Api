const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const { addFriend, removeFriend } = require('../controllers/friends')

router.post('/add', userAuth, addFriend)
router.post('/remove', userAuth, removeFriend)

module.exports = router
