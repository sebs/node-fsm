var assert = require('assert');
var table = require('../lib/fsm-table').table;
// first of all we ad states

var fsm = new table();

fsm.addState('Init');
fsm.addState('War');
fsm.addState('Peace')
fsm.addState('Final');
// we set some data required for the fsm
fsm.setData('money', 1000);
var meFsm = fsm;

// we add a transition code, this one sets some data
fsm.addTransition('Init', 'War', function() {
	var data = meFsm.getData('money');
    assert.ok(data == 1000); 
    meFsm.setData('money', 100);
    return 'War';
});

fsm.addTransition('War', 'Final', function() {
    var data = fsm.getData('money');
    assert.ok(data == 100);
    return 'Final';
});
// run the machine 
fsm.run();
