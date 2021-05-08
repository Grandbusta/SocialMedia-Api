const { User } = require('../models')
const bcrypt = require('bcrypt')
const validator = require('email-validator')
const { JWT_KEY } = process.env

const signUp = async (req, res, next) => {
  try {
    const { email, firstname, lastname, password } = req.body
    if (email && firstname && lastname && password) {
      if (validator.validate(email)) {
        let check = await User.findOne({
          where: { email: email },
          attributes: ['email'],
        })
        if (check !== null) {
          res.status(409).json({
            response: 'user already exist',
          })
        } else {
          let createUser = await User.create({
            email: email,
            first_name: firstname,
            last_name: lastname,
            password: await bcrypt.hash(password, 10),
          })
          if (createUser) {
            res.status(201).json({
              response: 'user created successfully',
            })
          }
        }
      } else {
        res.status(401).json({
          response: 'email is not valid',
        })
      }
    } else {
      res.status(401).json({
        response: 'one or more values is missing',
      })
    }
  } catch (error) {
    res.status(500).json({
      response: 'an error occured',
    })
  }
}

const login = (req, res, next) => {}

const remove = (req, res, next) => {}

const update = (req, res, next) => {}

module.exports = {
  signUp,
  login,
  remove,
  update,
}
