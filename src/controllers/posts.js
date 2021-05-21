const { User, Post, Comment } = require('../models')
const cloudinary = require('../config/cloudinary')
const fs = require('fs')

const createNewPost = async (req, res, next) => {
  try {
    const { path } = req.file
    if (path) {
      const { caption } = req.body
      const { url } = await cloudinary.uploads(path, 'SocialMedia')
      fs.unlinkSync(path)
      const newPost = await Post.create({
        img_url: url,
        caption: caption,
        userId: req.userData.id,
      })
      res.status(200).json({ newPost })
    } else {
      res.status(422).json({ response: 'image not present in body' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ response: 'error occured' })
  }
}

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.postId, userId: req.userData.id },
    })
    if (post) {
      res.status(200).json({
        response: 'success',
      })
    } else {
      res.status(404).json({
        response: 'Not found',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      response: 'error occured',
    })
  }
}

const updatePost = (req, res, next) => {}

const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({
      where: { id: req.params.postId },
      include: [
        {
          model: Comment,
          attributes: ['id', 'text', 'createdAt', 'updatedAt'],
        },
      ],
    })
    if (post) {
      res.status(200).json({
        response: 'success',
        post: post,
      })
    } else {
      res.status(404).json({
        response: 'Not found',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      response: 'error occured',
    })
  }
}

module.exports = {
  createNewPost,
  deletePost,
  updatePost,
  getSinglePost,
}
