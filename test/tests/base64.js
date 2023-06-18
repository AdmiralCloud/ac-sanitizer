const _ = require('lodash')
const sanitizer = require('../../index')

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
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            base64: _.get(test, 'value')
          },
          fields: [
            { field: 'base64', type: _.get(test, 'type'), convert: _.get(test, 'convert') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).to.equal(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).to.equal(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.base64')).to.eql(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
