'use strict'

const asyncHandler = require('express-async-handler')
const { find_brand_list_by_category_id } = require('../../repositories')

// @desc    Get brands by category Id
// @route   GET /api/categories/categoryId
// @access  Public / Admin
const get_brands_by_category_id = asyncHandler(async (req, res) => {
  const { categoryId } = req.params

  const brands = await find_brand_list_by_category_id(categoryId)

  res.status(200).json(brands)
})

module.exports = get_brands_by_category_id
