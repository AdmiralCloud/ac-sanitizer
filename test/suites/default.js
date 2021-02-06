// CURRENTL MISSING: Media, FTP CHeck, Replace Original

// require all tests
const tests = require('./../tests/index')
const timeOut = 60000

module.exports = {
  testsuite: function() {

    describe('STRING', function() {
      this.timeout(timeOut)
      tests.string.test()
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

    describe('BOOL', function() {
      this.timeout(timeOut)
      tests.bool.test()
    })
    
    describe('IP', function() {
      this.timeout(timeOut)
      tests.ip.test()
    })

    describe('FQDN', function() {
      this.timeout(timeOut)
      tests.fqdn.test()
    })


    describe('EMAIL', function() {
      this.timeout(timeOut)
      tests.email.test()
    })

    describe('URL', function() {
      this.timeout(timeOut)
      tests.url.test()
    })

    describe('BASE64', function() {
      this.timeout(timeOut)
      tests.base64.test()
    })

    describe('STRING OR INTEGER', function() {
      this.timeout(timeOut)
      tests.stringOrInteger.test()
    })

    describe('BOOLEAN OR INTEGER', function() {
      this.timeout(timeOut)
      tests.boolOrInteger.test()
    })

    describe('COUNTY', function() {
      this.timeout(timeOut)
      tests.country.test()
    })
    
    describe('ISO 639', function() {
      this.timeout(timeOut)
      tests.iso639.test()
    })

    describe('FILE EXTENSION', function() {
      this.timeout(timeOut)
      tests.fileExtension.test()
    })

    describe('GPS', function() {
      this.timeout(timeOut)
      tests.gps.test()
    })

    describe('RATIO', function() {
      this.timeout(timeOut)
      tests.ratio.test()
    })

    describe('RGB', function() {
      this.timeout(timeOut)
      tests.rgb.test()
    })

    describe('HEXCOLOR', function() {
      this.timeout(timeOut)
      tests.hexColor.test()
    })

    describe('DATE', function() {
      this.timeout(timeOut)
      tests.date.test()
    })

    describe('UUID', function() {
      this.timeout(timeOut)
      tests.uuid.test()
    })

    describe('HASH IDS', function() {
      this.timeout(timeOut)
      tests.hashIds.test()
    })

  }
}
