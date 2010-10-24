var assert = require('assert');
var table = require('../../lib/fsm-table').table;
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
fsm.onTransition('Init', 'War', function() {
    assert.ok(meFsm.data.money == 1000); 
    meFsm.data.money = 100;
    return 'War';
});

fsm.onTransition('War', 'Final', function() {
    var data = fsm.getData('money');
    assert.ok(data == 100);
    return 'Final';
});
// run the machine 
fsm.run();
