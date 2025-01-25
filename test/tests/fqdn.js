const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid FQDN', type: 'fqdn', value: 'admiralcloud.com', expected: 'admiralcloud.com' },
      { name: 'Invalid FQDN - should fail', type: 'fqdn', value: 'https://admiralcloud.com', error: 'fqdn_notAValidFQDN' },      
      { name: 'Valid FQDN with wildcard', type: 'fqdn', value: '*.admiralcloud.com', wildcardAllowed: true, expected: '*.admiralcloud.com' },
    ]

    runValidationTests(baseTests, 'fqdn')
  }
}
