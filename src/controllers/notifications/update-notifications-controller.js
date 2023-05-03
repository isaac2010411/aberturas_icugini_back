'use strict'

const asyncHandler = require('express-async-handler')
const Notification = require('../../mongoose/models/notificacionModel')

// @desc    Put all notifications
// @route   PUT /api/notifications
// @access  Public / Admin
const update_notifications = asyncHandler(async (req, res) => {
  const notifId = req.params.id

  let notifications = await Notification.findById(notifId)

  if (!notifications) {
    res.status(404)
    throw new Error('No existe la notificacion.')
  }

  await Notification.updateOne({_id: notifId }, { $set: { view: true } })

  res.status(200).json(notifId)
})

module.exports = update_notifications
