var express = require('express');
var router = express.Router();
var controller = require('../controllers/${entity.name}api');

router.get('/', controller.getAll);
router.post('/', controller.insert);
router.get('/:id', controller.getById);
router.put('/:id/edit', controller.update);
router.delete('/:id/edit', controller.remove);

module.exports = router;
