import { expect } from 'chai';
import { describe } from 'node-tdd';
import * as sv from '../src/index.js';

describe('Testing package', () => {
  it('Testing exported keys', () => {
    expect(Object.entries(sv).map(([k, v]) => [k, typeof v, v.length])).to.deep.equal([
      ['test', 'function', 1],
      ['updateDeprecationHeaders', 'function', 2]
    ]);
  });
});
