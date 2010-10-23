var assert = require('assert');
var sys = require('sys');
var state = require('../lib/fsm-state').state;
var table = require('../lib/fsm-table-async').asyncTable;
var myFsm = new table(function() {
    sys.log('fsm init cb');
});
assert.ok(typeof myFsm == 'object');
var me = myFsm;
var found = new state();
found.on('transition', function() {
    // end the fsm
    sys.log('ending the fsm');
    me.end();
});
// add the state to the fsm 
myFsm.on('state', found); 
// run the fsm 
myFsm.execute('state', function(){
    sys.log('fsm run cb');    
});
