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
    this.em.on('end', function() {sys.log('fsm end');});
    this.em.emit('init');
}

exports.asyncTable.prototype.run = function(name, cb)
{ 
    sys.log('fsm start');
    this.em.on('run', cb);
    var meFsm = this;
    this.states[name].em.emit('input'); 
}

exports.asyncTable.prototype.on = function(name, state) {
    sys.log('fsm add state ' + name);
    this.states[name] = state; 
}



