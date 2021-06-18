const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid fileExtension', type: 'fileExtension', value: 'pdf', expected: 'pdf' },
      { name: 'Valid fileExtension with uppercase', type: 'fileExtension', value: 'PDF', expected: 'pdf' },
      { name: 'Invalid fileExtension', type: 'fileExtension', value: 'xxx', error: 'fileExtension_notAValidFileExtension' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            fileExtension: _.get(test, 'value')
          },
          fields: [
            { field: 'fileExtension', type: _.get(test, 'type'), required: _.get(test, 'required') }
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
          expect(_.get(r, 'params.fileExtension')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
