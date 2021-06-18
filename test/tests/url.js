const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid url', type: 'url', value: 'https://www.admiralcloud.com', expected: 'https://www.admiralcloud.com' },
      { name: 'Invalid url', type: 'url', value: 'www.admiralcloud.com', error: 'url_notAValidURL' },
      { name: 'Invalid url - wrong protocol', type: 'url', value: 'ftp://www.admiralcloud.com', error: 'url_notAValidURL' },
    ]

    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            url: _.get(test, 'value')
          },
          fields: [
            { field: 'url', type: _.get(test, 'type'), required: _.get(test, 'required') }
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
          expect(_.get(r, 'params.url')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
