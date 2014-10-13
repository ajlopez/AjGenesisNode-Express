
var generatetask = require('../source/ajgenesis/tasks/generate'),
    createtask = require('../create'),
    path = require('path'),
    fs = require('fs'),
    ajgenesis = require('ajgenesis');

exports['generate'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = ajgenesis.loadModel();
    
    test.ok(model.entities);
    test.ok(Array.isArray(model.entities));
    test.equal(model.entities.length, 2);
    test.ok(model.api);
    
    if (fs.existsSync('build') && !fs.existsSync(path.join('build', 'node_modules')))
        removeDirSync('build');
        
    createtask(null, ['build'], ajgenesis, function (err, result) {
        process.chdir('build');
        
        generatetask(model, [], ajgenesis, function (err, result) {
            test.equal(err, null);
            test.equal(result, null);

            test.ok(fs.existsSync('app.js'));
            test.ok(fs.existsSync('package.json'));
            
            var packjson = fs.readFileSync('package.json').toString();
            var pack;
            
            eval("pack = " + packjson);

            test.ok(pack);
            test.equal(pack.name, 'myproject');
            test.equal(pack.version, '0.0.1');
                    
            //test.ok(fs.existsSync(path.join('views', 'index.ejs')));
            //test.ok(fs.existsSync(path.join('views', 'error.ejs')));
            test.ok(fs.existsSync(path.join('views', 'header.ejs')));
            test.ok(fs.existsSync(path.join('views', 'headerjumbo.ejs')));
            test.ok(fs.existsSync(path.join('views', 'footer.ejs')));

            test.ok(fs.existsSync(path.join('views', 'customerlist.ejs')));
            test.ok(fs.existsSync(path.join('views', 'customerview.ejs')));
            test.ok(fs.existsSync(path.join('views', 'customernew.ejs')));
            test.ok(fs.existsSync(path.join('views', 'customeredit.ejs')));

            test.ok(fs.existsSync(path.join('views', 'supplierlist.ejs')));
            test.ok(fs.existsSync(path.join('views', 'supplierview.ejs')));
            test.ok(fs.existsSync(path.join('views', 'suppliernew.ejs')));
            test.ok(fs.existsSync(path.join('views', 'supplieredit.ejs')));

            test.ok(fs.existsSync(path.join('libs')));
            test.ok(fs.existsSync(path.join('libs', 'mongodb.js')));
            
            test.ok(fs.existsSync(path.join('routes')));
            test.ok(fs.existsSync(path.join('routes', 'index.js')));
            test.ok(fs.existsSync(path.join('routes', 'customer.js')));
            test.ok(fs.existsSync(path.join('routes', 'supplier.js')));
            test.ok(fs.existsSync(path.join('routes', 'customerapi.js')));
            test.ok(fs.existsSync(path.join('routes', 'supplierapi.js')));

            test.ok(fs.existsSync(path.join('controllers')));
            test.ok(fs.existsSync(path.join('controllers', 'index.js')));
            test.ok(fs.existsSync(path.join('controllers', 'customer.js')));
            test.ok(fs.existsSync(path.join('controllers', 'supplier.js')));
            test.ok(fs.existsSync(path.join('controllers', 'customerapi.js')));
            test.ok(fs.existsSync(path.join('controllers', 'supplierapi.js')));
            
            test.ok(fs.existsSync(path.join('services')));
            test.ok(fs.existsSync(path.join('services', 'customer.js')));
            test.ok(fs.existsSync(path.join('services', 'supplier.js')));

            test.ok(fs.existsSync(path.join('bin', 'www')));
            
            process.chdir(cwd);
            
            test.done();
        });    
    });
}

exports['generate in directory'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = ajgenesis.loadModel();
    
    test.ok(model.entities);
    test.ok(Array.isArray(model.entities));
    test.equal(model.entities.length, 2);
    
    if (fs.existsSync('build') && !fs.existsSync(path.join('build', 'node_modules')))
        removeDirSync('build');
        
    createtask(null, ['build'], ajgenesis, function (err, result) {
        model.builddir = 'build';
            
        generatetask(model, [], ajgenesis, function (err, result) {
            test.equal(err, null);
            test.equal(result, null);

            test.ok(fs.existsSync(path.join('build', 'app.js')));
            test.ok(fs.existsSync(path.join('build', 'package.json')));
            
            //test.ok(fs.existsSync(path.join('views', 'index.ejs')));
            //test.ok(fs.existsSync(path.join('views', 'error.ejs')));
            test.ok(fs.existsSync(path.join('build', 'views', 'header.ejs')));
            test.ok(fs.existsSync(path.join('build', 'views', 'headerjumbo.ejs')));
            test.ok(fs.existsSync(path.join('build', 'views', 'footer.ejs')));

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

            test.ok(fs.existsSync(path.join('build', 'controllers')));
            test.ok(fs.existsSync(path.join('build', 'controllers', 'index.js')));
            test.ok(fs.existsSync(path.join('build', 'controllers', 'customer.js')));
            test.ok(fs.existsSync(path.join('build', 'controllers', 'supplier.js')));
            
            test.ok(fs.existsSync(path.join('build', 'services')));
            test.ok(fs.existsSync(path.join('build', 'services', 'customer.js')));
            test.ok(fs.existsSync(path.join('build', 'services', 'supplier.js')));

            test.ok(fs.existsSync(path.join('build', 'bin', 'www')));
            
            process.chdir(cwd);
            
            test.done();
        });
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

