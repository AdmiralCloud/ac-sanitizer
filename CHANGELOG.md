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



