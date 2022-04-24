const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid RGB', type: 'rgb', value: '1,244,100', expected: '1,244,100' },
      { name: 'Another valid RGB', type: 'rgb', value: 'rgb(59,70,16)', expected: 'rgb(59,70,16)' },
      { name: 'Valid RGBA', type: 'rgb', value: 'rgba(90%,90%,90%,.3)', expected: 'rgba(90%,90%,90%,.3)' },
      { name: 'Invalid RGB', type: 'rgb', value: '-1,-1,255', error: 'rgb_notAValidRGB' },
      { name: 'Valid RGB with %', type: 'rgb', value: '10%,14%,14%', expected: '10%,14%,14%' },
      { name: 'Invalid RGB with %', type: 'rgb', value: '101%,14%,14%', error: 'rgb_notAValidRGB' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            rgb: _.get(test, 'value')
          },
          fields: [
            { field: 'rgb', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.rgb')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
