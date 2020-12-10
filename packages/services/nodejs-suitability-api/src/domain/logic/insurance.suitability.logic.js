/* eslint no-console: 0 */

const ValidationError = require('../../error/ValidationError')
const MessageHelper = require('../../helper/message.helper')

const {
  ENV: { RUN_ENV }
} = require('../../config')

const MARITAL_STATUS = { SINGLE: 'SINGLE', MARRIED: 'MARRIED' }
Object.freeze(MARITAL_STATUS)

const OWNERSHIP_STATUS = { OWNED: 'OWNED', MORTGAGED: 'MORTGAGED' }
Object.freeze(OWNERSHIP_STATUS)

module.exports = class {
  /*
   * Logic function to apply product suitability
   * based on customer data
   */
  async applyProductSuitability(customer) {
    this.validateCustomerData(customer)

    try {
      return {}
    } catch (error) {
      await this.track(order, '', 'error')
      throw error
    }
  }

  validateCustomerData(customer) {
    if (!customer.age) {
      throw new ValidationError(MessageHelper.get('age-required'))
    }

    if (customer.age < 0) {
      throw new ValidationError(MessageHelper.get('age-invalid'))
    }

    if (!customer.dependents) {
      throw new ValidationError(MessageHelper.get('dependents-required'))
    }

    if (!customer.income && !Number.isInteger(customer.income)) {
      throw new ValidationError(MessageHelper.get('income-required'))
    }

    if (customer.income < 0) {
      throw new ValidationError(MessageHelper.get('income-invalid'))
    }

    if (!customer.marital_status) {
      throw new ValidationError(MessageHelper.get('marital-status-required'))
    }

    if (!Object.values(MARITAL_STATUS).includes(customer.marital_status.toUpperCase())) {
      throw new ValidationError(MessageHelper.get('marital-status-invalid'))
    }

    if (!customer.risk_questions) {
      throw new ValidationError(MessageHelper.get('risk-questions-required'))
    }

    if (!Array.isArray(customer.risk_questions) || customer.risk_questions.lenght < 3) {
      throw new ValidationError(MessageHelper.get('risk-questions-invalid'))
    }

    if (customer.house && !customer.house.ownership_status) {
      throw new ValidationError(MessageHelper.get('house-ownership-status-required'))
    }

    if (!Object.values(OWNERSHIP_STATUS).includes(customer.house.ownership_status.toUpperCase())) {
      throw new ValidationError(MessageHelper.get('house-ownership-status-invalid'))
    }

    if (customer.vehicle && !customer.vehicle.year) {
      throw new ValidationError(MessageHelper.get('vehicle-year-required'))
    }

    if (!Number.isInteger(customer.vehicle.year) || customer.vehicle.year < 0) {
      throw new ValidationError(MessageHelper.get('vehicle-year-invalid'))
    }

    /* 
     * For insurance and registration purposes, the age of a classic car, in most cases, 
     * is at least 20 years old but not more than 40 years old.
     * If it's older than 40 years old maybe you can't offer insurance
     * https://www.nationwide.com/lc/resources/auto-insurance/articles/how-old-is-a-classic-car
     * This validation is not required, I don't know if you can offer insurance for cars that are 40 years old
     * but I'm curious how it would work in real life 
     */
    if (customer.vehicle.year < new Date().getFullYear() - 40) {
      throw new ValidationError(MessageHelper.get('vehicle-year-too-old'))
    }
  }
}