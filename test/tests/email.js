const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid email', type: 'email', value: 'jane.doe@admiralcloud.com', expected: 'jane.doe@admiralcloud.com' },
      { name: 'Invalid email', type: 'email', value: 'jane.doe@admiralcloud', error: 'email_notAValidEmailAddress' },
      { name: 'Invalid email', type: 'email', value: 'jane.doe', error: 'email_notAValidEmailAddress' },
      { name: 'Valid email', type: 'email', value: 'jane.doe+mediahub002@admiralcloud.com', expected: 'jane.doe+mediahub002@admiralcloud.com' },
    ]

    runValidationTests(baseTests, 'email')
  }
}
