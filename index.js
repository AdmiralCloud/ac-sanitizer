const _ = require('lodash')
const validator = require('validator')
const Hashids = require('hashids')

const sanitizer = function() {
  /**
   * Checks and sanitizes inputs
   * Function returns an error message or the sanitized parameters
   *
   * @param params.params OBJECT params object (e.g. from body paylod) to sanitize (example { id: 1, user: 'tom' })
   * @param params.fields ARRAY array of field definitions
   *
   * @param return.error OBJECT returned error message (if there is an error)
   * @param return.params OBJECT returned sanitized object (invalid keys are removed)
   */

  const checkAndSanitizeValues = (params) => {
    const paramsToCheck = params.params
    if (!_.isObject(paramsToCheck)) return { error: { message: 'params_required' } }
    const fields = params.fields
    if (!_.isArray(fields) || !_.size(fields)) return { error: { message: 'fields_required' } }

    let error
    let deprecated = []
    _.some(fields, (field) => {
      // FIELD definitions
      let fieldName = field.field
      let minLength = _.isNumber(field.minLength) ? field.minLength : 2
      let allowedValues = _.get(field, 'isMemberOf.group')

      let value = _.get(paramsToCheck, fieldName)

      // mark deprecated fields
      if (_.get(field, 'deprecated') && value) deprecated.push(fieldName)

      if (field.required && !_.has(paramsToCheck, fieldName)) error = { message: 'field_' + fieldName + '_required' }
      else if (_.isNil(_.get(paramsToCheck, fieldName))) {
        // do nothing -> the value is optional and not present
      }
      else if (field.nullAllowed && _.isNull(_.get(paramsToCheck, fieldName))) {
        // do nothing null is allowed and sent!
      }
      else if (allowedValues && _.indexOf(allowedValues, value) < 0) {
        error = { message: fieldName + '_notanAllowedValue' }
      }
      else if (_.indexOf(['number', 'integer', 'long', 'short', 'float'], field.type) > -1) {
        if (!_.isFinite(parseInt(value))) error = { message: fieldName + '_notaFiniteNumber' }

        //  Number types - usually we allow only non-negative values (unsigned). If you want negative values, set type.subtype 'signed'
        if (field.type === 'number') console.error('SANITIZER - number should not be used, be more precise')
        if (field.type === 'number') field.type = 'integer'

        let ranges = {
          integer: [0, Math.pow(2, 31)],
          long: [0, Math.pow(2, 63)],
          short: [0, Math.pow(2, 15)],
          float: [0, Math.pow(2, 31)]
        }
        let range = _.get(field, 'range', _.get(ranges, field.type, ranges.integer))

        if (field.type === 'float') value = parseFloat(value)
        else value = parseInt(value)

        let lowest = _.first(range)
        let highest = _.last(range)
        if (value < lowest || value > highest) {
          error = { message: fieldName + '_outOfRange', additionalInfo: { range } }
        }
      }
      else if (field.type === 'string') {
        if (!_.isString(value)) error = { message: fieldName + '_notAString' }
        if (value.length < minLength) error = { message: fieldName + '_stringTooShort_minLength' + minLength }
        if (_.get(field, 'maxLength') && value.length > _.get(field, 'maxLength')) error = { message: fieldName + '_stringTooLong_maxLength' + field.maxLength }
        if (_.get(field, 'isMemberOf.group') && _.indexOf(_.get(field, 'isMemberOf.group', []), value) < 0) {
          error = { message: fieldName + '_notanAllowedValue' }
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
          error = { message: fieldName + '_notBoolean' }
        }
      }
      else if (field.type === 'array') {
        if (!_.isArray(value)) error = { message: fieldName + '_notAnArray' }
        if (field.maxSize && _.size(value) > field.maxSize) error = { message: fieldName + '_maxSizeBoundary', additionalInfo: { maxSize: field.maxSize } }

        const schema = field.schema
        if (!error && _.isFunction(_.get(schema, 'verify'))) {
          error = schema.verify(value)
        }
      }
      else if (field.type === 'object') {
        if (!_.isPlainObject(value)) error = { message: fieldName + '_notAPlainObject' }

        const schema = field.schema
        if (!error && _.isFunction(_.get(schema, 'verify'))) {
          error = schema.verify(value)
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
        const version = _.get(field, 'version', '4')
        if (!validator.isIP(value, version)) error = { message: fieldName + '_notAnIP', additionalInfo: { version } }
      }
      else if (field.type === 'email') {
        if (!validator.isEmail(value)) error = { message: fieldName + '_notAValidEmailAddress' }
      }
      else if (field.type === 'uuid') {
        const uuidVersion = _.get(field, 'uuidVersion', 4)
        if (!validator.isUUID(value, uuidVersion)) error = { message: fieldName + '_notAValidUUID', additionalInfo: { uuidVersion } }
      }
      else if (field.type) {
        // type is set but not defined here
        console.error('SANITIZER - type not defined for type %s, field %s, value %s', field.type, fieldName, value)
        error = { message: fieldName + '_typeCheck_' + field.type + '_notDefined' }
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

  return {
    checkAndSanitizeValues
  }
}

module.exports = sanitizer()