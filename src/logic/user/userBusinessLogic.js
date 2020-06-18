'use strict'
const UsersDAL = require('./userDAL')
const bcrypt = require('bcrypt')
const { jwt, secret } = require('../../core/middleware/jwtUtils')

exports.getAll = async (params, user) => {

  let response = null

  try {
    response = await UsersDAL.getAll()
  } catch (error) {
    throw Error(error.message)
  }

  return response
}

exports.save = async (params, user) => {

  let response = null

  try {
    response = await UsersDAL.save(user)
  } catch (error) {
    throw Error(error.message)
  }

  return response
}

exports.delete = async (params, user) => {
  let id = params.id

  let response = null
  try {
    response = await UsersDAL.delete(user)
  } catch (error) {
    throw Error(error.message)
  }

  return response
}

exports.login = async (params) => {
  let Email = params.Email

  let user = null
  try {
    user = await UsersDAL.findByEmail({ where: { Email } })
  } catch (error) {
    throw Error(error.message)
  }

  if (user === null) {
    throw Error('Wrong Email')
  }

  const match = await bcrypt.compare(password, user.Password);

  if (!match) {
    throw Error('Wrong Password')
  }

  let data = {
    name: user.Name,
    email: user.Email
  }

  return jwt.sign(data, secret)
}