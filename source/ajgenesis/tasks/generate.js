
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var routesdir = path.join('build', 'routes');
    
    ajgenesis.createDirectory('build');
    ajgenesis.createDirectory(routesdir);
    
    model.entities.forEach(function (entity) {
        model.entity = entity;
        ajgenesis.fileTransform(path.join(__dirname, '..', 'templates', 'entitycontroller.tpl'), path.join(routesdir, entity.name + '.js'), model);
        delete model.entity;
    });
    
    cb(null, null);
}
