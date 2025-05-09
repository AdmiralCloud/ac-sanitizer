const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid IPv4', type: 'ip', value: '8.8.8.8', expected: '8.8.8.8' },
      { name: 'Valid IPv6', type: 'ip', value: '1200:0000:AB00:1234:0000:2552:7777:1313', expected: '1200:0000:AB00:1234:0000:2552:7777:1313' },
      { name: 'Valid IPv6 - use version 6', type: 'ip', version: '6', value: '1200:0000:AB00:1234:0000:2552:7777:1313', expected: '1200:0000:AB00:1234:0000:2552:7777:1313' },
      { name: 'Valid local IPv6', type: 'ip', value: '::ffff:127.0.0.1', expected: '::ffff:127.0.0.1' },
      { name: 'Invalid IPv4 - should fail', type: 'ip', value: 'A', error: 'ip_notAnIP' }, 
      // anonymize
      { name: 'Valid IPv4 - anonymize 2 octets with 0', type: 'ip', value: '8.8.8.8', expected: '8.8.0.0', anonymize: 2 },
      { name: 'Valid IPv4 - anonymize 2 octets with x', type: 'ip', value: '8.8.8.8', expected: '8.8.x.x', anonymize: 2, replacement: 'x' },
      { name: 'Valid IPv6 - anonymize 2 segements', type: 'ip', version: '6', value: '2001:db8:85a3:1:2:3:4:5', expected: '2001:db8:85a3:1::', anonymize: 2 },
      { name: 'Valid IPv6 - anonymize 2 segements', type: 'ip', version: '6', value: '2001:db8:85a3::8a2e:370:7334', expected: '2001:db8:85a3::', anonymize: 2 },
      { name: 'Valid IPv6 - anonymize 4 segements', type: 'ip', version: '6', value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334', expected: '::', anonymize: 4 },
    ]

    runValidationTests(baseTests, 'ip')
  }
}
