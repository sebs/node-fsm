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
exports.state.prototype.addEvent = function(type, method) {
    // check if the type exitsts
    if (!this.hasEvent(type)) {
        throw("Unknown Action");
    }
    if (typeof method != 'function') {
        throw("Missing Method");
    }
    this.events[type] = method; 
    return true; 
};

exports.state.prototype.hasEvent = function(type) {
    return (typeof this.events[type] != 'undefined'); 
}

exports.state.prototype.emit = function(type) {
    // check if the type exitsts
    if (!this.hasEvent(type)) {
        throw("Unknown Action");
    }
    var me = this;
    // execute me 
    this.events[type](me);    
};




