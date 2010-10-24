// a async state
var sys = require('sys');
var EventEmitter = require('node-evented').EventEmitter;

exports.state = function() {
    this.em = new EventEmitter; 
    // actions called in 
    var events = {
        'input':         null, 
        'entry':         null, 
        'exit':          null, 
        'transition':    null
    };
    // standard config for the event emitter
    var me = this;
    this.data = {};
    this.events = events;
};

/**
 * Adds an Event Listener to the event
 */
exports.state.prototype.on = function(name, cb) {
    if (typeof cb != 'function') {
        throw("Missing Method");
    }
    this.em.on(name, cb);
    return true; 
};

exports.state.prototype.emit = function(name) {
    this.em.emit(name);
};

exports.state.prototype.execute = function() {
    this.emit('input');
}

exports.state.prototype.getData = function() {
    return this.data;
}

exports.state.prototype.setData = function(data) {
    this.data = data;
    return true;
}
