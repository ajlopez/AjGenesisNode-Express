
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, 'source'));
    
    ajgenesis.copyDirectory(source, dirname, function (err, result) {
        if (err) {
            cb(err, null);
            return;
        }
    
        ajgenesis.fileTransform(path.join(__dirname, 'templates', 'project.json.tpl'), path.join(dirname, 'models', 'project.json'), { name: dirname });
        
        cb(null, result);
    });
}
