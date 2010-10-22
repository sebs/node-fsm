var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state').state;
var cState = new state();

// check on exsitance of the actions in the fsm 
assert.ok(typeof cState.events == 'object');
assert.ok(typeof cState.events.entry == 'object');
assert.ok(typeof cState.events.exit == 'object');
assert.ok(typeof cState.events.transition == 'object');
assert.ok(typeof cState.events.input == 'object');
// on - the event adding  function
assert.ok(typeof cState.on == 'function');
// action executed atm 


// try to add an event to an unknown action 
try {
    cState.on('entry');
    assert.ok(false);
} catch (e) {
    assert.ok(e == 'Missing Method');
}

// add an event that has a method passed
assert.ok(cState.on('entry', function(me) {
    me.emit('exit');    
}));
assert.ok(cState.on('exit', function(me) {
    me.emit('transition');    
}));
assert.ok(cState.on('transition', function(me) {

}));
assert.ok(cState.on('input', function(me) {
    
}));

cState.emit('entry');


var checkResult = function() {
    assert.ok(count == 3);
}



