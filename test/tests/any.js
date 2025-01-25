const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Any - with string', type: 'any', value: 'admiralcloud', expected: 'admiralcloud' },
      { name: 'Any - with integer', type: 'any', value: 123, expected: 123 },
      { name: 'Any - with boolean', type: 'any', value: true, expected: true },
      { name: 'Any - with boolean - false', type: 'any', value: false, expected: false },
      { name: 'Any - with object', type: 'any', value: { a: 123 }, expected: { a: 123 } },
      { name: 'Any - with array', type: 'any', value: [1,2,3], expected: [1,2,3] },
      { name: 'Any - with array of objects', type: 'any', value: [{ a: 123 }], expected: [{ a: 123 }] },
      { name: 'Any - with float', type: 'any', value: 123.235, expected: 123.235 },
      { name: 'Any - with Infinity - should fail', type: 'any', value: Infinity, error: 'any_couldNotResolveType' },
      { name: 'Any - with null and nullAllowed', type: 'any', value: null, nullAllowed: true, expected: null },
    ]

    runValidationTests(baseTests, 'any', { equalityCheck: 'eql' })
  }
}
