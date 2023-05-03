'use strict'

const mongoose = require('mongoose')
const Brand = require('../mongoose/models/brandModel')
const Product = require('../mongoose/models/productModel')
const ObjectId = mongoose.Types.ObjectId
/**
 * @param { String } id
 * @returns brand object
 */
async function find_brand_by_id(id) {
  return Brand.findOne(id)
}
/**
 * @param { String } name
 * @returns bramd object
 */
async function find_brand_by_name(name) {
  return Brand.findOne(name)
}
/**
 * @param { String } CategoryId
 * @returns brand list by category id
 */
async function find_brand_list_by_category_id(category) {
  return Brand.aggregate([
    {
      $match: { category: ObjectId(category), isDeleted: false },
    },
  ])
}
/**
 * @returns brand List
 */
async function find_brand_list() {
  return Brand.aggregate([
    {
      $lookup: {
        from: 'categories',
        localField: 'category',
        foreignField: '_id',
        as: 'category',
      },
    },
    {
      $unwind: '$category',
    },
    {
      $match: { isDeleted: false },
    },
  ])
}
/**
 * @param { Object } params
 * @returns brand object created
 */
async function new_brand(params) {
  return new Brand(params)
}

/**
 * @param { string } _id
 * @returns brand delete Brand
 */
async function destroy_brand(_id) {
  return Brand.deleteOne({ _id  })
}

/**
 * @param { string } _id
 * @returns brand delete Brand
 */
async function destroy_brands_by_category(_id) {
  return Brand.deleteMany({ category: _id })
}

/**
 * @param { string } _id
 * @returns brand update
 */
async function update_brand_by_id(_id, name, category) {
  return Brand.updateOne({ _id }, { $set: { name, category } })
}

module.exports = {
  find_brand_by_id,
  find_brand_by_name,
  find_brand_list_by_category_id,
  find_brand_list,
  new_brand,
  destroy_brand,
  destroy_brands_by_category,
  update_brand_by_id,
}
