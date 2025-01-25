const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Non-existing type', type: 'xyt', value: 'abc', error: 'errorField_typeCheck_xyt_notDefined' },
      { name: 'AdminLevel not sufficient', type: 'string', value: 'abc', adminLevel: 10, error: 'errorField_adminLevelNotSufficient' },
      { name: 'AdminLevel not sufficient, omit fields', omitFields: true, type: 'string', value: 'abc', adminLevel: 10, expected: undefined }
    ]

    runValidationTests(baseTests, 'errorField', { adminLevel: 4 })
  }
}

