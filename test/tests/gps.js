const { runValidationTests } = require('./helper')

module.exports = {

  test:  () => {

    const baseTests = [
      { name: 'Valid GPS', type: 'gps', value: '-17.738223, 85.605469', expected: '-17.738223, 85.605469' },
      { name: 'Invalid GPS - latitude out of range', type: 'gps', value: '-1777.738223, 85.605469', error: 'gps_latitudeOutOfRange' },
      { name: 'Invalid GPS - longitude out of range', type: 'gps', value: '-17.738223, 185.605469', error: 'gps_longitudeOutOfRange' },
      { name: 'Invalid GPS - wrong format - 1 item', type: 'gps', value: '-17.738223', error: 'gps_notAValidGPS' },
      { name: 'Invalid GPS - wrong format - 5 items', type: 'gps', value: '-17.738223, -17.738223, 185.605469,-17.738223, 185.605469', error: 'gps_notAValidGPS' },
      { name: 'Valid GPS with distance', type: 'gps', value: '-17.738223, 85.605469, 1000', expected: '-17.738223, 85.605469, 1000' },
    ]

    runValidationTests(baseTests, 'gps')
  }
}
