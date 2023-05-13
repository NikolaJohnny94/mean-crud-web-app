const colors = require('colors')

const errorHandler = (err, req, res, next) => {
  let customError = { ...err }

  if (err.name === 'CastError') {
    customError.message = `User with the id: ${err.value} was not found in the DataBase!`
    customError.statusCode = 404
  }

  if (err.code === 11000) {
    customError.message = 'Duplicate field value!'
    customError.statusCode = 400
  }

  if (err.name === 'ValidationError') {
    customError.message = Object.values(err.errors).map((er) => er.message)
    customError.statusCode = 400
  }

  console.log(
    `${customError.name}:\nMessage: ${customError.message}\nStatus: ${customError.statusCode}\n`
      .red.bold
  )

  res.status(customError.statusCode || 500).json({
    success: false,
    error: customError || 'Server Error',
  })
}

module.exports = errorHandler
