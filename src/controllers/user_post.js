const { User, Post } = require('../models')

const getAllPosts = () => {
  const posts = Post.findAll({ where: {} })
}

const createNewPost = () => {}

const getSinglePost = () => {}

const deletePost = () => {}

module.exports = {
  getAllPosts,
  createNewPost,
  getSinglePost,
  deletePost,
}
