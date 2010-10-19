// a async state
var sys = require('sys');

exports.state = function() {
    // actions called in 
    var events = {
        'entry':         function() {emit('exit')}, 
        'exit':          function() {emit('transition')}, 
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
    this.events[name] = cb; 
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
    this.events[name](me);    
};

