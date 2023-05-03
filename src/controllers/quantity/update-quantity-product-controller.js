'use strict'

const asyncHandler = require('express-async-handler')
const Product = require('../../mongoose/models/productModel')
const Notification = require('../../mongoose/models/notificacionModel')
// @desc    Update product
// @route   PUT /api/quantity
// @access  Public / Admin
const update_quantity_product = asyncHandler(async (req, res) => {
  let count = 0
  const socket = req.app.get('io')

  while (count < req.body.length) {
    const product = await Product.findById(req.body[count]._id)

    if (product.quantity - req.body[count].quantity <= product.quantityAlert) {
      let not = new Notification({
        product: product.name,
        date: new Date(),
        limit: product.quantityAlert,
        units: product.quantity - req.body[count].quantity,
      })

      await not.save()
    }
    await Product.updateOne(
      { _id: req.body[count]._id },
      { $set: { quantity: product.quantity - req.body[count].quantity } }
    )
    count = count + 1
  }

  if (count > 0) {
    socket.in('admin').emit('new-substract', count)
  }

  res.status(200).json(req.body)
})

module.exports = update_quantity_product
