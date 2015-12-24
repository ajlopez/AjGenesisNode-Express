
var utils = require('./utils');
var path = require('path');

function getEntityByName(entities, name) {
    return utils.find(entities, 'name', name);
}

function completeProperty(property, entities) {
    if (!property)
        return;
        
    if (property.name && !property.title)
        property.title = utils.capitalize(property.name);
        
    if (!property.type)
        property.type = 'string';
        
    if (property.reference) {
        property.type = 'reference';
        property.reference = getEntityByName(entities, property.reference);
    }
}

function completeEntity(entity, entities) {
    if (!entity)
        return;
        
    if (entity.name && !entity.setname)
        entity.setname = utils.pluralize(entity.name);
        
    if (entity.name && !entity.title)
        entity.title = utils.capitalize(entity.name);
        
    if (entity.title && !entity.settitle)
        entity.settitle = utils.pluralize(entity.title);
        
    if (!entity.references)
        entity.references = [];
        
    if (!entity.referenced)
        entity.referenced = [];
        
    if (!entity.properties)
        entity.properties = [];
        
    entity.properties.forEach(function (property) {
        if (!property.entity)
            property.entity = entity;
            
        completeProperty(property, entities);
        
        if (property.reference && property.reference.name) {
            if (entity.references.indexOf(property.reference) < 0)
                entity.references.push(property.reference);
            
            if (!property.reference.referenced)
                property.reference.referenced = [];
                
            property.reference.referenced.push(property);
            
            if (!property.inverse)
                property.inverse = { };
                
            if (!property.inverse.name)
                property.inverse.name = entity.setname;
                
            if (!property.inverse.title)
                property.inverse.title = entity.settitle;
        }
    });
}

function completeModel(model) {
    if (!model)
        return;
        
    var builddir = model.builddir || '.';
        
    if (!model.project)
        model.project = {};
    
    if (model.project && !model.project.name)
        model.project.name = path.basename(path.resolve(builddir));
        
    if (model.project && model.project.name && !model.project.title)
        model.project.title = utils.capitalize(model.project.name);
        
    if (!model.entities)
        model.entities = {};
        
    if (!model.entities.forEach)
        model.entities.forEach = function (fn) {
            for (var n in this)
                if (typeof this[n] === 'object')
                    fn(this[n]);
        }
  
    model.entities.forEach(function (entity) {
        completeEntity(entity, model.entities);
    });
        
    if (model.api == undefined)
        model.api = false;
}

module.exports = {
    completeModel: completeModel
};

