/* eslint no-console: 0 */
const { ENV } = require('./config')

const app = require('./app')

console.log(`Started at port: ${ENV.APP_PORT}`)
console.log(`Environment: ${ENV.RUN_ENV}`)

app.listen(ENV.APP_PORT)
