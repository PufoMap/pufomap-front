'use strict'

const baseEnv = require('./base.env')

module.exports = {
  ...baseEnv,
  NODE_ENV: '"production"',
  API_SERVER_URL: '"http://magufomap.com:8000/api/"'
}
