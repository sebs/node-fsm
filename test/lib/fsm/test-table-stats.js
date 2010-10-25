
/**
 * Module dependencies.
 */
module.exports = {
    'bar()': function(assert){
        var fsm = require('../../../lib/fsm-table-async').asyncTable;
        var state = require('../../../lib/fsm-state');
        // first of all we ad states
        var myFsm = new fsm(function() {});
        var stats = myFsm.stats();
        assert.ok(typeof stats == 'object');
    }
};


