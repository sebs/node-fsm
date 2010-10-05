var assert = require('assert');
var fsm = require('../lib/fsm-table');


fsm.addState('Init');
fsm.addState('Calculate');
fsm.addState('Final');
fsm.setData('do_calc', {calc:true});

fsm.addTransition('Init', 'Calculate', function() {
	data = fsm.getData('do_calc');
	if (data.calc == true) {
		return 'Calculate';
	}
	else return 'Final';
});
fsm.addTransition('Calculate', 'Finish', function() {
	return 'Final';
});
fsm.run();

