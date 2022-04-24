const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')
 
const Hashids = require('hashids/cjs')
const hashids = new Hashids()


module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid hashids', type: 'hashids', value: hashids.encode([ 1, 5, 10 ]), expected: [ 1, 5, 10 ] },
       { name: 'Invalid - hashids is an empty array', type: 'hashids', value: '3kTMddddd', error: 'hashids_decodedValue_arrayIsEmpty' },
    ]


    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            hashids: _.get(test, 'value')
          },
          fields: [
            { field: 'hashids', type: _.get(test, 'type'), required: _.get(test, 'required') }
          ]
        }

        let r = sanitizer.checkAndSanitizeValues(fieldsToCheck)
        if (_.get(r, 'error')) {
          expect(_.get(r, 'error.message')).toEqual(test.error)
          if (_.get(test, 'additionalInfo')) {
            expect(_.get(r, 'error.additionalInfo')).toEqual(_.get(test, 'additionalInfo'))
          }
        }
        else {
          expect(_.get(r, 'params.hashids')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
