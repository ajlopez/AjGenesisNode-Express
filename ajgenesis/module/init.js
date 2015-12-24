    
var path = require('path');
var models = require('./libs/models');
var utils = require('./libs/utils');

function init(model, args, ajgenesis, cb) {
    models.completeModel(model);
    
    if (!model.builddir)
        model.builddir = '.';
        
    if (!model.utils)
        model.utils = utils;
    
    ajgenesis.createModelDirectory(model.builddir);
    
    if (!ajgenesis.fs.exists(path.join(ajgenesis.getModelDirectory(model.builddir), 'project.json')))
        ajgenesis.saveModel('project', model.project, model.builddir);

    ajgenesis.fs.copyDirectory(path.join(__dirname, 'source'), model.builddir, { noreplace: true }, cb);
}

module.exports = init;

