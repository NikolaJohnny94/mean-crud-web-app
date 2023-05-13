const express = require('express')
const app = express()
const colors = require('colors')
const path = require('path')
const fs = require('fs')
const jsyaml = require('js-yaml')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const dotenv = require('dotenv').config({
  path: path.resolve('config', '.env'),
})
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const hpp = require('hpp')
const morgan = require('morgan')
const connectDB = require('./config/dbConnect')
const errorHandler = require('./middleware/errorHandler')
const homeRouter = require('./routes/homeRoute')
const userRouter = require('./routes/usersRoute')

//PORT
const PORT = process.env.PORT || 3000

//Swagger Collection
const swaggerCollection = fs.readFileSync(
  path.resolve('config', 'collection.yml'),
  'utf-8'
)

//Swagger Document
const swaggerDocument = jsyaml.load(swaggerCollection)

app.use(express.json()) //Body parser

app.use(cors()) //Use cors (Cross-Origin Resource Sharing)

connectDB() //Connect MongoDB

//Use Morgan id Development Mode
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(mongoSanitize()) //Use Express Mongo Sanitize
app.use(helmet()) //Use Helmet
app.use(xss()) //Use xss-clean
app.use(hpp()) // Use hpp (HTTP Paramater Polution) protection

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument)) //Swagger UI
app.use(homeRouter) //Home Router
app.use('/api/v1/users', userRouter) //Users Router

//Use Error handler
app.use(errorHandler)

//Listen on PORT
app.listen(PORT, (req, res) => {
  console.log(
    `\n${process.env.PROTOCOL}://${process.env.HOST}:${PORT}`.green.inverse
  )
})

//Unandled Rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(
    `Unhandled Rejection:\nName: ${error.name}\nMessage: ${error.message}\n`.red
      .inverse
  )
})
