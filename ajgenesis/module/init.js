    
var path = require('path');
var models = require('./libs/models');
var utils = require('./libs/utils');

function init(model, args, ajgenesis, cb) {
    models.completeModel(model);
    
    if (!model.builddir)
        model.builddir = '.';
        
    if (!model.utils)
        model.utils = utils;

    ajgenesis.fs.copyDirectory(path.join(__dirname, 'source'), model.builddir, { noreplace: true }, cb);
}

module.exports = init;

