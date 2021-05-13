const { User, UserFriend } = require('../models')

const addFriend = async (req, res, next) => {
  const { friendId } = req.body
  const userId = req.userData.id
  try {
    if (friendId) {
      if (friendId === userId) {
        res.status(400).json({ response: 'user cannot follow self' })
      } else {
        const checkFriend = await User.findOne({ where: { id: friendId } })
        if (checkFriend) {
          const isAdded = await UserFriend.findOne({
            where: { UserId: userId, friendId: friendId },
          })
          if (isAdded) {
            res.status(200).json({ response: 'already added', isFriend: true })
          } else {
            const newFriend = await UserFriend.create({
              UserId: userId,
              friendId: friendId,
            })
            res.status(200).json({ response: 'added', isFriend: true })
          }
        } else {
          res.status(404).json({ response: 'friend not found' })
        }
      }
    } else {
      res.status(422).json({ response: 'friendId not preent' })
    }
  } catch (error) {
    console.error(error)
    res.status(500).json({ response: 'error occured' })
  }
}

const removeFriend = async (req, res, next) => {
  const { friendId } = req.body
  const userId = req.userData.id
  try {
    if (friendId) {
      const isAdded = await UserFriend.findOne({
        where: { UserId: userId, friendId: friendId },
      })
      if (isAdded) {
        await UserFriend.destroy({
          where: { UserId: userId, friendId: friendId },
        })
        res.status(200).json({ response: 'removed', isFriend: false })
      } else {
        res.status(404).json({ response: 'not friend', isFriend: false })
      }
    } else {
      res.status(422).json({ response: 'friendId not preent' })
    }
  } catch (error) {}
}

const getAllUserFriends = async (req, res, next) => {
  const userId = req.params.userId
  console.log(userId)
  const allFriends = await User.findOne({
    where: { id: userId },
    attributes: ['id', 'first_name', 'last_name'],
    include: [
      {
        model: User,
        attributes: ['id', 'first_name', 'last_name'],
        as: 'friend',
        through: { attributes: [] },
      },
    ],
  })
  res.status(200).json({ user: allFriends })
}

module.exports = {
  addFriend,
  removeFriend,
  getAllUserFriends,
}
