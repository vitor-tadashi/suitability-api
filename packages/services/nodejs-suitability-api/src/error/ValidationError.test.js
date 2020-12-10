const chai = require('chai')

const { expect } = chai
const ValidationError = require('./ValidationError')

/*
Test to verify if the attributes have the same values as defined
 */
describe('Validation Error', () => {
  test('Set attributes and verify them', done => {
    const validationError = new ValidationError({
      message: 'Invalid Value',
      details: `Missing required property 'user_id'`,
      code: 1000,
      title: 'Bad Request'
    })
    expect(validationError.message).equal('Invalid Value')
    expect(validationError.details).equal(`Missing required property 'user_id'`)
    expect(validationError.code).equal(1000)
    expect(validationError.title).equal('Bad Request')

    done()
  })
})
