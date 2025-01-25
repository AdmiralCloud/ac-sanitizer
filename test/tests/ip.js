const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid IPv4', type: 'ip', value: '8.8.8.8', expected: '8.8.8.8' },
      { name: 'Valid IPv6', type: 'ip', value: '1200:0000:AB00:1234:0000:2552:7777:1313', expected: '1200:0000:AB00:1234:0000:2552:7777:1313' },
      { name: 'Valid IPv6 - use version 6', type: 'ip', version: '6', value: '1200:0000:AB00:1234:0000:2552:7777:1313', expected: '1200:0000:AB00:1234:0000:2552:7777:1313' },
      { name: 'Valid local IPv6', type: 'ip', value: '::ffff:127.0.0.1', expected: '::ffff:127.0.0.1' },
      { name: 'Invalid IPv4 - should fail', type: 'ip', value: 'A', error: 'ip_notAnIP' },      
    ]

    runValidationTests(baseTests, 'ip')
  }
}
