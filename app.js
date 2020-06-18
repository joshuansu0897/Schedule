'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { handleFatalError } = require('./src/core/utils/utils')

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

const { sequelize, seed } = require('./src/core/db/postgres/postgres')

const eraseDatabaseOnSync = process.env.ERRASE_DB || false
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
  if (eraseDatabaseOnSync) {
    await seed()
  }
})

app.use(bodyParser.json())

const apiv1 = require('./src/logic/api')

app.use('/', apiv1)

module.exports = app