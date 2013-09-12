var q = require('./lib/queue-queue');

var tStart = Date.now();

var action = function() {
    if (this.sMessage.iUser == 9) console.log('action fired by ',this.sMessage,Date.now()-tStart);
}

var NUsers = 10;
var probEventQueued  = 0.8;
var probEventDrained = 0.8;
var dTQueue = 200;
var dTDrain = 1000;
var SimTime = 20000;

var oUserActionCounter = {};
for (var iUser = 0; iUser < NUsers; iUser++) {
    oUserActionCounter[iUser] = 0;
}

var eventQueue = new q;

var queueEvents = function() {
    if (Date.now() - tStart >= SimTime) return;

    for (var iUser = 0; iUser < NUsers; iUser++) {
        if (Math.random() < probEventQueued) {
            var oMessage = { sMessage: { iUser: iUser, iAction: oUserActionCounter[iUser]++ } };
            var tmpFunc = action.bind(oMessage);
            setTimeout(eventQueue.push(iUser,tmpFunc),Math.random()*dTQueue);
        }
    }
    setTimeout(queueEvents,Math.random()*dTQueue);
}

var drainEvents = function() {
    if (Date.now() - tStart >= SimTime) return;
    for (var iUser = 0; iUser < NUsers; iUser++) {
        if (Math.random() < probEventDrained) {
            setTimeout(eventQueue.pop(iUser),Math.random()*dTDrain);
        }
    }    
    setTimeout(drainEvents,Math.random()*dTDrain);
}


queueEvents();
drainEvents();
