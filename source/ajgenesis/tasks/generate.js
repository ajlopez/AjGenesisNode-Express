
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var routesdir = path.join('build', 'routes');
    var servicesdir = path.join('build', 'services');
    
    ajgenesis.createDirectory('build');
    ajgenesis.createDirectory(routesdir);
    ajgenesis.createDirectory(servicesdir);

    ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'app.js.tpl'), path.join('build', 'app.js'), model);
    
    model.entities.forEach(function (entity) {
        model.entity = entity;
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'routes', 'entity.js.tpl'), path.join(routesdir, entity.name + '.js'), model);
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'services', 'entity.js.tpl'), path.join(servicesdir, entity.name + '.js'), model);
        delete model.entity;
    });
    
    cb(null, null);
}
