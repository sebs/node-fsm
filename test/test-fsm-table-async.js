var assert = require('assert');
var sys = require('sys');
var table = require('../lib/fsm-table-async').asyncTable;

var myFsm = new table(function() {
    sys.log('init');
});

assert.ok(typeof myFsm == 'object');

var me = myFsm;
myFsm.run(function() {
    sys.log('run');
    me.emitter.emit('end');    
});


