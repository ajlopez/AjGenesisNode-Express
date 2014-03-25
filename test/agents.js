
var agents = require('../source/ajgenesis/libs/agents'),
    path = require('path');

exports['load agents'] = function (test) {
    var list = agents.loadAgents(path.join(__dirname, 'agents'));
    
    test.ok(list);
    test.ok(Array.isArray(list));
    test.equal(list.length, 1);
    test.ok(list[0].getName);
    test.equal(list[0].getName(), 'agent1');
};