const User = require('./user')
const UserFriend = require('./userFriend')
const Post = require('./post')
const Like = require('./like')
const Comment = require('./comment')

User.hasMany(Post)
User.hasMany(Like)
User.belongsToMany(User, { through: UserFriend, as: 'friend' })
Post.hasMany(Like)
Post.hasMany(Comment)

module.exports = { User, Post, Like, Comment }
