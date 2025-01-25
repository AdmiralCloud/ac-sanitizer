const { runValidationTests } = require('./helper')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {
    const randomValue = sanitizer.randomValue({ type: 'countryCode' })

    const baseTests = [
      { name: 'Valid countryCode', type: 'countryCode', value: randomValue, expected: randomValue },
      { name: 'Invalid countryCode', type: 'countryCode', value: 'germany', error: 'countryCode_notAValidCountryCode' },
    ]

    runValidationTests(baseTests, 'countryCode')
  }
}
