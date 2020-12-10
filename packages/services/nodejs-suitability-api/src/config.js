const APP_PORT = 3001

const ENVIRONMENTS = {
  DEVELOPMENT: 'dev',
  STAGE: 'stage',
  PRODUCTION: 'prod',
  TEST: 'test'
}

const ENV = {
  RUN_ENV: process.env.RUN_ENV || ENVIRONMENTS.DEVELOPMENT,
  APP_PORT: process.env.SUITABILITY_PORT || APP_PORT
}

module.exports = { ENVIRONMENTS, ENV }
