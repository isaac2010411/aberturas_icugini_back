'use strict'

const express = require('express')
const router = express.Router()

const { get_all_notifications, update_notifications } = require('../controllers/notifications')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, get_all_notifications)
router.route('/:id').put(protect, update_notifications)

module.exports = router
