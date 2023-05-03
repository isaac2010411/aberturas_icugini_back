'use strict'

const asyncHandler = require('express-async-handler')
const userRepository = require('../../repositories')

// @desc    GET all users
// @route   GET /api/users
// @access  Private/Admin
const get_users = asyncHandler(async (req, res) => {
  const users = await userRepository.find_users_by_admin()

  if (users.length < 1) {
    res.status(404)
    throw new Error('No se encontraron usuarios en la base de datos.')
  }

  res.status(200).json(users)
})

module.exports = get_users
