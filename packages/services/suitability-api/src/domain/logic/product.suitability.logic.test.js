const chai = require('chai')

const { expect } = chai
const ProductSuitabilityLogic = require('./product.suitability.logic')
const ValidationError = require('../../error/ValidationError')

describe('Product Suitability Logic', ()  => {
  const productSuitabilityLogic = new ProductSuitabilityLogic();
  describe('Request product suitability', () => {
    it('when no age is specified, it must be notified that it is mandatory', async () => {
      try {
        productSuitabilityLogic.calculateProductSuitability({
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
        });
      } catch (err) {
        expect(err).keys('message', 'details', 'title', 'name', 'code')
        expect(err.message).to.be.equal('')
        expect(err.details).to.be.equal('The attribute \'age\' is required.')
        expect(err.title).to.be.equal('Bad Request')
        expect(err.code).to.be.equal(1000)
        expect(err.name).to.be.equal('ValidationError')
      }
    })

    it('when age is invalid, it must be notified that the attribute is in an invalid format', async () => {
      try {
        productSuitabilityLogic.calculateProductSuitability({
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
        });
      } catch (err) {
        expect(err).keys('message', 'details', 'title', 'name', 'code')
        expect(err.message).to.be.equal('')
        expect(err.details).to.be.equal('The attribute \'age\' is invalid.')
        expect(err.title).to.be.equal('Bad Request')
        expect(err.code).to.be.equal(1001)
        expect(err.name).to.be.equal('ValidationError')
      }
    })

    it('when no dependents is specified, it must be notified that it is mandatory', async () => {
      try {
        productSuitabilityLogic.calculateProductSuitability({
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
        });
      } catch (err) {
        expect(err).keys('message', 'details', 'title', 'name', 'code')
        expect(err.message).to.be.equal('')
        expect(err.details).to.be.equal('The attribute \'dependents\' is required.')
        expect(err.title).to.be.equal('Bad Request')
        expect(err.code).to.be.equal(1002)
        expect(err.name).to.be.equal('ValidationError')
      }
    })

    it('when dependents is invalid, it must be notified that the attribute is in an invalid format', async () => {
      try {
        productSuitabilityLogic.calculateProductSuitability({
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
        });
      } catch (err) {
        expect(err).keys('message', 'details', 'title', 'name', 'code')
        expect(err.message).to.be.equal('')
        expect(err.details).to.be.equal('The attribute \'dependents\' is invalid.')
        expect(err.title).to.be.equal('Bad Request')
        expect(err.code).to.be.equal(1003)
        expect(err.name).to.be.equal('ValidationError')
      }
    })
  })
})
