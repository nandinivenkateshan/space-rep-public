const express = require('express')
const app = express()
const path = require('path')
app.use(express.json())

const user = require('./users')
const cards = require('./cards')
const decks = require('./decks')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/dist'))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

app.use(user)
app.use(cards)
app.use(decks)

module.exports = app
