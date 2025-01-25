const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid uuid', type: 'uuid', value: '4479f5d2-7c57-4300-bf4b-342ad5a40dc7', expected: '4479f5d2-7c57-4300-bf4b-342ad5a40dc7' },
       { name: 'Invalid - uuid is integer', type: 'uuid', value: '123', error: 'uuid_notAValidUUID' },
    ]

    runValidationTests(baseTests, 'uuid')
  }
}
