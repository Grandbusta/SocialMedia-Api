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
  const post = await Post.destroy({ where: { id: req.params.postId } })
  res.status(200).json({
    post,
  })
}

const updatePost = () => {}

const getSinglePost = async (req, res, next) => {
  const post = await Post.findOne({ where: { id: req.params.postId } })
  // if(post){
  res.status(200).json({
    post,
  })
  // }
}

module.exports = {
  createNewPost,
  deletePost,
  updatePost,
  getSinglePost,
}
