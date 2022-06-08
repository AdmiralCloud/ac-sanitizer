const _ = require('lodash')

const { expect } = require('chai')
global.expect = expect

const testMode = _.get(process, 'env.TESTMODE', false)

const suite = {
  1: require('./suites/default')
}
if (testMode) {
  _.set(suite, 2, require('./suites/localTest'))
}

if (testMode) suite[2].testsuite()
else suite[1].testsuite()
