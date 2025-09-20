# AC Sanitizer
Sanitizes  payloads with given field definitions

[![Node.js CI](https://github.com/AdmiralCloud/ac-sanitizer/actions/workflows/node.js.yml/badge.svg)](https://github.com/AdmiralCloud/ac-sanitizer/actions/workflows/node.js.yml)

### Version 4 - Breaking changes
Version 4 requires Node 16.


## Usage

```
const sanitizer = require('ac-sanitizer')

let fieldsToCheck = {
  params: {
    stringVar: 'This is a string'
  },
  fields: [
    { field: 'stringVar', type: 'string', required: true },
    { field: 'forceJob', type: 'boolean', adminLevel: 64 }
  ],
  adminLevel: 32 // optional adminLevel of the user - must be at least the one defined in fields
}
let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)
```

```
// COMPLEX EXAMPLE WITH NESTED PROPERTIES AND CONDITIONAL REQUIREMENTS

const sanitizer = require('ac-sanitizer')

let fieldsToCheck = {
  params: {
    obj: {
      f1: true
  },
  fields: [
    { field: 'obj', type: 'object', properties: [
      { field: 'f1', type: 'boolean' },
      { field: 'f2', type: 'boolean', required: 'f1' } // if f1 is true, then f2 is required
    ]}
  ]
}
let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)

```

## Field definition

Parameter | Type | Remarks
--- | --- | --- |
field | string | Name of the field
type | string | Type of the field to sanitize, see below for available values
required | [boolean OR string] | Set to true if required or set a path[^1] to a param (if that param is set, this value is required)
enum | [array OR string] | Optional list of allowed values. You can a string placeholder for certain standard lists (see below)
adminLevel | [integer] | Optional adminLevel required for this field
omitFields | [boolean] | If adminLevel is set and you do not have the proper adminLevel the sanitizer will just omit the field (and not return an error) if omitFields is true
convert | [boolean OR string] | Some types can be automatically converted (e.g. base64 to string)
valueType | [string] | Use it to sanitize values of an array by defining the allowed type here
strict | [boolean] | For objects only - if true and payload contains a property not defined, an error will be returned.
nullAllowed | [boolean] | If true, sending NULL is allowed.
optional | [boolean] | If true and the value is nil, the property is removed/omitted from payload. Helpful to cleanup response payloads.

[^1]: The path must be set with the parent propery as root, e.g. the actual field is settings.video.width, in property video the condition is then just "width" not the full path.

### ENUM lists
The following enum lists are available using a string placeholder

Placeholder | Items | Remarks
--- | --- | --- |
iso-639-1 | ISO 639-1 entries | e.g. de, en, fr, es...
iso-639-2 | ISO 639-2 entries | e.g. deu, eng, fra ...
countrylist | list of country names | e.g. Laos, Brazil, Norway...

### Convert
Some types allow automatic conversion:
Type | Example | Remarks
--- | --- | --- |
integer | 60.1 -> 60 | Convert incoming number to integer - this way you can make your check more lenient
string | Hello Developer -> Hello (with maxLength = 5) | Reduce string to max length
base64 | SGVsbG8= -> Hello | Convert base64 encoded string to UTF-8 string
iso-639 | { iso-639-2: 'tlh', translations: [] } -> tlh (with convert=iso-639-2) | Returns only the select property for the ISO-639 object
splitSpaceSeparated | user_read%20user_write -> ['user_read', 'user_write'] | Converts an URL encoded, space separated string into an array (e.g. for OAuth scopes)


## Available types

Type | Options | Remarks
--- | --- | --- |
any | | Any can be string, integer, boolean, object or array - it will be automatically detected.
array | unique | If unique=true, duplicate entries will be removed from array
base64 | | Checks if a string is base64 encoded, optional with field option "convert" (to string)
boolean | | 
cidr | | Check CIDR, see example
integer \| boolean |  | Value can be an integer OR a boolean
date | dateFormat | Date or date time, support various date formats (e.g. DD.MM.YYYY, DD/MM/YYYY, YYYY-MM-DD, etc) as well as a custom format defined in dateFormat.
fqdn | wildcardAllowed (bool) | Fully qualified domain names, optional with wildcard subdomain (e.g. *.admiralcloud.com)
email | | a@b.c
float | | 0 - 2^31
fileExtension | |
gps | | Can be a string of "LAT,LNG" or one including a distance as 3rd parameter like "LAT,LNG,DISTANCE".
hashids | | HashIds - https://hashids.org
hexColor | | Check valid hexadecimal color like #ff99cc
integer | | 0 - 2^31
integer \| string |  | Value can be an integer OR a string
iso-639-1 | convert | With convert = nativeName you can retrieve the native name of the given ISO string
iso-639-2 | convert | With convert = nativeName you can retrieve the native name of the given ISO string
ip | version, anonymize, replacement | version can be "4" or "6", defaults to "4", anonymize can be the number of octets/segments to anonymize, replacement (optional) defines the replacement character for IPv4 (defaults to 0)
long | | 0 - 2^63
object | properties | Use properties to define object structure, properties is equal to fields array
number | | Should no be used - use integer, long, short, floag
ratio | | x:y
rgb | | Check for valid RGB value (r,g,b) or (r%,g%, b%)
short | | 0 - 2^15
string | minLength (int), maxLength (int), ignoreCase, splitSpaceSeparated | With ignoreCase=true enum checks are case insensitive (e.g. abc in ['ABC'] is valid) 
url| protocols, require_tld, require_protocol | Default values: protocols ['http', 'https'], required_tld true, require_protocol true

# Examples
## CIDR
```
// CIDR Example

const sanitizer = require('ac-sanitizer')

let fieldsToCheck = {
  params: {
    cidr: [{ cidr: '8.8.8.8/32' }]
  },
  fields: [
    { field: 'cidr', type: 'cidr' }
  ]
}
let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)


// multiple mixed CIDR
let fieldsToCheck = {
  params: {
    cidr: [
      { cidr: '8.8.8.8/32' },
      { cidr: '::ffff:127.0.0.1', type: 'ipv6' }
    ]
  },
  fields: [
    { field: 'cidr', type: 'cidr' }
  ]
}
let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)

```

## IP
```
// CIDR Example

const sanitizer = require('ac-sanitizer')

let fieldsToCheck = {
  params: {
    ip: '8.8.8.8/32
  },
  fields: [
    { field: 'ip, type: 'ip', anonymize: 4 }
  ]
}
let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)
// ip -> 8.8.0.0
```

## Objects
By default properties which are not defined will be ignored and removed from payload.

### Objects with strict mode activate
In strict mode, only defined properties are allowed.
```
let fieldsToCheck = {
  params: {
    settings: {
      allowed: true,
      notAllowed: true
    }
  },
  fields: [
    { field: 'settings', type: 'object', strict: true, properties: [
      { field: 'allowed', type: 'boolean' }
    ] }
  ]
}
let test = sanitizer.checkAndSanitizeValues(fieldsToCheck)
// error: object_settings_containsInvalidProperties

```

## Links
- [Website](https://www.admiralcloud.com/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud AG, Mark Poepping