
const Recipe = require('../models/Recipe');
const Chef = require('../models/Chef');
const { paginate } = require('../models/Recipe');
const { default: filters } = require('nunjucks/src/filters');

module.exports = {
    index(req, res) {
        // let { search, page, limit } = req.query;

        // page = page || 1;
        // limit = limit || 2;
        // let offset = limit * (page -1);

        // const params = {
        //     search,
        //     page,
        //     limit,
        //     offset,
        //     callback(recipes) {
        //         return res.render('recipes/index', {recipes, search});
        //     }
        // };

        // Recipe.paginate(params);

        const { search } = req.query;

        if(search) {
            Recipe.findBy(search, (recipes) => {
                return res.render('recipes/index', {recipes});
            });
        } else {
            Recipe.all((recipes) => {
                return res.render('recipes/index', {recipes});
            });
        }
    },
    about(req, res) {
        return res.render('recipes/about');
    },
    recipes(req, res) {
        let { search, page, limit } = req.query;

        page = page || 1;
        limit = limit || 3;
        let offset = limit * (page -1);

        const params = {
            search,
            page,
            limit,
            offset,
            callback(recipes) {
                const pagination = {
                    total: Math.ceil(recipes[0].total / limit),
                    page
                }

                return res.render('recipes/recipes', {recipes, pagination, search});
            }
        };

        Recipe.paginate(params);
        
        
        // const { search } = req.query;

        // if(search) {
        //     Recipe.findBy(search, (recipes) => {
        //         return res.render('recipes/recipes', {recipes});
        //     });
        // } else {
        //     Recipe.all((recipes) => {
        //         return res.render('recipes/recipes', {recipes});
        //     });
        // }
    },
    search(req,res) {
        const { search } = req.query;

        if(search) {
            Recipe.findBy(search, (recipes) => {
                return res.render('recipes/search', {recipes, search});
            });
        } else {
            Recipe.all((recipes) => {
                return res.render('recipes/search', {recipes});
            });
        }
    },
    details(req, res) {
        const recipeIndex = req.params.index;
        
        Recipe.find(recipeIndex, (recipe) => {

            if(recipe == undefined) {
                return res.render('recipes/not-found');
            }

            return res.render('recipes/details', {recipe});
        });
    },
    chefs(req, res) {
        Recipe.totalRecipes((chefs) => {
            return res.render('recipes/chefs', {chefs});
        });
    }
}