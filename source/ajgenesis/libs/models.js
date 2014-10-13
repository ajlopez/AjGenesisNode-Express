
var utils = require('./utils');

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
        
    if (entity.properties)
        entity.properties.forEach(function (property) {
            completeProperty(property, entities);
            
            if (property.reference && property.reference.name && entity.references.indexOf(property.reference) < 0)
                entity.references.push(property.reference);
        });
}

function completeModel(model) {
    if (!model)
        return;
        
    if (model.name && !model.title)
        model.title = utils.capitalize(model.name);
        
    if (model.project && model.project.name && !model.project.title)
        model.project.title = utils.capitalize(model.project.name);
        
    if (!model.entities)
        model.entities = [];
  
    if (Array.isArray(model.entities))
        model.entities.forEach(function (entity) {
            completeEntity(entity, model.entities);
        });
        
    if (model.api == undefined)
        model.api = false;
}

module.exports = {
    completeModel: completeModel
};

