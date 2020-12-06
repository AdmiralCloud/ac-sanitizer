const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid FQDN', type: 'fqdn', value: 'admiralcloud.com', expected: 'admiralcloud.com' },
      { name: 'Invalid FQDN - should fail', type: 'fqdn', value: 'https://admiralcloud.com', error: 'fqdn_notAValidFQDN' },      
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, function(done) {
        let fieldsToCheck = {
          params: {
            fqdn: _.get(test, 'value')
          },
          fields: [
            { field: 'fqdn', type: _.get(test, 'type')}
          ]
        }
        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.fqdn')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
