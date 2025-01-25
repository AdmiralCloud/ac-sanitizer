const { runValidationTests } = require('./helper')
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

    runValidationTests(baseTests, 'bool')
  }
}
