var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state');
var cState = new state.state();

// check on exsitance of the actions in the fsm 
assert.ok(typeof cState.events == 'object');
assert.ok(typeof cState.events.entry == 'function');
assert.ok(typeof cState.events.exit == 'function');
assert.ok(typeof cState.events.transition == 'object');

// addEvent function
assert.ok(typeof cState.addEvent == 'function');

// try to add an event to an unknown action 
try {
    cState.addEvent('unknown');
} catch (e) {
    assert.ok(e == 'Unknown Action');
}


// try to add an event to an unknown action 
try {
        cState.addEvent('entry');
        assert.ok(false);
} catch (e) {
        assert.ok(e == 'Missing Method');
}

var stateState = 'none';
// add an event that has a method passed
assert.ok(cState.addEvent('entry', function(me) {
    stateState = 'entry';
    me.emit('exit');    
}));
assert.ok(cState.addEvent('exit', function(me) {
    // sys.log('exit');
    assert.ok(stateState == 'entry');
    stateState = 'exit';
    me.emit('transition');    
}));
assert.ok(cState.addEvent('transition', function(me) {
    assert.ok(stateState == 'exit');
    // sys.log('transition');    
}));

cState.emit('entry');




