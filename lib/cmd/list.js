'use strict'

const table = require('../util/table')

module.exports = () => {
  table(require('../../templates'))
  process.exit()
}