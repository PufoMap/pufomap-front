'use strict'

const merge = require('webpack-merge')
const baseEnv = require('./base.env')

module.exports = merge(baseEnv, {
  NODE_ENV: '"development"',
  API_SERVER_URL: '"http://localhost:8000/api/"'
})
