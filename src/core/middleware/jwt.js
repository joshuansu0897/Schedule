'use strict'
const { jwt, secret } = require('./jwtUtils')

module.exports = (req, res, next) => {
  if (req.url === '/signin' || req.url === '/signup') {
    next()
    return
  }

  let token = req.headers['authorization']

  if (!token) {
    res.status(401)
    res.json({ error: 'No token!' })
    return
  }

  try {
    req.user = jwt.verify(token, secret)
    next()
  } catch (error) {
    res.status(401)
    res.json({ error: 'Failed to authenticate token!' })
  }
}