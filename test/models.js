
var models = require('../source/ajgenesis/libs/models');

exports['Complete model'] = function (test) {
    var model = { project: { name: 'project' } };
    
    models.completeModel(model);
    
    test.equal(model.project.descriptor, 'Project');
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
    
    test.equal(model.descriptor, 'Project');

    test.equal(model.entities[0].descriptor, 'Customer');
    test.equal(model.entities[0].setdescriptor, 'Customers');
    test.equal(model.entities[1].descriptor, 'Supplier');
    test.equal(model.entities[1].setdescriptor, 'Suppliers');
    
    test.equal(model.entities[0].properties[0].descriptor, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].descriptor, 'Address');
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
    
    test.equal(model.descriptor, 'Project');

    test.equal(model.entities[0].descriptor, 'Employee');
    test.equal(model.entities[0].setdescriptor, 'Employees');
    test.equal(model.entities[1].descriptor, 'Department');
    test.equal(model.entities[1].setdescriptor, 'Departments');
    
    test.equal(model.entities[0].properties[0].descriptor, 'Name');
    test.equal(model.entities[0].properties[0].type, 'string');
    test.equal(model.entities[0].properties[1].descriptor, 'Department');
    test.equal(model.entities[0].properties[1].type, 'reference');
    test.equal(model.entities[0].properties[1].reference.name, 'department');
    test.equal(model.entities[0].properties[1].reference.descriptor, 'Department');
    test.equal(model.entities[0].properties[1].reference.setdescriptor, 'Departments');
};
