const jwt = require('jsonwebtoken')
const { JWT_KEY } = process.env
const { User } = require('../models')

exports.userAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_KEY)
      const userData = await User.findOne({
        where: { email: decoded.email },
        attributes: ['id', 'email', 'first_name', 'last_name', 'user_status'],
      })
      if (userData.email && userData.user_status === 'active') {
        req.userData = userData
        next()
      } else {
        return res.status(401).json({
          message: 'Auth failed',
        })
      }
    } else {
      res.status(422).json({ message: 'token not present in header' })
    }
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      message: 'Auth failed',
    })
  }
}

exports.adminAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, JWT_KEY)
      const userData = await User.findOne({
        where: { email: decoded.email },
        attributes: ['email', 'user_type'],
      })
      if (userData.user_type === 'admin') {
        req.userData = userData
        next()
      } else {
        return res.status(401).json({
          message: 'Auth failed',
        })
      }
    } else {
      res.status(422).json({ message: 'token not present in header' })
    }
  } catch (error) {
    console.error(error)
    return res.status(401).json({
      message: 'Auth failed',
    })
  }
}
