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

// add an event that has a method passed
assert.ok(cState.on('entry', function() {
    //sys.log(JSON.stringify(data));
    cState.emit('exit');    
}));
assert.ok(cState.on('exit', function() {
    cState.emit('transition');    
}));
assert.ok(cState.on('transition', function() {
    assert.ok(true);
}));  
assert.ok(cState.on('input', function() {
    cState.emit('entry');
}));

cState.execute();

