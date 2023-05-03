'use strict'

const express = require('express')
const router = express.Router()

const user_routes = require('./user-routes')
const category_routes = require('./category-routes')
const brand_routes = require('./brand-routes')
const product_routes = require('./product-routes')
const quantity_routes = require('./quantity-routes')
const notification_routes = require('./notification-routes')

router.use('/users', user_routes)
router.use('/categories', category_routes)
router.use('/brands', brand_routes)
router.use('/products', product_routes)
router.use('/quantity', quantity_routes)
router.use('/notifications', notification_routes)

module.exports = router
