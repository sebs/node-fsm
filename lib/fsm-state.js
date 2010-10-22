// a async state
var sys = require('sys');
var EventEmitter = require('node-evented').EventEmitter;

exports.state = function() {
    this.action = null;
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
    this.em.on('input', function() { me.emit('entry') });
    this.em.on('entry', function() { me.emit('exit') });
    this.em.on('exit', function() { me.emit('transition') });
    this.events = events;
};

/**
 * Adds an Event Listener to the event
 */
exports.state.prototype.on = function(name, cb) {
    if (typeof cb != 'function') {
        throw("Missing Method");
    }
    this.action = name;
    sys.log('state add action '+name);
    this.em.on('name', cb);
    return true; 
};

exports.state.prototype.emit = function(name) {
    sys.log('state emitting '+name);
    // execute me 
    this.em.emit(name);
};

