'use strict'

const asyncHandler = require('express-async-handler')
const { new_brand, find_brand_by_name, new_log, find_category_by_id } = require('../../repositories')

// @desc    Create brand
// @route   POST /api/brands
// @access  Public / Admin
const register_brand = asyncHandler(async (req, res) => {
  const { name, categoryId } = req.body
  const { _id } = req.user

  let brand

  const category = await find_category_by_id({ _id: categoryId })

  const is_brand_exist = await find_brand_by_name(req.body)

  if (is_brand_exist) {
    res.status(400)
    throw new Error('Ya existe una marca con este nombre.')
  }

  brand = await new_brand({ name, category: categoryId })

  await brand.save()
  if (!brand) {
    await new_log({
      type: 'action',
      description: 'REGISTER_BRAND_ERROR',
      record: _id,
    })
    res.status(400)

    throw new Error('Error al registrar la marca.')
  }

  await new_log({
    type: 'action',
    description: 'REGISTER_BRAND_SUCCESS',
    record: brand._id,
  })

  res.status(200).json({ category, brand })
})

module.exports = register_brand
