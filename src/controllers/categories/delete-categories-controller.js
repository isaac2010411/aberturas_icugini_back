'use strict'

const asyncHandler = require('express-async-handler')
const {
  find_brand_list_by_category_id,
  destroy_products_by_category,
  destroy_category,
  destroy_brands_by_category,
} = require('../../repositories')

// @desc    Delete categories and theirs brands y products
// @route   DELETE /api/categories/:id
// @access  Public / Admin
const delete_categories = asyncHandler(async (req, res) => {
  const { id } = req.params

  await destroy_category(id)
  await destroy_brands_by_category(id)
  await destroy_products_by_category(id)

  res.status(200).json({ _id: id })
})

module.exports = delete_categories
