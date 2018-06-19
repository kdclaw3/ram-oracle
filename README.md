## ![ram-oracle](https://i.imgur.com/GH3Xr5e.png) &nbsp; [![Build Status](https://travis-ci.org/kdclaw3/ram-oracle.svg?branch=v0.0.1)](https://travis-ci.org/kdclaw3/ram-oracle) &nbsp; [![npm version](https://badge.fury.io/js/ram-oracle.svg)](https://badge.fury.io/js/ram-oracle)


### About This Package

This module hash checks the input password against a schema's password in the Oracle database. **Why?** Some database driven Oracle enterprise applications use database schema authentication as application authentication. This module was developed so that other applications using the same database can mirror the same authentication. Other appropriate uses would include checking for weak passwords. 

### About Oracle Database Security

Oracle stores the trimmed encrypted value of the encrypted value of the SCHEMA + PASSWORD in the [SYS.USER$] table/view. Out of the box Oracle databases use a standard and well know, to the security minded, encryption key. (Oracle calle it a "key", to the security community an initialization vector.) 

### Installation

```sh
$ npm install ram-oracle
```

### Test

```sh
$ mocha test
```
or
```sh
$ npm run-script test
```

### Usage

```js
var ram = require('ram-oracle');

//.match(<ORACLE SCHEMA>,<ORACLE PASSWORD>,<INPUT PASSWORD>)
var matches = ram.match('JDOE','587F72032A3C828E','password');
console.log('The input matches the Oracle Database password: ' + matches + '.');

var matches = ram.match('JDOE','587F72032A3C828E','incorrect_password');
console.log('The input matches the Oracle Database password: ' + matches + '.');
```

### Thanks

This package was inspired by a couple pieces of work and notes. 
* Pete Finnigan's testpwd.sql script. At the time of publishing it could be found at http://www.petefinnigan.com/tools.htm. 
* This thread also has some merit and explination of some concepts http://seclists.org/pen-test/2000/Nov/198. 
* You might also want to check here for some notes on a Java implementation https://community.oracle.com/thread/1528235. 
* And in Ruby https://stackoverflow.com/questions/19718060/des3-encryption-ruby-opensslcipher-vs-oracle-dbms-obfuscation-toolkit.

### License

MIT License, Copyright (c) 2018 Dee Clawson