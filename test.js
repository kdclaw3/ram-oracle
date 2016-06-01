var ram = require('./index.js');
chai = require('chai');
expect = chai.expect;
done = chai.done;

describe("ram-oracle match function", function() {
  it("determines if password hashes are truthy", function() {

    var oracleSchema = 'JDOE',
        hashedOraclePassword = '587F72032A3C828E',
        inputPassword = 'password';
    var matches = ram.match(oracleSchema,hashedOraclePassword,inputPassword);

    expect(matches).to.deep.equal(true);

  });
  it("determines if password hashes are falsey", function() {

    var oracleSchema = 'JDOE',
        hashedOraclePassword = '587F72032A3C828E',
        inputPassword = 'incorrect_password';
    var matches = ram.match(oracleSchema,hashedOraclePassword,inputPassword);

    expect(matches).to.deep.equal(false);

  });
});
