const query = require('./query')

async function createAccount (req, res) {
  const response = await query.createAccount(req.body)
  res.send(response)
}

async function getUsers (req, res) {
  const response = await query.getUsers()
  res.send(response)
}

async function login (req, res) {
  const response = await query.login(req.body)
  res.send(response)
}

async function logout (req, res) {
  const response = await query.logout(req.query.sid)
  res.send(response)
}

async function checkAccount (req, res) {
  const response = await query.checkAccount(req.query.sid)
  res.send(response)
}

async function resetPswd (req, res) {
  const response = await query.resetPswd(req.body.email)
  res.send(response)
}

module.exports = {
  createAccount,
  getUsers,
  login,
  logout,
  checkAccount,
  resetPswd
}
