
var utils = require('../source/ajgenesis/libs/utils');

exports['Normalize'] = function (test) {
    test.equal(utils.normalize('name'), 'name');
    test.equal(utils.normalize('NAME'), 'name');
    test.equal(utils.normalize('Name'), 'name');
};

exports['Pluralize'] = function (test) {
    test.equal(utils.pluralize('customer'), 'customers');
    test.equal(utils.pluralize('supplier'), 'suppliers');
};