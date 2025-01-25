const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid CIDR', type: 'cidr', value: '8.8.8.8/32', expected: '8.8.8.8/32' },
      { name: 'Invalid CIDR', type: 'cidr', value: '8.8.8.8', error: 'cidr_notAValidCIDR' },
      { name: 'Valid CIDR array ipv4', type: 'cidr', valueType: 'cidr', value: [{ cidr: '8.8.8.8/32' }], expected: [{ cidr: '8.8.8.8/32' }] },
      { name: 'Invalid CIDR array', type: 'cidr', valueType: 'cidr', value: [{ cidr: '8.8.8.8' }], error: 'cidr_notAValidCIDR' },
      // ipv6
      { name: 'Valid CIDR array ipv6', type: 'cidr', valueType: 'cidr', value: [{ cidr: '2001:4d20::/32' }], expected: [{ cidr: '2001:4d20::/32' }] },
      { name: 'Invalid CIDR array', type: 'cidr', valueType: 'cidr', value: [{ cidr: '::ffff:127.0.0.1' }], error: 'cidr_notAValidCIDR' },
    ]
    
    runValidationTests(baseTests, 'cidr', { equalityCheck: 'eql' })
  }
}
