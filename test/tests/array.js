const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid array of numbers', type: 'array', value: [1,2,3], expected: [1,2,3] },
      { name: 'Valid array of strings', type: 'array', value: ['a', 'b', 'c'], expected:  ['a', 'b', 'c'] },
      { name: 'Invalid array', type: 'array', value: 'a', error: 'array_notAnArray' },
      { name: 'Array with enum match', type: 'array', value: ['video'], enum: ['audio', 'video'], expected: ['video'] },
      { name: 'Array without enum match', type: 'array', value: ['cookie'], enum: ['audio', 'video'], error: 'array_notAnAllowedValue' },
      { name: 'Array with one non-matching - should filter out that value', type: 'array', value: ['video', 'cookie'], enum: ['audio', 'video'], expected: ['video'] },
      { name: 'Array with enum with placeholder countrylist', type: 'array', value: ['Laos'], enum: 'countrylist', expected: ['Laos'] },
      { name: 'Array with enum with placeholder countrylist - fail', type: 'array', value: ['Paris'], enum: 'countrylist', error: 'array_notAnAllowedValue' },
      { name: 'Array with enum with placeholder iso-639-2', type: 'array', value: ['deu'], enum: 'iso-639-2', expected: ['deu'] },
      { name: 'Array with enum with placeholder iso-639-2 - fail', type: 'array', value: ['de'], enum: 'iso-639-2', error: 'array_notAnAllowedValue' },
      { name: 'Array with enum with non existing placeholder - fail', type: 'array', value: ['de'], enum: 'notExisting', error: 'enum_notDefined' },
      { name: 'Array with valueType - fail', type: 'array', value: ['de', 1, 'en'], valueType: 'string', error: 'array_atLeastOneValueFailed' },
      { name: 'Array with valueType', type: 'array', value: ['de', 'en'], valueType: 'string', expected: ['de', 'en'] },
      { name: 'Array with valueType fdqn and wildcard', type: 'array', value: ['*.admiralcloud.com'], valueType: 'fqdn', expected: ['*.admiralcloud.com'], wildcardAllowed: true },
      { name: 'Array with minSize - fail', type: 'array', value: ['a'], minSize: 2, error: 'array_minSizeBoundary' },
      { name: 'Array with minSize - work', type: 'array', value: ['a', 'b'], minSize: 1, expected: ['a', 'b'] },
      { name: 'Array with maxSize - work', type: 'array', value: ['a'], maxSize: 1, expected: ['a'] },
      { name: 'Array with maxSize - fail', type: 'array', value: ['a', 'b'], maxSize: 1, error: 'array_maxSizeBoundary' },
      { name: 'Array of fileExtensions', type: 'array', valueType: 'fileExtension', value: ['jpg'], expected: ['jpg'] },
      { name: 'Array of fileExtensions - contains invalid', type: 'array', valueType: 'fileExtension', value: ['jpg', 'textimage'], error: 'array_atLeastOneValueFailed' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            array: _.get(test, 'value')
          },
          fields: [
            { field: 'array', type: _.get(test, 'type'), required: _.get(test, 'required'), valueType: _.get(test, 'valueType'), minSize: _.get(test, 'minSize'), maxSize: _.get(test, 'maxSize') }
          ]
        }
        if (test.enum) {
          _.set(fieldsToCheck, 'fields[0].enum', test.enum)
        }
        if (test.wildcardAllowed) {
          _.set(fieldsToCheck, 'fields[0].wildcardAllowed', test.wildcardAllowed)
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.array')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
