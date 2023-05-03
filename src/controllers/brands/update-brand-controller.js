'use strict'

const asyncHandler = require('express-async-handler')
const { find_category_by_id, new_log } = require('../../repositories')
const { update_brand_by_id, find_brand_by_id } = require('../../repositories/brand-repository')

// @desc    Update brand
// @route   PUT /api/brands/:id
// @access  Public / Admin
const update_brand = asyncHandler(async (req, res) => {
  const { name, categoryId } = req.body
  const { id: brandId } = req.params
  const { _id } = req.user

  let brand
  try {
    const category = await find_category_by_id({ _id: categoryId })

    const is_brand_exist = await find_brand_by_id({ _id: brandId })

    brand = await update_brand_by_id(brandId, name, categoryId)

    if (!brand.modifiedCount > 1) {
      await new_log({
        type: 'action',
        description: 'UPDATE_BRAND_ERROR',
        record: _id,
      })
      res.status(400)

      throw new Error('Error al registrar la marca.')
    } else {
      await new_log({
        type: 'action',
        description: 'UPDATE_BRAND_SUCCESS',
        record: brand._id,
      })
      res.status(200).json({ category, brand: { _id: brandId, name, createdAt: is_brand_exist.createdAt } })
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = update_brand
