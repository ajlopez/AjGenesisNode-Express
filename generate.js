
var fs = require('fs'),
    path = require('path');

module.exports = function (model, args, ajgenesis, cb) {
    var buildir = (args && args.length) ? args[0] : 'build';
    buildir = path.resolve(buildir);    
    ajgenesis.createDirectory(buildir);
    
    if (!model.name)
        model.name = 'world';
    
    var javatemplatename = path.join(__dirname, 'templates', 'java.tpl');
    var javatargetname = path.join(buildir, 'Hello.java');
    
    var cstemplatename = path.join(__dirname, 'templates', 'cs.tpl');
    var cstargetname = path.join(buildir, 'Hello.cs');
    
    var vbtemplatename = path.join(__dirname, 'templates', 'vb.tpl');
    var vbtargetname = path.join(buildir, 'Hello.vb');
    
    var jstemplatename = path.join(__dirname, 'templates', 'js.tpl');
    var jstargetname = path.join(buildir, 'hello.js');
    
    ajgenesis.fileTransform(javatemplatename, javatargetname, model);
    ajgenesis.fileTransform(cstemplatename, cstargetname, model);
    ajgenesis.fileTransform(vbtemplatename, vbtargetname, model);
    ajgenesis.fileTransform(jstemplatename, jstargetname, model);
    
    cb(null, null);
}