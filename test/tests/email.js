const _ = require('lodash')
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
