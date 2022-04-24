const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Missing but required value', type: 'integer | string', required: true, error: 'field_stringOrInteger_required' },
      { name: 'Valid empty string', type: 'integer | string', value: '', expected: '', minLength: 0 },
      { name: 'Valid integer', type: 'integer | string', value: 123, expected:  123 },
      { name: 'Invalid - neither string nor integer', type: 'integer | string', value: ['abc'], error: 'stringOrInteger_neitherStringNorInteger' },
      { name: 'Valid - no data - ignore', type: 'integer | string' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {},
          fields: [
            { field: 'stringOrInteger', type: _.get(test, 'type'), required: _.get(test, 'required'), minLength: _.get(test, 'minLength') }
          ]
        }
        if (_.has(test, 'value')) fieldsToCheck.params.stringOrInteger = test.value

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.stringOrInteger')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
