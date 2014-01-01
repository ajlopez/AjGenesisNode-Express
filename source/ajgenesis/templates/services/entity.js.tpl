
var mongodb = require('../libs/mongodb');

var repository;

function initialize(db) {
    repository = mongodb.createRepository(db, '${entity.name}');
}

function add(entity, cb) {
    repository.insert(entity, cb);
}

function update(id, entity, cb) {
    repository.update(id, entity, cb);
}

function remove(id, cb) {
    repository.remove(id, cb);
}

function getById(id, cb) {
    repository.findById(id, cb);
}

function getAll(cb) {
    repository.findAll(cb);
}

module.exports = {
    initialize: initialize,
    add: add,
    update: update,
    remove: remove,
    getById: getById,
    getAll: getAll
};

