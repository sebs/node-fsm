

module.exports = {
    'bar()': function(assert){
        var state = require('../../../lib/fsm-state').state;
        var fsm = require('../../../lib/fsm-table-async').asyncTable;
        var sys = require('sys');
        // now add all the states to the fsm
        var myFsm = new fsm(function() {});
        assert.ok(myFsm.counter == 0);
        
        var foundE = new state();
        foundE.on('input', function() {
            foundE.emit('transition');
            assert.ok(myFsm.counter == 2);
        });
        
        foundE.on('transition', function() {
            myFsm.emitState('win');
        });
        
        var win = new state();
        win.on('input', function() {
            // sys.log('i win at finding agile win');
        });
        
        myFsm.on('win', win);
        myFsm.on('found_e', foundE);
        myFsm.execute('found_e');
        assert.ok(myFsm.counter == 2);
    }
};

