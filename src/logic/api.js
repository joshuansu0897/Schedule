'use strict'
const route = require('express').Router()

const v1 = require('./v1') 

route.use('/api/v1', v1)

module.exports = route