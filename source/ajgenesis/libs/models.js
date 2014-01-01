
var utils = require('./utils');

function completeProperty(property) {
    if (!property)
        return;
        
    if (property.name && !property.descriptor)
        property.descriptor = utils.capitalize(property.name);
        
    if (!property.type)
        property.type = 'text';
}

function completeEntity(entity) {
    if (!entity)
        return;
        
    if (entity.name && !entity.descriptor)
        entity.descriptor = utils.capitalize(entity.name);
        
    if (entity.descriptor && !entity.setdescriptor)
        entity.setdescriptor = utils.pluralize(entity.descriptor);
        
    if (entity.properties)
        entity.properties.forEach(function (property) {
            completeProperty(property);
        });
}

function completeModel(model) {
    if (!model)
        return;
        
    if (model.name && !model.descriptor)
        model.descriptor = utils.capitalize(model.name);
        
    if (model.project && model.project.name && !model.project.descriptor)
        model.project.descriptor = utils.capitalize(model.project.name);
        
    if (model.entities)
        model.entities.forEach(function (entity) {
            completeEntity(entity);
        });
}

module.exports = {
    completeModel: completeModel
};