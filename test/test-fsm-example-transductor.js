var assert = require('assert');
var table = require('../lib/fsm-table').table;
// first of all we ad states

var fsm = new table();

fsm.addState('Init'); 
fsm.addState('FOUND_A');
fsm.addState('FOUND_G');
fsm.addState('FOUND_I');
fsm.addState('FOUND_L');
fsm.addState('FOUND_E');
fsm.addState('Final');
fsm.addState('ERROR');

fsm.setData('text', 'agile');

var myFsm = fsm; 
var a = function() {
    if (myFsm.getData('text').charAt(0) == 'a') return 'FOUND_A';
    return 'ERROR';    
};
var g = function() {
    if (myFsm.getData('text').charAt(1) == 'g') return 'FOUND_G';
    return 'ERROR';    
}; 
var i = function() {
    if (myFsm.getData('text').charAt(2) == 'i') return 'FOUND_I';
    return 'ERROR';    
}; 
var l = function() {
    if (myFsm.getData('text').charAt(3) == 'l') return 'FOUND_L';
    return 'ERROR';    
}; 
var e = function() {
    if (myFsm.getData('text').charAt(4) == 'e') return 'FOUND_E';
    return 'ERROR';    
}; 

var cbFinal = function() {
    return 'Final';
}

var cbError = function() {
    return 'Final';
}

states = ['FOUND_A', 'FOUND_G', 'FOUND_I', 'FOUND_L', 'FOUND_E'];

fsm.addTransition('Init', 'FOUND_A', a);
fsm.addTransition('FOUND_A', 'FOUND_G', g);
fsm.addTransition('FOUND_G', 'FOUND_I', i);
fsm.addTransition('FOUND_I', 'FOUND_L', l);
fsm.addTransition('FOUND_L', 'FOUND_E', e);
fsm.addTransition('FOUND_E', 'Final', cbFinal);

for (i in states) {
    // fsm.addTransition(states[i], 'ERROR', cbError);
}
fsm.run();
