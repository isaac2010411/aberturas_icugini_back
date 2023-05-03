'use strict'

const axios = require('axios')
require('dotenv').config()

/**
 * Service to interact with external APIs
 * @param {String} url
 * @param {String} method
 * @param {Object} dataToSend
 * @returns
 */
const serviceRequest = async (url, method, dataToSend) => {
  let response
  const requestHeaders = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.MP_SECRET_TOKEN}`,
    },
  }
  try {
    if (method === 'get' || method === 'delete') {
      response = await axios[method](url, requestHeaders)
    } else {
      response = await axios[method](url, dataToSend, requestHeaders)
    }

    return response
  } catch (error) {
    return error.response
  }
}

module.exports = serviceRequest
