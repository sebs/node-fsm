// the async table of states
var sys = require('sys');
var state = require('./fsm-state').state;
var emitter = require('node-evented').EventEmitter;
/**
 * Async table based fsm
 */
exports.asyncTable = function(initCb) 
{
    var me = this;
    this.states = {};
    this.state = null;
    this.em = new emitter();
    this.em.on('init', initCb);
    this.em.on('end', function() {sys.log('fsm end');});
    this.em.emit('init');
}

/**
 * execute the fsm
 */
exports.asyncTable.prototype.execute = function(name, cb)
{ 
    sys.log('fsm start')
    this.state = name;
    this.em.on('run', cb);
    var meFsm = this;
    this.states[name].emit('input'); 
}
/**
 * End the execution
 */
exports.asyncTable.prototype.end = function() {
    sys.log('fsm exec ended');
}

/**
 * Set a state
 */
exports.asyncTable.prototype.on = function(name, state) {
    sys.log('fsm add state ' + name);
    this.states[name] = state; 
}

