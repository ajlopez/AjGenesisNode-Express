
var services = require('../services/${entity.name}');
var async = require('simpleasync');

function list(req, res) {
    var model = { title: '${entity.settitle}' };
    
    async()
    .then(function (data, next) { services.getAll(next); })
    .map(function (item, next) {
        services.getEntityReferences(item, next);
    })
    .then(function (items, next) {
        model.items = items;
        res.render('${entity.name}list', model);
    })
    .fail(function (err) {
        error(err, req, res);
    })
    .run();
}

function view(req, res) {
    var model = { title: '${entity.title}' };
    
    async()
    .then(function (data, next) { services.getById(req.params.id, next); })
    .then(function (item, next) {
        model.item = item;
        services.getEntityReferences(item, next);
    })
<#  entity.referenced.forEach(function (ref) { #>
    .then(function (item, next) {
        var service = require('../services/${ref.entity.name}');
        service.getBy${utils.capitalize(ref.name)}(req.params.id, next);
    })
    .map(function (item, next) {
        var service = require('../services/${ref.entity.name}');
        service.getEntityReferences(item, next);
    })
    .then(function (children, next) {
        model.item.${ref.inverse.name}_${ref.name} = children;
        next(null, model.item);
    })
<#  }); #>
    .then(function (item, next) {
        res.render('${entity.name}view', model);
    })
    .fail(function (err) {
        error(err, req, res);
    })
    .run();
}

function create(req, res) {
    services.getReferences(function (err, references) {
        if (err) {
            error(err, req, res);
            return;
        }
        
        var model = { 
            title: 'New ${entity.title}',
            references: references
        };
            
        res.render('${entity.name}new', model);
    });
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
            services.getReferences(function (err, references) {
                if (err) {
                    error(err, req, res);
                    return;
                }
                
                var model = { 
                    title: 'Edit ${entity.title}',
                    item: item,
                    references: references
                };
                    
                res.render('${entity.name}edit', model);
            });
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
    if (req.body.${property.name} != null)
        entity.${property.name} = req.body.${property.name};
<# }); #>    

    return entity;
}

function error(err, req, res) {
    res.render('error', { title: 'Error', error: err });
}

module.exports = {
    list: list,
    view: view,
    edit: edit,
    update: update,
    create: create,
    add: add,
    remove: remove
};