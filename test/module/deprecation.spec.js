import { expect } from 'chai';
import { describe } from 'node-tdd';
import { updateDeprecationHeaders } from '../../src/index.js';

describe('Testing updateDeprecationHeaders()', {
  timestamp: 1582580024
}, () => {
  let testRunner;
  beforeEach(() => {
    testRunner = (r, { date = new Date() } = {}) => {
      updateDeprecationHeaders(r, {
        deprecationDate: date,
        sunsetDate: new Date(date.getTime() + 1000 * 60 * 60 * 24)
      });
      return r;
    };
  });

  it('Testing invalid headers present cause assertion error', () => {
    expect(() => testRunner({ deprecation: 'invalid' }))
      .to.throw('Bad format "invalid" for response header "deprecation" detected');
    expect(() => testRunner({ sunset: 'invalid' }))
      .to.throw('Bad format "invalid" for response header "sunset" detected');
  });

  it('Testing headers are created', () => {
    expect(testRunner({})).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
  });

  it('Testing headers are overwritten if younger', () => {
    const r = {};
    testRunner(r);
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
    testRunner(r, { date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 52 * 30) });
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 02 Apr 1990 21:33:44 GMT"',
      sunset: 'Tue, 03 Apr 1990 21:33:44 GMT'
    });
  });

  it('Testing headers are not overwritten if older', () => {
    const r = {};
    testRunner(r);
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
    testRunner(r, { date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7 * 52 * 30) });
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
  });
});
