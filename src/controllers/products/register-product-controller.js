'use strict'

const asyncHandler = require('express-async-handler')
const { find_category_by_id, find_brand_by_id } = require('../../repositories')
const { FIELDS_IMAGE } = require('../../config/multer/fieldsNames')
const { formatNumToCurrency } = require('../../utils/formatters')
const { new_product } = require('../../repositories/product-repository')

// @desc    Create product
// @route   POST /api/products
// @access  Public / Admin
const register_product = asyncHandler(async (req, res) => {
  const {
    name,
    categoryId,
    brandId,
    publicPrice,
    description,
    height,
    width,
    unitPrice,
    revenue,
    quantity,
    quantityAlert,
    published,
  } = req.body

  const images = req?.files && req?.files[FIELDS_IMAGE] && req?.files[FIELDS_IMAGE][0]

  let product

  const is_category_exist = await find_category_by_id({ _id: categoryId })
  if (!is_category_exist) {
    res.status(400)
    throw new Error('Parametros invalidos.')
  }

  const is_brand_exist = await find_brand_by_id({ _id: brandId })

  if (!is_brand_exist) {
    res.status(400)
    throw new Error('Parametros invalidos.')
  }

  product = await new_product({
    brand: brandId,
    category: categoryId,
    name,
    description,
    quantity: quantity,
    image: images.path,
    publicPrice: formatNumToCurrency(publicPrice),
    unitPrice,
    height,
    width,
    quantityAlert,
    revenue,
    published,
    created: new Date(),
  })

  await product.save()

  product.category = is_category_exist
  product.brand = is_brand_exist

  res.status(200).json(product)
})

module.exports = register_product
