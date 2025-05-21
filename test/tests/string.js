const { runValidationTests } = require('./helper')
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
      { name: 'Invalid - uppercase vs lowercase', type: 'string', value: 'ABC', enum: ['abc'], error: 'string_notAnAllowedValue' },
      { name: 'Valid - uppercase vs lowercase', type: 'string', ignoreCase: true, value: 'ABC', enum: ['abc'], expected: 'ABC' },
      { name: 'Invalid - value too short', type: 'string', minLength: 5, value: 'ABC', error: 'string_stringTooShort_minLength5' },
      { name: 'Valid - value is longer than 5 chars', type: 'string', minLength: 5, value: 'ABCDEF', expected: 'ABCDEF' },
    ]

    runValidationTests(baseTests, 'string', { equalityCheck: 'eql' })
  }
}
