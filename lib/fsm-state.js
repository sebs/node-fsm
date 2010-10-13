// a async state
var sys = require('sys');

exports.state = function() {
    // actions called in 
    var actions = {
        'entry':         function() {emit('exit')}, 
        'exit':          function() {emit('transition')}, 
        'transition':    null
    };
    this.actions = actions;
};
/**
 * Adds an Event Listener to the event
 */
exports.state.prototype.addEvent = function(type, method) {
    // check if the type exitsts
    if (typeof this.actions[type] == 'undefined') {
        throw("Unknown Action");
    }
    if (typeof method != 'function') {
        throw("Missing Method");
    }
    this.actions[type] = method; 
    return true; 
};

exports.state.prototype.emit = function(type) {
    // check if the type exitsts
    if (typeof this.actions[type] == 'undefined') {
        throw("Unknown Action");
    }
    var me = this;
    // execute me 
    this.actions[type](me);    
};




