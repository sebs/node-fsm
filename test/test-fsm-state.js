var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state').state;
var cState = new state();
var me = cState;
// check on exsitance of the actions in the fsm 
assert.ok(typeof cState.events == 'object');
assert.ok(typeof cState.events.entry == 'object');
assert.ok(typeof cState.events.exit == 'object');
assert.ok(typeof cState.events.transition == 'object');
assert.ok(typeof cState.events.input == 'object');
// on - the event adding  function
assert.ok(typeof cState.on == 'function');
// action executed atm 
assert.ok(cState.action == null);

// add an event that has a method passed
assert.ok(cState.on('entry', function() {
    assert.ok(me.action == 'entry');
    me.emit('exit');    
}));
assert.ok(cState.on('exit', function() {
    sys.log('expected exit found '+me.action);
    assert.ok(me.action == 'exit');
    me.emit('transition');    
}));
assert.ok(cState.on('transition', function() {
    assert.ok(me.action == 'transition');
}));  
assert.ok(cState.on('input', function() {
    me.emit('entry');
}));

cState.execute();

