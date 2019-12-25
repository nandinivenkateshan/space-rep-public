require('dotenv').config({ path: '../.env' })
const app = require('../app')
const port = process.env.PORT || 8080

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.listen(port, () => console.log(`Server running on the port ${port}`))
