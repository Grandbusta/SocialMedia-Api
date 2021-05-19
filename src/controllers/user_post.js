const { User, Post, Comment } = require('../models')

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

const getFeeds = async (req, res, next) => {
  const userId = req.params.userId
  const allFriends = await User.findOne({
    where: { id: userId },
    attributes: ['id', 'first_name', 'last_name'],
    include: [
      {
        model: User,
        attributes: ['id', 'first_name', 'last_name'],
        as: 'friend',
        include: [{ model: Post }],
        through: { attributes: [] },
      },
    ],
  })
  res.status(200).json({ user: allFriends })
}

module.exports = {
  getAllPosts,
  getFeeds,
}
