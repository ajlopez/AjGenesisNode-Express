
var path = require('path'),
    models = require('../libs/models');

function generate(model, args, ajgenesis, cb) {
    models.completeModel(model);
    
    var routesdir = 'routes';
    var servicesdir = 'services';
    var viewsdir = 'views';
    
    ajgenesis.createDirectory(routesdir);
    ajgenesis.createDirectory(servicesdir);
    ajgenesis.createDirectory(viewsdir);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'app.js.tpl'), 'app.js', model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'package.json.tpl'), 'package.json', model);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'header.ejs.tpl'), path.join(viewsdir, 'header.ejs'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'headerjumbo.ejs.tpl'), path.join(viewsdir, 'headerjumbo.ejs'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'footer.ejs.tpl'), path.join(viewsdir, 'footer.ejs'), model);
    
    model.entities.forEach(function (entity) {
        model.entity = entity;

        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'entity.js.tpl'), path.join(routesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'services', 'entity.js.tpl'), path.join(servicesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'entitylist.ejs.tpl'), path.join(viewsdir, entity.name + 'list.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'entityview.ejs.tpl'), path.join(viewsdir, entity.name + 'view.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'entitynew.ejs.tpl'), path.join(viewsdir, entity.name + 'new.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', viewsdir, 'entityedit.ejs.tpl'), path.join(viewsdir, entity.name + 'edit.ejs'), model);

        delete model.entity;
    });
    
    cb(null, null);
}

module.exports = function (model, args, ajgenesis, cb) {
    generate(model, args, ajgenesis, cb);
}
