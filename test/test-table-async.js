var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'member vars ': function(assert) {
        var myFsm = new fsm(function() {});
        assert.type(myFsm, 'object');
    }, 
    'transition works': function(assert){
        var myFsm = new fsm(function() {});
        var found = new state();
        found.on('transition', function() {
            // end the fsm
            myFsm.emitState('end_state');
        });
        var end = new state();
        end.on('transition', function() {
            myFsm.end();
        });
        
        // add the state to the fsm 
        myFsm.on('state', found);
        myFsm.on('end_state', end);
        // run the fsm 
        myFsm.execute('state', function(){});
    }
}
