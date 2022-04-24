const _ = require('lodash')
const expect = require('expect')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid Date YYYY-MM-DD', type: 'date', value: '2020-10-10', expected: '2020-10-10' },
      { name: 'Valid Date DD.MM.YYYY', type: 'date', value: '22.02.2020', expected: '22.02.2020' },
      { name: 'Valid Date DD/MM/YYYY', type: 'date', value: '22/02/2020', expected: '22/02/2020' },
      { name: 'Valid Date MM/DD/YYYY', type: 'date', value: '02/22/2020', expected: '02/22/2020' },
      { name: 'Valid DateTime YYYY-MM-DD HH:mm:ss', type: 'date', value: '2020-10-10 16:20:55', expected: '2020-10-10 16:20:55' },
      { name: 'Invalid date with .', type: 'date', value: '32.01.2020', error: 'date_notaDate' },
      { name: 'Invalid date', type: 'date', value: '2020-13-30', error: 'date_notaDate' },
      { name: 'Valid DateTime ISO8601', type: 'date', value: '2020-10-17T16:34:50+02:00', expected: '2020-10-17T16:34:50+02:00' },
      { name: 'Invalid date with custom date format', type: 'date', dateFormat: 'mmm-xyt', value: '2020-13-30', error: 'date_notaDate' },
  
      
    ]
    _.forEach(baseTests, (test) => {
      it(test.name, (done) => {
        let fieldsToCheck = {
          params: {
            date: _.get(test, 'value')
          },
          fields: [
            { field: 'date', type: _.get(test, 'type'), required: _.get(test, 'required'), dateFormat: _.get(test, 'dateFormat') }
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
          expect(_.get(r, 'params.date')).toEqual(_.get(test, 'expected'))
        }
        return done()
      })

    })



  }
}
