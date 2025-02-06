'use strict';

const nextHooks = require('..');
const assert = require('assert').strict;

assert.strictEqual(nextHooks(), 'Hello from nextHooks');
console.info('nextHooks tests passed');
