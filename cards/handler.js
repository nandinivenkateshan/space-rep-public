const query = require('./query')

async function getCards (req, res) {
  const response = await query.getCards(req.query.sid)
  res.send(response)
}

async function addCard (req, res) {
  const response = await query.addCard(req.body)
  res.send(response)
}

async function updateCard (req, res) {
  const response = await query.updateCard(req.body)
  return res.send(response)
}

module.exports = {
  getCards,
  addCard,
  updateCard
}
