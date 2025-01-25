const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid RGB', type: 'rgb', value: '1,244,100', expected: '1,244,100' },
      { name: 'Another valid RGB', type: 'rgb', value: 'rgb(59,70,16)', expected: 'rgb(59,70,16)' },
      { name: 'Valid RGBA', type: 'rgb', value: 'rgba(90%,90%,90%,.3)', expected: 'rgba(90%,90%,90%,.3)' },
      { name: 'Invalid RGB', type: 'rgb', value: '-1,-1,255', error: 'rgb_notAValidRGB' },
      { name: 'Valid RGB with %', type: 'rgb', value: '10%,14%,14%', expected: '10%,14%,14%' },
      { name: 'Invalid RGB with %', type: 'rgb', value: '101%,14%,14%', error: 'rgb_notAValidRGB' },
    ]

    runValidationTests(baseTests, 'rgb')
  }
}
