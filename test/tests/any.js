const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Any - with string', type: 'any', value: 'admiralcloud', expected: 'admiralcloud' },
      { name: 'Any - with integer', type: 'any', value: 123, expected: 123 },
      { name: 'Any - with boolean', type: 'any', value: true, expected: true },
      { name: 'Any - with boolean - false', type: 'any', value: false, expected: false },
      { name: 'Any - with object', type: 'any', value: { a: 123 }, expected: { a: 123 } },
      { name: 'Any - with array', type: 'any', value: [1,2,3], expected: [1,2,3] },
      { name: 'Any - with array of objects', type: 'any', value: [{ a: 123 }], expected: [{ a: 123 }] },
      { name: 'Any - with float - cannot auto-detect', type: 'any', value: 123.235, error: 'any_typeIncorrect', additionalInfo: { value: 123.235, int: 123 } },
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            any: _.get(test, 'value')
          },
          fields: [
            { field: 'any', type: _.get(test, 'type') }
          ]
        }
        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.any')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
