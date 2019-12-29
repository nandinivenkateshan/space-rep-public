const express = require('express')
const handler = require('./handler')
var router = express.Router()

router.post('/createAccount', handler.createAccount)
router.get('/getUsers', handler.getUsers)
router.post('/login', handler.login)
router.get('/logout', handler.logout)
router.get('/checkAccount', handler.checkAccount)

module.exports = router
