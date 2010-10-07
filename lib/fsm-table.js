// the table of states
var sys = require('sys');
var table = {};
var data = {};
var state = 'Init';

exports.addState = function(identifier) {
	table[identifier] = {};
};

exports.addTransition = function(stateId, conditionId, callback) {
	table[stateId][conditionId] = callback;
};

exports.setData = function(id, params) {
	data[id] = params;
};

exports.getData = function(id) {
	return data[id];
};

exports.run = function() {
	var next = false;
	sys.puts(state);
	while (state != 'Final') {
		next = false;
		// get all possible conditions to the next state
		var conditions = table[state];
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
				throw "More than one result";
			}
			sys.puts(next);
			if (!this.stateExists(next)) {
				throw 'Illegal next state '+next;
			}
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

