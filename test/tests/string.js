const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid string', type: 'string', value: 'abc-123', expected: 'abc-123' },
      { name: 'Invalid - value is integer', type: 'string', value: 123, error: 'string_notAString' },
      { name: 'Invalid - maxLength', type: 'string', value: 'abcdefghijklmn', maxLength: 10, error: 'string_stringTooLong_maxLength10' },
      { name: 'Valid - maxLength - convert', type: 'string', value: 'abcdefghijklmn', maxLength: 5, expected: 'abcde', convert: true },
      { name: 'Invalid - minLength', type: 'string', value: 'ab', minLength: 3, error: 'string_stringTooShort_minLength3' },
      { name: 'Valid - minLength', type: 'string', value: 'abc', minLength: 3, expected: 'abc' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            string: _.get(test, 'value')
          },
          fields: [
            { field: 'string', type: _.get(test, 'type'), required: _.get(test, 'required'), minLength: _.get(test, 'minLength'), maxLength: _.get(test, 'maxLength'), convert: _.get(test, 'convert') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.string')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
