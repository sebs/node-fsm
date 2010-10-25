var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'bar()': function(assert){
        var myFsm = new fsm(function() {
           //  sys.log('fsm init cb');
        });
        assert.ok(typeof myFsm == 'object');
        var found = new state();
        found.on('transition', function() {
            // end the fsm
            // sys.log('to sucess');
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
        myFsm.execute('state', function(){
            
        });
    }
}
