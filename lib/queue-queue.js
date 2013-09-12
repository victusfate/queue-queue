var q = function() {
    this.init();
};

q.prototype.init = function() {
    this.events = {};
    // this.events = []; // was experimenting with speed of array vs associative array
}

// push overrides earlier events that share a key
q.prototype.push = function(oPrimaryKey,oEventFunc) {
    this.events[oPrimaryKey] = oEventFunc;
}

q.prototype.pop = function(oPrimaryKey) {
    var oEventFunc = this.events[oPrimaryKey];
    this.events[oPrimaryKey] = undefined;
    if (typeof(oEventFunc) ==  'function') oEventFunc();
}

module.exports = q;