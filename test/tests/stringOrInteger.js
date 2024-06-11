const _ = require('lodash')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Missing but required value', type: 'integer | string', required: true, error: 'field_stringOrInteger_required' },
      { name: 'Valid empty string', type: 'integer | string', value: '', expected: '', minLength: 0 },
      { name: 'Valid integer', type: 'integer | string', value: 123, expected:  123 },
      { name: 'Invalid - neither string nor integer', type: 'integer | string', value: ['abc'], error: 'stringOrInteger_neitherStringNorInteger' },
      { name: 'Valid - no data - ignore', type: 'integer | string' },
      { name: 'Array with string and integer', type: 'array', valueType: 'integer | string', minLength: 1, value: [1, '2'], expected: [1,'2'] }
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {},
          fields: [
            { field: 'stringOrInteger', type: _.get(test, 'type'), valueType: _.get(test, 'valueType'), required: _.get(test, 'required'), minLength: _.get(test, 'minLength') }
          ]
        }
        if (_.has(test, 'value')) fieldsToCheck.params.stringOrInteger = test.value

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).to.equal(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).to.equal(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.stringOrInteger')).to.eql(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
