const _ = require('lodash')
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
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).to.equal(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).to.equal(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.boolOrInteger')).to.equal(_.get(test, 'expected'))
        }
        return done()
      })
    })
  }
}
