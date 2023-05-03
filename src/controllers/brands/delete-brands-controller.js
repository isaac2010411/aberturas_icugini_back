'use strict'

const asyncHandler = require('express-async-handler')
const { destroy_brand, destroy_products_by_brand } = require('../../repositories')

// @desc    Delete brands
// @route   DELETE /api/brands/:id
// @access  Public / Admin
const delete_brand = asyncHandler(async (req, res) => {
  const { id } = req.params

  await destroy_brand(id)
  await destroy_products_by_brand(id)

  res.status(200).json({ _id: id })
})

module.exports = delete_brand
