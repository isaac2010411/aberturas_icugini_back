'use strict'

const asyncHandler = require('express-async-handler')
const { new_category, find_category_by_name, new_log } = require('../../repositories')

// @desc    Create category
// @route   POST /api/categories
// @access  Public / Admin
const register_category = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { _id } = req.user
  let log
  let category

  const is_category_exist = await find_category_by_name(req.body)

  if (is_category_exist) {
    res.status(400)
    throw new Error('Ya existe una categoria con este nombre.')
  }

  category = await new_category({ name })

  await category.save()
  if (!category) {

    await new_log({
      type: 'action',
      description: 'REGISTER_CATEGORY_ERROR',
      record: _id,
    })

    res.status(400)
    throw new Error('Error al registrar la categoria.')
  }

  await new_log({
    type: 'action',
    description: 'REGISTER_CATEGORY_SUCCESS',
    record: category._id,
  })

  res.status(200).json(category)
})

module.exports = register_category
