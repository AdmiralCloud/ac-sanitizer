# AC Sanitizer
Sanitizes  payloads with given field definitions

## Usage

```
const sanitizer = require('ac-sanitizer')

let fieldsToCheck = {
  params: {
    stringVar: 'This is a string'
  },
  fields: [
    { field: 'stringVar', type: 'string, required: true },
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
    { field: 'obj', type: 'object, properties: [
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
required | [boolean|string] | Set to true if required or set a path to a param (if that param is set, this value is required)
enum | [array|string] | Optional list of allowed values. You can a string placeholder for certain standard lists (see below)
adminLevel | [integer] | Optional adminLevel required for this field
omitFields | [boolean] | If adminLevel is set and you do not have the proper adminLevel the sanitizer will just omit the field (and not return an error) if omitFields is true
convert | [boolean|string] | Some types can be automatically converted (e.g. base64 to string)
valueType | [string] | Use it to sanitize values of an array by defining the allowed type here

### ENUM lists
The following enum lists are available using a string placeholder

Placeholder | Items | Remarks
--- | --- | --- |
iso-639-1 | ISO 639-1 entries | e.g. de, en, fr, es...
iso-639-2 | ISO 639-2 entries | e.g. deu, eng, fra ...
countrylist | list of country names | e.g. Laos, Brazil, Norway...


## Available types

Type | Options | Remarks
--- | --- | --- |
base64 | | Checks if a string is base64 encoded, optional with field option "convert" (to string)
boolean | | 
cidr | | Check CIDR, see example
integer \| boolean |  | Value can be an integer OR a boolean
date | dateFormat | Date or date time, support various date formats (e.g. DD.MM.YYYY, DD/MM/YYYY, YYYY-MM-DD, etc) as well as a custom format defined in dateFormat.
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
ip | version | version can be "4" or "6", defaults to "4"
long | | 0 - 2^63
object | properties | Use properties to define object structure, properties is equal to fields array
number | | Should no be used - use integer, long, short, floag
ratio | | x:y
rgb | | Check for valid RGB value (r,g,b) or (r%,g%, b%)
short | | 0 - 2^15
string | minLength (int), maxLength (int)| 
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

## Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud, Mark Poepping