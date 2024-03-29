import assert from 'assert';
import set from 'lodash.set';

const HEADER_REGEX = (() => {
  const dateFormat = [
    '(Sun|Mon|Tue|Wed|Thu|Fri|Sat), ',
    '([1-9]?0[1-9]|[1-2]?[0-9]|3[01]) ',
    '(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ',
    '(19[0-9]{2}|[2-9][0-9]{3}) ',
    '(2[0-3]|[0-1][0-9]):([0-5][0-9])(?::(60|[0-5][0-9])) ',
    '([-\\+][0-9]{2}[0-5][0-9]|(?:UT|GMT|(?:E|C|M|P)(?:ST|DT)|[A-IK-Z]))'
  ];
  return {
    deprecation: new RegExp(['^date="', ...dateFormat, '"$'].join('')),
    sunset: new RegExp(['^', ...dateFormat, '$'].join(''))
  };
})();

export const updateDeprecationHeaders = (headers, {
  deprecationDate,
  sunsetDate
}) => {
  assert(headers instanceof Object && !Array.isArray(headers));
  assert(deprecationDate instanceof Date);
  assert(sunsetDate instanceof Date);

  ['deprecation', 'sunset'].forEach((header) => {
    assert(
      headers[header] === undefined || HEADER_REGEX[header].test(headers[header]),
      `Bad format "${headers[header]}" for response header "${header}" detected`
    );
  });
  if (
    headers.deprecation === undefined
    || deprecationDate < Date.parse(headers.deprecation.slice(6, -1))
  ) {
    set(headers, 'deprecation', `date="${deprecationDate.toUTCString()}"`);
  }
  if (
    headers.sunset === undefined
    || sunsetDate < Date.parse(headers.sunset)
  ) {
    set(headers, 'sunset', sunsetDate.toUTCString());
  }
};
