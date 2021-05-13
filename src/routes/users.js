const express = require('express')
const router = express.Router()
const { adminAuth, userAuth } = require('../middlewares/auth')
const { signUp, login, remove, update } = require('../controllers/users')
const { getAllPosts } = require('../controllers/user_post')
const { getAllUserFriends } = require('../controllers/friends')

router.post('/signup', signUp)
router.post('/login', login)
router.delete('/delete/:id', userAuth, remove)
router.patch('/update/:id', userAuth, update)

//User posts routes
router.get('/:userId/posts', getAllPosts)
router.get('/:userId/friends', getAllUserFriends)

module.exports = router
