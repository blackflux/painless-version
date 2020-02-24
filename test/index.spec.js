const expect = require('chai').expect;
const { describe } = require('node-tdd');
const sv = require('../src/index');

describe('Testing exports', () => {
  it('Testing exported function', () => {
    expect(Object.entries(sv).map(([k, v]) => [k, typeof v, v.length])).to.deep.equal([
      ['test', 'function', 1],
      ['updateDeprecationHeaders', 'function', 2]
    ]);
  });
});
