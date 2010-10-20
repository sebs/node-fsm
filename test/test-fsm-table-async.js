var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state').state;
var table = require('../lib/fsm-table-async').asyncTable;
var myFsm = new table(function() {
    sys.log('init');
});
assert.ok(typeof myFsm == 'object');
var me = myFsm;
var found = new state();
var error = new state();
var sucess = new state();

myFsm.on('F_FOUND', found);
myFsm.on('WIN', error);
myFsm.on('FAIL', sucess);

myFsm.run('F_FOUND', function() {
    sys.log('run');
    me.emitter.emit('SUCCESS');    
});
