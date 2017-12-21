'use strict'

const merge = require('webpack-merge')
const baseEnv = require('./base.env')

module.exports = {
  ...baseEnv,
  NODE_ENV: '"production"',
  API_SERVER_URL: '"http://92.243.6.13:8000/api/"'
}
