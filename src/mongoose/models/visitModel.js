const mongoose = require('mongoose')

const visitSchema = mongoose.Schema(
  {
    date: {
      type: Date,
      required: true,
    },
    quantity: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Visit = mongoose.model('Visit', visitSchema)

module.exports = Visit
