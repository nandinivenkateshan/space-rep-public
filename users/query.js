const pool = require('../dbLog')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

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
  if (!mail || !pswd) {
    return { error: 'Please Enter the details' }
  }

  if (!/\S+@\S+\.\S+/.test(mail)) {
    return { error: 'Email address is invalid' }
  }

  try {
    result = await pool.query('SELECT * FROM signup WHERE user_email=$1', [mail])
  } catch (e) {
    return 'unable to fetch user details'
  }
  if (result.rows.length === 0) {
    return { res: 'No User with this Email' }
  }

  if (!(await bcrypt.compare(pswd, result.rows[0].pswd))) {
    return { res: 'Password is incorrect' }
  }

  const sessionObj = {
    active: true,
    sid: mail + Math.random(),
    name: result.rows[0].user_name
  }

  try {
    await pool.query('INSERT INTO authentication(email,active,sid) VALUES ($1,$2,$3)',
      [mail, sessionObj.active, sessionObj.sid])
    return {
      ...sessionObj
    }
  } catch {
    return 'Unable to add session id'
  }
}

async function logout (sid) {
  let result1
  try {
    result1 = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Unable to fetch'
  }
  if (result1.rows.length === 0) return 'Empty result'
  try {
    await pool.query('UPDATE authentication SET active=false WHERE email=$1', [result1.rows[0].email])
    return { active: false, sid: sid }
  } catch {
    return 'Unable to update'
  }
}

async function checkAccount (sid) {
  let result
  try {
    const response = await pool.query('SELECT email, active FROM authentication WHERE sid=$1', [sid])
    result = response.rows
  } catch {
    return 'error in fetching from authentication'
  }
  if (result.length === 0) {
    return { fail: 'Empty result' }
  }
  try {
    const value = await pool.query('SELECT * FROM signup WHERE user_email=$1', [result[0].email])
    return { user: value.rows[0].user_name }
  } catch {
    return 'Failed to fetch authenticated user from signup'
  }
}

async function resetPswd (email) {
  let result
  if (!email) {
    return { res: 'Please Enter the details' }
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    return { res: 'Email address is invalid' }
  }

  try {
    result = await pool.query('SELECT * FROM signup WHERE user_email=$1', [email])
  } catch (e) {
    return { res: 'unable to fetch user details' }
  }
  if (result.rows.length === 0) {
    return { res: 'No User with this Email' }
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  })

  const mailOptions = {
    from: '',
    to: 'nandinivenkatesan809@gmail.com',
    subject: 'Link to reset password',
    text:
    `Someone has requested that your password be reset. 
     If this was you, please click the link below to reset your password.
     If this was not you, someone may have accidentally typed the wrong email address, 
     and it is safe to ignore this email.

     http://localhost:1234/resetPswd

     If you did not request this, please ignore this email and your password will remain unchanged.
    `
  }

  try {
    const result = await transporter.sendMail(mailOptions)
    return {res: 'Email sent'}
  } catch {
    return { res: 'Error while sending email' }
  }
}

module.exports = {
  createAccount,
  getUsers,
  login,
  logout,
  checkAccount,
  resetPswd
}
