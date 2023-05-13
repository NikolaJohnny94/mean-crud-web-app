const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
  res.redirect(process.env.USERS_URI)
})

module.exports = router
