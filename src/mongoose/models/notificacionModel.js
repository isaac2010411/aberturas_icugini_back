const mongoose = require('mongoose')

const notificationSchema = mongoose.Schema({
  product: {
    type: String,
  },
  limit: {
    type: Number,
  },
  units: {
    type: Number,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  view: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
  },
})

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
