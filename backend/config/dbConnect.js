const mongoose = require('mongoose')
const colors = require('colors')

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  console.log('\nConnected to MongoDB'.yellow.inverse + '\n')
}

module.exports = connectDB
