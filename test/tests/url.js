const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid url', type: 'url', value: 'https://www.admiralcloud.com', expected: 'https://www.admiralcloud.com' },
      { name: 'Invalid url', type: 'url', value: 'www.admiralcloud.com', error: 'url_notAValidURL' },
      { name: 'Invalid url - wrong protocol', type: 'url', value: 'ftp://www.admiralcloud.com', error: 'url_notAValidURL' }
    ]

    runValidationTests(baseTests, 'url')
  }
}
