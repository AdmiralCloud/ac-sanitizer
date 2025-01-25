const { runValidationTests } = require('./helper')
 
const Hashids = require('hashids/cjs')
const hashids = new Hashids()

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid hashids', type: 'hashids', value: hashids.encode([ 1, 5, 10 ]), expected: [ 1, 5, 10 ] },
       { name: 'Invalid - hashids is an empty array', type: 'hashids', value: '3kTMddddd', error: 'hashids_decodedValue_arrayIsEmpty' },
    ]

    runValidationTests(baseTests, 'hashids', { equalityCheck: 'eql' })
  }
}
