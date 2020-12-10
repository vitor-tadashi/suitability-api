const { Router } = require('express')
const InsuranceSuitabilityLogic = require('../domain/logic/insurance.suitability.logic')
const ValidationError = require('../error/ValidationError')

const router = new Router()

/*
 * Route to create an Order
 */
module.exports.applyProductSuitability = async (req, res, next) => {
  try {
    const insuranceSuitabilityLogic = new InsuranceSuitabilityLogic()
    res.send(await insuranceSuitabilityLogic.applyProductSuitability(req.body))
  } catch (err) {
    if (!(err instanceof ValidationError)) {
      next(err)
    } else {
      res.status(400).send({
        error: {
          message: err.message,
          details: err.details,
          title: err.title,
          code: err.code
        }
      })
    }
  }
}

router.post('/', module.exports.applyProductSuitability)

module.exports.routes = router
