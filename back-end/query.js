require('dotenv').config()
const Pool = require('pg').Pool

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT
})

const getCards = (req,res) => {
  pool.query('SELECT * FROM cards ORDER BY id ASC', (error, result) => {
    if (error) console.log("Error while fetching data")
    res.json(result.rows)
  }
  )
}

const addCard = (req, res) => {
    const { deck,question, answer } = req.body
    pool.query('INSERT INTO cards (deck, question, answer) VALUES ($1,$2,$3) RETURNING id', [deck, question, answer ], (error, result) => {
      if (error) console.log('Error while adding card')
      res.send(result.rows)
    })
  }

  module.exports = {
      addCard,
      getCards
  }