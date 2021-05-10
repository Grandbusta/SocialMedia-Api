const express = require('express')
const router = express.Router()
const { signUp, login, remove, update } = require('../controllers/users')
const { adminAuth, userAuth } = require('../middlewares/auth')

router.post('/signup', signUp)
router.post('/login', login)
router.delete('/delete/:id', userAuth, remove)
router.patch('/update/:id', userAuth, update)

module.exports = router
