const { runValidationTests } = require('./helper')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {
    const randomValue1 = sanitizer.randomValue({ type: 'iso-639-1' })
    const randomValue2 = sanitizer.randomValue({ type: 'iso-639-2' })

    const baseTests = [
      { name: 'Valid ISO-639-1', type: 'iso-639-1', value: randomValue1, expected: randomValue1 },
      { name: 'Valid ISO-639-2', type: 'iso-639-2', value: randomValue2, expected: randomValue2 },
      { name: 'Valid ISO-639-2 with convert', type: 'iso-639-2', value: 'lao', convert: 'nativeName', expected: 'ພາສາລາວ' },
      { name: 'Valid ISO-639-1 - check for both', type: 'iso-639', value: 'gn', convert: 'nativeName', expected: 'Avañeẽ' },
      { name: 'Valid ISO-639-2 - check for both', type: 'iso-639', value: 'grn', convert: 'nativeName', expected: 'Avañeẽ' },
      { name: 'Invalid ISO-639-1', type: 'iso-639-1', value: 'xyz', error: 'language_notAValidIso-639-1' },
      { name: 'Valid ISO-639-1 with enum', type: 'iso-639-1', enum: 'iso-639-1', value: randomValue1, expected: randomValue1 },
    ]

    runValidationTests(baseTests, 'language')
  }
}
