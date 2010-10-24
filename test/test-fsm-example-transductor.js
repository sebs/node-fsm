var assert = require('assert');
var state = require('../lib/fsm-state').state;
var fsm = require('../lib/fsm-table-async').asyncTable;
var sys = require('sys');

var foundA = new state();
foundA.on('input', function() {
    foundA.setData({text:'agile'});
    foundA.emit('transition');
});
foundA.on('transition', function() {
    var data = foundA.getData();
    if (data.text.charAt(0)== 'a') {
        sys.log('to found g');
    } else {
        sys.log('to error');
    }
    assert.ok(data.text == 'agile');
});
foundA.execute();
var foundG = new state();
foundG.on('input', function() {
    foundG.setData({text:'agile'});    
    foundG.emit('transition');
});
foundG.on('transition', function() {
    var data = foundG.getData(); 
    if (data.text.charAt(1)== 'g') {
        sys.log('to found i');
    } else {
        sys.log('to error');
    }
    assert.ok(data.text == 'agile');
});
foundG.execute();

foundI = new state();
foundI.on('input', function() {
    foundI.setData({text:'agile'});
    foundI.emit('transition');
});
foundI.on('transition', function() {
    data = foundI.getData();
    if (data.text.charAt(2)== 'i') {
        sys.log('to found l');
    } else {
        sys.log('to error');
    }
});
foundI.execute();

var foundL = new state();
foundL.on('input', function() {
    foundL.setData({text:'agile'});
    foundL.emit('transition');
});
foundL.on('transition', function() {
    data = foundL.getData();
    if (data.text.charAt(3)== 'l') {
        sys.log('to found e');
    } else {
        sys.log('to error');
    }
});
foundL.execute();

var foundE = new state(); 
foundE.on('input', function() {
    foundL.setData({text:'agile'});
    foundL.emit('transition');
});
foundE.on('transition', function() {
    var data = foundE.getData();
    if (data.text.charAt(4)== 'e') {
        sys.log('to found win');
    } else {
        sys.log('to error');
    }  
});

var error = new state();
error.on('input', function() {
    sys.log('the word agile was not parsed');
});
error.execute();

var win = new state();
win.on('input', function() {
    sys.log('win');
});

// now add all the states to the fsm
var myFsm = new fsm(function() {
    
});
myFsm.on('win', win);
myFsm.on('error', error);
myFsm.on('found_a', foundA); 
myFsm.on('found_g', foundG)
myFsm.on('found_i', foundI);
myFsm.on('found_l', foundL);
myFsm.on('found_e', foundE);
myFsm.execute('found_a');







