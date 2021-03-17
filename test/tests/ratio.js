const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid Ratio', type: 'ratio', value: '3:4', expected: [3,4] },
      { name: 'Invalid Ratio', type: 'ratio', value: '1:3:4', error: 'ratio_notAValidRatio' },
      { name: 'Valid Ratio - Float', type: 'ratio', value: '1:3.4', expected: [1, 3.4] },
      { name: 'Invalid Ratio with chars', type: 'ratio', value: '1:x', error: 'ratio_lastValueOfRatioMustBeAFiniteNumber' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            ratio: _.get(test, 'value')
          },
          fields: [
            { field: 'ratio', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.ratio')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
