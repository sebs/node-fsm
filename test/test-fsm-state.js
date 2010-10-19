var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state').state;
var cState = new state();

// check on exsitance of the actions in the fsm 
assert.ok(typeof cState.events == 'object');
assert.ok(typeof cState.events.entry == 'object');
assert.ok(typeof cState.events.exit == 'object');
assert.ok(typeof cState.events.transition == 'object');

// addEvent function
assert.ok(typeof cState.on == 'function');

// try to add an event to an unknown action 
try {
    cState.on('unknown');
} catch (e) {
    assert.ok(e == 'Unknown Action');
}


// try to add an event to an unknown action 
try {
        cState.on('entry');
        assert.ok(false);
} catch (e) {
        assert.ok(e == 'Missing Method');
}
var count = 1;;
var stateState = 'none';
// add an event that has a method passed
assert.ok(cState.on('entry', function(me) {
    count++;
    stateState = 'entry';
    me.emit('exit');    
}));
assert.ok(cState.on('exit', function(me) {
    count++;
    // sys.log('exit');
    assert.ok(stateState == 'entry');
    stateState = 'exit';
    me.emit('transition');    
}));
assert.ok(cState.on('transition', function(me) {
    count++;
    assert.ok(stateState == 'exit');
    checkResult();
    // sys.log('transition');    
}));

cState.emit('entry');


var checkResult = function() {
    assert.ok(count == 3);
}



