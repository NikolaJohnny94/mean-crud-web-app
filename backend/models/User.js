const mongoose = require('mongoose')
const slugify = require('slugify')

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
    },
    country: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
)

userSchema.pre('save', function (next) {
  this.slug = slugify(
    `${this.firstname} ${this.lastname} ${Math.round(Math.random() * 1e16)}`,
    { lower: true }
  )
  next()
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
