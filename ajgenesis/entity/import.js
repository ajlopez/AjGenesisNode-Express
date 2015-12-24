
var path = require('path'),
    names = require('./lib/names');

module.exports = function (model, args, ajgenesis, cb) {
    var model = ajgenesis.loadModel(args[0]);
    
    if (!model || !model.entities || typeof model.entities != 'object') {
        cb(null, null);
        return;
    }
        
    ajgenesis.createModelDirectory();
    ajgenesis.fs.createDirectory(ajgenesis.getModelDirectory(), 'entities');
    
    for (var n in model.entities) {
        var entity = model.entities[n];
        var filename = path.join(ajgenesis.getModelDirectory(), 'entities', entity.name + '.json');
        ajgenesis.saveModel(filename, entity);
    }
    
    cb(null, null);
}

