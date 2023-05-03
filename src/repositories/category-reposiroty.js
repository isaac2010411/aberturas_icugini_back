'use strict'

const Category = require('../mongoose/models/categoryModel')

/**
 * @param { Object } params
 * @returns Category object created
 */
async function new_category(params) {
  return new Category(params)
}
/**
 * @param { String } name
 * @returns Category object
 */
async function find_category_by_name(name) {
  return Category.findOne(name)
}
/**
 * @param { String } id
 * @returns Category object
 */
async function find_category_by_id(id) {
  return Category.findOne(id)
}
/**
 * @returns Category List
 */
async function find_category_list() {
  return Category.find({ isDeleted: false })
}
/**
 * @returns Category Destroy
 */
async function destroy_category(_id) {
  return Category.deleteOne({ _id })
}
/**
 * @returns Category Update name
 */
async function update_category_name(_id, name) {
  return Category.updateOne({ _id }, { $set: { name } })
}

module.exports = {
  new_category,
  find_category_by_name,
  find_category_list,
  find_category_by_id,
  destroy_category,
  update_category_name,
}
