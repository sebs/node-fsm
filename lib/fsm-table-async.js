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
    this.data = {};
    this.em = new emitter();
    this.em.on('init', initCb);
    this.em.on('end', function() {sys.log('fsm end');});
    this.em.emit('init');
}


exports.asyncTable.prototype.emitState = function(name){
    this.state = name; 
    var me = this;
    this.states[name].execute();
}

/**
 * execute the fsm
 */
exports.asyncTable.prototype.execute = function(name)
{ 
    this.emitState(name);
}
/**
 * End the execution
 */
exports.asyncTable.prototype.end = function() {

}

/**
 * Set a state
 */
exports.asyncTable.prototype.on = function(name, state) {
    this.states[name] = state; 
}

exports.asyncTable.prototype.getData = function() {
    return this.data;
}

exports.asyncTable.prototype.setData = function(data) {
    this.data = data;
    return true;
}

