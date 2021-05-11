const { User, Post } = require('../models')

const getAllPosts = async (req, res, next) => {
  try {
    const userPost = await User.findOne({
      where: { id: req.params.userId },
      attributes: ['id'],
      include: [{ model: Post }],
    })
    if (userPost) {
      res.status(200).json({
        response: {
          userId: userPost.id,
          posts: userPost.Posts,
        },
      })
    } else {
      res.status(404).json({
        response: 'User does not exist',
      })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({
      response: 'an error occured',
    })
  }
}

module.exports = {
  getAllPosts,
}
