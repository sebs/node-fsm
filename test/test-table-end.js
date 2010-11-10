var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'new test': function(assert) {
        var myFsm = new fsm(function() {}, {id:1});
        var myState = new state();
        myState.on('input', function() { 
            myFsm.setData({id:2});
            myFsm.end();
        });
        myFsm.on('state', myState);
        myFsm.em.on('end', function(fsm, cb) {
            var data = fsm.getData();
            assert.eql(data.id, 2); 
        });
        myFsm.execute('state');
    },     
}
