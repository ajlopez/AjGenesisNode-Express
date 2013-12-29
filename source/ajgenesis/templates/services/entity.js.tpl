
var mongodb = require('../libs/mongodb');

var repository;

function initialize(db) {
    repository = mongodb.createRepository(db, '${entity.name}');
}

function add(entity) {
}

function getById(id) {
}

function getAll() {
}

module.exports = {
    add: add
    getById: getById
    getAll: getAll
};