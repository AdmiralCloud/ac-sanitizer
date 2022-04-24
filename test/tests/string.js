const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {
    const randomValue = sanitizer.randomValue({ type: 'string' })

    const baseTests = [
      { name: 'Valid string', type: 'string', value: 'abc-123', expected: 'abc-123' },
      { name: 'Invalid - value is integer', type: 'string', value: 123, error: 'string_notAString' },
      { name: 'Invalid - maxLength', type: 'string', value: 'abcdefghijklmn', maxLength: 10, error: 'string_stringTooLong_maxLength10' },
      { name: 'Valid - maxLength - convert', type: 'string', value: 'abcdefghijklmn', maxLength: 5, expected: 'abcde', convert: true },
      { name: 'Invalid - minLength', type: 'string', value: 'ab', minLength: 3, error: 'string_stringTooShort_minLength3' },
      { name: 'Valid - minLength', type: 'string', value: 'abc', minLength: 3, expected: 'abc' },
      { name: 'Valid from enum', type: 'string', value: 'play', enum: ['play', 'pause'], expected: 'play' },
      { name: 'Invalid from enum', type: 'string', value: 'stop', enum: ['play', 'pause'], error: 'string_notAnAllowedValue', additionalInfo: { value: 'stop' } },
      { name: 'Valid string from randomValue function', type: 'string', value: randomValue, expected: randomValue },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            string: _.get(test, 'value')
          },
          fields: [
            { field: 'string', type: _.get(test, 'type'), required: _.get(test, 'required'), enum: _.get(test, 'enum'), minLength: _.get(test, 'minLength'), maxLength: _.get(test, 'maxLength'), convert: _.get(test, 'convert') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.string')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
