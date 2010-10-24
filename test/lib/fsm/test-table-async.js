var assert = require('assert');
var sys = require('sys');
var state = require('../../../lib/fsm-state').state;
var table = require('../../../lib/fsm-table-async').asyncTable;
var myFsm = new table(function() {
   //  sys.log('fsm init cb');
});
assert.ok(typeof myFsm == 'object');
var found = new state();
found.on('transition', function() {
    // end the fsm
    // sys.log('to sucess');
    myFsm.emitState('end_state');
});
var end = new state();
end.on('transition', function() {
    myFsm.end();    
});

// add the state to the fsm 
myFsm.on('state', found); 
myFsm.on('end_state', end);

// run the fsm 
myFsm.execute('state', function(){
    
});

