'use strict'

const asyncHandler = require('express-async-handler')
const { find_brand_list } = require('../../repositories')

// @desc    Get categories
// @route   GET /api/brands
// @access  Public / Admin
const get_brands = asyncHandler(async (req, res) => {
  let brands = await find_brand_list()

  res.status(200).json(brands)
})

module.exports = get_brands
