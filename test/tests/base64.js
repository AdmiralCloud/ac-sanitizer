const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid base64', type: 'base64', value: 'dGhpcyBpcyBhIGJhc2U2NCBzdHJpbmc=', expected: 'dGhpcyBpcyBhIGJhc2U2NCBzdHJpbmc=' },
      { name: 'Valid base64 with convert', type: 'base64', convert: true, value: 'dGhpcyBpcyBhIGJhc2U2NCBzdHJpbmc=', expected: 'this is a base64 string' },
      { name: 'Invalid base64', type: 'base64', value: 'abc1245', error: 'base64_notABase64String' },
      { name: 'Valid base64', type: 'base64', value: 'PDw/Pz8+Pg==', convert: true, expected: '<<???>>' },
      { name: 'Invalid base64 with convert', type: 'base64', convert: true, value: 123, error: 'base64_mustBeString' },
      { name: 'Base64 app.admiralcloud.com - requires padding', type: 'base64', value: 'aHR0cHM6Ly9hcHAuYWRtaXJhbGNsb3VkLmNvbQ', convert: true, expected: 'https://app.admiralcloud.com' },
      { name: 'Base64 app.admiralcloud.com - with padding', type: 'base64', value: 'aHR0cHM6Ly9hcHAuYWRtaXJhbGNsb3VkLmNvbQ==', convert: true, expected: 'https://app.admiralcloud.com' },
      { name: 'Base64 encoded object', type: 'base64', value: 'eyJ1c2VySWQiOjEyMywiY3VzdG9tZXJJZCI6MTQ2LCJyZWFzb24iOiJCZWNhdXNlIEkgY2FuIn0=', convert: true, expected: { userId: 123, customerId: 146, reason: 'Because I can' } },
      { name: 'Base64 encoded object', type: 'base64', value: 'eyJ1c2VySWQiOjEyMywiY3VzdG9tZXJJZCI6MTQ2LCJyZWFzbOiJCZWNhdXNlIEkgY2FuIn0=', convert: true, error: 'base64_notABase64String' },
      { name: 'Base64 array with enum', type: 'base64', value: 'WzAsMSw5OCw5OSwxMDBd', convert: true, expected: [0, 1, 98, 99, 100], enum: [0, 1, 98, 99, 100] },
      { name: 'Base64 array with enum - fail', type: 'base64', value: 'WzAsMSw5OCw5OSwxMDBd', convert: true, error: 'base64_notAnAllowedValue', enum: [200] },
      { name: 'Base64 string with enum', type: 'base64', value: 'bXlzdHJpbmc=', convert: true, expected: 'mystring', enum: ['mystring', 'otherstring'] },
      { name: 'Base64 string with enum - fail', type: 'base64', value: 'bXlzdHJpbmc=', convert: true, error: 'base64_notAnAllowedValue', enum: ['otherstring'] }
    ]

    runValidationTests(baseTests, 'base64', { equalityCheck: 'eql' })
  }
}
