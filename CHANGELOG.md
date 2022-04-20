<a name="3.9.13"></a>

## [3.9.13](https://github.com/mmpro/ac-sanitizer/compare/v3.9.12..v3.9.13) (2022-04-20 11:35:54)


### Bug Fix

* **App:** Update package with correct AVIF mimetype | VD | [19dc7d302f090f9723a9495859644f72a8cee7c1](https://github.com/mmpro/ac-sanitizer/commit/19dc7d302f090f9723a9495859644f72a8cee7c1)    
Update package with correct AVIF mimetype
* **App:** Update ac-file-extensions package (avif file extension) | VD | [0d50926001ebc741d0e6bf65f4c2863fad684d93](https://github.com/mmpro/ac-sanitizer/commit/0d50926001ebc741d0e6bf65f4c2863fad684d93)    
Update ac-file-extensions package (avif file extension)
* **App:** Update ac-file-extensions package | VD | [13eeb3dccd0154943a08913f719db9df9739582b](https://github.com/mmpro/ac-sanitizer/commit/13eeb3dccd0154943a08913f719db9df9739582b)    
Update ac-file-extensions package
### Chores

* **release:** v3.9.11 [ci skip] | [b2148644e40e42cd3bc19cda40cf549113c1f9df](https://github.com/mmpro/ac-sanitizer/commit/b2148644e40e42cd3bc19cda40cf549113c1f9df)    

* **release:** v3.9.10 [ci skip] | [266be8280314c2f37e15b3f362b7c590f691f525](https://github.com/mmpro/ac-sanitizer/commit/266be8280314c2f37e15b3f362b7c590f691f525)    

* **release:** v3.9.9 [ci skip] | [2fc8fbea1e4fcd1b981120cfde032ae6e3a6ad24](https://github.com/mmpro/ac-sanitizer/commit/2fc8fbea1e4fcd1b981120cfde032ae6e3a6ad24)    

<a name="3.9.12"></a>

## [3.9.12](https://github.com/mmpro/ac-sanitizer/compare/v3.9.11..v3.9.12) (2022-04-20 11:32:20)

### Bug Fix

* **App:** Minor fix to create random arrays with integers | MP | [f0858a9ec21104c4c7c7480b37ccb4bd62d3552a](https://github.com/mmpro/ac-sanitizer/commit/f0858a9ec21104c4c7c7480b37ccb4bd62d3552a)    
Allow creation of random array with integers
### Chores

* **App:** Updated packages | MP | [9b1132064b0a6082348f276edfe3e397c0f5203f](https://github.com/mmpro/ac-sanitizer/commit/9b1132064b0a6082348f276edfe3e397c0f5203f)    
Updated packages  
Related issues: [/issues#undefined](https://github.com//issues/undefined)
<a name="3.9.8"></a>

## [3.9.8](https://github.com/mmpro/ac-sanitizer/compare/v3.9.7..v3.9.8) (2021-11-27 13:26:51)


### Bug Fix

* **App:** Package updates | MP | [fa9229b239f26f4e95097b0924c2811f64473639](https://github.com/mmpro/ac-sanitizer/commit/fa9229b239f26f4e95097b0924c2811f64473639)    
Package updates, incl ac-fileExetnsion 2 (minor code change)
### Documentation

* **App:** Minor documentation updates | MP | [d3c407c5502b5b8f7bc6479c65afa87567c26ddf](https://github.com/mmpro/ac-sanitizer/commit/d3c407c5502b5b8f7bc6479c65afa87567c26ddf)    
Minor documentation updates for requirements with conditions. Added FQDN to README
<a name="3.9.7"></a>

## [3.9.7](https://github.com/mmpro/ac-sanitizer/compare/v3.9.6..v3.9.7) (2021-10-09 17:33:05)


### Bug Fix

* **App:** Fix for base64 | MP | [3e83ac766bf2157bdbc5fe8e05da839f85f49c07](https://github.com/mmpro/ac-sanitizer/commit/3e83ac766bf2157bdbc5fe8e05da839f85f49c07)    
Make sure base64 value is a string
<a name="3.9.6"></a>

## [3.9.6](https://github.com/mmpro/ac-sanitizer/compare/v3.9.5..v3.9.6) (2021-10-09 10:15:18)


### Bug Fix

* **App:** Package updates | MP | [d048ae6ba782418cdf24762c17ad456dc6299d9e](https://github.com/mmpro/ac-sanitizer/commit/d048ae6ba782418cdf24762c17ad456dc6299d9e)    
Package updates
<a name="3.9.5"></a>

## [3.9.5](https://github.com/mmpro/ac-sanitizer/compare/v3.9.4..v3.9.5) (2021-06-18 10:52:58)


### Bug Fix

* **App:** Check for type and isNaN to detect numbers | MP | [6f7b0acb982edfdaf67907f09c06f85dea948854](https://github.com/mmpro/ac-sanitizer/commit/6f7b0acb982edfdaf67907f09c06f85dea948854)    
isNaN of an array with one integer is detected as number, therefore not sufficient to check for number. Now we use type check and isNaN
### Tests

* **App:** Check against errors defined in test not in sanitizer response | MP | [a3b1213a53355deeed74fc488367af05703fa742](https://github.com/mmpro/ac-sanitizer/commit/a3b1213a53355deeed74fc488367af05703fa742)    
Otherwise we might not detect errors
<a name="3.9.4"></a>

## [3.9.4](https://github.com/mmpro/ac-sanitizer/compare/v3.9.3..v3.9.4) (2021-06-18 07:22:21)


### Bug Fix

* **App:** Fixed test for number | MP | [3f9a19b9b2478318d9980624d39dffcbfba2d3bc](https://github.com/mmpro/ac-sanitizer/commit/3f9a19b9b2478318d9980624d39dffcbfba2d3bc)    
Make sure array of numbers are not detected as valid number
### Chores

* **App:** Updated packages | MP | [811715e5c935d5cba16cfa37ceac4cda0528266a](https://github.com/mmpro/ac-sanitizer/commit/811715e5c935d5cba16cfa37ceac4cda0528266a)    
Updated packages
<a name="3.9.3"></a>

## [3.9.3](https://github.com/mmpro/ac-sanitizer/compare/v3.9.2..v3.9.3) (2021-05-11 07:16:13)


### Bug Fix

* **App:** Fixed handling of valueTypes in arrays | MP | [64281d78da1e51b4f3d93221d4848251ae96e7de](https://github.com/mmpro/ac-sanitizer/commit/64281d78da1e51b4f3d93221d4848251ae96e7de)    
Fixed handling of valueTypes in arrays
<a name="3.9.2"></a>

## [3.9.2](https://github.com/mmpro/ac-sanitizer/compare/v3.9.1..v3.9.2) (2021-05-11 04:25:41)


### Bug Fix

* **App:** Fixed array check | MP | [ae3bdc50a3458d580ca16e7e0f7c8711096db74b](https://github.com/mmpro/ac-sanitizer/commit/ae3bdc50a3458d580ca16e7e0f7c8711096db74b)    
If not array, stop checking further options for arrays like minSize
<a name="3.9.1"></a>

## [3.9.1](https://github.com/mmpro/ac-sanitizer/compare/v3.9.0..v3.9.1) (2021-05-05 15:15:50)


### Bug Fix

* **App:** Add minSize for array | MP | [8bb78f16d9032571ba40b5cef878b9638403e73a](https://github.com/mmpro/ac-sanitizer/commit/8bb78f16d9032571ba40b5cef878b9638403e73a)    
Add minSize for array
<a name="3.9.0"></a>
 
# [3.9.0](https://github.com/mmpro/ac-sanitizer/compare/v3.8.1..v3.9.0) (2021-05-05 14:28:16)


### Feature

* **App:** Add CIDR check | MP | [a2cadd76fe04a90bb9f208413f65ee6ae4ecfea1](https://github.com/mmpro/ac-sanitizer/commit/a2cadd76fe04a90bb9f208413f65ee6ae4ecfea1)    
Add CIDR check
### Bug Fix

* **App:** Allow wildcards for fqdn | MP | [eff6555d7446200629dd5d576d91b01963c0188b](https://github.com/mmpro/ac-sanitizer/commit/eff6555d7446200629dd5d576d91b01963c0188b)    
Allow wildcards for fqdn
<a name="3.8.1"></a>

## [3.8.1](https://github.com/mmpro/ac-sanitizer/compare/v3.8.0..v3.8.1) (2021-05-05 09:50:07)


### Bug Fix

* **App:** Minor fix regarding required fields | MP | [44b00053392768cef1525c8f77cf0cff3454c716](https://github.com/mmpro/ac-sanitizer/commit/44b00053392768cef1525c8f77cf0cff3454c716)    
Minor fix regarding required fields
<a name="3.8.0"></a>
 
# [3.8.0](https://github.com/mmpro/ac-sanitizer/compare/v3.7.4..v3.8.0) (2021-05-05 08:54:21)


### Feature

* **App:** Requirements can now depend on other field | MP | [2047fefcf22f88233f4b15dd0b472182a433deb9](https://github.com/mmpro/ac-sanitizer/commit/2047fefcf22f88233f4b15dd0b472182a433deb9)    
If field is required can now also be set by a path (instead of simple bool value).
### Bug Fix

* **App:** Base64: now automatic padding if base64 string is not dividable by 4 | MP | [cf8adbaa4fff131c93b1bd02a6ad25a383784cb2](https://github.com/mmpro/ac-sanitizer/commit/cf8adbaa4fff131c93b1bd02a6ad25a383784cb2)    
base64 string must have a length that can be divided by 4. If not, add = as padding to end.
<a name="3.7.4"></a>

## [3.7.4](https://github.com/mmpro/ac-sanitizer/compare/v3.7.3..v3.7.4) (2021-05-02 10:54:53)


### Bug Fix

* **App:** Improved error message if range error | MP | [29beb7d2c46291ac4574ac9cc8389e11666809af](https://github.com/mmpro/ac-sanitizer/commit/29beb7d2c46291ac4574ac9cc8389e11666809af)    
Add value that fails to additionalInfo if number/range fails
<a name="3.7.3"></a>

## [3.7.3](https://github.com/mmpro/ac-sanitizer/compare/v3.7.2..v3.7.3) (2021-05-02 08:55:00)


### Bug Fix

* **App:** Use proper camel-cased version of notAnAllowedValue | MP | [bb6cfb556e1404459917d0aa2705ccc10bf55174](https://github.com/mmpro/ac-sanitizer/commit/bb6cfb556e1404459917d0aa2705ccc10bf55174)    
Use proper camel-cased version of notAnAllowedValue and return wrong value in additionalInfo
### Chores

* **App:** Updated packages | MP | [364af2e338eaa8f9cf877f263832f525d148d9f7](https://github.com/mmpro/ac-sanitizer/commit/364af2e338eaa8f9cf877f263832f525d148d9f7)    
Updated packages
<a name="3.7.2"></a>

## [3.7.2](https://github.com/mmpro/ac-sanitizer/compare/v3.7.1..v3.7.2) (2021-04-13 15:41:00)


### Bug Fix

* **App:** Allow empty arrays | MP | [92c3a811062908011a5061d3e1651d7afaba617a](https://github.com/mmpro/ac-sanitizer/commit/92c3a811062908011a5061d3e1651d7afaba617a)    
Allow empty arrays
<a name="3.7.1"></a>

## [3.7.1](https://github.com/mmpro/ac-sanitizer/compare/v3.7.0..v3.7.1) (2021-03-17 13:13:27)


### Bug Fix

* **App:** Fixed RGB and date handling | MP | [964b646e044ee04d4375e2c10c51b1106c24908c](https://github.com/mmpro/ac-sanitizer/commit/964b646e044ee04d4375e2c10c51b1106c24908c)    
RGB can be a string like 100,150,255 or like rgb(100,150,255). Date is now checked using format strings
### Tests

* **App:** Fixed error recognition in test | MP | [12af2ebbde40902e03a043c04564107472041767](https://github.com/mmpro/ac-sanitizer/commit/12af2ebbde40902e03a043c04564107472041767)    
Errors were not properly detected in test mode.
### Chores

* **App:** Updated packages | MP | [04b492e0d3ee0e23a55711b853c323622bbad563](https://github.com/mmpro/ac-sanitizer/commit/04b492e0d3ee0e23a55711b853c323622bbad563)    
Updated packages
* **App:** Updated packages | MP | [482c310c547fe23dbc75b891ff0886214dbbcb6a](https://github.com/mmpro/ac-sanitizer/commit/482c310c547fe23dbc75b891ff0886214dbbcb6a)    
Updated packages
<a name="3.7.0"></a>
 
# [3.7.0](https://github.com/mmpro/ac-sanitizer/compare/v3.6.0..v3.7.0) (2021-02-06 05:59:05)


### Feature

* **App:** Added check for url | MP | [db9a868f897da9200ea48604a2445d8c11ac3be2](https://github.com/mmpro/ac-sanitizer/commit/db9a868f897da9200ea48604a2445d8c11ac3be2)    
You can now check for URLs, e.g. https://www.admiralcloud.com.
### Chores

* **App:** Updated packages | MP | [cfe69743c15fc38c6177eea618ff496fde399f6e](https://github.com/mmpro/ac-sanitizer/commit/cfe69743c15fc38c6177eea618ff496fde399f6e)    
Updated packages
<a name="3.6.0"></a>
 
# [3.6.0](https://github.com/mmpro/ac-sanitizer/compare/v3.5.2..v3.6.0) (2021-01-27 09:18:40)


### Feature

* **App:** Added check for integer or boolean | MP | [e986e4c667260138c353a5bbb9ae189a53f95dc4](https://github.com/mmpro/ac-sanitizer/commit/e986e4c667260138c353a5bbb9ae189a53f95dc4)    
Special check for fields that can be integer or boolean
<a name="3.5.2"></a>

## [3.5.2](https://github.com/mmpro/ac-sanitizer/compare/v3.5.1..v3.5.2) (2021-01-09 20:45:22)


### Bug Fix

* **App:** Minor fix for base64 decoding | MP | [e09a7cd4103918e510e1657602697e98e4da5b97](https://github.com/mmpro/ac-sanitizer/commit/e09a7cd4103918e510e1657602697e98e4da5b97)    
Minor fix for base64 decoding
### Tests

* **App:** Added test  | MP | [5a1edcca9bc2ee9843a8753c10d1384f0b046092](https://github.com/mmpro/ac-sanitizer/commit/5a1edcca9bc2ee9843a8753c10d1384f0b046092)    
Added tests to improve code coverage
### Chores

* **App:** Updated packages | MP | [59eddd54de70a58d8e3eb4d67ba49a8f125b87b0](https://github.com/mmpro/ac-sanitizer/commit/59eddd54de70a58d8e3eb4d67ba49a8f125b87b0)    
Updated packages
<a name="3.5.1"></a>

## [3.5.1](https://github.com/mmpro/ac-sanitizer/compare/v3.5.0..v3.5.1) (2021-01-07 11:55:04)


### Bug Fix

* **App:** IP version should be optional | MP | [d3d23537bde9ebb025893b88c8bca2b0baf4b25c](https://github.com/mmpro/ac-sanitizer/commit/d3d23537bde9ebb025893b88c8bca2b0baf4b25c)    
IP now detects IPv4 and IPv6 if you do not set version.
### Chores

* **App:** Updated packages | MP | [24543d24673364bd8c85fe542fd67cc11e98ae54](https://github.com/mmpro/ac-sanitizer/commit/24543d24673364bd8c85fe542fd67cc11e98ae54)    
Updated packages
<a name="3.5.0"></a>
 
# [3.5.0](https://github.com/mmpro/ac-sanitizer/compare/v3.4.3..v3.5.0) (2020-12-06 11:07:24)


### Feature

* **App:** Sanitizer can now check for FQDN | MP | [3be9aff02c0defd7a599c3cd092cb0575a2ca19f](https://github.com/mmpro/ac-sanitizer/commit/3be9aff02c0defd7a599c3cd092cb0575a2ca19f)    
You can now now check fully qualified domain names
<a name="3.4.3"></a>

## [3.4.3](https://github.com/mmpro/ac-sanitizer/compare/v3.4.2..v3.4.3) (2020-11-17 12:38:26)


### Bug Fix

* **App:** FileExtension are now case-insensitive | MP | [544bd1309349dfeafd7644de7108a2d4f1a32aa7](https://github.com/mmpro/ac-sanitizer/commit/544bd1309349dfeafd7644de7108a2d4f1a32aa7)    
You can use uppercase or lowercase file extensions. They will pass (if valid) and returned as lowercase.
### Chores

* **App:** Updated packages | MP | [68c13646e4277006dcbafaf53baeb2d3f7da49e3](https://github.com/mmpro/ac-sanitizer/commit/68c13646e4277006dcbafaf53baeb2d3f7da49e3)    
Updated packages
<a name="3.4.2"></a>

## [3.4.2](https://github.com/mmpro/ac-sanitizer/compare/v3.4.1..v3.4.2) (2020-11-15 12:59:32)


### Bug Fix

* **App:** Check for type of values in an array | MP | [14e1c6dc4c688ee838eb21f35bd1d523a1266de4](https://github.com/mmpro/ac-sanitizer/commit/14e1c6dc4c688ee838eb21f35bd1d523a1266de4)    
You can now define which type you expect as array values.
<a name="3.4.1"></a>

## [3.4.1](https://github.com/mmpro/ac-sanitizer/compare/v3.4.0..v3.4.1) (2020-11-15 12:37:23)


### Bug Fix

* **App:** Allow placeholder enum | MP | [5d77bcb39387dee913552b3a9387c07e0db2df0c](https://github.com/mmpro/ac-sanitizer/commit/5d77bcb39387dee913552b3a9387c07e0db2df0c)    
You can now use placeholders for enum (e.g. countrylist). See README for details.
<a name="3.4.0"></a>
 
# [3.4.0](https://github.com/mmpro/ac-sanitizer/compare/v3.3.1..v3.4.0) (2020-11-09 20:56:47)


### Feature

* **App:** Add check for file extensions | MP | [78b38071877072dec23dbd53922920cd2b40555d](https://github.com/mmpro/ac-sanitizer/commit/78b38071877072dec23dbd53922920cd2b40555d)    
Add check for file extensions from ac-file-extensions
### Bug Fix

* **App:** Error message are now available using getTypeMapping function | MP | [1c8f8ab6127a1e67d13e35ee50e1926b3a88f4e9](https://github.com/mmpro/ac-sanitizer/commit/1c8f8ab6127a1e67d13e35ee50e1926b3a88f4e9)    
Error message are now available using getTypeMapping function - this way they can be determined during external testing.
<a name="3.3.1"></a>

## [3.3.1](https://github.com/mmpro/ac-sanitizer/compare/v3.3.0..v3.3.1) (2020-11-09 15:44:07)


### Bug Fix

* **App:** String now allows parameter convert for maxSize | MP | [c65395e62b18fc37bb8662a6a4d4d590c3833f0c](https://github.com/mmpro/ac-sanitizer/commit/c65395e62b18fc37bb8662a6a4d4d590c3833f0c)    
Use convert in combination with maxSize for strings to truncate those strings to the max size instead of throwing an error
### Tests

* **App:** Added ISO8601 test | MP | [3d666b21598ac3cea31887073acf8f97a78c9c1a](https://github.com/mmpro/ac-sanitizer/commit/3d666b21598ac3cea31887073acf8f97a78c9c1a)    
Added ISO8601 test
<a name="3.3.0"></a>
 
# [3.3.0](https://github.com/mmpro/ac-sanitizer/compare/v3.2.0..v3.3.0) (2020-10-17 15:10:43)


### Feature

* **App:** Added date | MP | [8a847c60123ee22d52e00b52739726ba78a15074](https://github.com/mmpro/ac-sanitizer/commit/8a847c60123ee22d52e00b52739726ba78a15074)    
Added date check
<a name="3.2.0"></a>
 
# [3.2.0](https://github.com/mmpro/ac-sanitizer/compare/v3.1.0..v3.2.0) (2020-10-17 14:12:45)


### Feature

* **App:** Add RGB, hexColor and ratio | MP | [a88d1cef0d887d2e2f5a8323de2ffcba55bf85ef](https://github.com/mmpro/ac-sanitizer/commit/a88d1cef0d887d2e2f5a8323de2ffcba55bf85ef)    
Add RGB, hexColor and ratio
<a name="3.1.0"></a>
 
# [3.1.0](https://github.com/mmpro/ac-sanitizer/compare/v3.0.0..v3.1.0) (2020-10-17 13:23:03)


### Feature

* **App:** Add option to test for GPS coordinates | MP | [58a956307a15af39c11b9afaaf0b3449cb1b18ac](https://github.com/mmpro/ac-sanitizer/commit/58a956307a15af39c11b9afaaf0b3449cb1b18ac)    
Add option to test for GPS coordinates including distance
### Chores

* **App:** Updated packages | MP | [3f947d4574749348ff7d4955143fdab379a44156](https://github.com/mmpro/ac-sanitizer/commit/3f947d4574749348ff7d4955143fdab379a44156)    
Updated packages
* **App:** Updated packages | MP | [64cc82385fb1e5089e889fedbc05ccfd9c52211e](https://github.com/mmpro/ac-sanitizer/commit/64cc82385fb1e5089e889fedbc05ccfd9c52211e)    
Updated packages
<a name="3.0.0"></a>
 
# [3.0.0](https://github.com/mmpro/ac-sanitizer/compare/v2.3.6..v3.0.0) (2020-09-25 11:52:27)


### Bug Fix

* **App:** Long integer range is now determined by MAX_SAFE_INTEGER | MP | [07b539229727ff88a12aa0d958205ae3bbd9c87e](https://github.com/mmpro/ac-sanitizer/commit/07b539229727ff88a12aa0d958205ae3bbd9c87e)    
Long integer no longer allows values up to pow(2,63) as the are not safe in Javascript. Instead we now use MAX_SAFE_INTEGER. So values must be between -(Math.pow(2,53) - 1) and  Math.pow(2, 53)-1. Additionally subtype signed is allowed.
### Chores

* **App:** Updated packages | MP | [bc31eb57e3852729751d91b6c1678e13062d7ed9](https://github.com/mmpro/ac-sanitizer/commit/bc31eb57e3852729751d91b6c1678e13062d7ed9)    
Updated packages
* **App:** Updated packages | MP | [dd01a1aaabb036b2a8e5f689ca5d5ff1e2e5189a](https://github.com/mmpro/ac-sanitizer/commit/dd01a1aaabb036b2a8e5f689ca5d5ff1e2e5189a)    
Updated packages
## BREAKING CHANGES
* **App:** Long integer range has changed from POW 63 to POW 53 (MAX_SAFE_INTEGER)
<a name="2.3.6"></a>

## [2.3.6](https://github.com/mmpro/ac-sanitizer/compare/v2.3.5..v2.3.6) (2020-08-22 18:15:39)


### Bug Fix

* **App:** Force release after security update | MP | [e000cdb87d4eb3acbd37e34c7a2b769473c0cf29](https://github.com/mmpro/ac-sanitizer/commit/e000cdb87d4eb3acbd37e34c7a2b769473c0cf29)    
Package update after security warning
<a name="2.3.5"></a>

## [2.3.5](https://github.com/mmpro/ac-sanitizer/compare/v2.3.4..v2.3.5) (2020-08-22 17:41:10)


### Bug Fix

* **App:** Fixed enum and a string issue | MP | [0156a1ca6b7d50b53c1eb82e9bb09cc804868577](https://github.com/mmpro/ac-sanitizer/commit/0156a1ca6b7d50b53c1eb82e9bb09cc804868577)    
Enum checks must happen after type checks. String check should have an order: type, minLength, maxLength
<a name="2.3.4"></a>

## [2.3.4](https://github.com/mmpro/ac-sanitizer/compare/v2.3.3..v2.3.4) (2020-08-22 14:45:52)


### Bug Fix

* **App:** Fixed handling of required fields | MP | [a44ac1e61bf8b9fd2042c8303505b891e021b52f](https://github.com/mmpro/ac-sanitizer/commit/a44ac1e61bf8b9fd2042c8303505b891e021b52f)    
Fixed if a field has property null but is required
<a name="2.3.3"></a>

## [2.3.3](https://github.com/mmpro/ac-sanitizer/compare/v2.3.2..v2.3.3) (2020-08-22 13:45:43)


### Bug Fix

* **App:** Allow enum for arrays | MP | [fdc03c50d5dc1cb3f898fc2506fcd627e4bc9d2d](https://github.com/mmpro/ac-sanitizer/commit/fdc03c50d5dc1cb3f898fc2506fcd627e4bc9d2d)    
Arrays can have enum as array. They are matched against the given array and ok if at least one item matches.
<a name="2.3.2"></a>

## [2.3.2](https://github.com/mmpro/ac-sanitizer/compare/v2.3.1..v2.3.2) (2020-07-31 20:22:18)


### Bug Fix

* **App:** Allow range just with low value | MP | [68b111f0cda9843cf2badb936a634c2e93bae760](https://github.com/mmpro/ac-sanitizer/commit/68b111f0cda9843cf2badb936a634c2e93bae760)    
Allow range just with low value
<a name="2.3.1"></a>

## [2.3.1](https://github.com/mmpro/ac-sanitizer/compare/v2.3.0..v2.3.1) (2020-07-28 11:40:27)


### Bug Fix

* **App:** Enhanced random function | MP | [02235e85ec09bce98659dc51fd3aceefd6e77992](https://github.com/mmpro/ac-sanitizer/commit/02235e85ec09bce98659dc51fd3aceefd6e77992)    
Random function now supports more types
### Chores

* **App:** Updated packages | MP | [ba27444d8bc869ab277540706ae7d558dd79c384](https://github.com/mmpro/ac-sanitizer/commit/ba27444d8bc869ab277540706ae7d558dd79c384)    
Updated packages
<a name="2.3.0"></a>
 
# [2.3.0](https://github.com/mmpro/ac-sanitizer/compare/v2.2.2..v2.3.0) (2020-07-28 11:03:03)


### Feature

* **App:** New function for random values | MP | [b3d592c1f5291ad5d471f4963725970852e333aa](https://github.com/mmpro/ac-sanitizer/commit/b3d592c1f5291ad5d471f4963725970852e333aa)    
Added a new helper function that returns random values for a given type. This can be useful for automated testing in combination with the sanitizer.
<a name="2.2.2"></a>

## [2.2.2](https://github.com/mmpro/ac-sanitizer/compare/v2.2.1..v2.2.2) (2020-07-28 10:15:45)


### Bug Fix

* **App:** Add prefix for object sanitizing | MP | [b4285aba29c9ddc14144d355fde4c97acba6653c](https://github.com/mmpro/ac-sanitizer/commit/b4285aba29c9ddc14144d355fde4c97acba6653c)    
Add prefix for object sanitizing
### Chores

* **App:** Updated packages | MP | [7c6a4045819eb3f04c3b7b46713d32067ec2c035](https://github.com/mmpro/ac-sanitizer/commit/7c6a4045819eb3f04c3b7b46713d32067ec2c035)    
Updated packages
<a name="2.2.1"></a>

## [2.2.1](https://github.com/mmpro/ac-sanitizer/compare/v2.2.0..v2.2.1) (2020-07-22 14:34:31)


### Bug Fix

* **App:** Add function to check for ISO-639-2 fallback to -1 | MP | [a12aec627fe01687147a5e72b5af5cd056423e47](https://github.com/mmpro/ac-sanitizer/commit/a12aec627fe01687147a5e72b5af5cd056423e47)    
Use iso-639 type to check for ISO-639-2 or ISO-639-1
<a name="2.2.0"></a>
 
# [2.2.0](https://github.com/mmpro/ac-sanitizer/compare/v2.1.3..v2.2.0) (2020-07-22 13:30:55)


### Feature

* **App:** Added sanitizing for ISO-639 values | MP | [cd5626a603b76fb606b29ceef7bf08b99f5dff38](https://github.com/mmpro/ac-sanitizer/commit/cd5626a603b76fb606b29ceef7bf08b99f5dff38)    
You can now check ISO-639-1 and ISO-639-2 values
### Chores

* **App:** Updated packages | MP | [f217bdbc378b49db5d46ecfb06f79826b198d46a](https://github.com/mmpro/ac-sanitizer/commit/f217bdbc378b49db5d46ecfb06f79826b198d46a)    
Updated packages
<a name="2.1.3"></a>

## [2.1.3](https://github.com/mmpro/ac-sanitizer/compare/v2.1.2..v2.1.3) (2020-07-19 10:18:48)


### Bug Fix

* **App:** Use enum instead of isMemberOf | MP | [a24b9e86787a2d2a31fdc3160c86eae488b9e349](https://github.com/mmpro/ac-sanitizer/commit/a24b9e86787a2d2a31fdc3160c86eae488b9e349)    
Start using enum as array of allowed values instead of isMemberOf. The latter is still supported for legacy.
### Chores

* **App:** Updated packages | MP | [ccf0de44702a765cbf8cdbd72c63088c62837ffb](https://github.com/mmpro/ac-sanitizer/commit/ccf0de44702a765cbf8cdbd72c63088c62837ffb)    
Updated packages
<a name="2.1.2"></a>

## [2.1.2](https://github.com/mmpro/ac-sanitizer/compare/v2.1.1..v2.1.2) (2020-07-19 10:13:45)


### Bug Fix

* **App:** Added modern approach for object validation | MP | [bf8bed8b354cc2390d998f9ef182394cebb46fd2](https://github.com/mmpro/ac-sanitizer/commit/bf8bed8b354cc2390d998f9ef182394cebb46fd2)    
You can define a properties array of objects, similar to the main one to sanitize objects. This way no custom verify function is necessary (although it is still available for edge cases)
<a name="2.1.1"></a>

## [2.1.1](https://github.com/mmpro/ac-sanitizer/compare/v2.1.0..v2.1.1) (2020-05-24 09:21:15)


### Bug Fix

* **App:** Do not return error if value is optional for string or integer | MP | [0313458b84ded235a30713c6dae5c407e80a07a5](https://github.com/mmpro/ac-sanitizer/commit/0313458b84ded235a30713c6dae5c407e80a07a5)    
If string or integer is optional, do not return an error if value is not set.
### Chores

* **App:** Updated packages | MP | [ab3d9937fe9340b6d764f88ff4940ff2fb3ce5e9](https://github.com/mmpro/ac-sanitizer/commit/ab3d9937fe9340b6d764f88ff4940ff2fb3ce5e9)    
Updated packages
<a name="2.1.0"></a>
 
# [2.1.0](https://github.com/mmpro/ac-sanitizer/compare/v2.0.1..v2.1.0) (2020-04-22 12:17:29)


### Feature

* **App:** Added check for integer or string | MP | [c677bcc1a6569946de33dd03fb77f44f59485ced](https://github.com/mmpro/ac-sanitizer/commit/c677bcc1a6569946de33dd03fb77f44f59485ced)    
Sometimes a value can have two valid types - in this case integer or string. Use the notation integer  string to test for it.
### Tests

* **App:** Fixed base64 test | MP | [d2ef4d869a48e40be8f5edcbd70027ab2db83dfa](https://github.com/mmpro/ac-sanitizer/commit/d2ef4d869a48e40be8f5edcbd70027ab2db83dfa)    
Fixed base64 test
### Chores

* **App:** Updated packages | MP | [7ec62f36dc3f14823584befb05173b7d415cce21](https://github.com/mmpro/ac-sanitizer/commit/7ec62f36dc3f14823584befb05173b7d415cce21)    
Updated packages
* **App:** Updated packages | MP | [150e4d49212dda6df677b0f5a3d296e73cbee455](https://github.com/mmpro/ac-sanitizer/commit/150e4d49212dda6df677b0f5a3d296e73cbee455)    
Updated packages
<a name="2.0.1"></a>

## [2.0.1](https://github.com/mmpro/ac-sanitizer/compare/v2.0.0..v2.0.1) (2020-03-29 14:22:47)


### Bug Fix

* **App:** Prepare repository for AC semantic release | MP | [f0d55476adf5be7732a8e02d14c955762807bd7b](https://github.com/mmpro/ac-sanitizer/commit/f0d55476adf5be7732a8e02d14c955762807bd7b)    
Cleaned up repository and use ac-semantic-release
<a name="2.0.0"></a>
# [2.0.0](https://github.com/mmpro/ac-sanitizer/compare/v1.0.9...v2.0.0) (2020-02-28 12:56)


### Bug Fixes

* **AC Sanitizer:** Base64 only returns string as option | MP ([17e779d43cecdbab7727c77ecb4b7e4a3a77e427](https://github.com/mmpro/ac-sanitizer/commit/17e779d43cecdbab7727c77ecb4b7e4a3a77e427))    
  Set field option "convert" to true, to automatically convert base64 to string


### BREAKING CHANGES

* **AC Sanitizer:** Base64 is no longer automatically converted to string



<a name="1.0.9"></a>
## [1.0.9](https://github.com/mmpro/ac-sanitizer/compare/v1.0.8...v1.0.9) (2020-02-12 16:26)


### Bug Fixes

* **AC Sanitizer:** Add field "adminLevel" for fields and params | MP ([520c37d4f86ce8e8a64abd002a93f8687187f0ab](https://github.com/mmpro/ac-sanitizer/commit/520c37d4f86ce8e8a64abd002a93f8687187f0ab))    
  With adminLevel you can define a "level" a user needs to access/send a certain field in the payload



<a name="1.0.8"></a>
## [1.0.8](https://github.com/mmpro/ac-sanitizer/compare/v1.0.7...v1.0.8) (2019-12-14 11:16)


### Bug Fixes

* **AC Sanitizer:** Add support for countryCodes | MP ([9d3f6037e3d9d66285bed93038436803fe56f996](https://github.com/mmpro/ac-sanitizer/commit/9d3f6037e3d9d66285bed93038436803fe56f996))    
  Add support for countryCodes



<a name="1.0.7"></a>
## [1.0.7](https://github.com/mmpro/ac-sanitizer/compare/v1.0.6...v1.0.7) (2019-12-14 10:24)


### Bug Fixes

* **AC Sanitizer:** Add base64 check | MP ([e650c7eaa4486c048952e1048266d6cc9c332441](https://github.com/mmpro/ac-sanitizer/commit/e650c7eaa4486c048952e1048266d6cc9c332441))    
  You can now check a string for base64. If it is, it will be returned as the original/converted
string



<a name="1.0.6"></a>
## [1.0.6](https://github.com/mmpro/ac-sanitizer/compare/v1.0.5...v1.0.6) (2019-11-04 18:29)


### Bug Fixes

* **AC Sanitizer:** Add test for emails like xy+123@abc.de | MP ([b87b96503acb880a91ae73536a2fb52a4c84c4f8](https://github.com/mmpro/ac-sanitizer/commit/b87b96503acb880a91ae73536a2fb52a4c84c4f8))    
  Add test for emails like xy+123@abc.de



<a name="1.0.5"></a>
## [1.0.5](https://github.com/mmpro/ac-sanitizer/compare/v1.0.4...v1.0.5) (2019-08-05 13:37)


### Bug Fixes

* **AC Sanitizer:** Add uuid check | MP ([767675e](https://github.com/mmpro/ac-sanitizer/commit/767675e))    
  Add uuid check



<a name="1.0.4"></a>
## [1.0.4](https://github.com/mmpro/ac-sanitizer/compare/v1.0.3...v1.0.4) (2019-06-18 20:44)


### Bug Fixes

* **AC Sanitizer:** Allow params to be an empty object | MP ([e5baba7](https://github.com/mmpro/ac-sanitizer/commit/e5baba7))    
  Allow params to be an empty object



<a name="1.0.3"></a>
## [1.0.3](https://github.com/mmpro/ac-sanitizer/compare/v1.0.2...v1.0.3) (2019-04-08 18:06)


### Bug Fixes

* **AC Sanitizer:** Add support for array and plain object | MP ([986207d](https://github.com/mmpro/ac-sanitizer/commit/986207d))    
  Add support for array and plain object



<a name="1.0.2"></a>
## [1.0.2](https://github.com/mmpro/ac-sanitizer/compare/v1.0.1...v1.0.2) (2019-04-08 09:31)


### Bug Fixes

* **AC Sanitizer:** Minor fix for email | MP ([da5e3ad](https://github.com/mmpro/ac-sanitizer/commit/da5e3ad))    
  Minor typo fix for email. Added tests for email



<a name="1.0.1"></a>
## [1.0.1](https://github.com/mmpro/ac-sanitizer/compare/v1.0.0...v1.0.1) (2019-04-08 09:22)


### Bug Fixes

* **AC Sanitizer:** Add type "email" | MP ([fbd2b21](https://github.com/mmpro/ac-sanitizer/commit/fbd2b21))    
  Add type "email"



<a name="1.0.0"></a>
# 1.0.0 (2019-01-23 11:35)


### Bug Fixes

* **AC Sanitizer:** Added check for boolean values | MP ([1c189ff](https://github.com/mmpro/ac-sanitizer/commit/1c189ff))    
  Added check for boolean values



