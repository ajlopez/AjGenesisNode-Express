
var models = require('../source/ajgenesis/libs/models');

exports['Complete model'] = function (test) {
    var model = { project: { name: 'project' } };
    
    models.completeModel(model);
    
    test.equal(model.project.title, 'Project');
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

    test.equal(model.entities[0].title, 'Customer');
    test.equal(model.entities[0].settitle, 'Customers');
    test.equal(model.entities[1].title, 'Supplier');
    test.equal(model.entities[1].settitle, 'Suppliers');
    
    test.equal(model.entities[0].properties[0].title, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].title, 'Address');
    test.equal(model.entities[0].properties[1].type, 'string');
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
    
    test.equal(model.entities[0].properties[0].title, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].title, 'Department');
    test.equal(model.entities[0].properties[1].type, 'reference');
    test.equal(model.entities[0].properties[1].reference.name, 'department');
    test.equal(model.entities[0].properties[1].reference.title, 'Department');
    test.equal(model.entities[0].properties[1].reference.settitle, 'Departments');
};
