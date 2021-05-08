const express = require('express')
const router = express.Router()
const { signUp, login, remove, update } = require('../controllers/users')

router.post('/signup', signUp)
router.post('/login', login)
router.delete('/delete/:id', remove)
router.patch('/update/:id', update)

module.exports = router
