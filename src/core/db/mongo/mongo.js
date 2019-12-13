'use strict'
const mongoose = require('mongoose')
const { handleFatalError } = require('../../../utils/utils')
const url = process.env.URL_MONGO
const portMongo = process.env.PORT_MONGO
const user = process.env.USER_MONGO
const pass = process.env.PASS_MONGO

const str = `mongodb://${user}:${pass}@${url}:${portMongo}/heimdal?authSource=admin`
mongoose.connect(str, { useUnifiedTopology: true, useNewUrlParser: true })

const connection = mongoose.connection

connection.on('error', (err) => {
  handleFatalError(err)
})

connection.once('open', () => {
  console.log('Se conecto a MongoDB')
})

const db = {
  User: require('../../../../logic/user/userMongo')
}

module.exports = { db }