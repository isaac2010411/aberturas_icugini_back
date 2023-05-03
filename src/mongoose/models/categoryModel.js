const mongoose = require('mongoose')

const categorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

const Category = mongoose.model('Category', categorySchema)

module.exports = Category
