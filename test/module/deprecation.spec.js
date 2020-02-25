const expect = require('chai').expect;
const { describe } = require('node-tdd');
const sv = require('../../src/index');

describe('Testing updateDeprecationHeaders()', {
  timestamp: 1582580024
}, () => {
  let testRunner;
  beforeEach(() => {
    testRunner = (r, { date = new Date(), fn = undefined } = {}) => {
      sv.updateDeprecationHeaders(r, { deprecationDate: date, sunsetDurationInDays: 1, onSunsetCb: fn });
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

  it('Testing onSunsetCb called', () => {
    const lastArgs = [];
    const deprecationDate = new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 52 * 30);
    const fn = (...args) => {
      lastArgs.push(...args);
    };
    testRunner({}, { fn });
    expect(lastArgs).to.deep.equal([]);
    testRunner({}, { fn, date: deprecationDate });
    expect(lastArgs).to.deep.equal([{
      deprecationDate,
      sunsetDate: new Date(deprecationDate.getTime() + 1000 * 60 * 60 * 24),
      sunsetDurationInDays: 1
    }]);
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