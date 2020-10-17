// CURRENTL MISSING: Media, FTP CHeck, Replace Original

// require all tests
const tests = require('./../tests/index')
const timeOut = 60000

module.exports = {
  testsuite: function() {

    describe('GPS', function() {
      this.timeout(timeOut)
      tests.gps.test()
    })

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

    describe('STRING OR INTEGER', function() {
      this.timeout(timeOut)
      tests.stringOrInteger.test()
    })

    describe('COUNTY', function() {
      this.timeout(timeOut)
      tests.country.test()
    })
    
    describe('ISO 639', function() {
      this.timeout(timeOut)
      tests.iso639.test()
    })

  }
}
