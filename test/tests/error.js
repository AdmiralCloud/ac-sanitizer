const _ = require('lodash')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Non-existing type', type: 'xyt', value: 'abc', error: 'errorField_typeCheck_xyt_notDefined' },
      { name: 'AdminLevel not sufficient', type: 'string', value: 'abc', adminLevel: 10, error: 'errorField_adminLevelNotSufficient' },
      { name: 'AdminLevel not sufficient, omit fields', omitFields: true, type: 'string', value: 'abc', adminLevel: 10, expected: undefined }
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          adminLevel: 4,
          omitFields: _.get(test, 'omitFields'),
          params: {
            errorField: _.get(test, 'value'),
          },
          fields: [
            { field: 'errorField', type: _.get(test, 'type'), required: _.get(test, 'required'), adminLevel: _.get(test, 'adminLevel') }
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
          expect(_.get(r, 'params.email')).to.equal(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
