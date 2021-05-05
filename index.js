const _ = require('lodash')
const validator = require('validator')
const Hashids = require('hashids/cjs')
const date = require('date-and-time');

const acCountryList = require('ac-countrylist')
const iso639 = require('./lib/iso639')
const fileExtensions = require('ac-file-extensions')
const acip = require('ac-ip')

const sanitizer = function() {

  const typeMapping = [
    { type: 'integer', errorMessage: 'notAFiniteNumber' },
    { type: 'string', errorMessage: 'notAString' },
    { type: 'boolean', errorMessage: 'notBoolean' },
    { type: 'array', errorMessage: 'notAnArray' },
    { type: 'object', errorMessage: 'notAPlainObject' },
    { type: 'base64', errorMessage: 'notABase64String' },
    { type: 'countryCode', errorMessage: 'notAValidCountryCode' },
    { type: 'fileExtension', errorMessage: 'notAValidFileExtension' },
    { type: 'iso-639', errorMessage: 'notAValidIso-639' },
    { type: 'iso-639-2', errorMessage: 'notAValidIso-639-2' },
    { type: 'iso-639-1', errorMessage: 'notAValidIso-639-1' },
    { type: 'hashids', errorMessage: 'mustBeString' },
    { type: 'ip', errorMessage: 'notAnIP' },
    { type: 'email', errorMessage: 'notAValidEmailAddress' },
    { type: 'fqdn', errorMessage: 'notAValidFQDN' },
    { type: 'cidr', errorMessage: 'notAValidCIDR' },
    { type: 'uuid', errorMessage: 'notAValidUUID' },
    { type: 'gps', errorMessage: 'notAValidGPS' },
    { type: 'ratio', errorMessage: 'notAValidRatio' },
    { type: 'rgb', errorMessage: 'notAValidRGB' },
    { type: 'hexColor', errorMessage: 'notAValidHexColor' },
    { type: 'date', errorMessage: 'notaDate' },
    { type: 'url', errorMessage: 'notAValidURL' }
  ]

  const getTypeMapping = (type, property) => {
    let query = {}
    if (type) query.type = type
    const result = _.find(typeMapping, query)
    return (property ? _.get(result, property) : result)
  }

  /**
   * Checks and sanitizes inputs
   * Function returns an error message or the sanitized parameters
   *
   * @param params.params OBJECT params object (e.g. from body paylod) to sanitize (example { id: 1, user: 'tom' })
   * @param params.fields ARRAY array of field definitions
   * @param params.adminLevel INT level of the requesting user, will be compared against field's adminLevel
   *
   * @param return.error OBJECT returned error message (if there is an error)
   * @param return.params OBJECT returned sanitized object (invalid keys are removed)
   */

  const checkAndSanitizeValues = (params) => {
    const paramsToCheck = params.params
    if (!_.isObject(paramsToCheck)) return { error: { message: 'params_required' } }
    let fields = params.fields
    if (!_.isArray(fields) || !_.size(fields)) return { error: { message: 'fields_required' } }

    const adminLevel = _.get(params, 'adminLevel')
    const omitFields = _.get(params, 'omitFields')

    let error
    let deprecated = []
    _.some(fields, (field) => {
      // FIELD definitions
      let fieldName = field.field
      let minLength = _.isNumber(field.minLength) ? field.minLength : 2
      let allowedValues = _.get(field, 'enum', _.get(field, 'isMemberOf.group'))
      if (_.isString(allowedValues)) {
        // placeholder for enum:
        switch(allowedValues) {
          case 'iso-639-1':
            allowedValues = _.map(iso639, 'iso-639-1')
            break
          case 'iso-639-2':
            allowedValues = _.map(iso639, 'iso-639-2')
            break
          case 'countrylist':
            allowedValues = _.map(acCountryList.shortList(), 'name')
            break
          default:
            error = { message: 'enum_notDefined' }
            break
        }
      }

      let value = _.get(paramsToCheck, fieldName)

      // mark deprecated fields
      if (_.get(field, 'deprecated') && value) deprecated.push(fieldName)

      /// SPECIAL FIELDS
      // special field - can be string or integer -> determine type and then use type settings
      if (field.type === 'integer | string' && value) {
        if (!_.isString(value) && !_.isFinite(parseInt(value))) {
          error = { message: fieldName + '_neitherStringNorInteger' }
          return {
            error
          }
        }
        if (_.isString(value)) {
            field.type = 'string'
        }
        else if (_.isFinite(parseInt(value))) {
          field.type = 'integer'
        }
      }
      // special field - can be boolean or integer -> determine type and then use type settings
      if (field.type === 'integer | boolean' && value) {
        if (!_.isBoolean(value) && !_.isFinite(parseInt(value))) {
          error = { message: fieldName + '_neitherBooleanNorInteger' }
          return {
            error
          }
        }
        if (_.isBoolean(value)) {
            field.type = 'boolean'
        }
        else if (_.isFinite(parseInt(value))) {
          field.type = 'integer'
        }
      }
      ///// END SPECIAL FIELDS

      // REQUIREMENTS
      let fieldIsRequired = false
      if (_.has(field, 'required')) {
        if (!_.isBoolean(field.required)) {
          // conditional field
          if (_.get(paramsToCheck, field.required)) fieldIsRequired = true
          if (_.get(paramsToCheck, field.required) && !_.has(paramsToCheck, fieldName)) {
            error = { message: 'field_' + fieldName + '_required', additionalInfo: { condition: _.get(field, 'required') } }        
          }
        }
        else {
          if (_.get(field, 'required')) {
            fieldIsRequired = true
            if (!_.has(paramsToCheck, fieldName)) {
              error = { message: 'field_' + fieldName + '_required' }
            }
          }
        }
      }

      if (error) {
        // do not process other conditions
      }
      else if (!fieldIsRequired && _.isNil(_.get(paramsToCheck, fieldName))) {
        // do nothing -> the value is optional and not present
      }
      else if (field.nullAllowed && _.isNull(_.get(paramsToCheck, fieldName))) {
        // do nothing null is allowed and sent!
      }
      else if (_.get(field, 'adminLevel') && adminLevel < _.get(field, 'adminLevel')) {
        if (omitFields) {
          fields = _.filter(fields, item => {
            if (item.field !== fieldName) return item
          })
        }
        else {
          error = { message: 'fieldName_adminLevelNotSufficient', additionalInfo: { adminLevel, required: _.get(field, 'adminLevel') } }
        }
      }
      else if (_.indexOf(['number', 'integer', 'long', 'short', 'float'], field.type) > -1) {
        if (!_.isFinite(parseInt(value))) error = { message: fieldName + '_' + getTypeMapping('integer', 'errorMessage') }

        //  Number types - usually we allow only non-negative values (unsigned). If you want negative values, set type.subtype 'signed'
        if (field.type === 'number') console.error('SANITIZER - number should not be used, be more precise')
        if (field.type === 'number') field.type = 'integer'

        const subtype = _.get(field, 'subtype')
        let ranges = {
          integer: [(subtype === 'signed' ? -Math.pow(2, 31) : 0), Math.pow(2, 31)], 
          long: [(subtype === 'signed' ? -(Math.pow(2,53) - 1) : 0), Math.pow(2, 53)-1],
          short: [(subtype === 'signed' ? -Math.pow(2, 15) : 0), Math.pow(2, 15)],
          float: [(subtype === 'signed' ? -Math.pow(2, 31) : 0), Math.pow(2, 31)]
        }
        let range = _.get(field, 'range', _.get(ranges, field.type, ranges.integer))

        if (field.type === 'float') value = parseFloat(value)
        else value = parseInt(value)

        let lowest = _.first(range)
        let highest = _.size(range) === 2 && _.last(range)
        if (value < lowest || (highest && value > highest)) {
          error = { message: fieldName + '_outOfRange', additionalInfo: { range, value } }
        }
      }
      else if (field.type === 'string') {
        if (!_.isString(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        else if (value.length < minLength) error = { message: fieldName + '_stringTooShort_minLength' + minLength }
        else if (_.get(field, 'maxLength') && value.length > _.get(field, 'maxLength')) {
          if (_.get(field, 'convert')) {
            _.set(paramsToCheck, fieldName, value.substring(0, _.get(field, 'maxLength')))
          }
          else error = { message: fieldName + '_stringTooLong_maxLength' + field.maxLength }
        }
      }
      else if (field.type === 'boolean') {
        // GET params are strings -> try to make the boolean
        if (_.indexOf(['true', 'false'], value) > -1) {
          // convert string to bool params
          if (value === 'true') value = true
          else value = false
          _.set(paramsToCheck, fieldName, value)
        }
        if (!_.isBoolean(value)) {
          error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        }
      }
      else if (field.type === 'array') {
        if (!_.isArray(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        if (field.maxSize && _.size(value) > field.maxSize) error = { message: fieldName + '_maxSizeBoundary', additionalInfo: { maxSize: field.maxSize } }
        if (field.minSize && _.size(value) < field.minSize) error = { message: fieldName + '_minSizeBoundary', additionalInfo: { minSize: field.minSize } }
        if (field.valueType) {
          // very value of the array must be of this type
          _.every(value, v => {
            const fieldsToCheck = {
              params: {
                valToCheck: v
              },
              fields: [{ field: 'valToCheck', type: _.get(field, 'valueType'), wildcardAllowed: _.get(field, 'wildcardAllowed') }]
            }
            const check = checkAndSanitizeValues(fieldsToCheck)
            if (_.get(check, 'error')) {
              error = { message: fieldName + '_atLeastOneValueFailed', additionalInfo: { value: v, type: _.get(field, 'valueType') } }
              return false
            }
            return true
          })
        }

        const schema = field.schema
        if (!error && _.isFunction(_.get(schema, 'verify'))) {
          error = schema.verify(value)
        }
      }
      else if (field.type === 'object') {
        if (!_.isPlainObject(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }

        const schema = field.schema
        if (!error && _.isFunction(_.get(schema, 'verify'))) {
          error = schema.verify(value)
        }

        // modern approach without verify function: 
        // object can have properties with the same structure as the original field
        if (!error && _.get(field, 'properties')) {
          const fieldsToCheck = {
            params: value,
            fields: _.get(field, 'properties'),
            prefix: fieldName,
            adminLevel,
            omitFields
          }
          const check = checkAndSanitizeValues(fieldsToCheck)
          if (_.get(check, 'error')) error = _.get(check, 'error')
          else _.set(paramsToCheck, fieldName, _.get(check, 'params'))
        }
      }
      else if (field.type === 'base64') {
        if (!_.isString(value)) error = { message: fieldName + '_mustBeString' }

        // value must have a length that can be divided by 4, otherwise it needs padding with =
        // https://en.wikipedia.org/wiki/Base64#Padding
        let l = value.length
        let pad = l % 4
        if (!validator.isBase64(_.padEnd(value, (l+pad), '='))) error = { message: fieldName + '_notABase64String' }
        if (field.convert) {
          _.set(paramsToCheck, fieldName, Buffer.from(value, 'base64').toString())
        }
      }
      else if (field.type === 'countryCode') {
        if (!acCountryList.query({ iso2: value })) {
          error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        }
      }
      else if (field.type === 'fileExtension') {
        value = _.toLower(value)
        if (!_.find(fileExtensions, { ext: value })) {
          error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        }
        _.set(paramsToCheck, fieldName, value)
      }
      else if (_.startsWith(field.type, 'iso-639')) {
        // use exact fields (iso-639-1,iso-639-2) or just iso-639 which tries to match iso-639-2 and falls back to iso-639-1
        let query = {}
        let iso
        if (field.type === 'iso-639') {
          iso = _.find(iso639, { 'iso-639-2': value }) || _.find(iso639, { 'iso-639-1': value })
        }
        else {
          _.set(query, field.type, value)
          iso = _.find(iso639, query)  
        }
        if (!iso) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        else if (field.convert) {
          _.set(paramsToCheck, fieldName, _.get(iso, field.convert))
        }
      }
      else if (field.type === 'hashids') {
        if (!_.isString(value)) error = { message: fieldName + '_mustBeString' }
        const hashids = new Hashids()
        value = hashids.decode(value)

        if (!_.isArray(value)) error = { message: fieldName + '_decodedValue_notAnArray' }
        else if (!_.size(value)) error = { message: fieldName + '_decodedValue_arrayIsEmpty' }
        else {
          _.set(paramsToCheck, fieldName, value)
        }
      }
      else if (field.type === 'ip') {
        const version = _.get(field, 'version')
        if (version && !validator.isIP(value, version)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage'), additionalInfo: { version } }
        if (!validator.isIP(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
      }
      else if (field.type === 'cidr') {
        // cidr can be a plain value of an array of objects with properties cidr and optional type
        let checkItem = value
        if (!_.isArray(value)) {
          checkItem =  [{ cidr: value }]
        }
        let check = acip.checkCIDR({ cidr: checkItem })
        if (check) {
          error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage'), additionalInfo: _.get(check, 'additionalInfo') }
        }
      }
      else if (field.type === 'email') {
        if (!validator.isEmail(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
      }
      else if (field.type === 'url') {
        const protocols = _.get(field, 'protocols', ['http', 'https'])
        const require_tld = _.get(field, 'require_tld', true)
        const require_protocol = _.get(field, 'require_protocol', true)
        if (!validator.isURL(value, { protocols, require_tld, require_protocol })) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
      }
      else if (field.type === 'fqdn') {
        if (_.get(field, 'wildcardAllowed')) {
          if (!validator.isFQDN(value.replace('*.', ''))) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        }
        else {
          if (!validator.isFQDN(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        }
      }
      else if (field.type === 'uuid') {
        const uuidVersion = _.get(field, 'uuidVersion', 4)
        if (!validator.isUUID(value, uuidVersion)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage'), additionalInfo: { uuidVersion } }
      }
      else if (field.type === 'gps') {
        // test value for a combination of LAT, LNG and optional third, comma-separated distance value (as number)
        const parts = _.split(value, ',')
        if (_.size(parts) < 2 || _.size(parts) > 3) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        else {
          const lat = parseFloat(parts[0])
          if (_.isNaN(lat)) error = { message: fieldName + '_latitudeMustBeANumber' }
          if (lat > 90 || lat < -90) error = { message: fieldName + '_latitudeOutOfRange', additionalInfo: { range: [-90, 90] } }
          const lon = parseFloat(parts[1])
          if (_.isNaN(lon)) error = { message: fieldName + '_longitudeMustBeANumber' }
          if (lon > 180 || lon < -180) error = { message: fieldName + '_longitudeOutOfRange', additionalInfo: { range: [-180, 180] } }
          const distance = parseInt(parts[2])
          if (distance && _.isNaN(distance)) error = { message: fieldName + '_distanceMustBeANumber' }  
        }
      }
      else if (field.type === 'ratio') {
        // ratio looks like this NUMBER:NUMBER
        let parts = _.split(value, ':')
        if (_.size(parts) !== 2) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        let ratio = _.map(parts, parseFloat)
        if (!_.isNumber(_.first(ratio)) || _.isNaN(_.first(ratio))) error = { message:  fieldName + '_firstValueOfRatioMustBeAFiniteNumber', additionalInfo: { ratio } }
        else if (!_.isNumber(_.last(ratio)) || _.isNaN(_.last(ratio))) error = { message: fieldName + '_lastValueOfRatioMustBeAFiniteNumber', additionalInfo: { ratio } }
        else _.set(paramsToCheck, fieldName, ratio)
      }
      else if (field.type === 'rgb') {
        const includePercentValues = _.get(field, 'includePercentValues', true)
        // rgb can be a string like 10,100,255 or like rgb(10,100,255)
        if (!_.startsWith(value, 'rgb')) value = `rgb(${value})`
        if (!validator.isRgbColor(value, includePercentValues)) error = { message: fieldName + '_notAValidRGB', additionalInfo: { includePercentValues } }
      }
      else if (field.type === 'hexColor') {
        if (!validator.isHexColor(value)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
      }
      else if (field.type === 'date') {
        // Checks if the given value is a valid date or datetime
        if (field.dateFormat) {
          if (!date.isValid(value, field.dateFormat)) error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
        }
        else {
          // test multiple formats
          const allowedDateFormats = [
            'YYYY-MM-DD',
            'DD.MM.YYYY',
            'DD/MM/YYYY',
            'MM/DD/YYYY',
            'YYYY-MM-DD',
            "YYYY-MM-DD HH:mm:ss",
            "YYYY-MM-DDTHH:mm:ss.SSSZ"
          ]
          error = { message: fieldName + '_' + getTypeMapping(field.type, 'errorMessage') }
          _.some(allowedDateFormats, format => {
            if (date.isValid(value, format)) {
              error = null
              return true
            }
          })
          if (error && _.isFinite(Date.parse(value))) {
            error = null
          }
        }
      }
      else if (field.type) {
        // type is set but not defined here
        console.error('SANITIZER - type not defined for type %s, field %s, value %s', field.type, fieldName, value)
        error = { message: fieldName + '_typeCheck_' + field.type + '_notDefined' }
      }

      if (!error && allowedValues && value) {
        if (_.isArray(value)) {
          if (_.size(value) && !_.size(_.intersection(value, allowedValues))) {
            error = { message: fieldName + '_notAnAllowedValue', additionalInfo: { value } }
          }
        }
        else if (_.indexOf(allowedValues, value) < 0) {
          error = { message: fieldName + '_notAnAllowedValue', additionalInfo: { value } }
        }
      } 

      if (error && field.customErrorMessage) _.set(error, 'message', field.customErrorMessage)
      if (error && field.informSupport) _.set(error, 'additionalInfo.informSupport', true)

      return error
    })

    let sanitizedParams = _.pick(paramsToCheck, _.map(fields, 'field'))
    if (params.prefix && error) _.set(error, 'message', params.prefix + '_' + _.get(error, 'message', ''))

    return {
      params: (params.ignoreUnknownFields ? paramsToCheck : sanitizedParams),
      error,
      deprecated
    }
  }

  /*
   const fieldsToCheck = {
      params: params,
      fields: [
        { field: 'mediaContainerId', type: 'number', required: true }
      ]
    }
    const check = Sanitizer.checkAndSanitizeValues(fieldsToCheck)
    if (_.get(check, 'error')) return res.badRequest(_.get(check, 'error'))
    else params = _.get(check, 'params')
    */



  /**
   * Return a random value for a given type
   */
  const randomValue = (params) => {
    const type = _.get(params, 'type')
    const size = _.get(params, 'size', 1) // for arrays

    switch (type) {
      case 'boolean':
        return true
      case 'string':
        return Math.random().toString(36)
      case 'float':
        return _.random(100, true)
      case 'integer':
        return _.random(100)
      case 'short':
        return _.random(Math.pow(2,10), Math.pow(2,15))
      case 'long':
        return _.random(Math.pow(2,16), Math.pow(2,63))
      case 'iso-639-1':
        return _.get(_.sample(_.filter(iso639, 'iso-639-1')), 'iso-639-1')
      case 'iso-639-2':
        return _.get(_.sample(_.filter(iso639, 'iso-639-2')), 'iso-639-2')
      case 'array': {
        let arr = []
        for (let i=0; i<size; i+=1) {
          arr.push(Math.random().toString(36))
        }
        return arr
      }
      case 'countryCode':
        return _.get(acCountryList.random(), 'iso2')
    } 
  }

  return {
    checkAndSanitizeValues,
    randomValue,
    getTypeMapping
  }
}

module.exports = sanitizer()