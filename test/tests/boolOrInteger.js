const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid bool', type: 'integer | boolean', value: true, expected: true },
      { name: 'Valid integer', type: 'integer | boolean', value: 123, expected:  123 },
      { name: 'Invalid - neither bool nor integer', type: 'integer | boolean', value: 'abc', error: 'boolOrInteger_neitherBooleanNorInteger' },
    ]

    runValidationTests(baseTests, 'boolOrInteger')
  }
}
