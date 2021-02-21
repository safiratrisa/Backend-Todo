require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = process.env.PORT
const cors = require('cors')
const routerUsers = require('./src/routers/users')
const routerLabels = require('./src/routers/labels')
const routerTodos = require('./src/routers/todos')
const bodyParser = require('body-parser')
const helpers = require('./src/helpers/helpers')

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
app.use(morgan('dev'))

app.use('/users', routerUsers)
app.use('/labels', routerLabels)
app.use('/todos', routerTodos)

app.use((err, req, res, next) => {
  helpers.response(res, null, err.status, { message: err.message })
})

app.use('*', (req, res) => {
  helpers.response(res, null, 404, { message: 'URL not Found!' })
})

app.listen(PORT, () => console.log(`server is running port ${PORT}`))
