const expect = require('chai').expect;
const { describe } = require('node-tdd');
const sv = require('../../src/index');

describe('Testing updateDeprecationHeaders()', {
  timestamp: 1582580024
}, () => {
  let update;
  beforeEach(() => {
    update = (r, { date = new Date(), fn = undefined } = {}) => {
      sv.updateDeprecationHeaders(r, { deprecationDate: date, sunsetDurationInDays: 1, onSunsetFn: fn });
      return r;
    };
  });

  it('Testing invalid headers present cause assertion error', () => {
    expect(() => update({ deprecation: 'invalid' }))
      .to.throw('Bad format "invalid" for response header "deprecation" detected');
    expect(() => update({ sunset: 'invalid' }))
      .to.throw('Bad format "invalid" for response header "sunset" detected');
  });

  it('Testing headers are created', () => {
    expect(update({})).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
  });

  it('Testing onSunsetFn called', () => {
    let called = false;
    const fn = () => {
      called = true;
    };
    update({}, { fn });
    expect(called).to.equal(false);
    update({}, {
      fn,
      date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 52 * 30)
    });
    expect(called).to.equal(true);
  });

  it('Testing headers are overwritten if younger', () => {
    const r = {};
    update(r);
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
    update(r, { date: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 7 * 52 * 30) });
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 02 Apr 1990 21:33:44 GMT"',
      sunset: 'Tue, 03 Apr 1990 21:33:44 GMT'
    });
  });

  it('Testing headers are not overwritten if older', () => {
    const r = {};
    update(r);
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
    update(r, { date: new Date(new Date().getTime() + 1000 * 60 * 60 * 24 * 7 * 52 * 30) });
    expect(r).to.deep.equal({
      deprecation: 'date="Mon, 24 Feb 2020 21:33:44 GMT"',
      sunset: 'Tue, 25 Feb 2020 21:33:44 GMT'
    });
  });
});
