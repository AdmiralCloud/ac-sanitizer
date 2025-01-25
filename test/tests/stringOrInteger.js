const { runValidationTests } = require('./helper')

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

    runValidationTests(baseTests, 'stringOrInteger', { equalityCheck: 'eql' })
  }
}
