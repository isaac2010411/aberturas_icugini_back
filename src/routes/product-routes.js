'use strict'

const express = require('express')
const router = express.Router()

const { register_product, get_all_products, delete_product, update_product } = require('../controllers/products')
const { protect } = require('../middleware/authMiddleware')
const { upload } = require('../config/multer/config')
const { FIELDS_IMAGE } = require('../config/multer/fieldsNames')
const { visitMiddleware } = require('../middleware/visitMiddleware')

router
  .route('/')
  .post(protect, upload.fields([{ name: FIELDS_IMAGE }]), register_product)
  .get(visitMiddleware, get_all_products)

router
  .route('/:id')
  .delete(protect, delete_product)
  .put(protect, upload.fields([{ name: FIELDS_IMAGE }]), update_product)

module.exports = router
