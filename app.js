'use strict'
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { handleFatalError } = require('./src/core/utils/utils')

process.on('uncaughtException', handleFatalError)
process.on('unhandledRejection', handleFatalError)

app.use(bodyParser.json())

module.exports = app