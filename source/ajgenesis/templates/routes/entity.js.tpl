
var services = require('../services/${entity.name}');

function index(req, res) {
    services.getAll(function (err, items) {
        if (err)
            error(err, req, res);
        else
            res.render('${entity.name}list', { title: '${entity.setdescriptor}', items: items });
    });
}

function view(req, res) {
    services.getById(req.params.id, function (err, item) {
        if (err)
            error(err, req, res);
        else
            res.render('${entity.name}view', { title: '${entity.descriptor}', item: item });
    });
}

function create(req, res) {
    res.render('${entity.name}new', { title: 'New ${entity.descriptor}' });
}

function add(req, res) {
    var entity = getEntity(req);
    
    services.add(entity, function (err, entity) {
        if (err)
            error(err, req, res);
        else
            index(req, res);
    });
}

function edit(req, res) {
    services.getById(req.params.id, function (err, item) {
        if (err)
            error(err, req, res);
        else
            res.render('${entity.name}edit', { title: 'Edit ${entity.descriptor}', item: item });
    });
}

function update(req, res) {
    var entity = getEntity(req);
    
    services.update(req.params.id, entity, function (err, entity) {
        if (err)
            error(err, req, res);
        else
            view(req,res);
    });
}

function remove(req, res) {
    services.remove(req.params.id, function (err, result) {
        if (err)
            error(err, req, res);
        else
            index(req,res);
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
    index: index,
    view: view,
    edit: edit,
    update: update,
    create: create,
    add: add,
    remove: remove
};