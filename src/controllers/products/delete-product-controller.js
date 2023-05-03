'use strict'

const asyncHandler = require('express-async-handler')
const { destroy_product_by_id } = require('../../repositories/product-repository')

// @desc    Delete Product
// @route   DELETE /api/products/:id
// @access  Public / Admin
const delete_product = asyncHandler(async (req, res) => {
  const { id } = req.params

  await destroy_product_by_id(id)

  res.status(200).json({ _id: id })
})

module.exports = delete_product
