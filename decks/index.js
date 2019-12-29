const express = require('express')
const handler = require('./handler')
var router = express.Router()

router.post('/updateTimeStamp', handler.updateTimeStamp)
router.post('/updateDeckClickTime', handler.updateDeckClickTime)
router.post('/modifyDeckName', handler.modifyDeckName)
router.post('/deleteDeck', handler.deleteDeck)
router.get('/getDeckNames', handler.getDeckNames)

module.exports = router
