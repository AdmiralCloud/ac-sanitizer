const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')
 

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid uuid', type: 'uuid', value: '4479f5d2-7c57-4300-bf4b-342ad5a40dc7', expected: '4479f5d2-7c57-4300-bf4b-342ad5a40dc7' },
       { name: 'Invalid - uuid is integer', type: 'uuid', value: '123', error: 'uuid_notAValidUUID' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            uuid: _.get(test, 'value')
          },
          fields: [
            { field: 'uuid', type: _.get(test, 'type'), required: _.get(test, 'required') }
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
          expect(_.get(r, 'params.uuid')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
