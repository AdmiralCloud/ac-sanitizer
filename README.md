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

## Field definition

Parameter | Type | Remarks
--- | --- | --- |
field | string | Name of the field
type | string | Type of the field to sanitize, see below for available values
required | [boolean] | Set to true if required
enum | [array|string] | Optional list of allowed values. You can a string placeholder for certain standard lists (see below)
adminLevel | [integer] | Optional adminLevel required for this field
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
date | | Date or date time, support various date formats (e.g. DD.MM.YYYY, DD/MM/YYYY, YYYY-MM-DD, etc)
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
number | | Should no be used - use integer, long, short, floag
ratio | | x:y
rgb | | Check for valid RGB value (r,g,b) or (r%,g%, b%)
short | | 0 - 2^15
string | minLength (int), maxLength (int)| 


## Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud, Mark Poepping