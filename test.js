const ram = require('./index.js'),
	chai = require('chai'),
	expect = chai.expect;

describe('ram-oracle match function', function () {

	it('determines if password hashes are truthy', function () {

		let oracleSchema = 'JDOE',
			hashedOraclePassword = '587F72032A3C828E',
			inputPassword = 'password';
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword);

		expect(matches).to.deep.equal(true);

	});

	it('determines if password hashes are truthy for specificying an initialization vector', function () {

		let oracleSchema = 'JDOE',
			hashedOraclePassword = '587F72032A3C828E',
			inputPassword = 'password';
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword, '0123456789ABCDEF' );

		expect(matches).to.deep.equal(true);

	});

	it('determines if password hashes are falsey', function () {

		let oracleSchema = 'JDOE',
			hashedOraclePassword = '587F72032A3C828E',
			inputPassword = 'incorrect_password';
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword);

		expect(matches).to.deep.equal(false);

	});

	it('determines if password hashes are falsey for specificying an incorrect initialization vector', function () {

		let oracleSchema = 'JDOE',
			hashedOraclePassword = '587F72032A3C828E',
			inputPassword = 'password';
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword, '0003456789ABCDEF' );

		expect(matches).to.deep.equal(false);

	});

	it('determines validates input for null', function () {

		let oracleSchema = null,
			hashedOraclePassword = null,
			inputPassword = null,
			iv = null;
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword, iv);

		expect(matches).to.deep.equal(false);

	});

	it('determines validates input for undefined', function () {

		let oracleSchema,
			hashedOraclePassword,
			inputPassword,
			iv;
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword, iv);

		expect(matches).to.deep.equal(false);

	});

	it('determines validates input for empty', function () {

		let oracleSchema = '',
			hashedOraclePassword = '',
			inputPassword = '',
			iv = '';
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword, iv);

		expect(matches).to.deep.equal(false);

	});

	it('determines valid against numbers', function () {

		let oracleSchema = 123,
			hashedOraclePassword = 123,
			inputPassword = 123,
			iv = 123;
		let matches = ram.match(oracleSchema, hashedOraclePassword, inputPassword, iv);

		expect(matches).to.deep.equal(false);

	});

});
