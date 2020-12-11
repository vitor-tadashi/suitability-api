const chai = require('chai')

const { expect, should } = chai
const ProductSuitabilityLogic = require('./product.suitability.logic')
const ValidationError = require('../../error/ValidationError')

describe('Product Suitability Logic', ()  => {
  const productSuitabilityLogic = new ProductSuitabilityLogic();
  describe('Request product suitability with invalid customer data', () => {
    it('when no age is specified, it must raise an exception notifing that it is mandatory', async () => {
      const customer = {
        "dependents": 2,
        "income": 140000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'age\' is required.');
    })

    it('when age is negative, it must be raise an exception notifying that the attribute is in an invalid format', async () => {
      const customer = {
        "age": -1,
        "dependents": 2,
        "income": 140000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'age\' is invalid.');
    })

    it('when age is a string, it must be raise an exception notifying that the attribute is in an invalid format', async () => {
      const customer = {
        "age": "invalid",
        "dependents": 2,
        "income": 140000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'age\' is invalid.');
    })

    it('when no dependents is specified, it must raise an exception notifing that it is mandatory', async () => {
      const customer = {
        "age": 35,
        "income": 140000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'dependents\' is required.');
    })

    it('when dependents is negative, it must be raise an exception notifying that the attribute is in an invalid format', async () => {
      const customer = {
        "age": 35,
        "dependents": -1,
        "income": 140000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'dependents\' is invalid.');
    })

    it('when dependents is a string, it must be raise an exception notifying that the attribute is in an invalid format', async () => {
      const customer = {
        "age": 35,
        "dependents": "invalid",
        "income": 140000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'dependents\' is invalid.');
    })

    it('when no income is specified, it must raise an exception notifing that it is mandatory', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'income\' is required.');
    })

    it('when no income is negative, it must be raise an exception notifying that the attribute is in an invalid format', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": -3,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'income\' is invalid.');
    })

    it('when no income is a string, it must be raise an exception notifying that the attribute is in an invalid format', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": "invalid",
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'income\' is invalid.');
    })

    it('when no marital_status is specified, it must be raise an exception notifying that the attribute is mandatory', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'marital_status\' is required.');
    })

    it('when marital_status is not \'single\' or \'married\', it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "invalid",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [
          0,
          1,
          0
        ]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'marital_status\' is invalid.');
    })

    it('when no risk_questions is specified, it must be raise an exception notifying that the attribute is required', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        }
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'risk_questions\' is required.');
    })

    it('when risk_questions is not an array, it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": "invalid"
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'risk_questions\' is invalid.');
    })

    it('when risk_questions has less than 3 items, it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [0,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)

      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'risk_questions\' is invalid.');
    })

    it('when risk_questions has more than 3 items, it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [0,1,0,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'risk_questions\' is invalid.');
    })
  
    it('when risk_questions has items that are not numeric, it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": ['a', 1, 'c']
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'risk_questions\' is invalid.');
    })
  
    it('when no house.ownership_status is specified, it must be raise an exception notifying that the attribute is required', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'house.ownership_status\' is required.');
    })
  
    it('when no house.ownership_status is specified, it must be raise an exception notifying that the attribute is required', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'house.ownership_status\' is required.');
    })
  
    it('when house.ownership_status is not \'owned\' or \'mortgaged\', it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "invalid"
        },
        "vehicle": {
          "year": 2018
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'house.ownership_status\' is invalid.');
    })

    it('when no vehicle.year is specified, it must be raise an exception notifying that the attribute is required', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'vehicle.year\' is required.');
    })

    it('when vehicle.year is negative, it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": -1
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'vehicle.year\' is invalid.');
    })

    it('when vehicle.year is a string, it must be raise an exception notifying that the attribute is invalid', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": "invalid"
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The attribute \'vehicle.year\' is invalid.');
    })

    it('when vehicle.year is over 40 years old, it must be raise an exception notifying that the car is too old', async () => {
      const customer = {
        "age": 35,
        "dependents": 0,
        "income": 0,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 1900
        },
        "risk_questions": [1,1,1]
      }
      const bind = productSuitabilityLogic.calculateProductSuitability.bind(productSuitabilityLogic, customer)
  
      expect(bind).to.throw(ValidationError).with.property('details', 'The vehicle is too old :)');
    })
  })

  describe('Request product suitability with valid customer data', () => {
    it('to a customer under 30 years old, with no dependents, no income, single, with no house and vehicle, and 1 risk point', async () => {
      const customer = {
        "age": 20,
        "dependents": 0,
        "income": 0,
        "marital_status": "single",
        "risk_questions": [
          1,
          0,
          0
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('ineligible')
      expect(productSuitability.disability).equal('ineligible')
      expect(productSuitability.home).equal('ineligible')
      expect(productSuitability.life).equal('economic')
    })

    it('to a customer under 30 years old, with no dependents, no income, single, with no house and vehicle, and 3 risk points', async () => {
      const customer = {
        "age": 20,
        "dependents": 0,
        "income": 0,
        "marital_status": "single",
        "risk_questions": [
          1,
          1,
          1
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('ineligible')
      expect(productSuitability.disability).equal('ineligible')
      expect(productSuitability.home).equal('ineligible')
      expect(productSuitability.life).equal('regular')
    })

    it('to a customer beetween 30 and 40 years old, with no dependents, no income, single, with no house and vehicle, and 3 risk points', async () => {
      const customer = {
        "age": 31,
        "dependents": 0,
        "income": 0,
        "marital_status": "single",
        "risk_questions": [
          1,
          1,
          1
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('ineligible')
      expect(productSuitability.disability).equal('ineligible')
      expect(productSuitability.home).equal('ineligible')
      expect(productSuitability.life).equal('regular')
    })

    it('to a customer beetween 30 and 40 years old, with no dependents, no income, single, with no house and vehicle, and 1 risk point', async () => {
      const customer = {
        "age": 31,
        "dependents": 0,
        "income": 0,
        "marital_status": "single",
        "risk_questions": [
          1,
          0,
          0
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('ineligible')
      expect(productSuitability.disability).equal('ineligible')
      expect(productSuitability.home).equal('ineligible')
      expect(productSuitability.life).equal('economic')
    })

    it('to a customer over 60 years old, with no dependents, no income, single, with no house and vehicle', async () => {
      const customer = {
        "age": 61,
        "dependents": 0,
        "income": 0,
        "marital_status": "single",
        "risk_questions": [
          1,
          0,
          0
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('ineligible')
      expect(productSuitability.disability).equal('ineligible')
      expect(productSuitability.home).equal('ineligible')
      expect(productSuitability.life).equal('ineligible')
    })

    it('to a customer under 30 years old, with no dependents, 300k income, single, owned house and vehicle manufactured in 2015, and 3 risk points', async () => {
      const customer = {
        "age": 29,
        "dependents": 0,
        "income": 300000,
        "marital_status": "single",
        "house": {
          "ownership_status": "owned",
        },
        "vehicle": {
          "year": 2015,
        },
        "risk_questions": [
          1,
          1,
          1
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('economic')
      expect(productSuitability.disability).equal('economic')
      expect(productSuitability.home).equal('economic')
      expect(productSuitability.life).equal('economic')
    })

    it('to a customer under 30 years old, with 1 dependent, 300k income, married, mortgaged house and vehicle manufactured in 2020, and 3 risk points', async () => {
      const customer = {
        "age": 29,
        "dependents": 1,
        "income": 300000,
        "marital_status": "married",
        "house": {
          "ownership_status": "mortgaged",
        },
        "vehicle": {
          "year": 2020,
        },
        "risk_questions": [
          1,
          1,
          1
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('regular')
      expect(productSuitability.disability).equal('regular')
      expect(productSuitability.home).equal('regular')
      expect(productSuitability.life).equal('regular')
    })

    it('to a customer under 30 years old, with 1 dependent, 100k income, married, mortgaged house and vehicle manufactured in 2020, and 3 risk points', async () => {
      const customer = {
        "age": 29,
        "dependents": 1,
        "income": 100000,
        "marital_status": "married",
        "house": {
          "ownership_status": "mortgaged",
        },
        "vehicle": {
          "year": 2020,
        },
        "risk_questions": [
          1,
          1,
          1
        ]
      }
  
      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('regular')
      expect(productSuitability.disability).equal('regular')
      expect(productSuitability.home).equal('regular')
      expect(productSuitability.life).equal('responsible')
    })
  
    it('to a customer between 30 and 40 years old, with 1 dependent, 100k income, married, mortgaged house and vehicle manufactured in 2020, and 3 risk points', async () => {
      const customer = {
        "age": 34,
        "dependents": 1,
        "income": 100000,
        "marital_status": "married",
        "house": {
          "ownership_status": "mortgaged",
        },
        "vehicle": {
          "year": 2020,
        },
        "risk_questions": [
          1,
          1,
          1
        ]
      }
  
      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('responsible')
      expect(productSuitability.disability).equal('responsible')
      expect(productSuitability.home).equal('responsible')
      expect(productSuitability.life).equal('responsible')
    })

    it('to a customer over 60 years old, with 2 dependents, 70k income, single, with owned house and vehicle year 2010', async () => {
      const customer = {
        "age": 61,
        "dependents": 2,
        "income": 70000,
        "marital_status": "married",
        "house": {
          "ownership_status": "owned"
        },
        "vehicle": {
          "year": 2010
        },
        "risk_questions": [
          0,
          0,
          0
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('economic')
      expect(productSuitability.disability).equal('ineligible')
      expect(productSuitability.home).equal('economic')
      expect(productSuitability.life).equal('ineligible')
    })

    it('to a customer over 30 years old, with 2 dependents, 30k income, married, with mortgaged house, vehicle year 2019, and 3 risk points', async () => {
      const customer = {
        "age": 31,
        "dependents": 2,
        "income": 30000,
        "marital_status": "married",
        "house": {
          "ownership_status": "mortgaged"
        },
        "vehicle": {
          "year": 2019
        },
        "risk_questions": [
          1,
          1,
          1
        ]
      }

      const productSuitability = productSuitabilityLogic.calculateProductSuitability(customer)
      expect(productSuitability).keys('auto', 'disability', 'home', 'life')
      expect(productSuitability.auto).equal('responsible')
      expect(productSuitability.disability).equal('responsible')
      expect(productSuitability.home).equal('responsible')
      expect(productSuitability.life).equal('responsible')
    })
  })
})
