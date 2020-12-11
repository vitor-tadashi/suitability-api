const { Router } = require('express');
const InsuranceSuitabilityLogic = require('../domain/logic/product.suitability.logic');
const ValidationError = require('../error/ValidationError');

const router = new Router();

/*
 * Route to apply product suitability
 */
module.exports.getProductSuitability = async (req, res, next) => {
  try {
    const insuranceSuitabilityLogic = new InsuranceSuitabilityLogic();
    res.send(await insuranceSuitabilityLogic.calculateProductSuitability(req.body));
  } catch (err) {
    if (!(err instanceof ValidationError)) {
      next(err);
    } else {
      res.status(400).send({
        error: {
          message: err.message,
          details: err.details,
          title: err.title,
          code: err.code
        }
      });
    }
  }
};

router.post('/', module.exports.getProductSuitability);

module.exports.routes = router;
