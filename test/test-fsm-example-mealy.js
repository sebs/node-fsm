common = require('./common');
var fsm = common.fsm; 
var state = common.state; 
var sys = require('sys');

module.exports = {
    'moore': function(assert) {
        var microwave = new fsm(function(){});
        var init = new state();
        init.on('input', function(state) {
            // this is just her ebecause i dont want a concrete implementation, just a abstract one 
            microwave.setData({
                run: false,
                timer: function() {}, 
                door: true, // true == closed  
                power: true, // true == on  
                lamp: false,     
            });
            state.emit('transition');
        });
        init.on('transition', function(state) {
            sys.log('going to idle mode');
            microwave.emitState('idle');    
        });
        microwave.on('init', init);
        var idle = new state();
        idle.on('input', function(state) {
            state.setPayLoad(microwave.getData());
            state.emit('entry');
        });
        idle.on('entry', function(state){
            sys.log('lamp is off');
            sys.log('timeout reset'); // this might be a problem     
        });
        microwave.on('idle', idle);
        var cooking = new state(); 
        cooking.on('input', function(state) {
            state.setPayLoad(microwave.getData());
            state.emit('entry');
        });
        microwave.execute('init');        
    }, 
};
