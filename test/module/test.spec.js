import { expect } from 'chai';
import { describe } from 'node-tdd';
import { test as t } from '../../src/index.js';

describe('Testing test()', () => {
  it('Testing smaller-equal', () => {
    expect(t('1.1.3 <= 1.1.12')).to.equal(true);
  });

  it('Testing greater', () => {
    expect(t('1.1 > 1.12')).to.equal(false);
  });

  it('Testing invalid', () => {
    expect(() => t('1.1 > '))
      .to.throw("Invalid argument not valid semver ('' received)");
  });

  it('Testing too many comparisons', () => {
    expect(() => t('1 < 2 < 3 < 4'))
      .to.throw('Invalid Input: 1 < 2 < 3 < 4');
  });
});
