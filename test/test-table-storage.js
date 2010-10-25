module.exports = {
    'bar()': function(assert){
        myFsm = new fsm.asyncTable(function(){});
        myFsm.setData({id:1});
        var data = myFsm.getData();
        assert.ok(data.id == 1);
    }
};



