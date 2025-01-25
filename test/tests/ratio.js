const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid Ratio', type: 'ratio', value: '3:4', expected: [3,4] },
      { name: 'Invalid Ratio', type: 'ratio', value: '1:3:4', error: 'ratio_notAValidRatio' },
      { name: 'Valid Ratio - Float', type: 'ratio', value: '1:3.4', expected: [1, 3.4] },
      { name: 'Invalid Ratio with chars', type: 'ratio', value: '1:x', error: 'ratio_lastValueOfRatioMustBeAFiniteNumber' },
    ]

    runValidationTests(baseTests, 'ratio', { equalityCheck: 'eql' })
  }
}
