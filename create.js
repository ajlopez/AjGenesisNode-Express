
var path = require('path');
var generatetask = require('./source/ajgenesis/tasks/generate');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, 'source'));
    
    model = model || { };
    
    ajgenesis.copyDirectory(source, dirname, function (err, result) {
        if (err) {
            cb(err, null);
            return;
        }
        
        var projmodel;

        if (model.project)
            projmodel = model.project;
        else
            projmodel = { project: { name: path.basename(dirname), version: '0.0.1'} };
        
        ajgenesis.saveModel(path.join(ajgenesis.getModelDirectory(dirname), 'project.json'), projmodel);
        
        model.project = projmodel.project;
        model.builddir = dirname;
        
        generatetask(model, [], ajgenesis, cb);
    });
}
