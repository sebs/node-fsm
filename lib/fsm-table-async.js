// the async table of states
var sys = require('sys');
var state = require('./fsm-state').state;
var emitter = require("events").EventEmitter;
/**
 * Async table based fsm
 */
exports.asyncTable = function(initCb, data) 
{
    var me = this;
    this.states = {};
    this.state = null
    this.data = (typeof data =='object') ? data : {};
    this.time = { tick: new Date(), created: new Date()};
    this.em = new emitter();
    this.em.on('init', initCb);
    this.em.on('end', function() {//sys.log('fsm end');
    });
    this.counter = 0;
    this.em.emit('init');

}

/**
 * FSM stats info 
 */
exports.asyncTable.prototype.stats = function() {
    return {
        'ticks':    this.counter,
        'states':   this.states, 
        'time':     this.time,  
    }
}

/**
 * Counts statechanges and writes stats
 */
exports.asyncTable.prototype.tick = function() {
    this.counter++;
    this.time.tick = new Date();  
}

/**
 * Emits a single state
 */
exports.asyncTable.prototype.emitState = function(name){
    this.tick();
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
    this.em.emit('end');
}

/**
 * Set a state
 */
exports.asyncTable.prototype.on = function(name, state) {
    this.states[name] = state; 
}

/**
 * get the fsm payload
 */
exports.asyncTable.prototype.getData = function() {
    return this.data;
}

/**
 * set the Fsm payload
 */
exports.asyncTable.prototype.setData = function(data) {
    this.data = data;
    return true;
}

