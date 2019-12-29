const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

async function getCards (sid) {
  let result1, result2
  try {
    result1 = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Error While fetching email from authentication'
  }
  if (result1.rows.length === 0) {
    return 'Empty result from authentication'
  }
  try {
    result2 = await pool.query('SELECT * FROM cards WHERE email=$1', [result1.rows[0].email])
  } catch {
    return 'Error in fetching cards'
  }
  if (result2.rows.length === 0) {
    return 'Empty cards'
  }
  return result2.rows
}

async function addCard ({ deck, question, answer, status, sid, again, easy, good }) {
  let result1, result2
  try {
    result1 = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Error while fetching email from authentication'
  }
  if (result1.rows.length === 0) {
    return 'Empty result from authentication'
  }

  try {
    result2 = await pool.query('INSERT INTO cards (deck, question, answer, status,email,again, easy, good) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id', [deck, question, answer, status, result1.rows[0].email, again, easy, good])
    return result2.rows
  } catch {
    return 'Error while inserting card'
  }
}

async function updateCard ({ id, deck, question, answer, sid }) {
  let result
  try {
    result = await pool.query('SELECT email FROM authentication WHERE sid=$1', [sid])
  } catch {
    return 'Error while fetching email from authentication'
  }
  if (result.rows.length === 0) {
    return 'Empty result from authentication'
  }
  try {
    await pool.query('UPDATE cards SET deck=$2, question=$3, answer=$4 WHERE id=$1 and email=$5',
      [id, deck, question, answer, result.rows[0].email])
    return 'Updated card successfully'
  } catch {
    return 'Error while updating card'
  }
}

module.exports = {
  getCards,
  addCard,
  updateCard
}
