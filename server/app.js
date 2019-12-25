const express = require('express')
const app = express()
app.use(express.json())

const user = require('./users')
const cards = require('./cards')
const decks = require('./decks')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use(user)
app.use(cards)
app.use(decks)

module.exports = app
