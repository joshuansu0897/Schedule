'use strict'
const route = require('express').Router()
const UserBusisnessLogic = require('./userBusinessLogic')

route.get('/', async (req, res) => {
  let response = await UserBusisnessLogic.getAll()
  res.json({ response })
})

route.get('/:idUser', async (req, res) => {
  let idUser = req.params.idUser
  let response = await UserBusisnessLogic.findById(idUser)
  res.json({ response })
})

route.post('/', async (req, res) => {
  let user = {
    Name: req.body.name,
    Email: req.body.Email,
    Password: req.body.Password
  }

  let response = await UserBusisnessLogic.save(user)
  res.json({ response })
})

route.put('/:idUser', async (req, res) => {
  let user = {
    Id: req.params.idUser,
    Name: req.body.name,
    Email: req.body.Email,
    Password: req.body.Password
  }

  let response = await UserBusisnessLogic.save(user)
  res.json({ response })
})

route.delete('/:idUser', async (req, res) => {
  let idUser = req.params.idUser
  let response = await UserBusisnessLogic.delete({ id: idUser })
  res.json({ response })
})

// Auth
route.post('/signin', async (req, res) => {
  let user = {
    Email: req.body.Email,
    Password: req.body.Password
  }

  let token = null
  try { 
    token = await UserBusisnessLogic.login(user)
  } catch (error) {
    res.json({ error: error.message})
  }

  res.json({ token })
})

module.exports = route
