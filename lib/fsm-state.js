// a async state
var sys = require('sys');
var EventEmitter = require('node-evented').EventEmitter;

exports.state = function() {
    this.action = 'input';
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
    this.on('input', function() { me.emit('entry') });
    this.on('entry', function() { me.emit('exit') });
    this.on('exit', function() { me.emit('transition') });
    this.on('transition', function() {});
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
    this.action = name;    
    // execute me 
    this.em.emit(name);
};

exports.state.prototype.execute = function() {
    this.emit('input');
}

