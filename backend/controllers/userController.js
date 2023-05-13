const userModel = require('../models/User.js')
const asyncHandler = require('express-async-handler')

//Get All Users
exports.getUsers = asyncHandler(async (req, res, next) => {
  try {
    const users = await userModel.find()
    if (users) {
      res.status(200).json({
        success: true,
        data:
          users.length != 0
            ? users
            : { message: 'There are no users found in the DB!' },
      })
    }
  } catch (error) {
    next(error)
  }
})

// Get User By ID
exports.getUserById = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (user) {
      res.status(200).json({
        success: true,
        data: user,
      })
    }
  } catch (error) {
    next(error)
  }
})

//Create New User
exports.createUser = asyncHandler(async (req, res, next) => {
  try {
    const newUser = await userModel.create(req.body)
    if (newUser) {
      res.status(201).json({
        success: true,
        message: 'User successfully created!',
        data: newUser,
      })
    }
  } catch (error) {
    next(error)
  }
})

//Update Existing User
exports.updateUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
    if (user) {
      res.status(200).json({
        success: true,
        message: 'User successfully updated!',
        data: user,
      })
    }
  } catch (error) {
    next(error)
  }
})

//Delete Existing User
exports.deleteUser = asyncHandler(async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id)
    if (user) {
      user.remove()
      res.status(200).json({
        success: true,
        message: `User with the email: ${user.email} was successfully deleted!`,
        data: user,
      })
    }
  } catch (error) {
    next(errorHandler)
  }
})
