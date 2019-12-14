const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid base64', type: 'base64', value: 'dGhpcyBpcyBhIGJhc2U2NCBzdHJpbmc=', expected: 'this is a base64 string' },
      { name: 'Invalid base64', type: 'base64', value: 'dGhpcyBpcyBhIGJhc2U2NCBzdHJpbm', error: 'base64_notABase64String' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            base64: _.get(test, 'value')
          },
          fields: [
            { field: 'base64', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.base64')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
