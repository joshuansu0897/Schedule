'use strict'
const db = require('../../core/db/postgres/postgres').db

exports.findByEmail = async (email) => {

  let response = null

  try {
    response = await db.User.findOne({ where: { email } })
    response = response ? response.dataValues : null
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.findById = async (id) => {

  let response = null

  try {
    response = await db.User.findOne({ where: { id } })
    response = response ? response.dataValues : null
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.getAll = async () => {

  let response = null

  try {
    response = await db.User.findAll({ attributes: ['Id', 'Name']})
    response = response ? response.map(item => item.dataValues) : null
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.save = async (user) => {

  let response = null

  try {
    if(user.id){
      await db.User.update(user, { where: { id: user.id } })
      response = await this.findById(user.id)
    }
    else{
      response = await db.User.save(user)
      response = response ? response.dataValues : null
    }
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}

exports.delete = async (params) => {
  let id = params.id

  let response = null
  try {
    response = await db.User.destroy({ where: { id } })
  } catch (error) {
    response = {}
    response.error = error.message
  }

  return response
}
