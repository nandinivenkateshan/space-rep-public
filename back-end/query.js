require('dotenv').config()
const bcrypt = require('bcrypt')
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

/* User Details */

const getUserDetails = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM signup')
    res.json(result.rows)
  } catch (error) {
    console.log('Error while fething the sign up details')
  }
}

const addUserDetails = async (req, res) => {
  const { user_name: name, user_email: mail, pswd } = req.body
  const hashedPswd = await bcrypt.hash(pswd, 10)
  try {
    await pool.query('INSERT INTO signup (user_name, user_email, pswd) VALUES ($1,$2,$3)', [name, mail, hashedPswd])
    res.send({ success: 'Added user details successfully' })
  } catch (error) {
    res.send({ error: 'Email already exist' })
  }
}

const login = async (req, res) => {
  const { user_email: mail, pswd } = req.body
  try {
    const result = await pool.query('SELECT * FROM signup WHERE user_email=$1', [mail])
    const val = result.rows
    if (val.length === 0) res.send({ res: 'No User with this Email' })
    else {
      if (await bcrypt.compare(pswd, val[0].pswd)) {
        const obj = {
          action: true,
          sid: mail + Math.random()
        }
        const result = await addToAuthenticatonTable([mail, obj.action, obj.sid])
        if (result) res.send(result)
      } else {
        res.send({ res: 'Password is incorrect' })
      }
    }
  } catch (e) {
    console.log('unable to fetch login details')
  }
}

const addToAuthenticatonTable = async data => {
  const [email, , sid] = data
  try {
    await pool.query('INSERT INTO authentication(email,action,sid) VALUES ($1,$2,$3)', data)
    return ({
      userMail: email,
      sid: sid,
      msg: 'pass'
    })
  } catch (e) {
    console.log('error in authentication')
  }
}

/* cards details */
const getCards = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM cards ORDER BY id ASC')
    res.json(result.rows)
  } catch (e) {
    console.log('Error while fetching data')
  }
}

const addCard = async (req, res) => {
  const { deck, question, answer } = req.body
  try {
    const result = await pool.query('INSERT INTO cards (deck, question, answer) VALUES ($1,$2,$3) RETURNING id', [deck, question, answer])
    res.send(result.rows)
  } catch (e) {
    console.log('Error while adding card')
  }
}

const deckNames = async (req, res) => {
  try {
    const result = await pool.query('SELECT DISTINCT ON(deck) deck, id FROM cards')
    res.send(result.rows)
  } catch (e) {
    console.log('error while fetching decknames')
  }
}

const updateDeckClickTime = async (req, res) => {
  const { deck, deckClickTime } = req.body
  try {
    await pool.query('UPDATE cards SET deckclicktime=$2 WHERE deck=$1',
      [deck, deckClickTime])
    res.send('Updated deckclicktime successfully')
  } catch (e) {
    console.log('Error in updating deck click time')
  }
}

const updateTimeStamp = async (req, res) => {
  const id = req.body.id
  const timeStamp = req.body.timeStamp
  try {
    await pool.query('UPDATE cards SET timestamp=$1 WHERE id=$2', [timeStamp, id])
    res.send('Updated timeStamp successfully')
  } catch (e) {
    console.log('Error while updating timeStamp')
  }
}

const modifyDeckName = async (req, res) => {
  const { reName, deckName } = req.body
  try {
    await pool.query('UPDATE cards SET deck=$1 WHERE deck=$2', [reName, deckName])
    res.send('Updated deckname successfully')
  } catch (e) {
    console.log('Error while modifying deckname')
  }
}

const deleteDeck = async (req, res) => {
  const { deckName } = req.body
  try {
    await pool.query('DELETE FROM cards WHERE deck=$1', [deckName])
    res.send('Deleted deck successfully')
  } catch (e) {
    console.log('Error in deleting deck')
  }
}

const updateCard = async (req, res) => {
  const { id, deck, question, answer } = req.body
  try {
    await pool.query('UPDATE cards SET deck=$2, question=$3, answer=$4 WHERE id=$1',
      [id, deck, question, answer])
    res.send('Updated card successfully')
  } catch (e) {
    console.log('Error while updating card')
  }
}

module.exports = {
  addCard,
  getCards,
  updateTimeStamp,
  getUserDetails,
  addUserDetails,
  updateDeckClickTime,
  login,
  modifyDeckName,
  deleteDeck,
  updateCard,
  deckNames
}
