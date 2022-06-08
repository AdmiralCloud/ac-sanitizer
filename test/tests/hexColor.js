const _ = require('lodash')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid HEX', type: 'hexColor', value: '#ffcc99', expected: '#ffcc99' },
      { name: 'Invalid HEX - only one number', type: 'hexColor', value: '#ff', error: 'hexColor_notAValidHexColor' },
      { name: 'Invalid HEX', type: 'hexColor', value: '#ggw', error: 'hexColor_notAValidHexColor' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            hexColor: _.get(test, 'value')
          },
          fields: [
            { field: 'hexColor', type: _.get(test, 'type'), required: _.get(test, 'required') }
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
          expect(_.get(r, 'params.hexColor')).to.equal(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
