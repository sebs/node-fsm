// the async table of states
var sys = require('sys');
var state = require('./fsm-state').state;
var emitter = require('node-evented').EventEmitter;

exports.asyncTable = function(initCb) 
{
    var me = this;
    this.states = {
        
    };
    this.em = new emitter();
    this.em.on('init', initCb);
    this.em.on('end', function() {sys.log('end');});
    this.em.emit('init');
}

exports.asyncTable.prototype.run = function(name, cb)
{ 
    this.em.on('run', cb);
    this.states[name].em.emit('entry'); 
    var me = this;
    //  this.emitter.emit('run');
}

exports.asyncTable.prototype.on = function(name, state) {
    this.states[name] = state; 
}
