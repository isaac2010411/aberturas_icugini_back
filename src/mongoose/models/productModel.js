const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Brand',
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Category',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    default: '/public/assets/img/avatars/avatar.jpg',
  },
  publicPrice: {
    type: String,
    required: true,
  },
  height: {
    type: String,
  },
  width: {
    type: String,
  },
  unitPrice: {
    type: String,
    required: true,
  },
  revenue: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  quantityAlert: {
    type: Number,
  },
  published: {
    type: Boolean,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
  },
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product
