const _ = require('lodash')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid bool', type: 'boolean', value: true, expected: true },
      { name: 'Valid bool', type: 'boolean', value: false, expected: false },
      { name: 'Valid bool from randomValue function', type: 'boolean', value: sanitizer.randomValue({ type: 'boolean' }), expected: true },
      { name: 'Valid bool as string', type: 'boolean', value: 'true', expected: true },
      { name: 'Valid bool as string', type: 'boolean', value: 'false', expected: false },
      { name: 'Invalid - value is integer', type: 'boolean', value: 123, error: 'bool_notBoolean' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            bool: _.get(test, 'value')
          },
          fields: [
            { field: 'bool', type: _.get(test, 'type'), required: _.get(test, 'required') }
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
          expect(_.get(r, 'params.bool')).to.equal(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
