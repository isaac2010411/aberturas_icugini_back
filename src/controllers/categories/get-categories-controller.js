'use strict'

const asyncHandler = require('express-async-handler')
const { find_category_list } = require('../../repositories')

// @desc    Get categories
// @route   GET /api/categories
// @access  Public / Admin
const get_categories = asyncHandler(async (req, res) => {
  let category = await find_category_list()

  res.status(200).json(category)
})

module.exports = get_categories
