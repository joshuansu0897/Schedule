'use strict'
const Sequelize = require('sequelize')

const name = process.env.NAME_DB || 'ExampleDB'
const user = process.env.USER_DB || 'postgres'
const pass = process.env.PASS_DB || 'example'
const host = process.env.HOST_DB || 'localhost'
const type = process.env.TYPE_DB || 'postgres'
const port = process.env.PORT_DB || 5432

const sequelize = new Sequelize(name, user, pass, {
  host,
  port,
  dialect: type,

  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const db = {
  User: require('../../../logic/user/user')(sequelize, Sequelize)
}

Object.keys(db).forEach(key => {
  if ('associate' in db[key]) {
    db[key].associate(db)
  }
})

async function seed() {
  await db.User.create(
    {
      Name: 'rwieruch',
      Email: 'test@test.com',
      Password: 'Password text'
    }
  )
  await db.User.create(
    {
      Name: 'ddavids',
      Email: 'test@test.com',
      Password: 'Password text'
    }
  )
}

module.exports = { db, sequelize, seed }