const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid bool', type: 'integer | boolean', value: true, expected: true },
      { name: 'Valid integer', type: 'integer | boolean', value: 123, expected:  123 },
      { name: 'Invalid - neither bool nor integer', type: 'integer | boolean', value: 'abc', error: 'boolOrInteger_neitherBooleanNorInteger' },
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            boolOrInteger: _.get(test, 'value')
          },
          fields: [
            { field: 'boolOrInteger', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.boolOrInteger')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })
    })
  }
}
