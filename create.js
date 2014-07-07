
var path = require('path');
var generatetask = require('./source/ajgenesis/tasks/generate');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, 'source'));
    
    ajgenesis.copyDirectory(source, dirname, function (err, result) {
        if (err) {
            cb(err, null);
            return;
        }
        
        var model = { project: { name: dirname, version: '0.0.1'} , entities: [] };
        
        ajgenesis.saveModel(path.join(ajgenesis.getModelDirectory(dirname), 'project.json'), model);

        model.builddir = dirname;
        
        generatetask(model, [], ajgenesis, cb);
    });
}
