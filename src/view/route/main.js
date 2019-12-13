'use strict'
const express = require('express')
const router = express.Router()

// const userR = require('./user')

// router.use(userR)

router.get('/', (req, res, next) => {
  res.render('index', { page: 'Home', menuId: 'home' })
})

router.get('/contact', (req, res, next) => {
  res.render('contact', { page: 'Contact', menuId: 'contact' })
})

router.get('/about', (req, res, next) => {
  res.render('about', { page: 'About', menuId: 'about' })
})

router.all('/**', (req, res, next) => {
  res.render('error', { page: 'Error', menuId: 'error', message: '404 Not Found.' })
})

module.exports = router