
var generatetask = require('../source/ajgenesis/tasks/generate'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['generate controllers'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = ajgenesis.loadModel('models');
    
    test.ok(model.entities);
    test.ok(Array.isArray(model.entities));
    test.equal(model.entities.length, 2);
    
    if (fs.existsSync('build') && !fs.existsSync(path.join('build', 'node_modules')))
        removeDirSync('build');
    
    generatetask(model, [], ajgenesis, function (err, result) {
        test.equal(err, null);
        test.equal(result, null);
        
        test.ok(fs.existsSync('build'));
        
        test.ok(fs.existsSync(path.join('build', 'app.js')));
        test.ok(fs.existsSync(path.join('build', 'package.json')));

        test.ok(fs.existsSync(path.join('build', 'public')));
        
        test.ok(fs.existsSync(path.join('build', 'views')));
        test.ok(fs.existsSync(path.join('build', 'views', 'index.ejs')));

        test.ok(fs.existsSync(path.join('build', 'views', 'customerlist.ejs')));
        test.ok(fs.existsSync(path.join('build', 'views', 'customerview.ejs')));
        test.ok(fs.existsSync(path.join('build', 'views', 'customernew.ejs')));
        test.ok(fs.existsSync(path.join('build', 'views', 'customeredit.ejs')));

        test.ok(fs.existsSync(path.join('build', 'views', 'supplierlist.ejs')));
        test.ok(fs.existsSync(path.join('build', 'views', 'supplierview.ejs')));
        test.ok(fs.existsSync(path.join('build', 'views', 'suppliernew.ejs')));
        test.ok(fs.existsSync(path.join('build', 'views', 'supplieredit.ejs')));

        test.ok(fs.existsSync(path.join('build', 'libs')));
        test.ok(fs.existsSync(path.join('build', 'libs', 'mongodb.js')));
        
        test.ok(fs.existsSync(path.join('build', 'routes')));
        test.ok(fs.existsSync(path.join('build', 'routes', 'index.js')));
        test.ok(fs.existsSync(path.join('build', 'routes', 'customer.js')));
        test.ok(fs.existsSync(path.join('build', 'routes', 'supplier.js')));
        
        test.ok(fs.existsSync(path.join('build', 'services')));
        test.ok(fs.existsSync(path.join('build', 'services', 'customer.js')));
        test.ok(fs.existsSync(path.join('build', 'services', 'supplier.js')));
        
        process.chdir(cwd);
        
        test.done();
    });    
}

function removeDirSync(dirname) {
    var filenames = fs.readdirSync(dirname);
    
    filenames.forEach(function (filename) {
        filename = path.join(dirname, filename);
        
        if (isDirectory(filename))
            removeDirSync(filename);
        else
            removeFileSync(filename);
    });
    
    fs.rmdirSync(dirname);
}

function removeFileSync(filename) {
    fs.unlinkSync(filename);
}

function isDirectory(filename)
{
    try {
        var stats = fs.lstatSync(filename);
        return stats.isDirectory();
    }
    catch (err)
    {
        return false;
    }
}

