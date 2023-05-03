const get_brands_by_category_id = require('./get-brands-by-category-controller')
const update_brand = require('./update-brand-controller')
const get_brands = require('./get-brands-controller')
const register_brand = require('./register-brand-controller')
const delete_brand = require('./delete-brands-controller')

module.exports = {
  get_brands_by_category_id,
  get_brands,
  update_brand,
  register_brand,
  delete_brand,
}
