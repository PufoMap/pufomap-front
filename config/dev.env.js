'use strict'

const baseEnv = require('./base.env')

module.exports = {
  ...baseEnv,
  NODE_ENV: '"development"',
  API_SERVER_URL: '"http://localhost:8000/api/"'
}
