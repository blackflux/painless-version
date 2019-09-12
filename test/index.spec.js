const expect = require('chai').expect;
const { describe } = require('node-tdd');
const sv = require('../src/index');

describe('Testing Package', () => {
  describe('Testing test', () => {
    it('Testing smaller-equal', () => {
      expect(sv.test('1.1.3 <= 1.1.12')).to.equal(true);
    });

    it('Testing greater', () => {
      expect(sv.test('1.1 > 1.12')).to.equal(false);
    });

    it('Testing invalid', () => {
      expect(() => sv.test('1.1 > '))
        .to.throw("Invalid argument not valid semver ('' received)");
    });

    it('Testing too many comparisons', () => {
      expect(() => sv.test('1 < 2 < 3 < 4'))
        .to.throw('Invalid Input: 1 < 2 < 3 < 4');
    });
  });
});
