'use strict'
const route = require('express').Router()

const userController = require('./user/userController') 

route.use('/users', userController)

module.exports = route