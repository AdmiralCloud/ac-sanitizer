const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid CIDR', type: 'cidr', value: '8.8.8.8/32', expected: '8.8.8.8/32' },
      { name: 'Invalid CIDR', type: 'cidr', value: '8.8.8.8', error: 'cidr_notAValidCIDR' },
      { name: 'Valid CIDR array', type: 'cidr', valueType: 'cidr', value: [{ cidr: '8.8.8.8/32' }], expected: [{ cidr: '8.8.8.8/32' }] },
      { name: 'Invalid CIDR array', type: 'cidr', valueType: 'cidr', value: [{ cidr: '8.8.8.8' }], error: 'cidr_notAValidCIDR' },
      // ipv6
      { name: 'Valid CIDR array', type: 'cidr', valueType: 'cidr', value: [{ cidr: '::ffff:127.0.0.1/32', type: 'ipv6' }], expected: [{ cidr: '::ffff:127.0.0.1/32', type: 'ipv6' }] },
      { name: 'Invalid CIDR array', type: 'cidr', valueType: 'cidr', value: [{ cidr: '::ffff:127.0.0.1', type: 'ipv6' }], error: 'cidr_notAValidCIDR' },
    ]
    

    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            cidr: _.get(test, 'value')
          },
          fields: [
            { field: 'cidr', type: _.get(test, 'type'), version: _.get(test, 'version'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.cidr')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })
    })



  }
}
