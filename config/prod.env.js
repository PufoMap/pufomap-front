'use strict'

const merge = require('webpack-merge')
const baseEnv = require('./base.env')

module.exports = {
  ...baseEnv,
  NODE_ENV: '"production"'
}
