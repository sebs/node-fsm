// the async table of states
var sys = require('sys');
var state = require('./fsm-state').state;
var emitter = require('node-evented').EventEmitter;

exports.asyncTable = function(initCb) 
{
    var me = this;
    this.emitter = new emitter();
    this.emitter.on('init', initCb);
    this.emitter.on('end', function() {sys.log('end');});
    this.emitter.emit('init');
}

exports.asyncTable.prototype.run = function(cb) 
{
    this.emitter.on('run', cb);
    this.emitter.emit('run');
}
