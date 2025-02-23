# painless-version

[![Build Status](https://circleci.com/gh/blackflux/painless-version.png?style=shield)](https://circleci.com/gh/blackflux/painless-version)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/painless-version/master.svg)](https://coveralls.io/github/blackflux/painless-version?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/painless-version)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/painless-version/status.svg)](https://david-dm.org/blackflux/painless-version)
[![NPM](https://img.shields.io/npm/v/painless-version.svg)](https://www.npmjs.com/package/painless-version)
[![Downloads](https://img.shields.io/npm/dt/painless-version.svg)](https://www.npmjs.com/package/painless-version)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Intuitive version management abstraction

## Install

```
npm i --save painless-version
```

## Getting Started

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies, mocha/no-global-tests -->
```js
import { test } from 'painless-version';

const version = '5.3.5';
test(`1.2.3 < ${version}`);
// => true
```

## Functions

### test(expression: String)

Evaluate comparison string of form `LHS CMP RHS` where `LHS` and `RHS` are
version strings and `CMP` is one of `<`, `<=`, `>`, `>=`, `=`.

Under the hood this uses [compare-versions](https://www.npmjs.com/package/compare-versions).

### updateDeprecationHeaders(headers: {}, { deprecationDate: Date, sunsetDate: Date })

Modifies the headers object in place assuming this is a response headers object.

Updates headers [deprecation](https://tools.ietf.org/id/draft-dalal-deprecation-header-01.html) and [sunset](https://tools.ietf.org/id/draft-dalal-deprecation-header-01.html#rfc.section.5)

Existing headers are only overwritten if the date present is further in the future.
