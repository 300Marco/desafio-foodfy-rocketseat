const express = require('express');
const routes = express.Router();

const ChefsController = require('../app/controllers/ChefsController');

const multer = require('../app/middlewares/multer');
const { onlyUsers } = require('../app/middlewares/session');

routes.get('/chefs', onlyUsers, ChefsController.show);

routes.get('/chefs/create', onlyUsers, ChefsController.create);

routes.get('/chefs/:id', onlyUsers, ChefsController.details);

routes.get('/chefs/:id/edit', onlyUsers, ChefsController.edit);

routes.post('/chefs', multer.array("avatar", 1), ChefsController.post);

routes.put('/chefs', multer.array("avatar", 1), ChefsController.put);

routes.delete('/chefs', ChefsController.delete);

module.exports = routes;
