const { User, Post } = require('../models')

const createNewPost = async (req, res, next) => {
  const { img_url, caption } = req.body
  const newPost = await Post.create({
    img_url: img_url,
    caption: caption,
    UserId: req.userData.id,
  })
  res.status(200).json({ newPost })
}

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.postId, UserId: req.userData.id },
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

const updatePost = () => {}

const getSinglePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ where: { id: req.params.postId } })
    if (post) {
      res.status(200).json({
        response: 'success',
        data: post,
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
