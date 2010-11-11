// a async state
var sys = require('sys');
var EventEmitter = require("events").EventEmitter; 
/**
 * The basic state object 
 */ 
exports.state = function() {
	// We are using events to walk through the
    this.em = new EventEmitter; 
    // actions aka events
    var events = {
        'input':         null, 
        'entry':         null, 
        'exit':          null, 
        'transition':    null
    };
    // standard config for the event emitter
    var me = this;
    // data that all actions of the state share 
	this.data = {};
	// list of events that are possible
    this.events = events;
};

/**
 * Adds an Event Listener to the event
 */
exports.state.prototype.on = function(name, cb) {
	// cb needs to be a function
    if (typeof cb != 'function') {
        throw("Missing Method");
    }
	// put the callback to the event emitter 
    this.em.on(name, cb);
	// hand me back a true so non async code can check for true
    return true; 
};

/**
 * Emit a Event aka a Action
 */
exports.state.prototype.emit = function(name) {
    this.em.emit(name, this);
};

/**
 * Shorthand for start it ;) 
 */
exports.state.prototype.execute = function() {
    this.emit('input');
}

/**
 * gets the data in the state
 * @todo: might be better off named in the same style as in the fsm 
 */
exports.state.prototype.getPayLoad = function() {
    return this.data;
}

/**
 * Put the data in the state
 */
exports.state.prototype.setPayLoad = function(data) {
    this.data = data;
    return true;
}

