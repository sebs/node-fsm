var fsm = require('./common').fsm;
var state = require('./common').state;
var sys = require('sys');
/**
 * Module dependencies.
 */
module.exports = {
    'basic stats output': function(assert){
        // first of all we ad states
        var myFsm = new fsm(function() {});
        var stats = myFsm.stats();
        assert.type(stats, 'object');
        assert.type(stats.states, 'object');
        assert.type(stats.ticks, 'number');
        assert.type(stats.time.tick, 'object');
        assert.type(stats.time.created, 'object');
        // sys.log(JSON.stringify(stats)); 
        var testState = new state();
        myFsm.on('teststate', testState);
        myFsm.execute('teststate');
    }, 
};


