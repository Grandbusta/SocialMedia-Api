const { sq } = require('../config/db')
const { DataTypes } = require('sequelize')

const Like = sq.define('Like', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  state: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
})

module.exports = Like
