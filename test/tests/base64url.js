const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid base64url', type: 'base64url', value: 'dGhpcyBpcyBhIGJhc2U2NHVybCBzdHJpbmc', expected: 'dGhpcyBpcyBhIGJhc2U2NHVybCBzdHJpbmc' },
      { name: 'Valid base64url with convert', type: 'base64url', convert: true, value: 'dGhpcyBpcyBhIGJhc2U2NHVybCBzdHJpbmc', expected: 'this is a base64url string' },
      { name: 'Invalid base64url', type: 'base64url', value: '!!!not-valid???', error: 'base64url_notABase64UrlString' },
      { name: 'Valid base64url with url-safe chars (- and _)', type: 'base64url', value: 'PDw_Pz8-Pg', convert: true, expected: '<<???>>' },
      { name: 'Invalid base64url with convert', type: 'base64url', convert: true, value: 123, error: 'base64url_mustBeString' },
      { name: 'Base64url app.admiralcloud.com', type: 'base64url', value: 'aHR0cHM6Ly9hcHAuYWRtaXJhbGNsb3VkLmNvbQ', convert: true, expected: 'https://app.admiralcloud.com' },
      { name: 'Base64url encoded object', type: 'base64url', value: 'eyJ1c2VySWQiOjEyMywiY3VzdG9tZXJJZCI6MTQ2LCJyZWFzb24iOiJCZWNhdXNlIEkgY2FuIn0', convert: true, expected: { userId: 123, customerId: 146, reason: 'Because I can' } },
      { name: 'Base64url array with enum', type: 'base64url', value: 'WzAsMSw5OCw5OSwxMDBd', convert: true, expected: [0, 1, 98, 99, 100], enum: [0, 1, 98, 99, 100] },
      { name: 'Base64url array with enum - fail', type: 'base64url', value: 'WzAsMSw5OCw5OSwxMDBd', convert: true, error: 'base64url_notAnAllowedValue', enum: [200] },
      { name: 'Base64url string with enum', type: 'base64url', value: 'bXlzdHJpbmc', convert: true, expected: 'mystring', enum: ['mystring', 'otherstring'] },
      { name: 'Base64url string with enum - fail', type: 'base64url', value: 'bXlzdHJpbmc', convert: true, error: 'base64url_notAnAllowedValue', enum: ['otherstring'] }
    ]

    runValidationTests(baseTests, 'base64url', { equalityCheck: 'eql' })
  }
}
