const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'spacerep',
  password: 'nandini123',
  port: 5432
})

const addCard = (req, res) => {
    const { question, answer } = req.body
    pool.query('INSERT INTO cards (question, answer) VALUES ($1,$2) RETURNING id', [ question, answer ], (error, result) => {
    // console.log(result.rows[0])
      if (error) console.log('Error while adding card')
      res.status(201).send(result.rows)
    })
  }

  module.exports = {
      addCard
  }