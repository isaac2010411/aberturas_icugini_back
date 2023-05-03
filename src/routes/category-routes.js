'use strict'

const express = require('express')
const router = express.Router()

const { register_category, get_categories, delete_categories, update_category } = require('../controllers/categories')
const { protect, forAdmin } = require('../middleware/authMiddleware')

router.route('/').post(protect, register_category).get(get_categories)
router.route('/:id').delete(protect, delete_categories).put(protect, update_category)

module.exports = router
