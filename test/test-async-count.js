var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'basic test of the counter': function(assert){
        // now add all the states to the fsm
        var myFsm = new fsm(function() {});
        assert.eql(myFsm.counter, 0);
        var foundE = new state();
        foundE.on('input', function() {
            foundE.emit('transition');
            assert.eql(myFsm.counter, 2);
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
        assert.eql(myFsm.counter, 2);
    }
};

