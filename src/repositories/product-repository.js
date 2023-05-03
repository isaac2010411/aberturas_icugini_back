'use strict'

const mongoose = require('mongoose')
const Category = require('../mongoose/models/categoryModel')
const ObjectId = mongoose.Types.ObjectId
const Product = require('../mongoose/models/productModel')
const Brand = require('../mongoose/models/brandModel')

/**
 * @param { Object } params
 * @returns product object created
 */
async function new_product(params) {
  const product = new Product(params)
  return await product.save()
}

/**
 * @returns all products list
 */
async function find_all_products() {
  const products = await Product.aggregate([
    {
      $match: { isDeleted: false },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brand',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $unwind: '$brand',
    },
  ])

  const categories = await Category.find()
  const brands = await Brand.find()

  return { products, categories, brands }
}

/**
 * @returns all products list
 */
async function find_products_by_products_ids(products_ids) {
  return await Product.aggregate([
    {
      $match: {
        _id: { $in: products_ids.map((item) => ObjectId(item._id)) },
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brand',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $unwind: '$brand',
    },
  ])
}

/**
 * @returns all products list by category id
 */
async function find_all_products_by_category_id(categoryId) {
  return Product.aggregate([
    {
      $match: {
        category: ObjectId(categoryId),
        isDeleted: false,
      },
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $lookup: {
        from: 'brands',
        localField: 'brand',
        foreignField: '_id',
        as: 'brand',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $unwind: '$brand',
    },
  ])
}

/**
 * @param { string } _id
 * @returns brand delete Brand
 */
async function destroy_products_by_brand(_id) {
  return Product.updateMany({ brand: _id }, { $set: { isDeleted: true } }, { multi: true })
}

/**
 * @param { string } _id
 * @returns delete products from brands id list
 */
async function destroy_products_by_category(_id) {
  return Product.deleteMany({ category: _id })
}
/**
 * @param { string } _id
 * @returns delete logic of product by id
 */
async function destroy_product_by_id(_id) {
  return Product.updateOne({ _id }, { $set: { isDeleted: true } })
}

/**
 * @param { string } _id
 * @returns delete logic of product by id
 */
async function update_product_by_id(
  _id,
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
) {
  if (images) {
    image = images.path
  }
  return Product.updateOne(
    { _id },
    {
      $set: {
        name,
        categoryId,
        brandId,
        description,
        published,
        height,
        width,
        revenue,
        quantity,
        quantityAlert,
        unitPrice,
        image,
      },
    }
  )
}

module.exports = {
  new_product,
  find_all_products,
  find_all_products_by_category_id,
  destroy_products_by_brand,
  destroy_products_by_category,
  destroy_product_by_id,
  update_product_by_id,
  find_products_by_products_ids,
}
