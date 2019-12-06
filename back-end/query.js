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

const getUserDetails = (req, res) => {
  pool.query ('SELECT * FROM signup', (error,result) => {
    if (error) console.log("Error while fetching the user details")
    else res.json(result.rows)
  })
}

const addUserDetails = async (req,res) => {
const {user_name, user_email,pswd} = req.body
const hashedPswd = await bcrypt.hash(pswd,10)
  pool.query ('INSERT INTO signup (user_name, user_email, pswd) VALUES ($1,$2,$3)', [user_name,user_email,hashedPswd], (error,result) => {
    if (error) {
      res.send({error: "Email already exist"})
    } else{
      res.send({success:"Added user details successfully"})
    }
  })
}

const login = (req,res) => {
  const {user_email, pswd} = req.body 
  pool.query('SELECT * FROM signup WHERE user_email=$1',[user_email], async (error,result) => {
    if(error) console.log('error')
    else {
      const val = result.rows
      if(val.length === 0) res.send({res: 'No User with this Email'})
      else {
        if(await bcrypt.compare(pswd, val[0].pswd)) res.send({res: 'pass'})
        else res.send({res: 'Password is incorrect'})
      }
    }   
  })
}

1

 /* cards details */
const getCards = (req,res) => {
  pool.query('SELECT * FROM cards ORDER BY id ASC', (error, result) => {
    if (error) console.log("Error while fetching data")
    else res.json(result.rows)
  })
}

const addCard = (req, res) => {
  const { deck,question, answer } = req.body
  pool.query('INSERT INTO cards (deck, question, answer) VALUES ($1,$2,$3) RETURNING id', [deck, question, answer ], (error, result) => {
    if (error) console.log('Error while adding card')
    else {
       res.send(result.rows)
      }
  })
}

const updateDeckClickTime = (req,res) => {
  const {deck, deckClickTime} = req.body
  pool.query('UPDATE cards SET deckclicktime=$2 WHERE deck=$1',
  [deck,deckClickTime],(error,result) => {
    if(error) throw error
    else res.send('Updated deckclicktime successfully')
  })
}

const updateTimeStamp = (req,res) => {
  const id = req.body.id
  const timeStamp = req.body.timeStamp
  pool.query('UPDATE cards SET timestamp=$1 WHERE id=$2',[timeStamp, id],(error,result) => {
    if(error) console.log('Error while updating timeStamp')
    else res.send('Updated timeStamp successfully')
  })
} 


  module.exports = {
      addCard,
      getCards,
      updateTimeStamp,
      getUserDetails,
      addUserDetails,
      updateDeckClickTime,
      login
  }