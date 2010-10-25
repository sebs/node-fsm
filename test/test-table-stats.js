var fsm = require('./common').fsm;
var state = require('./common').state;
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
    }, 
};


