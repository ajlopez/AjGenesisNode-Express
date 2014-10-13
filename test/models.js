
var models = require('../source/ajgenesis/libs/models');

exports['Complete model'] = function (test) {
    var model = { project: { name: 'project' } };
    
    models.completeModel(model);
    
    test.equal(model.project.title, 'Project');
    test.strictEqual(model.api, false);
};

exports['Complete model with entities and properties'] = function (test) {
    var model = { 
        name: 'project',
        
        entities: [
            { 
                name: 'customer',
                properties: [
                    {
                        name: 'name'
                    },
                    {
                        name: 'address'
                    }
                ]
            },
            { 
                name: 'supplier'
            }
        ]
    };
    
    models.completeModel(model);
    
    test.equal(model.title, 'Project');

    test.equal(model.entities[0].setname, 'customers');
    test.equal(model.entities[1].setname, 'suppliers');
    
    test.equal(model.entities[0].title, 'Customer');
    test.equal(model.entities[0].settitle, 'Customers');
    test.equal(model.entities[1].title, 'Supplier');
    test.equal(model.entities[1].settitle, 'Suppliers');
    
    test.equal(model.entities[0].properties[0].title, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].title, 'Address');
    test.equal(model.entities[0].properties[1].type, 'string');
    
    model.entities.forEach(function (entity) {
        test.ok(entity.references);
        test.ok(Array.isArray(entity.references));
        test.equal(entity.references.length, 0);
        test.ok(entity.referenced);
        test.ok(Array.isArray(entity.referenced));
        test.equal(entity.referenced.length, 0);
        
        entity.properties.forEach(function (property) {
            test.strictEqual(property.entity, entity);
        });
    });
};

exports['Complete model with reference'] = function (test) {
    var model = { 
        name: 'project',
        
        entities: [
            { 
                name: 'employee',
                properties: [
                    {
                        name: 'name'
                    },
                    {
                        name: 'department',
                        reference: 'department'
                    }
                ]
            },
            { 
                name: 'department'
            }
        ]
    };
    
    models.completeModel(model);
    
    test.equal(model.title, 'Project');

    test.equal(model.entities[0].title, 'Employee');
    test.equal(model.entities[0].settitle, 'Employees');
    test.equal(model.entities[1].title, 'Department');
    test.equal(model.entities[1].settitle, 'Departments');
    
    test.equal(model.entities[0].properties[0].name, 'name');
    test.equal(model.entities[0].properties[0].title, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    
    test.equal(model.entities[0].properties[1].name, 'department');
    test.equal(model.entities[0].properties[1].title, 'Department');
    test.equal(model.entities[0].properties[1].type, 'reference');
    test.ok(model.entities[0].properties[1].reference);
    test.equal(model.entities[0].properties[1].reference.name, 'department');
    test.equal(model.entities[0].properties[1].reference.title, 'Department');
    test.equal(model.entities[0].properties[1].reference.settitle, 'Departments');
    test.ok(model.entities[0].properties[1].inverse);
    test.equal(model.entities[0].properties[1].inverse.name, 'employees');
    test.equal(model.entities[0].properties[1].inverse.title, 'Employees');
    
    test.ok(model.entities[0].references);
    test.equal(model.entities[0].references.length, 1);
    test.strictEqual(model.entities[0].references[0], model.entities[1]);

    test.ok(model.entities[0].referenced);
    test.equal(model.entities[0].referenced.length, 0);

    test.ok(model.entities[1].references);
    test.equal(model.entities[1].references.length, 0);

    test.ok(model.entities[1].referenced);
    test.equal(model.entities[1].referenced.length, 1);
    test.strictEqual(model.entities[1].referenced[0], model.entities[0].properties[1]);
};
