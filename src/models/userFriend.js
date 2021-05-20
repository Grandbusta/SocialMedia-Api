const { sq } = require('../config/db')
const { DataTypes } = require('sequelize')

const User_Friend = sq.define('user_friend', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
})

module.exports = User_Friend
