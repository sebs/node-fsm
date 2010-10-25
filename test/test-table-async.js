
/**
 * Module dependencies.
 */
module.exports = {
    'bar()': function(assert){
        // first of all we ad states
        var myFsm = new fsm(function() {});
        var stats = myFsm.stats();
        assert.ok(typeof stats == 'object');
    }
};


