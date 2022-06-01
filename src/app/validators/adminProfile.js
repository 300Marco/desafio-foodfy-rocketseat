const AdminUser = require('../models/AdminUser');
const { compare } = require('bcryptjs');

// function checkAllFields(body) {
//     const keys = Object.keys(body);
        
//     for(key of keys) {
//         if(body[key] == "" && key != 'is_admin') {
//             return {
//                 user: body,
//                 error: "Por favor, preencha todos os campos"
//             };
//         };
//     };
// }

function fieldFormatting(text) {
    return text.toLowerCase().split(' ').map(word => {
        return word[0].toUpperCase() + word.slice(1);
    }).join(' ');
}

function emailFieldFormatting(text) {
    return text.toLowerCase();
}

async function edit(req, res, next) {
    try {
        const { userId: id } = req.session; // get session id
        
        const user = await AdminUser.findOne({ where: {id} });

        if(!user) return res.render('adminUsers/create', {
            error: "Usuário não encontrado",
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

// async function update(req, res, next) {
//     try {
//         let { id, email, password } = req.body;
//         const user = await AdminUser.findOne({ where: {id} });

//         req.body.name = fieldFormatting(req.body.name).replace(/De/g, 'de');
//         email = emailFieldFormatting(email);
//         req.body.email = emailFieldFormatting(email);

//         // Insert is_admin into req.body
//         if(user.is_admin == true) {
//             req.body.is_admin = true;
//         } else {
//             req.body.is_admin = false;
//         };

//         // Check if all fields are filled
//         const fillAllFields = checkAllFields(req.body);
//         if(fillAllFields) {
//             return res.render('adminProfile/edit', fillAllFields);
//         };

//         // Check if email already exists
//         const allUsers = await AdminUser.all();
//         const users = allUsers.rows;
        
//         for(let userEmail of users) {
//             if(email == userEmail.email && email != user.email)
//                 return res.render('adminProfile/edit', {
//                     user: req.body,
//                     error: "Este email já existe, use outro email!"
//                 });
//         };

//         const passed = await compare(password, user.password);

//         if(!passed) return res.render('adminProfile/edit', {
//             user: req.body,
//             error: "Senha incorreta"
//         });

//         req.user = user;

//         next();
//     } catch(err) {
//         console.error(err);
//         return res.render('adminUsers/not-found');
//     };
// }
async function update(req, res, next) {
    try {
        let { id, email, password } = req.body;

        const keys = Object.keys(req.body);
        
        for(key of keys) {
            if(password == "") {
                return res.send("Por favor, insira a senha para atualizar!");
            } else if(req.body[key] == "" && key != 'is_admin') {
                return res.send("Por favor, preencha todos os campos!");
            };
        };

        const user = await AdminUser.findOne({ where: {id} });

        req.body.name = fieldFormatting(req.body.name).replace(/De/g, 'de');
        email = emailFieldFormatting(email);
        req.body.email = emailFieldFormatting(email);

        // Insert is_admin into req.body
        if(user.is_admin == true) {
            req.body.is_admin = true;
        } else {
            req.body.is_admin = false;
        };

        // Check if email already exists
        const allUsers = await AdminUser.all();
        const users = allUsers.rows;
        
        for(let userEmail of users) {
            if(email == userEmail.email && email != user.email)
                return res.render('adminProfile/edit', {
                    user: req.body,
                    error: "Este email já existe, use outro email!"
                });
        };

        const passed = await compare(password, user.password);

        if(!passed) return res.render('adminProfile/edit', {
            user: req.body,
            error: "Senha incorreta, tente novamente!"
        });

        req.user = user;

        next();
    } catch(err) {
        console.error(err);
        return res.render('adminUsers/not-found');
    };
}

module.exports = {
    edit,
    update
};