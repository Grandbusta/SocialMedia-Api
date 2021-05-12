const { Post, User, Comment } = require('../models')

const createComment = async (req, res, next) => {
  const { postId, text } = req.body
  try {
    const findPost = await Post.findOne({ where: { id: postId } })
    if (findPost) {
      if (text) {
        const comment = await Comment.create({
          text: text,
          PostId: postId,
          UserId: req.userData.id,
        })
        res.status(200).json({
          response: 'success',
          comment: comment,
        })
      } else {
        res.status(422).json({
          response: 'text not present',
        })
      }
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

const editComment = async (req, res, next) => {
  try {
    const [updateComment] = await Comment.update(
      { text: req.body.text },
      { where: { id: req.params.commentId, UserId: req.userData.id } },
    )
    if (updateComment) {
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

module.exports = {
  createComment,
  editComment,
}
