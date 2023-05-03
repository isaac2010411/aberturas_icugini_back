'use strict'

const asyncHandler = require('express-async-handler')
const Notification = require('../../mongoose/models/notificacionModel')

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public / Admin
const get_all_notifications = asyncHandler(async (req, res) => {
  let notifications = await Notification.find().sort({ date: 'desc' })

  res.status(200).json(notifications)
})

module.exports = get_all_notifications
