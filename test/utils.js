
var utils = require('../source/ajgenesis/libs/utils');

exports['Normalize'] = function (test) {
    test.equal(utils.normalize('name'), 'name');
    test.equal(utils.normalize('NAME'), 'name');
    test.equal(utils.normalize('Name'), 'name');
};

exports['Normalize null'] = function (test) {
    test.equal(utils.normalize(null), null);
};

exports['Pluralize'] = function (test) {
    test.equal(utils.pluralize('customer'), 'customers');
    test.equal(utils.pluralize('supplier'), 'suppliers');
};

exports['Pluralize null'] = function (test) {
    test.equal(utils.pluralize(null), null);
};

exports['Pluralize plural'] = function (test) {
    test.equal(utils.pluralize('customers'), 'customers');
};

exports['Pluralize word ending with y'] = function (test) {
    test.equal(utils.pluralize('city'), 'cities');
};

exports['Capitalize'] = function (test) {
    test.equal(utils.capitalize('city'), 'City');
    test.equal(utils.capitalize('customers'), 'Customers');
    test.equal(utils.capitalize('i'), 'I');
};

exports['Capitalize null'] = function (test) {
    test.equal(utils.capitalize(null), null);
};

