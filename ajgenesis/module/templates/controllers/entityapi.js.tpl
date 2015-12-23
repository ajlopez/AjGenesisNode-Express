
var services = require('../services/${entity.name}');

function getAll(req, res) {
    services.getAll(function (err, items) {
        if (err)
            res.json(err);
        else
            res.json(items);
    });
}

function getById(req, res) {
    services.getById(req.params.id, function (err, item) {
        if (err)
            res.json(err);
        else
            res.json(item);
    });
}

function insert(req, res) {
    var entity = getEntity(req);
    
    services.add(entity, function (err, entity) {
        if (err)
            res.json(err);
        else
            res.json(entity.id);
    });
}

function update(req, res) {
    var entity = getEntity(req);
    
    services.update(req.params.id, entity, function (err, entity) {
        if (err)
            res.json(err);
        else
            res.json(true);
    });
}

function remove(req, res) {
    services.remove(req.params.id, function (err, result) {
        if (err)
            res.json(err);
        else
            res.json(true);
    });
}

function getEntity(req) {
    var entity = { };
    
<# entity.properties.forEach(function (property) { #>
    entity.${property.name} = req.param('${property.name}');
<# }); #>    

    return entity;
}

module.exports = {
    getAll: getAll,
    getById: getById,
    insert: insert,
    update: update,
    remove: remove
};