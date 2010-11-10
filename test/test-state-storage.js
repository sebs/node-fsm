var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'state storage basic test': function(assert){
        var myState = new state();
        assert.ok(myState.setPayLoad({id:1}));
        var data = myState.getPayLoad();
        assert.eql(typeof data, 'object');
        assert.ok(data.id == 1); 
    }
};

