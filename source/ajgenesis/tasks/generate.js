
var path = require('path');
var models = require('../libs/models');
var utils = require('../libs/utils');

function generate(model, args, ajgenesis, cb) {
    models.completeModel(model);
    
    if (!model.builddir)
        model.builddir = '.';
        
    if (!model.utils)
        model.utils = utils;
        
    var builddir = model.builddir;
    
    var routesdir = path.join(builddir, 'routes');
    var controllersdir = path.join(builddir, 'controllers');
    var servicesdir = path.join(builddir, 'services');
    var viewsdir = path.join(builddir, 'views');
    var bindir = path.join(builddir, 'bin');
    
    ajgenesis.createDirectory(builddir);
    ajgenesis.createDirectory(bindir);
    ajgenesis.createDirectory(routesdir);
    ajgenesis.createDirectory(controllersdir);
    ajgenesis.createDirectory(servicesdir);
    ajgenesis.createDirectory(viewsdir);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'app.js.tpl'), path.join(builddir, 'app.js'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'package.json.tpl'), path.join(builddir, 'package.json'), model);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'bin', 'www.tpl'), path.join(bindir, 'www'), model);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'header.ejs.tpl'), path.join(viewsdir, 'header.ejs'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'headerjumbo.ejs.tpl'), path.join(viewsdir, 'headerjumbo.ejs'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'footer.ejs.tpl'), path.join(viewsdir, 'footer.ejs'), model);
    
    model.entities.forEach(function (entity) {
        model.entity = entity;

        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'entity.js.tpl'), path.join(routesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'controllers', 'entity.js.tpl'), path.join(controllersdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'services', 'entity.js.tpl'), path.join(servicesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entitylist.ejs.tpl'), path.join(viewsdir, entity.name + 'list.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entityview.ejs.tpl'), path.join(viewsdir, entity.name + 'view.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entitynew.ejs.tpl'), path.join(viewsdir, entity.name + 'new.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entityedit.ejs.tpl'), path.join(viewsdir, entity.name + 'edit.ejs'), model);
        
        if (model.api) {
            ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'entityapi.js.tpl'), path.join(routesdir, entity.name + 'api.js'), model);
            ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'controllers', 'entityapi.js.tpl'), path.join(controllersdir, entity.name + 'api.js'), model);
        }

        delete model.entity;
    });
    
    cb(null, null);
}

module.exports = function (model, args, ajgenesis, cb) {
    generate(model, args, ajgenesis, cb);
}
