const { User } = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (email && password) {
      if (validator.validate(email)) {
        let check = await User.findOne({
          where: { email: email },
          attributes: ['email', 'password'],
        })
        if (check !== null) {
          let comparePassword = await bcrypt.compare(password, check.password)
          if (comparePassword) {
            res.status(200).json({
              response: 'Auth successful',
              token: jwt.sign(
                {
                  email: check.email,
                },
                JWT_KEY,
              ),
            })
          } else {
            res.status(401).json({
              response: 'Auth failed',
            })
          }
        } else {
          res.status(404).json({
            response: 'user not found',
          })
        }
      } else {
        res.status(422).json({
          response: 'not a valid email',
        })
      }
    } else {
      res.status(422).json({
        response: 'one or more values are missing',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      response: 'An error occured',
    })
  }
}

const remove = (req, res, next) => {
  try {
		await User.destroy({where:{id:req.userData.id}})
		res.status(204).json({
			response:'user deleted sucessfully'
		})
	} catch (error) {
		res.status(500).json({
			message:'An error occured'
		})
	}
}

const update = (req, res, next) => {
  try {
		await User.update(
			{...req.body},
			{where:{id:req.userData.id}}
		)
		res.status(204).json({
			message:'update successful'
		})
	} catch (error) {
		res.status(500).json({
			message:'An error occured'
		})
	}
}

module.exports = {
  signUp,
  login,
  remove,
  update,
}
