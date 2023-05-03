'use strict'

const asyncHandler = require('express-async-handler')
const { find_category_by_name, new_log } = require('../../repositories')
const { update_category_name, find_category_by_id } = require('../../repositories/category-reposiroty')

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Public / Admin
const update_category = asyncHandler(async (req, res) => {
  const { name } = req.body
  const { _id } = req.user
  let category

  const is_category_name_exist = await find_category_by_name(req.body)

  if (is_category_name_exist) {
    res.status(400)
    throw new Error('Ya existe una categoria con este nombre.')
  }
  const is_category_exist = await find_category_by_id({ _id: req.params.id })

  category = await update_category_name(req.params.id, name)

  if (!category.modifiedCount > 1) {
    await new_log({
      type: 'action',
      description: 'REGISTER_CATEGORY_ERROR',
      record: _id,
    })
    res.status(400)

    throw new Error('Error al registrar la categoria.')
  } else {
    await new_log({
      type: 'action',
      description: 'REGISTER_CATEGORY_SUCCESS',
      record: category._id,
    })

    res.status(200).json({ name, _id: req.params.id, createdAt: is_category_exist.createdAt })
  }
})

module.exports = update_category
