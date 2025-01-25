// test-helper.js
const _ = require('lodash')
const sanitizer = require('../../index')

const runValidationTests = (tests, fieldName, { equalityCheck = 'equal', adminLevel } = {} ) => {
  _.forEach(tests, (test) => {
    it(test.name, (done) => {
      const fieldsToCheck = {
        adminLevel,
        omitFields: _.get(test, 'omitFields'),
        params: {
          [fieldName]: _.get(test, 'value')
        },
        fields: [
          { 
            field: fieldName,
            type: _.get(test, 'type'),
            required: _.get(test, 'required'),
            // add values that are no field options
            ..._.omit(test, ['name', 'type', 'value', 'expected', 'error', 'additionalInfo'])
          }
        ]
      }

      //console.log(24, JSON.stringify(fieldsToCheck, null, 2))
      const r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
      //console.log(25, JSON.stringify(r, null, 2))
      if (_.get(r, 'error')) {
        expect(_.get(r, 'error.message')).to.equal(test.error)
        if (_.get(test, 'additionalInfo')) {
          expect(_.get(r, 'error.additionalInfo'))[equalityCheck](_.get(test, 'additionalInfo'))
        }
      } 
      else {
        expect(_.get(r, `params.${fieldName}`))[equalityCheck](_.get(test, 'expected'))
      }
      return done()
    })
  })
}

module.exports = { runValidationTests }