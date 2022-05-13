const AdminUser = require('../models/AdminUser');
const AdminRecipe = require('../models/AdminRecipe');

// async function checkAllFields(body) {
//     const keys = Object.keys(body);
        
//     for(key of keys) {
//         if(body[key] == "" && key != 'information' && key != 'removed_files') {
//             return {
//                 user: body,
//                 error: "Por favor, preencha todos os campos"
//             };
//         };
//     };
// }

async function post(req, res, next) {
    try {
        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.send("Please fill in all fields");
            };
        };

        const results = await AdminRecipe.chefsSelectOptions();
        const options = results.rows;

        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        if(req.files.length == 0) {
            return res.render('adminRecipes/create', {
                recipe: req.body,
                chefsOptions: options,
                user,
                error: "Por favor, envie pelo menos uma imagem!"
            });
        };

        next();
    } catch(err) {
        console.error(err);
    };
}

async function put(req, res, next) {
    try {
        // get images
        let results = await AdminRecipe.files(req.body.id);
        let files = results.rows;
        files = files.map(file => ({
            ...file,
            src: `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`
        }));

        // get chefs
        results = await AdminRecipe.chefsSelectOptions();
        const options = results.rows;

        // get id of logged in user
        const { userId: id } = req.session;
        const user = await AdminUser.findOne({ where: {id} });

        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(req.body[key] == "" && key != 'information' && key != 'removed_files') {
                return res.render("adminRecipes/edit", {
                    recipe: req.body,
                    files,
                    chefsOptions: options,
                    user,
                    error: "Por favor, preencha todos os campos!"
                });
            };
        };

        next();
    } catch(err) {
        console.log(err);
    }
}

module.exports = {
    post,
    put
};