'use strict'

const asyncHandler = require('express-async-handler')
const { find_category_by_id, find_brand_by_id } = require('../../repositories')
const { FIELDS_IMAGE } = require('../../config/multer/fieldsNames')
const { update_product_by_id } = require('../../repositories/product-repository')
const Product = require('../../mongoose/models/productModel')

// @desc    Update product
// @route   PUT /api/products/productId
// @access  Public / Admin
const update_product = asyncHandler(async (req, res) => {
  const { id } = req.params

  const {
    name,
    categoryId,
    brandId,
    description,
    height,
    width,
    unitPrice,
    revenue,
    quantity,
    quantityAlert,
    published,
    image,
  } = req.body

  const images = req?.files && req?.files[FIELDS_IMAGE] && req?.files[FIELDS_IMAGE][0]

  let product = {}

  const existProduct = await Product.findById({ _id: id })

  if (!existProduct) {
    res.status(404)
    throw new Error('No se encontro el producto.')
  }

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

  await update_product_by_id(
    id,
    name,
    categoryId,
    brandId,
    description,
    published,
    images,
    height,
    width,
    revenue,
    quantity,
    quantityAlert,
    unitPrice,
    image
  )

  product._id = id
  product.name = name
  product.categoryId = categoryId
  product.brandId = brandId
  product.unitPrice = unitPrice
  product.quantity = Number(quantity)
  product.description = description
  product.published = published
  product.image = images ? images.path : image
  product.category = is_category_exist
  product.brand = is_brand_exist
  product.height = height
  product.width = width
  product.revenue = revenue
  product.quantityAlert = quantityAlert

  res.status(200).json(product)
})

module.exports = update_product
