const query = require('./query')

async function updateTimeStamp (req, res) {
  const response = await query.updateTimeStamp(req.body)
  res.send(response)
}
async function updateDeckClickTime (req, res) {
  const response = await query.updateDeckClickTime(req.body)
  res.send(response)
}
async function modifyDeckName (req, res) {
  const response = await query.modifyDeckName(req.body)
  res.send(response)
}

async function deleteDeck (req, res) {
  const response = await query.deleteDeck(req.body)
  res.send(response)
}

async function getDeckNames (req, res) {
  const response = await query.getDeckNames(req.query.sid)
  res.send(response)
}

module.exports = {
  getDeckNames,
  updateTimeStamp,
  updateDeckClickTime,
  modifyDeckName,
  deleteDeck
}
