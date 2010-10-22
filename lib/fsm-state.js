// a async state
var sys = require('sys');
var EventEmitter = require('node-evented').EventEmitter;

exports.state = function() {
    this.lastAction = null;
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
    this.em.on('input', function() { me.em.emit('entry') });
    this.em.on('entry', function() { me.em.emit('exit') });
    this.em.on('exit', function() { me.em.emit('transition') });
    this.events = events;
};

/**
 * Adds an Event Listener to the event
 */
exports.state.prototype.on = function(name, cb) {
    if (typeof cb != 'function') {
        throw("Missing Method");
    }
    sys.log(name);
    this.em.on('name', cb);
    return true; 
};

exports.state.prototype.emit = function(name) {
    var me = this;
    // execute me 
    this.em.emit(name);
};

