const { sq } = require('../config/db')
const { DataTypes } = require('sequelize')

const User = sq.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  user_status: {
    type: DataTypes.ENUM,
    values: ['active', 'disabled'],
    defaultValue: 'active',
  },
  user_type: {
    type: DataTypes.ENUM,
    values: ['user', 'admin'],
    defaultValue: 'user',
  },
  password: { type: DataTypes.STRING, allowNull: false },
})

module.exports = User
