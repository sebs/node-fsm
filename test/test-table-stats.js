var fsm = require('./common').fsm;
var state = require('./common').state;

/**
 * Module dependencies.
 */
module.exports = {
    'module dependencies': function(assert){
        // first of all we ad states
        var myFsm = new fsm(function() {});
        var stats = myFsm.stats();
        assert.eql(typeof stats, 'object');
    }
};


