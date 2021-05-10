const { sq } = require('../config/db')
const { DataTypes } = require('sequelize')

const Comment = sq.define('Comments', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  text: { type: DataTypes.STRING, allowNull: false },
})

module.exports = Comment
