var assert = require('assert');
var fsm = require('../lib/fsm-table-async');
myFsm = new fsm.asyncTable(function(){});
myFsm.setData({id:1});
var data = myFsm.getData();
assert.ok(data.id == 1);


