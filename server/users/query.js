const Pool = require('pg').Pool
const bcrypt = require('bcrypt')
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

async function createAccount ({ user_name: name, user_email: mail, pswd }) {
  if (!name || !mail || !pswd) {
    return { error: 'Please Enter the details' }
  }
  if (!/^[a-z0-9A-Z ]+$/.test(name)) {
    return { error: 'User Name is Invalid' }
  }
  if (!/\S+@\S+\.\S+/.test(mail)) {
    return { error: 'Email address is invalid' }
  }
  const hashedPswd = await bcrypt.hash(pswd, 10)
  try {
    await pool.query('INSERT INTO signup (user_name, user_email, pswd) VALUES ($1,$2,$3)', [name, mail, hashedPswd])
    return { success: 'Added user details successfully' }
  } catch {
    return { error: 'Email already exist' }
  }
}

async function getUsers () {
  try {
    const result = await pool.query('SELECT * FROM signup')
    return result.rows
  } catch {
    return 'Error while fething the sign up details'
  }
}

async function login ({ user_email: mail, pswd }) {
  let result
  try {
    result = await pool.query('SELECT * FROM signup WHERE user_email=$1', [mail])
  } catch (e) {
    return { res: 'unable to fetch user details' }
  }

  if (result.rows.length === 0) {
    return { res: 'No User with this Email' }
  }

  if (!(await bcrypt.compare(pswd, result.rows[0].pswd))) {
    return { res: 'Password is incorrect' }
  }

  const sessionObj = {
    action: true,
    sid: mail + Math.random()
  }

  try {
    await pool.query('INSERT INTO authentication(email,action,sid) VALUES ($1,$2,$3)', [mail, sessionObj.action, sessionObj.sid])
    return {
      sid: sessionObj.sid,
      msg: 'pass'
    }
  } catch {
    return { res: 'Unable to add session id' }
  }
}

async function logout (sid) {
  try {
    const response = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
    const email = response.rows[0].email
    await pool.query('UPDATE authentication SET action=false WHERE email=$1', [email])
    return ('Logged out succesfully ')
  } catch { return ('Unable to update the authentication') }
}

async function checkAccount (sid) {
  let result
  try {
    const response = await pool.query('SELECT email, action FROM authentication WHERE sid=$1', [sid])
    result = response.rows
  } catch {
    return 'error in fetching from authentication'
  }
  if (result.length === 0) {
    return { fail: 'Empty result' }
  }
  if (result[0].action === 'false') {
    return { fail: 'User has to login' }
  }
  try {
    const value = await pool.query('SELECT * FROM signup WHERE user_email=$1', [result[0].email])
    return { user: value.rows[0].user_name }
  } catch {
    return 'Failed to fetch authenticated user from signup'
  }
}

module.exports = {
  createAccount,
  getUsers,
  login,
  logout,
  checkAccount
}
