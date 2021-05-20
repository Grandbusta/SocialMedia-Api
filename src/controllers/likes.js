const { Post, User, Like } = require('../models')

const like = async (req, res, next) => {
  try {
    const { postId } = req.body
    const userId = req.userData.id
    if (postId) {
      const checkPost = await Post.findOne({ where: { id: postId } })
      if (checkPost) {
        const checkLike = await Like.findOne({
          where: { UserId: userId, PostId: postId },
        })
        if (checkLike) {
          await Like.destroy({ where: { UserId: userId, PostId: postId } })
          res.status(200).json({
            response: 'success',
            likeState: !checkLike.state,
          })
        } else {
          await Like.create({ state: true, UserId: userId, PostId: postId })
          res.status(200).json({
            response: 'success',
            likeState: true,
          })
        }
      } else {
        res.status(404).json({
          response: 'post not found',
        })
      }
    } else {
      res.status(422).json({
        response: 'postId not present',
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
  like,
}
