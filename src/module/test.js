import assert from 'assert';
import compareVersions from 'compare-versions';

export default (input) => {
  assert(typeof input === 'string');
  const parsed = input.split(' ');
  assert(parsed.length === 3, `Invalid Input: ${input}`);
  const [lhs, cmp, rhs] = parsed;
  return compareVersions.compare(lhs, rhs, cmp);
};
