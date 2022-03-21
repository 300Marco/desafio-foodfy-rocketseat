const express = require('express');
const HomeController = require('./app/controllers/HomeController');
const RecipesController = require('./app/controllers/RecipesController');
const AdminRecipesController = require('./app/controllers/AdminRecipesController');
const ChefsController = require('./app/controllers/ChefsController');
const multer = require('./app/middlewares/multer');
const routes = express.Router();

// WEB PAGE
routes.get('/', HomeController.index);
// routes.get('/', recipes.index);

routes.get('/about', RecipesController.about);

routes.get('/recipes', RecipesController.recipes);

routes.get('/search', RecipesController.search);

routes.get('/chefs', RecipesController.chefs);

routes.get('/details/:index', RecipesController.details);

// ADMIN - RECIPES
routes.get('/admin/recipes', AdminRecipesController.show);

routes.get('/admin/recipes/create', AdminRecipesController.create);

routes.get('/admin/recipes/:id', AdminRecipesController.details);

routes.get('/admin/recipes/:id/edit', AdminRecipesController.edit);

routes.post("/admin/recipes", multer.array("photos", 5), AdminRecipesController.post);

routes.put('/admin/recipes', multer.array("photos", 5), AdminRecipesController.put);

routes.delete('/admin/recipes', AdminRecipesController.delete);

// ADMIN - CHEFS
routes.get('/admin/chefs', ChefsController.show);

routes.get('/admin/chefs/create', ChefsController.create);

routes.get('/admin/chefs/:id', ChefsController.details);

routes.get('/admin/chefs/:id/edit', ChefsController.edit);

routes.post('/admin/chefs', multer.array("avatar", 1), ChefsController.post);

routes.put('/admin/chefs', multer.array("avatar", 1), ChefsController.put);

routes.delete('/admin/chefs', ChefsController.delete);

routes.use((req, res) => {
    return res.status(404).render('not-found');
});

module.exports = routes;