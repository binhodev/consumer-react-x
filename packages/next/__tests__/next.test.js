'use strict';

const next = require('..');
const assert = require('assert').strict;

assert.strictEqual(next(), 'Hello from next');
console.info('next tests passed');
