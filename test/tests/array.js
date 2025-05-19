const { runValidationTests } = require('./helper')
const sanitizer = require('../../index')

module.exports = {

  test:  () => {
    const randomValueInt = sanitizer.randomValue({ type: 'array', valueType: 'integer' })
    const randomValueString = sanitizer.randomValue({ type: 'array' })

    const baseTests = [
      { name: 'Valid array of numbers', type: 'array', value: randomValueInt, expected: randomValueInt },
      { name: 'Valid array of strings', type: 'array', value: randomValueString, expected: randomValueString },
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
      { name: 'Array of objects - valid', type: 'array', value: [{ 'createdAt': 'asc' }], enum: [{ 'createdAt': 'asc' }], expected: [{ 'createdAt': 'asc' }] },
      { name: 'Array of objects - invalid', type: 'array', value: [{ 'createdAt': 'desc' }], enum: [{ 'createdAt': 'asc' }], error: 'array_notAnAllowedValue' },
      { name: 'Array of objects - check that object payload is sanitized', 
        type: 'array', 
        valueType: 'object', 
        properties: [{ field: 'p1', type: 'string' }], 
        value: [{ p1: 'isAString', p2: 'shouldBeRemoved' }, { p1: 'isAString2', p2: 'shouldBeRemoved2' }],
        expected: [{ p1: 'isAString' },  { p1: 'isAString2' }]
      },
      { name: 'Array of strings with enum - uppercase vs lowercase', type: 'array', valueType: 'string', value: ['ABC'], enum: ['abc'], error: 'array_atLeastOneValueFailed' },
      { name: 'Array of strings with enum - uppercase vs lowercase - with ignoreCase', type: 'array', valueType: 'string', ignoreCase: true, value: ['ABC', 'DEF'], enum: ['abc'], error: 'array_atLeastOneValueFailed' },
      { name: 'Array of urls with https', type: 'array', valueType: 'url', value: ['https://www.admiralcloud.com'], expected: ['https://www.admiralcloud.com'] },
      { name: 'Array of urls with http and https - only https is allowed', type: 'array', valueType: 'url', protocols: ['https'], value: ['http://www.admiralcloud.com'], error: 'array_atLeastOneValueFailed' },
  ]

    runValidationTests(baseTests, 'array', { equalityCheck: 'eql' })
  }
}
