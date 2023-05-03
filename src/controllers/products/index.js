const register_product = require('./register-product-controller')
const get_all_products = require('./get-products-all-controller')
const delete_product = require('./delete-product-controller')
const update_product = require('./update-product-controller')

module.exports = {
  register_product,
  get_all_products,
  update_product,
  delete_product,

}
