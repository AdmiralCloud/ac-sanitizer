const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid IPv4', type: 'ip', value: '8.8.8.8', expected: '8.8.8.8' },
      { name: 'Valid IPv6', type: 'ip', value: '1200:0000:AB00:1234:0000:2552:7777:1313', expected: '1200:0000:AB00:1234:0000:2552:7777:1313' },
      { name: 'Valid IPv6 - use version 6', type: 'ip', version: '6', value: '1200:0000:AB00:1234:0000:2552:7777:1313', expected: '1200:0000:AB00:1234:0000:2552:7777:1313' },
      { name: 'Valid local IPv6', type: 'ip', value: '::ffff:127.0.0.1', expected: '::ffff:127.0.0.1' },
      { name: 'Invalid IPv4 - should fail', type: 'ip', value: 'A', error: 'ip_notAnIP' },      
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, function(done) {
        let fieldsToCheck = {
          params: {
            ip: _.get(test, 'value')
          },
          fields: [
            { field: 'ip', type: _.get(test, 'type'), version: _.get(test, 'version'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.ip')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
