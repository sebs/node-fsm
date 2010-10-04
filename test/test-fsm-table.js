var assert = require('assert');
var fsm = require('../lib/fsm-table');

fsm.addState('Init');
fsm.addState('Calculate');
fsm.addState('Final');

fsm.setData('do_calc', {calc:true});

fsm.addTransition('Init', 'Calculate', function() {
	fsm.setData('secret', 'foo');
	return 'Calculate';
});

fsm.addTransition('Calculate', 'Final', function() {
	var data = fsm.getData('secret');
	assert.ok(data == 'foo');
	return 'Final';
});

fsm.run();

