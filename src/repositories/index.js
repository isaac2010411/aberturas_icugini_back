const { find_one_user_by_criterial, new_user, find_users_by_admin } = require('./user-repository')
const { new_log } = require('./log-repository')
const {
  new_category,
  find_category_by_name,
  find_category_list,
  find_category_by_id,
  destroy_category,
} = require('./category-reposiroty')
const {
  new_brand,
  find_brand_by_name,
  find_brand_list,
  find_brand_list_by_category_id,
  find_brand_by_id,
  destroy_brand,
  destroy_brands_by_category,
} = require('./brand-repository')
const {
  new_product,
  find_all_products,
  find_all_products_by_category_id,
  destroy_products_by_brand,
  destroy_products_by_category,
} = require('./product-repository')

module.exports = {
  //User
  new_user,
  find_one_user_by_criterial,
  find_users_by_admin,
  //Log
  new_log,
  //Category
  new_category,
  find_category_by_name,
  find_category_list,
  find_category_by_id,
  destroy_category,
  //brand
  new_brand,
  find_brand_by_name,
  find_brand_list,
  find_brand_list_by_category_id,
  find_brand_by_id,
  destroy_brand,
  destroy_brands_by_category,

  new_product,
  find_all_products,
  find_all_products_by_category_id,
  destroy_products_by_brand,
  destroy_products_by_category,
}
