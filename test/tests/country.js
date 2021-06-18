const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid countryCode', type: 'countryCode', value: 'de', expected: 'de' },
      { name: 'Invalid countryCode', type: 'countryCode', value: 'germany', error: 'countryCode_notAValidCountryCode' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            countryCode: _.get(test, 'value')
          },
          fields: [
            { field: 'countryCode', type: _.get(test, 'type'), required: _.get(test, 'required') }
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
          expect(_.get(r, 'params.countryCode')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
