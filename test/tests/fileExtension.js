const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid fileExtension', type: 'fileExtension', value: 'pdf', expected: 'pdf' },
      { name: 'Valid fileExtension with uppercase', type: 'fileExtension', value: 'PDF', expected: 'pdf' },
      { name: 'Invalid fileExtension', type: 'fileExtension', value: 'xxx', error: 'fileExtension_notAValidFileExtension' },
    ]

    runValidationTests(baseTests, 'fileExtension')
  }
}
