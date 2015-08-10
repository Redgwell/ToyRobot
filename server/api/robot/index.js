'use strict';

var express = require('express');
var controller = require('./robot.controller');

var router = express.Router();

router.get('/', controller.list);
router.post('/', controller.create);
router.get('/:id', controller.getById);
router.put('/:id/move', controller.move);
router.put('/:id/rotate', controller.rotate);
router.get('/:id/report', controller.getReport);

module.exports = router;
