const mongoose = require('mongoose')

const salePiontSchema = mongoose.Schema(
  {
    created: {
      type: Date,
    },
    
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

const SalePoint = mongoose.model('SalePoint', salePiontSchema)

module.exports = SalePoint
