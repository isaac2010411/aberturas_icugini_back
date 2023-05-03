'use strict'

const express = require('express')
const router = express.Router()

const { update_product_quantity } = require('../controllers/quantity')
const { protect } = require('../middleware/authMiddleware')

router.route('/').put(protect, update_product_quantity)

module.exports = router
