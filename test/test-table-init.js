var fsm = require('./common').fsm;
var state = require('./common').state;

module.exports = {
    'testing the callback of the fsm': function(assert){
        var myFsm = new fsm(function(){}, {id:1});
        var data = myFsm.getData();
        assert.eql(data.id, 1);
    }
};

