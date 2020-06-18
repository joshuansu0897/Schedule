'use strict'
module.exports = {
  jwt: require('jsonwebtoken'),
  secret: process.env.SECRET_JWT || require('crypto').randomBytes(256).toString('hex'),
}