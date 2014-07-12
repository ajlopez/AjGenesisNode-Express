
var createtask = require('../create'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['create application with model'] = function (test) {
    test.async();
    
    ajgenesis.createDirectory('test', 'apps');
    var dirname = path.join('test', 'apps', 'myapp');
    var model = ajgenesis.loadModel(path.join('test', 'models', 'myapp'));
    
    test.ok(model.entities);
    test.ok(model.entities.length);
    
    createtask(model, [dirname], ajgenesis, function (err, result) {
        test.equal(err, null);
        
        test.ok(fs.existsSync(dirname));
        
        test.ok(fs.existsSync(path.join(dirname, 'app.js')));
        test.ok(fs.existsSync(path.join(dirname, 'package.json')));
        
        test.ok(fs.existsSync(path.join(dirname, 'bin')));
        test.ok(fs.existsSync(path.join(dirname, 'bin', 'www')));
        
        test.ok(fs.existsSync(path.join(dirname, 'views')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'index.ejs')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'header.ejs')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'headerjumbo.ejs')));
        test.ok(fs.existsSync(path.join(dirname, 'views', 'footer.ejs')));
        
        test.ok(fs.existsSync(path.join(dirname, 'public')));
        test.ok(fs.existsSync(path.join(dirname, 'controllers')));
        test.ok(fs.existsSync(path.join(dirname, 'controllers', 'department.js')));
        test.ok(fs.existsSync(path.join(dirname, 'controllers', 'employee.js')));
        test.ok(fs.existsSync(path.join(dirname, 'routes')));
        test.ok(fs.existsSync(path.join(dirname, 'routes', 'department.js')));
        test.ok(fs.existsSync(path.join(dirname, 'routes', 'employee.js')));
        test.ok(fs.existsSync(path.join(dirname, 'services')));
        test.ok(fs.existsSync(path.join(dirname, 'services', 'department.js')));
        test.ok(fs.existsSync(path.join(dirname, 'services', 'employee.js')));
        test.ok(fs.existsSync(path.join(dirname, 'libs')));
        
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis')));
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis', 'templates')));
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis', 'tasks')));
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis', 'libs')));
        
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis', 'models')));
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis', 'models', 'mongodb.json')));
        test.ok(fs.existsSync(path.join(dirname, 'ajgenesis', 'models', 'project.json')));        
        test.done();
    });
};
