'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const sequelize = require('./src/core/db/postgres/postgres').sequelize
const { handleFatalError } = require('./src/core/utils/utils')
const path = require('path')

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('views', path.join(__dirname, 'src/view'))
app.set('view engine', 'ejs')
app.use('/public', express.static(path.join(__dirname, 'src/public')))

const eraseDatabaseOnSync = process.env.ERRASE_DB || false
sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {
})

const viewRouter = require('./src/view/route/main')

app.use('/view', viewRouter)

module.exports = app