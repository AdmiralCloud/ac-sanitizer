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
      { name: 'Array without enum match', type: 'array', value: ['cookie'], enum: ['audio', 'video'], error: 'array_notanAllowedValue' },
      { name: 'Array with enum with placeholder countrylist', type: 'array', value: ['Laos'], enum: 'countrylist', expected: ['Laos'] },
      { name: 'Array with enum with placeholder countrylist - fail', type: 'array', value: ['Paris'], enum: 'countrylist', error: 'array_notanAllowedValue' },
      { name: 'Array with enum with placeholder iso-639-2', type: 'array', value: ['deu'], enum: 'iso-639-2', expected: ['deu'] },
      { name: 'Array with enum with placeholder iso-639-2 - fail', type: 'array', value: ['de'], enum: 'iso-639-2', error: 'array_notanAllowedValue' },
      { name: 'Array with enum with non existing placeholder - fail', type: 'array', value: ['de'], enum: 'notExisting', error: 'enum_notDefined' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            array: _.get(test, 'value')
          },
          fields: [
            { field: 'array', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }
        if (test.enum) {
          _.set(fieldsToCheck, 'fields[0].enum', test.enum)
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.array')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
