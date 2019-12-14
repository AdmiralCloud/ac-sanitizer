// CURRENTL MISSING: Media, FTP CHeck, Replace Original

// require all tests
const tests = require('./../tests/index')
const timeOut = 60000

module.exports = {
  testsuite: function() {


    describe('NUMBER', function() {
      this.timeout(timeOut)
      tests.number.test()
    })

    describe('ARRAY', function() {
      this.timeout(timeOut)
      tests.array.test()
    })
    
    describe('OBJECT', function() {
      this.timeout(timeOut)
      tests.object.test()
    })
    

    describe('IP', function() {
      this.timeout(timeOut)
      tests.ip.test()
    })

    describe('EMAIL', function() {
      this.timeout(timeOut)
      tests.email.test()
    })

    describe('BASE64', function() {
      this.timeout(timeOut)
      tests.base64.test()
    })

  }
}
