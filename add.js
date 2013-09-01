
var path = require('path');

function getName(name) {
    return name.toLowerCase();
}

function getSetName(name) {
    return getPlural(getName(name));
}

function getDescriptor(name) {
    return name[0].toUpperCase() + name.slice(1);
}

function getSetDescriptor(name) {
    return getPlural(getDescriptor(name));
}

function getDescription(name) {
    return getName(name);
}

function getPlural(name) {
    return name + 's';
}

module.exports = function (model, args, ajgenesis, cb) {
    var entityname = args[0];
    
    ajgenesis.createDirectory('ajgenesis', 'models');
    var template = path.join(__dirname, 'templates', 'entity.json.tpl');
    var filename = path.join('ajgenesis', 'models', entityname + '.json');
    
    var entitymodel = {
        name: getName(entityname),
        setname: getSetName(entityname),
        descriptor: getDescriptor(entityname),
        setdescriptor: getSetDescriptor(entityname),
        description: getDescription(entityname)
    }
    
    ajgenesis.fileTransform(template, filename, entitymodel);
    cb();
}

