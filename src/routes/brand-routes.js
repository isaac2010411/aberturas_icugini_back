'use strict'

const express = require('express')
const router = express.Router()

const {
  register_brand,
  get_brands,
  get_brands_by_category_id,
  delete_brand,
  update_brand,
} = require('../controllers/brands')
const { protect } = require('../middleware/authMiddleware')

router.route('/').post(protect, register_brand).get(protect, get_brands)
router.route('/:id').delete(protect, delete_brand).put(protect, update_brand)
router.route('/categories/:categoryId').get(protect, get_brands_by_category_id)

module.exports = router
