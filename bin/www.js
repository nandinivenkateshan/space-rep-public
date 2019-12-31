require('dotenv').config({ path: '.env' })

const port = process.env.PORT || 8080
const app = require('../app')

app.listen(port, () => console.log(`Server running on the port ${port}`))
