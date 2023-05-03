const mongoose = require('mongoose')

const stockSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Product',
  },
  unitPrice: {
    type: String,
    required: true,
  },
  publicPrice: {
    type: String,
  },
  origin: {
    type: Number,
  },
  quantity: {
    type: Number,
    required: true,
  },
  invoiceNumber: {
    type: Number,
  },
  unitOfMeasurement: {
    type: String,
  },
  type: {
    type: String,
    enum: ['initial', 'add', 'substract'],
    default: 'add',
  },
  isCancelled: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
  },
})

const Stock = mongoose.model('Stock', stockSchema)

module.exports = Stock
