
var generatetask = require('../ajgenesis/module/generate');
var inittask = require('../ajgenesis/module/init');
var path = require('path');
var fs = require('fs');
var ajgenesis = require('ajgenesis');
var async = require('simpleasync');

exports['generate'] = function (test) {
    test.async();
    
    var cwd = process.cwd();
    
    process.chdir('test');
    
    var model = ajgenesis.loadModel();
    
    test.ok(model.entities);
    test.ok(model.api);
    
    if (fs.existsSync('build') && !fs.existsSync(path.join('build', 'node_modules')))
        removeDirSync('build');
    
    model.builddir = 'build';
    
    async()
    .then(function (data, next) {
        ajgenesis.modules.install('..', 'build', next);
    })
    .then(function (data, next) {
        inittask(model, [], ajgenesis, next);
    })
    .then(function (data, next) {
        generatetask(model, [], ajgenesis, next);
    })
    .then(function (data, next) {
        test.equal(data, null);

        process.chdir('build');
        
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

        test.ok(fs.existsSync(path.join('ajgenesis')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'models')));
        test.ok(fs.existsSync(path.join('ajgenesis', 'models', 'project.json')));
        
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
    })
    .run();
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

