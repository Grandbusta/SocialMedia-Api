const { Post, User, Comment } = require('../models')

const createComment = async (req, res, next) => {
  const { postId, text } = req.body
  console.log(postId, text)
  // const comment=await Comment.create({text:'This is a new comment',PostId:})
}

module.exports = {
  createComment,
}
