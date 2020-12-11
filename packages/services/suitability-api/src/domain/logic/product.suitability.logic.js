/* eslint no-console: 0 */

const ValidationError = require('../../error/ValidationError');
const MessageHelper = require('../../helper/message.helper');

const MARITAL_STATUS = { SINGLE: 'SINGLE', MARRIED: 'MARRIED' };
Object.freeze(MARITAL_STATUS);

const OWNERSHIP_STATUS = { OWNED: 'OWNED', MORTGAGED: 'MORTGAGED' };
Object.freeze(OWNERSHIP_STATUS);

const RISK_PROFILE = {
  INELIGLEBLE: 'ineligible',
  ECONOMIC: 'economic',
  REGULAR: 'regular',
  RESPONSIBLE: 'responsible'
};
Object.freeze(RISK_PROFILE);

module.exports = class {
  /*
   * Logic function to calculate product suitability
   * based on customer data
   */
  calculateProductSuitability(customer) {
    this.validateCustomerData(customer);

    const generalScore = this.calculateCustomerRisk(customer);

    return {
      auto: this.calculateAutoInsuranceSuitability(customer.vehicle, generalScore),
      disability: this.calculateDisabilityInsuranceSuitability(customer, generalScore),
      home: this.calculateHomeInsuranceSuitability(customer.house, generalScore),
      life: this.calculateLifeInsuranceSuitability(customer, generalScore)
    };
  }

  calculateCustomerRisk(customer) {
    // It will add up all risk_questions values
    let generalScore = customer.risk_questions.reduce((a, b) => a + b, 0);

    generalScore = generalScore + this.applyAgeScore(customer.age);
    generalScore = generalScore + this.applyIncomeScore(customer.income);

    return generalScore;
  }

  calculateAutoInsuranceSuitability(vehicle, generalScore) {
    if (!vehicle) return RISK_PROFILE.INELIGLEBLE;

    if (vehicle.year > new Date().getFullYear() - 5) {
      generalScore = generalScore + 1;
    }

    return this.convertScoreToRiskProfile(generalScore);
  }

  calculateDisabilityInsuranceSuitability(customer, generalScore) {
    if (customer.income === 0) return RISK_PROFILE.INELIGLEBLE;
    if (customer.age > 60) return RISK_PROFILE.INELIGLEBLE;

    if (customer.marital_status.toUpperCase() === MARITAL_STATUS.MARRIED) {
      generalScore = generalScore - 1;
    }

    generalScore = generalScore + this.applyHomeOwnershipStatusScore(customer.home);
    generalScore = generalScore + this.applyDependentsScore(customer.depedents);

    return this.convertScoreToRiskProfile(generalScore);
  }

  calculateHomeInsuranceSuitability(house, generalScore) {
    if (!house) return RISK_PROFILE.INELIGLEBLE;

    generalScore = generalScore + this.applyHomeOwnershipStatusScore(house);

    return this.convertScoreToRiskProfile(generalScore);
  }

  calculateLifeInsuranceSuitability(customer, generalScore) {
    if (customer.age > 60) return RISK_PROFILE.INELIGLEBLE;

    if (customer.marital_status.toUpperCase() === MARITAL_STATUS.MARRIED) {
      generalScore = generalScore + 1;
    }

    generalScore = generalScore + this.applyDependentsScore(customer.depedents);

    return this.convertScoreToRiskProfile(generalScore);
  }

  applyAgeScore(age) {
    if (age < 30) return -2;
    if (age >= 30 && age <= 40) return -1;

    return 0;
  }

  applyIncomeScore(income) {
    if (income > 200000) return -1;

    return 0;
  }

  applyDependentsScore(dependents) {
    if (dependents > 0) return 1;

    return 0;
  }

  applyHomeOwnershipStatusScore(home) {
    if (home && home.ownership_status.toUpperCase() === OWNERSHIP_STATUS.MORTGAGED) return 1;

    return 0;
  }

  convertScoreToRiskProfile(score) {
    if (score <= 0) return RISK_PROFILE.ECONOMIC;
    if (score === 1 || score === 2) return RISK_PROFILE.REGULAR;
    if (score >= 3) return RISK_PROFILE.RESPONSIBLE;
  }

  validateCustomerData(customer) {
    if (!customer.age) {
      throw new ValidationError(MessageHelper.get('age-required'));
    }

    if (customer.age < 0) {
      throw new ValidationError(MessageHelper.get('age-invalid'));
    }

    if (!customer.dependents) {
      throw new ValidationError(MessageHelper.get('dependents-required'));
    }

    if (customer.dependents && customer.dependents < 0) {
      throw new ValidationError(MessageHelper.get('dependents-invalid'));
    }

    if (!customer.income && !Number.isInteger(customer.income)) {
      throw new ValidationError(MessageHelper.get('income-required'));
    }

    if (customer.income < 0) {
      throw new ValidationError(MessageHelper.get('income-invalid'));
    }

    if (!customer.marital_status) {
      throw new ValidationError(MessageHelper.get('marital-status-required'));
    }

    if (!Object.values(MARITAL_STATUS).includes(customer.marital_status.toUpperCase())) {
      throw new ValidationError(MessageHelper.get('marital-status-invalid'));
    }

    if (!customer.risk_questions) {
      throw new ValidationError(MessageHelper.get('risk-questions-required'));
    }

    if (!Array.isArray(customer.risk_questions) || customer.risk_questions.lenght < 3) {
      throw new ValidationError(MessageHelper.get('risk-questions-invalid'));
    }

    if (customer.house && !customer.house.ownership_status) {
      throw new ValidationError(MessageHelper.get('house-ownership-status-required'));
    }

    if (
      customer.house &&
      !Object.values(OWNERSHIP_STATUS).includes(customer.house.ownership_status.toUpperCase())
    ) {
      throw new ValidationError(MessageHelper.get('house-ownership-status-invalid'));
    }

    if (customer.vehicle && !customer.vehicle.year && !Number.isInteger(customer.vehicle.year)) {
      throw new ValidationError(MessageHelper.get('vehicle-year-required'));
    }

    if (customer.vehicle && (!Number.isInteger(customer.vehicle.year) || customer.vehicle.year < 0)) {
      throw new ValidationError(MessageHelper.get('vehicle-year-invalid'));
    }

    /*
     * For insurance and registration purposes, the age of a classic car, in most cases,
     * is at least 20 years old but not more than 40 years old.
     * If it's older than 40 years old maybe you can't offer insurance
     * https://www.nationwide.com/lc/resources/auto-insurance/articles/how-old-is-a-classic-car
     * This validation is not required, I don't know if you can offer insurance for cars over 40 years old,
     * but I'm curious how it would work in real life
     */
    if (customer.vehicle && customer.vehicle.year < new Date().getFullYear() - 40) {
      throw new ValidationError(MessageHelper.get('vehicle-year-too-old'));
    }
  }
};
