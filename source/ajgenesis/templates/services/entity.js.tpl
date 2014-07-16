
var mongodb = require('../libs/mongodb');

var repository;

function initialize(db) {
    repository = mongodb.createRepository(db, '${entity.name}');
}

function add(entity, cb) {
    repository.insert(entity, cb);
}

function update(id, entity, cb) {
    repository.update(id, entity, cb);
}

function remove(id, cb) {
    repository.remove(id, cb);
}

function getById(id, cb) {
    repository.findById(id, cb);
}

function getAll(cb) {
    repository.findAll(cb);
}

function getEntityReferences(entity, cb) {
    var references = { };
    
<#
    var refs = [];
    entity.properties.forEach(function (property) {
        if (property.reference) {
            refs.push(property);
#>
    function get${property.name}(next) {
        if (!entity.${property.name}) {
            next();
            return;
        }
        
        var service = require('./${property.reference.name}');
        
        service.getById(entity.${property.name}, function (err, data) {
            if (err) {
                cb(err, references);
                return;
            }
            
            references.${property.name} = data;
            next();
        });
    }
<#
        }
    });
    
    for (var k = 0; k < refs.length - 1; k++) { #>
    get${refs[k].name}(get${refs[k + 1].name});
<#
    }
    
    if (refs.length) {
#>
    get${refs[refs.length - 1].name}(function () { cb(null, references); });
<#
    } else {
#>
    cb(null, references);
<#
    }
#>
}

function getReferences(cb) {
    var references = { };
<#
    if (!entity.references || !entity.references.length) {
#>
    cb(null, references);
<#
    } else {

    entity.references.forEach(function (ref) {
#>
    var s${ref.name} = require('./${ref.name}');
    
    function get${ref.setname}(next) {
        s${ref.name}.getAll(function (err, items) {
            if (err) {
                cb(err, references);
                return;
            }
            
            references.${ref.setname} = items;
            next();
        });
    }
<# }); #>
<# for (var k = 0; k < entity.references.length - 1; k++) { #>
    get${entity.references[k].setname}(get${entity.references[k+1].setname});
<# } #>

    get${entity.references[entity.references.length - 1].setname}(function () { cb(null, references); });
<# } #>
}

module.exports = {
    initialize: initialize,
    add: add,
    update: update,
    remove: remove,
    getById: getById,
    getAll: getAll,
    getReferences: getReferences
};

