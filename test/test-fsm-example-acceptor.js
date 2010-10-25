var common = require('./common');
var fsm = common.fsm; 
var state = common.state; 

module.exports = {
    'example acceptor': function(assert){
        var sys = require('sys');
        // now add all the states to the fsm
        var myFsm = new common.fsm(function() {});
            
            var foundA = new common.state();
            foundA.on('input', function() {
                foundA.setPayLoad({text:'agile'});
                foundA.emit('transition');
            });
            foundA.on('transition', function() {
                var data = foundA.getPayLoad();
                if (data.text.charAt(0)== 'a') {
                    myFsm.emitState('found_g');
                } else {
                    myFsm.emitState('error');
                }
                assert.ok(data.text == 'agile');
            }); 
            
            var foundG = new common.state();
            foundG.on('input', function() {
                foundG.setPayLoad({text:'agile'});
                foundG.emit('transition');
            });
            foundG.on('transition', function() {
                var data = foundG.getPayLoad();
                if (data.text.charAt(1)== 'g') {
                    myFsm.emitState('found_i');
                } else {
                    myFsm.emitState('error');
                }
                assert.ok(data.text == 'agile');
            });
            foundI = new state();
            foundI.on('input', function() {
                foundI.setPayLoad({text:'agile'});
                foundI.emit('transition');
            });
            foundI.on('transition', function() {
                data = foundI.getPayLoad();
                if (data.text.charAt(2)== 'i') {
                    myFsm.emitState('found_l');
                } else {
                    myFsm.emitState('error');
                }
            });
            
            foundI = new state();
            foundI.on('input', function() {
                foundI.setPayLoad({text:'agile'});
                foundI.emit('transition');
            });
            foundI.on('transition', function() {
                data = foundI.getPayLoad();
                if (data.text.charAt(2)== 'i') {
                    myFsm.emitState('found_l');
                } else {
                    myFsm.emitState('error');
                }
            });
            var foundL = new state();
            foundL.on('input', function() {
                foundL.setPayLoad({text:'agile'});
                foundL.emit('transition');
            });
            foundL.on('transition', function() {
                data = foundL.getPayLoad();
                if (data.text.charAt(3)== 'l') {
                    myFsm.emitState('found_e');
                } else {
                    myFsm.emitState('error');
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
            });
            
            var win = new state();
            win.on('input', function() {
                // @todo add a test
                //sys.log('i win at finding agile win');
            });
            
            myFsm.on('win', win);
            myFsm.on('error', error);
            myFsm.on('found_a', foundA);
            myFsm.on('found_g', foundG)
            myFsm.on('found_i', foundI);
            myFsm.on('found_l', foundL);
            myFsm.on('found_e', foundE);
            myFsm.execute('found_a');
    }
};

