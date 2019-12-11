require('dotenv').config()
const express = require('express')
const db = require('./query')
const app = express()
const port = process.env.PORT || 8080
app.use(express.json())

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/getUserDetails', db.getUserDetails)
app.post('/addUserDetails', db.addUserDetails)
app.get('/cards', db.getCards)
app.post('/card', db.addCard)
app.post('/updateTimeStamp', db.updateTimeStamp)
app.post('/updateDeckClickTime', db.updateDeckClickTime)
app.post('/login', db.login)
app.post('/modifyDeckName', db.modifyDeckName)
app.post('/deleteDeck', db.deleteDeck)

app.listen(port, () => console.log(`Server running on the port ${port}`))

