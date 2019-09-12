# smart-version

[![Build Status](https://circleci.com/gh/blackflux/smart-version.png?style=shield)](https://circleci.com/gh/blackflux/smart-version)
[![Test Coverage](https://img.shields.io/coveralls/blackflux/smart-version/master.svg)](https://coveralls.io/github/blackflux/smart-version?branch=master)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=blackflux/smart-version)](https://dependabot.com)
[![Dependencies](https://david-dm.org/blackflux/smart-version/status.svg)](https://david-dm.org/blackflux/smart-version)
[![NPM](https://img.shields.io/npm/v/smart-version.svg)](https://www.npmjs.com/package/smart-version)
[![Downloads](https://img.shields.io/npm/dt/smart-version.svg)](https://www.npmjs.com/package/smart-version)
[![Semantic-Release](https://github.com/blackflux/js-gardener/blob/master/assets/icons/semver.svg)](https://github.com/semantic-release/semantic-release)
[![Gardener](https://github.com/blackflux/js-gardener/blob/master/assets/badge.svg)](https://github.com/blackflux/js-gardener)

Intuitive version management abstraction

## Install

```bash
npm i --save object-rewrite
```

## Getting Started

<!-- eslint-disable import/no-unresolved, import/no-extraneous-dependencies -->
```js
const sv = require('smart-version');

const version = '5.3.5';
sv.test(`1.2.3 < ${version}`);
// => true

```

## Functions

### test(expression: String)

Evaluate comparison string of form `LHS CMP RHS` where `LHS` and `RHS` are 
version strings and `CMP` is one of `<`, `<=`, `>`, `>=`, `=`.

Under the hood this uses [compare-versions](https://www.npmjs.com/package/compare-versions).
