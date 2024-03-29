const _ = require('lodash')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid FQDN', type: 'fqdn', value: 'admiralcloud.com', expected: 'admiralcloud.com' },
      { name: 'Invalid FQDN - should fail', type: 'fqdn', value: 'https://admiralcloud.com', error: 'fqdn_notAValidFQDN' },      
      { name: 'Valid FQDN with wildcard', type: 'fqdn', value: '*.admiralcloud.com', wildcardAllowed: true, expected: '*.admiralcloud.com' },
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, function(done) {
        let fieldsToCheck = {
          params: {
            fqdn: _.get(test, 'value')
          },
          fields: [
            { field: 'fqdn', type: _.get(test, 'type'), wildcardAllowed: _.get(test, 'wildcardAllowed') }
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
          expect(_.get(r, 'params.fqdn')).to.equal(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
