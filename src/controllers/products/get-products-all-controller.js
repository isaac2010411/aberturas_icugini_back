'use strict'

const asyncHandler = require('express-async-handler')
const { find_all_products, find_all_products_by_category_id } = require('../../repositories/product-repository')

// @desc    Get all products
// @route   GET /api/products
// @access  Public / Admin
const get_all_products = asyncHandler(async (req, res) => {
  const { category } = req.query
  let products

  if (!category) {
    products = await find_all_products()
  } else {
    products = await find_all_products_by_category_id(category)
  }

  res.status(200).json(products)
})

module.exports = get_all_products
