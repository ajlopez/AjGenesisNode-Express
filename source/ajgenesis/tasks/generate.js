
var path = require('path');

function generate(model, args, ajgenesis, cb) {
    var routesdir = path.join('build', 'routes');
    var servicesdir = path.join('build', 'services');
    
    ajgenesis.createDirectory('build');
    ajgenesis.createDirectory(routesdir);
    ajgenesis.createDirectory(servicesdir);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'app.js.tpl'), path.join('build', 'app.js'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'package.json.tpl'), path.join('build', 'package.json'), model);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'layout.ejs.tpl'), path.join('build', 'views', 'layout.ejs'), model);
    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'layoutjumbo.ejs.tpl'), path.join('build', 'views', 'layoutjumbo.ejs'), model);
    
    model.entities.forEach(function (entity) {
        model.entity = entity;

        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'entity.js.tpl'), path.join(routesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'services', 'entity.js.tpl'), path.join(servicesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entitylist.ejs.tpl'), path.join('build', 'views', entity.name + 'list.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entityview.ejs.tpl'), path.join('build', 'views', entity.name + 'view.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entitynew.ejs.tpl'), path.join('build', 'views', entity.name + 'new.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'views', 'entityedit.ejs.tpl'), path.join('build', 'views', entity.name + 'edit.ejs'), model);

        delete model.entity;
    });
    
    cb(null, null);
}

module.exports = function (model, args, ajgenesis, cb) {
    var source = path.resolve(path.join(__dirname, '..', '..', 'site'));    
    ajgenesis.copyDirectory(source, 'build', function(err, result) {
        if (err) {
            cb(err, null);
            return;
        }
        
        generate(model, args, ajgenesis, cb);
    });
}
