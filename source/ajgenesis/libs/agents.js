
var fs = require('fs'),
    path = require('path');

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

function loadAgents(dirname) {
    var agents = [];
    
    fs.readdirSync(dirname).forEach(function (filename) {
        if (isDirectory(filename))
            return;
            
        if (path.extname(filename) != '.js')
            return;
            
        filename = path.resolve(path.join(dirname, filename));
        
        agents.push(require(filename));
    });
    
    return agents;
}

module.exports = {
    loadAgents: loadAgents
}