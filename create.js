
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, 'source'));
    
    ajgenesis.copyDirectory(source, dirname, function (err, result) {
        if (err) {
            cb(err, null);
            return;
        }
        
        var model = { project: { name: dirname, version: '0.0.1'} , entities: [] };

        ajgenesis.fileTransform(path.join(__dirname, 'source', 'ajgenesis', 'templates', 'package.json.tpl'), path.join(dirname, 'package.json'), model);
        ajgenesis.fileTransform(path.join(__dirname, 'source', 'ajgenesis', 'templates', 'app.js.tpl'), path.join(dirname, 'app.js'), model);

        ajgenesis.createDirectory(dirname, 'ajgenesis', 'models');
        ajgenesis.fileTransform(path.join(__dirname, 'templates', 'project.json.tpl'), path.join(dirname, 'ajgenesis', 'models', 'project.json'), model);

        ajgenesis.createDirectory(dirname, 'bin');
        ajgenesis.fileTransform(path.join(__dirname, 'source', 'ajgenesis', 'templates', 'bin', 'www.tpl'), path.join(dirname, 'bin', 'www'), model);

        ajgenesis.createDirectory(dirname, 'views');
        ajgenesis.fileTransform(path.join(__dirname, 'source', 'ajgenesis', 'templates', 'views', 'header.ejs.tpl'), path.join(dirname, 'views', 'header.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, 'source', 'ajgenesis', 'templates', 'views', 'headerjumbo.ejs.tpl'), path.join(dirname, 'views', 'headerjumbo.ejs'), model);
        ajgenesis.fileTransform(path.join(__dirname, 'source', 'ajgenesis', 'templates', 'views', 'footer.ejs.tpl'), path.join(dirname, 'views', 'footer.ejs'), model);
        
        cb(null, result);
    });
}
