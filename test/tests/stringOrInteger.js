const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid string', type: 'integer | string', value: 'abc-123', expected: 'abc-123' },
      { name: 'Valid integer', type: 'integer | string', value: 123, expected:  123 },
      { name: 'Invalid - neither string nor integer', type: 'integer | string', value: ['abc'], error: 'stringOrInteger_neitherStringNorInteger' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            stringOrInteger: _.get(test, 'value')
          },
          fields: [
            { field: 'stringOrInteger', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.stringOrInteger')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
