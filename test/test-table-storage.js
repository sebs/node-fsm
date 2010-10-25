var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'fsm storage': function(assert){
        myFsm = new fsm(function(){});
        myFsm.setData({id:1}); 
        var data = myFsm.getData();
        assert.eql(data.id, 1);
    }
};



