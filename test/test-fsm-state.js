var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state');
var cState = new state.state();

// check on exsitance of the actions in the fsm 
assert.ok(typeof cState.actions == 'object');
assert.ok(typeof cState.actions.entry == 'object');
assert.ok(typeof cState.actions.exit == 'object');
assert.ok(typeof cState.actions.transition == 'object');

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

// add an event that has a method passed
assert.ok(cState.addEvent('entry', function(me) {
    sys.log('entry');
    me.emit('exit');    
}));
assert.ok(cState.addEvent('exit', function(me) {
    sys.log('exit');
    me.emit('transition');    
}));
assert.ok(cState.addEvent('transition', function(me) {
    sys.log('transition');    
}));

cState.emit('entry');




