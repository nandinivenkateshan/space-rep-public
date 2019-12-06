require('dotenv').config()
const express = require('express')
const db = require('./query')
const app = express()
const passport = require('passport')
// const bcrypt = require('bcrypt')
// const flash = require('express-flash')
// const session = require('express-session')
const initializePassport = require('./passport-config')
initializePassport(passport, email => )

const port = process.env.PORT || 8080
app.use(express.json())

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
  })

// initializePassport( 
//   passport,
//   email => users.find(user => user.email === email),
//   id => users.find(user => user.id === id)
//   ) 

// app.use(flash())
  // app.use(session({
  //   secret: process.env.SESSION_SECRET
  // resave: false,
  // }))


//sessions
// app.use(
//   session({
//   secret: 'fraggle-rock',
//   resave: false, 
//   saveUninitialized: false
//   })
// )

// app.use( (req, res, next) => {
//   console.log('req.session', req.session);
//   return next();
// });

// function checkAuthenticated (req, res, next){
//   if(req.isAuthenticated()) {
//     return next()
//   }
// }

// app.use(passport.initialize())
// app.use(passport.session())



app.get('/getUserDetails',db.getUserDetails)
app.post('/addUserDetails', db.addUserDetails)
app.get('/cards', db.getCards)  
app.post('/card', db.addCard)
app.post('/updateTimeStamp', db.updateTimeStamp)
app.post('/updateDeckClickTime', db.updateDeckClickTime)
app.post('/login', passport.authenticate('local'))

app.listen(port, () => console.log(`Server running on the port ${port}`))