const express = require('express')
const handler = require('./handler')
var router = express.Router()

router.get('/getCards', handler.getCards)
router.post('/addCard', handler.addCard)
router.post('/updateCard', handler.updateCard)

module.exports = router
