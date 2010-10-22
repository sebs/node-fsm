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
found.on('entry', function() {
    sys.log('found entry');
    me.emit('WIN');    
});
var error = new state();
var win = new state();

myFsm.on('F_FOUND', found);
myFsm.on('WIN', win);
myFsm.on('FAIL', error);

myFsm.run('F_FOUND', function() {
    sys.log('run');
    me.em.emit('WIN');    
});

