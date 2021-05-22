const { User, Post, Comment, Like } = require('../models')

const getAllPosts = async (req, res, next) => {
  try {
    const userPost = await User.findOne({
      where: { id: req.params.userId },
      attributes: ['id'],
      include: [{ model: Post, attributes: { exclude: ['userId'] } }],
    })
    if (userPost) {
      res.status(200).json({
        userId: userPost.id,
        posts: userPost.posts,
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
  try {
    const allFriends = await User.findOne({
      where: { id: userId },
      attributes: ['id', 'first_name', 'last_name'],
      include: [
        {
          model: User,
          attributes: ['id', 'first_name', 'last_name'],
          as: 'friend',
          include: [
            {
              model: Post,
              include: [
                { model: Comment, attributes: { exclude: ['postId'] } },
                {
                  model: Like,
                  attributes: { exclude: ['postId'] },
                },
              ],
              attributes: { exclude: ['userId'] },
            },
          ],
          through: { attributes: [] },
        },
      ],
    })
    let postArr = []
    const allFriend = JSON.parse(JSON.stringify(allFriends))
    if (allFriend) {
      allFriend.friend.forEach(friend => {
        friend.posts.forEach(post => {
          postArr.push({
            user: {
              first_name: friend.first_name,
              last_name: friend.last_name,
              id: friend.id,
            },
            ...post,
          })
        })
      })
      const sortedArr = postArr.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      )
      res.status(200).json({ feed: sortedArr })
    } else {
      res.status(404).json({ response: 'no friend added yet' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ response: 'error occured' })
  }
}

module.exports = {
  getAllPosts,
  getFeeds,
}
