var assert = require('assert');
var state = require('../lib/fsm-state').state;
var fsm = require('../lib/fsm-table-async').asyncTable;
var sys = require('sys');
// now add all the states to the fsm
var myFsm = new fsm(function() {});

var foundA = new state();
foundA.on('input', function() {
    foundA.setData({text:'agile'});
    foundA.emit('transition');
});
foundA.on('transition', function() {
    var data = foundA.getData();
    if (data.text.charAt(0)== 'a') {
        sys.log('found_a');
        myFsm.emitState('found_g');
    } else {
        myFsm.emitState('error');
    }
    assert.ok(data.text == 'agile');
});
var foundG = new state();
foundG.on('input', function() {
    foundG.setData({text:'agile'});    
    foundG.emit('transition');
});
foundG.on('transition', function() {
    var data = foundG.getData(); 
    if (data.text.charAt(1)== 'g') {
        myFsm.emitState('found_i');
    } else {
        myFsm.emitState('error');
    }
    assert.ok(data.text == 'agile');
});

foundI = new state();
foundI.on('input', function() {
    foundI.setData({text:'agile'});
    foundI.emit('transition');
});
foundI.on('transition', function() {
    data = foundI.getData();
    if (data.text.charAt(2)== 'i') {
        myFsm.emitState('found_l');
    } else {
        sys.log('to error');
        myFsm.emitState('error');
    }
});

var foundL = new state();
foundL.on('input', function() {
    foundL.setData({text:'agile'});
    foundL.emit('transition');
});
foundL.on('transition', function() {
    data = foundL.getData();
    if (data.text.charAt(3)== 'l') {
        myFsm.emitState('found_e');
    } else {
        myFsm.emitState('error');
        sys.log('to error');
    }
});

var foundE = new state(); 
foundE.on('input', function() {
    foundE.emit('transition');
});
foundE.on('transition', function() {
    myFsm.emitState('win');
});

var error = new state();
error.on('input', function() {
    sys.log('the word agile was not parsed');
});

var win = new state();
win.on('input', function() {
    sys.log('i win at finding agile win');
});

myFsm.on('win', win);
myFsm.on('error', error);
myFsm.on('found_a', foundA); 
myFsm.on('found_g', foundG)
myFsm.on('found_i', foundI);
myFsm.on('found_l', foundL);
myFsm.on('found_e', foundE);
myFsm.execute('found_a');


