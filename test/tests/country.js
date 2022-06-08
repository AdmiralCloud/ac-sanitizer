const _ = require('lodash')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {
    const randomValue = sanitizer.randomValue({ type: 'countryCode' })

    const baseTests = [
      { name: 'Valid countryCode', type: 'countryCode', value: randomValue, expected: randomValue },
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
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).to.equal(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).to.equal(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.countryCode')).to.equal(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
