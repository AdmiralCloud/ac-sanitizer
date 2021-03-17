const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid email', type: 'email', value: 'jane.doe@admiralcloud.com', expected: 'jane.doe@admiralcloud.com' },
      { name: 'Invalid email', type: 'email', value: 'jane.doe@admiralcloud', error: 'email_notAValidEmailAddress' },
      { name: 'Invalid email', type: 'email', value: 'jane.doe', error: 'email_notAValidEmailAddress' },
      { name: 'Valid email', type: 'email', value: 'jane.doe+mediahub002@admiralcloud.com', expected: 'jane.doe+mediahub002@admiralcloud.com' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            email: _.get(test, 'value')
          },
          fields: [
            { field: 'email', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
        }
        else {
          expect(_.get(r, 'params.email')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
