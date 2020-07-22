const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid ISO-639-1', type: 'iso-639-1', value: 'lo', expected: 'lo' },
      { name: 'Valid ISO-639-2', type: 'iso-639-2', value: 'lao', expected: 'lao' },
      { name: 'Valid ISO-639-2 with convert', type: 'iso-639-2', value: 'lao', convert: 'nativeName', expected: 'ພາສາລາວ' },
      { name: 'Invalid ISO-639-1', type: 'iso-639-1', value: 'xyz', error: 'language_notAValidIso-639-1' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            'language': _.get(test, 'value')
          },
          fields: [
            { field: 'language', type: _.get(test, 'type'), convert: _.get(test, 'convert') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(test, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.language')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
