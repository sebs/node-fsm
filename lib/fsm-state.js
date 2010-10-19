// a async state
var sys = require('sys');
var EventEmitter = require('node-evented').EventEmitter;

exports.state = function() {

    this.eventEmitter = new EventEmitter; 
    // actions called in 
    var events = {
        'entry':         null, 
        'exit':          null, 
        'transition':    null
    };
    this.events = events;
};

/**
 * Adds an Event Listener to the event
 */
exports.state.prototype.addEvent = function(name, cb) {
    // check if the type exitsts
    if (!this.hasEvent(name)) {
        throw("Unknown Action");
    }
    if (typeof cb != 'function') {
        throw("Missing Method");
    }
    this.eventEmitter.on('name', cb);
    return true; 
};

exports.state.prototype.hasEvent = function(name) {
    return (typeof this.events[name] != 'undefined'); 
}

exports.state.prototype.emit = function(name) {
    // check if the type exitsts
    if (!this.hasEvent(name)) {
        throw("Unknown Action");
    }
    var me = this;
    // execute me 
    this.eventEmitter.emit(name);
};

