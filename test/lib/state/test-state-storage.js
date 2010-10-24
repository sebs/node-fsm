var assert = require('assert');
var sys = require('sys');
var state = require('../../../lib/fsm-state').state;
var myState = new state();
assert.ok(myState.setPayLoad({id:1}));
var data = myState.getPayLoad();
assert.ok(typeof data == 'object');
assert.ok(data.id == 1);
