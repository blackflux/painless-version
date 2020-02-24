const test = require('./module/test');
const deprecation = require('./module/deprecation');

module.exports.test = test;
module.exports.updateDeprecationHeaders = deprecation.updateDeprecationHeaders;
