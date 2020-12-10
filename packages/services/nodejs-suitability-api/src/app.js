const express = require('express')

const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const suitabilityRoute = require('./route/suitability.route')
const swaggerDocument = require('./swagger/swagger.json')
const { ENV, ENVIRONMENTS } = require('./config')
const helmet = require('helmet')
const compression = require('compression')

// You can add more adresses if you want (from prod or stage)
const whiteListCors = [/localhost/]

app.use(cors({ optionsSuccessStatus: 200, origin: whiteListCors }))

// Documentation https://helmetjs.github.io/
app.use(helmet())
app.use(bodyParser.json())
app.use(compression())

if ([ENVIRONMENTS.DEVELOPMENT, ENVIRONMENTS.STAGE].includes(ENV.RUN_ENV)) {
  app.use('/suitability/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
}

app.use('/suitability/healthz$', async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Suitability API'
  })
})

app.use('/suitability/', suitabilityRoute.routes)

/* eslint no-unused-vars: 0 */
// eslint-disable-next-line handle-callback-err
app.use((err, req, res, next) => {
  res.status(500).send({
    error: {
      message: 'Internal Server Error'
    }
  })
})

module.exports = app
