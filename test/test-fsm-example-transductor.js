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
fsm.addState('Error');
fsm.addState('Sucess');

fsm.setData('text', 'agile');

var myFsm = fsm; 
var cbInitFoundInit = function() {
    if (myFsm.getData('text').charAt(0) == 'a') return 'FOUND_A';
    return 'ERROR';    
};
var cbInitFoundA = function() {
    if (myFsm.getData('text').charAt(1) == 'g') return 'FOUND_G';
    return 'ERROR';    
}; 
var cbInitFoundG = function() {
    if (myFsm.getData('text').charAt(2) == 'i') return 'FOUND_I';
    return 'ERROR';    
}; 
var cbInitFoundI = function() {
    if (myFsm.getData('text').charAt(3) == 'l') return 'FOUND_L';
    return 'ERROR';    
}; 
var cbInitFoundL = function() {
    if (myFsm.getData('text').charAt(4) == 'e') return 'FOUND_E';
    return 'ERROR';    
}; 
var cbInitFoundE = function() {
    return 'Final';
};

var cbInitFound = function() {
    return 'Final'; 
};

var cbFinal = function() {
    var data = myfsmGetData.valid; 
    asser.ok(data == true);
}

fsm.addTransition('Init', 'FOUND_A', cbInitFoundA);
fsm.addTransition('FOUND_A', 'FOUND_G', cbInitFoundG);
fsm.addTransition('FOUND_G', 'FOUND_I', cbInitFoundI);
fsm.addTransition('FOUND_I', 'FOUND_L', cbInitFoundL);
fsm.addTransition('FOUND_L', 'FOUND_E', cbInitFoundE);
fsm.addTransition('FOUND_E', 'Final', cbFinal);





fsm.run();
