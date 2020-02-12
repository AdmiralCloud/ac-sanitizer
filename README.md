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
required | [boolean] | Set to true if requried
adminLevel | [integer] | Optional adminLevel required for this field

## Available types

Type | Options | Remarks
--- | --- | --- |
float | | 0 - 2^31
integer | | 0 - 2^31
ip | version | version can be "4" or "6", defaults to "4"
email | | a@b.c
hashids | | HashIds - https://hashids.org
long | | 0 - 2^63
number | | Should no be used - use integer, long, short, floag
short | | 0 - 2^15
string | minLength (int), maxLength (int)| 



## Links
- [Website](https://www.admiralcloud.com/)
- [Twitter (@admiralcloud)](https://twitter.com/admiralcloud)
- [Facebook](https://www.facebook.com/MediaAssetManagement/)

## License
[MIT License](https://opensource.org/licenses/MIT) Copyright © 2009-present, AdmiralCloud, Mark Poepping