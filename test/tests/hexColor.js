const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid HEX', type: 'hexColor', value: '#ffcc99', expected: '#ffcc99' },
      { name: 'Invalid HEX - only one number', type: 'hexColor', value: '#ff', error: 'hexColor_notAValidHexColor' },
      { name: 'Invalid HEX', type: 'hexColor', value: '#ggw', error: 'hexColor_notAValidHexColor' },
    ]

    runValidationTests(baseTests, 'hexColor')
  }
}
