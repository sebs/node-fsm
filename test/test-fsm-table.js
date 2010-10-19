var assert = require('assert');
var table = require('../lib/fsm-table').table;
// first of all we ad states

var fsm = new table();

fsm.addState('Init');
fsm.addState('Calculate');
fsm.addState('Final');
// we set some data required for the fsm
fsm.setData('do_calc', {calc:true});
// we add a transition code, this one sets some data
fsm.addTransition('Init', 'Calculate', function() {
	fsm.setData('secret', 'foo');
	return 'Calculate';
});
// add another transition
fsm.addTransition('Calculate', 'Final', function() {
	var data = fsm.getData('secret');
	assert.ok(data == 'foo');
	return 'Final';
});
// run the machine 
fsm.run();

