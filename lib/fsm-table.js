// the table of states
var sys = require('sys');
var table = {};
var data = {};
var state = 'Init';
/**
 * Add a State by telling the fsm it's id 
 */
exports.addState = function(identifier) {
	table[identifier] = {};
}
/**
 * Define a transition from one state to another state
 */
exports.addTransition = function(stateId, conditionId, callback) {
	table[stateId][conditionId] = callback;
}
/**
 * Set some data the fsm can use 
 */
exports.setData = function(id, params) {
	data[id] = params;
}
/**
 * Get some Data
 */
exports.getData = function(id) {
	return data[id];
};

/**
 * Run the fsm 
 */
exports.run = function() {
	// We are still preparing, so the next step is false
	var next = false;
	// put the state to the console
	sys.puts(state);
	// run until we reach a special state that is called final
	while (state != 'Final') {
	    // on each iteration clear the next state
		next = false;
		// get all possible conditions to the next state
		var conditions = table[state];
		// there can be n conditions that lead to a next state
		// if there is a next state one of the n conditions must 
		// return a id of the next state
		var i;
		for (i in conditions) {
			if (typeof conditions != 'object') {
				continue;
			}
			// @todo: check if more than one transition is possible, error 
			// check if state to trasit to exists
			if (!next) {
				next = conditions[i]();
			} else {
			    // if we already had one TRUE, we need a exception
			    // only ONE transition at a time can lead to another 
			    // state
				throw "More than one result";
			}
			// da hell print me out the next state
			sys.puts(next);
			// if the next state is not defined, there must be error
			if (!this.stateExists(next)) {
				throw 'Illegal next state '+next;
			}
			// set the next state and execute it
			state = next;
		}

	}
};

exports.stateExists = function(id) {
	return typeof table[id] != 'undefined';
};

exports.stateHasCondition = function(stateId, conditionId) {
	return typeof table[stateId][conditionId] != 'undefined';
};

