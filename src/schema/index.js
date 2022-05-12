const { readFileSync } = require('fs')

// const schema = readFileSync(require.resolve('./schema.graphql')).toString('utf-8')
const schema = require('./schema.js')

module.exports = schema