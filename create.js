
var path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var dirname = args[0];
    
    var source = path.resolve(path.join(__dirname, 'source'));    
    ajgenesis.copyDirectory(source, dirname, cb);
}
