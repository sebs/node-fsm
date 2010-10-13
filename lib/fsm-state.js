// a async state
var sys = require('sys');

exports.state = function() {
    // actions called in 
    var actions = {
        'entry':         [], 
        'exit':          [], 
        'transition':    []
    };
    this.actions = actions;
}

exports.state.prototype.addEvent = function(type, method) {
    // check if the type exitsts
    if (typeof this.actions[type] == 'undefined') {
        throw("Unknown Action");
    }
    if (typeof method != 'function') {
        throw("Missing Method");
    }
    return true;
}




