const { Sequelize } = require('sequelize')
const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
})

testDbConnection = async () => {
  try {
    await sequelize.authenticate()
    // sequelize.sync({ alter: true })
  } catch (error) {
    console.error(error)
  }
}

module.exports = { sq: sequelize, testDbConnection }
