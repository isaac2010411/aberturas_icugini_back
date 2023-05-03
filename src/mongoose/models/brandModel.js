const mongoose = require('mongoose')

const brandSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: 'Category',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const Brand = mongoose.model('Brand', brandSchema)

module.exports = Brand
