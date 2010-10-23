// the table of states
var sys = require('sys');
var myState = require('./fsm-state').state;

var state = 'Init';

var table = {};
var data = {};

exports.table = function() {
    this.table = {};
    this.atable = {};
    this.data = {};
    this.state = 'Init';    
    this.initState = new myState();
}; 

/**
 * Add a State by telling the fsm it's id 
 */
exports.table.prototype.addState = function(fromState) {
	this.table[fromState] = {};
    this.atable[fromState] = new myState();
}
/**
 * Define a transition from one state to another state
 */
exports.table.prototype.onTransition = function(fromState, toState, callback) {
	this.table[fromState][toState] = callback;
    var localState = this.atable[fromState];
    localState.on('entry', function() { localState.emit('exit')});
    var me = this;
    localState.on('exit', function() {});
}

/**
 * Set some data the fsm can use 
 */
exports.table.prototype.setData = function(id, params) {
	this.data[id] = params;
}
/**
 * Get some Data
 */
exports.table.prototype.getData = function(id) {
	return this.data[id];
};

/**
 * Run the fsm 
 */
exports.table.prototype.run = function() {
	// We are still preparing, so the next step is false
	var next = false;
	// put the state to the console
	// run until we reach a special state that is called final
	while (state != 'Final') {
	    this.atable[state].emit('entry');
        // on each iteration clear the next state
		next = false;
		// get all possible conditions to the next state
		var conditions = this.table[state];
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
			// if the next state is not defined, there must be error
			if (!this.stateExists(next)) {
				throw 'Illegal next state '+next;
			}
			// set the next state and execute it
			state = next;
		}

	}
};

exports.table.prototype.stateExists = function(id) {
	return typeof this.table[id] != 'undefined';
};

exports.table.prototype.stateHasCondition = function(stateId, conditionId) {
	return typeof this.table[stateId][conditionId] != 'undefined';
};

exports.table.prototype.dump = function() {
    sys.log(JSON.stringify(this.table));
}

